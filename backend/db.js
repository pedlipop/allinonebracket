import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonDbPath = process.env.VERCEL
  ? path.join('/tmp', 'db.json')
  : path.join(__dirname, '..', 'database', 'db.json');

const { Pool } = pg;

let pgPool = null;
let useJsonDb = false;

// Create database directory if it doesn't exist
const dbDir = path.dirname(jsonDbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize JSON database structure if it doesn't exist
if (!fs.existsSync(jsonDbPath)) {
  fs.writeFileSync(jsonDbPath, JSON.stringify({
    tournaments: [],
    participants: [],
    matches: [],
    history_logs: []
  }, null, 2));
}

// Try initializing PG Pool
try {
  const poolConfig = {
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tournament_bracket',
    connectionTimeoutMillis: 2000, // Fail fast if Postgres is down
  };
  // Enable SSL for cloud-hosted PostgreSQL (Neon, Supabase, etc.)
  if (process.env.DATABASE_URL) {
    poolConfig.ssl = { rejectUnauthorized: false };
  }
  pgPool = new Pool(poolConfig);
  
  // Test connection
  await pgPool.query('SELECT NOW()');
  console.log('Connected to PostgreSQL successfully.');

  // Auto-initialize schema if schema.sql exists
  try {
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await pgPool.query(schemaSql);
      console.log('PostgreSQL schema initialized/verified successfully.');
    }
  } catch (schemaErr) {
    console.error('Failed to auto-initialize PostgreSQL schema:', schemaErr);
  }
} catch (err) {
  console.warn('PostgreSQL connection failed. Falling back to local JSON database.');
  useJsonDb = true;
}

// JSON Database Helper operations
const readJsonDb = () => {
  try {
    const data = fs.readFileSync(jsonDbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, resetting:', err);
    return { tournaments: [], participants: [], matches: [], history_logs: [] };
  }
};

const writeJsonDb = (data) => {
  fs.writeFileSync(jsonDbPath, JSON.stringify(data, null, 2));
};

const executeJsonQuery = (text, params) => {
  const db = readJsonDb();
  
  // Normalize params array
  const p = params || [];

  // 1. SELECT * FROM tournaments WHERE id = $1
  if (text.includes('SELECT * FROM tournaments WHERE id =')) {
    const tour = db.tournaments.find(t => t.id === p[0]);
    return { rows: tour ? [tour] : [] };
  }

  // 1.02 SELECT id, admin_key FROM tournaments WHERE admin_key = $1
  if (text.includes('SELECT id, admin_key FROM tournaments WHERE admin_key =')) {
    const tour = db.tournaments.find(t => t.admin_key === p[0]);
    return { rows: tour ? [{ id: tour.id, admin_key: tour.admin_key }] : [] };
  }

  // 1.03 SELECT admin_key FROM tournaments WHERE id = $1
  if (text.includes('SELECT admin_key FROM tournaments WHERE id =')) {
    const tour = db.tournaments.find(t => t.id === p[0]);
    return { rows: tour ? [{ admin_key: tour.admin_key }] : [] };
  }

  // 1.05 SELECT state_json FROM tournaments WHERE id = $1
  if (text.includes('SELECT state_json FROM tournaments WHERE id =')) {
    const tour = db.tournaments.find(t => t.id === p[0]);
    return { rows: tour ? [{ state_json: tour.state_json }] : [] };
  }

  // 1.06 UPDATE tournaments SET state_json = $2 WHERE id = $1
  if (text.includes('UPDATE tournaments SET state_json =')) {
    const id = p[0];
    const stateJson = p[1];
    const existingIdx = db.tournaments.findIndex(t => t.id === id);
    if (existingIdx !== -1) {
      db.tournaments[existingIdx].state_json = stateJson;
      // Also sync status and name from parsed state if possible
      try {
        const parsed = JSON.parse(stateJson);
        if (parsed.status) db.tournaments[existingIdx].status = parsed.status;
        if (parsed.name) db.tournaments[existingIdx].name = parsed.name;
      } catch (e) {}
      db.tournaments[existingIdx].updated_at = new Date().toISOString();
    }
    writeJsonDb(db);
    return { rows: [] };
  }

  // 1.1 SELECT * FROM tournaments (list all)
  if (text.includes('FROM tournaments') && !text.includes('WHERE id =')) {
    const list = db.tournaments.map(t => {
      let count = 0;
      try {
        if (t.state_json) {
          const parsed = JSON.parse(t.state_json);
          count = (parsed.players || []).length;
        }
      } catch (e) {
        count = db.participants.filter(pt => pt.tournament_id === t.id).length;
      }
      return {
        ...t,
        player_count: count
      };
    });
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { rows: list };
  }

  // 1.2 DELETE FROM tournaments WHERE id = $1
  if (text.includes('DELETE FROM tournaments WHERE id =')) {
    const id = p[0];
    db.tournaments = db.tournaments.filter(t => t.id !== id);
    db.participants = db.participants.filter(pt => pt.tournament_id !== id);
    db.matches = db.matches.filter(m => m.tournament_id !== id);
    db.history_logs = db.history_logs.filter(h => h.tournament_id !== id);
    writeJsonDb(db);
    return { rows: [] };
  }

  // 2. SELECT * FROM participants WHERE tournament_id = $1 ORDER BY seed
  if (text.includes('SELECT * FROM participants WHERE tournament_id =')) {
    const list = db.participants.filter(pt => pt.tournament_id === p[0]);
    list.sort((a, b) => a.seed - b.seed);
    return { rows: list };
  }

  // 3. SELECT * FROM matches WHERE tournament_id = $1 ORDER BY round, match_index
  if (text.includes('SELECT * FROM matches WHERE tournament_id =')) {
    const list = db.matches.filter(m => m.tournament_id === p[0]);
    list.sort((a, b) => a.round - b.round || a.match_index - b.match_index);
    return { rows: list };
  }

  // 4. SELECT * FROM history_logs WHERE tournament_id = $1 ORDER BY created_at
  if (text.includes('SELECT * FROM history_logs WHERE tournament_id =')) {
    const list = db.history_logs.filter(h => h.tournament_id === p[0]);
    list.sort((a, b) => a.created_at - b.created_at);
    return { rows: list };
  }

  // 5. INSERT INTO tournaments ON CONFLICT
  if (text.includes('INSERT INTO tournaments')) {
    const id = p[0];
    const name = p[1];
    const status = p[2];
    const admin_key = p[3] || null;
    const existingIdx = db.tournaments.findIndex(t => t.id === id);
    const nowStr = new Date().toISOString();
    
    if (existingIdx !== -1) {
      db.tournaments[existingIdx].status = status;
      db.tournaments[existingIdx].updated_at = nowStr;
    } else {
      db.tournaments.push({
        id,
        name,
        status,
        admin_key,
        state_json: JSON.stringify({ id, name, status, players: [], bracket: null }),
        created_at: nowStr,
        updated_at: nowStr
      });
    }
    writeJsonDb(db);
    return { rows: [] };
  }

  // 6. DELETE FROM participants WHERE tournament_id = $1
  if (text.includes('DELETE FROM participants WHERE tournament_id =')) {
    db.participants = db.participants.filter(pt => pt.tournament_id !== p[0]);
    writeJsonDb(db);
    return { rows: [] };
  }

  // DELETE FROM history_logs WHERE tournament_id = $1
  if (text.includes('DELETE FROM history_logs WHERE tournament_id =')) {
    db.history_logs = db.history_logs.filter(h => h.tournament_id !== p[0]);
    writeJsonDb(db);
    return { rows: [] };
  }

  // 7. INSERT INTO participants
  if (text.includes('INSERT INTO participants')) {
    db.participants.push({
      id: p[0],
      tournament_id: p[1],
      name: p[2],
      companyId: p[3], // map companyId to matches
      seed: p[4]
    });
    writeJsonDb(db);
    return { rows: [] };
  }

  // 8. DELETE FROM matches WHERE tournament_id = $1
  if (text.includes('DELETE FROM matches WHERE tournament_id =')) {
    db.matches = db.matches.filter(m => m.tournament_id !== p[0]);
    writeJsonDb(db);
    return { rows: [] };
  }

  // 9. INSERT INTO matches
  if (text.includes('INSERT INTO matches')) {
    db.matches.push({
      id: p[0],
      tournament_id: p[1],
      round: p[2],
      match_index: p[3], // map match_index/index
      p1_id: p[4],
      p2_id: p[5],
      score1: p[6],
      score2: p[7],
      winner_id: p[8],
      is_locked: p[9],
      p1_source_match_id: p[10],
      p2_source_match_id: p[11],
      dest_match_id: p[12],
      dest_param: p[13],
      side: p[14],
      is_third_place: p[15]
    });
    writeJsonDb(db);
    return { rows: [] };
  }

  // 10. INSERT INTO history_logs
  if (text.includes('INSERT INTO history_logs')) {
    db.history_logs.push({
      id: db.history_logs.length + 1,
      tournament_id: p[0],
      action_type: p[1],
      details: p[2],
      state_snapshot: p[3], // stateSnapshot JSON object
      created_at: new Date().toISOString()
    });
    writeJsonDb(db);
    return { rows: [] };
  }

  console.warn('Unhandled SQL query in JSON fallback database wrapper:', text);
  return { rows: [] };
};

export default {
  query: async (text, params) => {
    if (useJsonDb) {
      return executeJsonQuery(text, params);
    }
    try {
      return await pgPool.query(text, params);
    } catch (err) {
      console.error('PostgreSQL query failed. Falling back to local JSON database.', err);
      useJsonDb = true;
      return executeJsonQuery(text, params);
    }
  },
  pool: pgPool
};
