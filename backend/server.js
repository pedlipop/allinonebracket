import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { connectDB, Tournament, Participant, Match, HistoryLog } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB before starting the server
await connectDB();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Add CORS headers for local development if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Admin credentials (can be overridden via env vars)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'pinxuan';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pinxuan666';
const validTokens = new Set();

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomBytes(8).toString('hex');
    validTokens.add(token);
    return res.json({ success: true, token });
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

// Verify session token
app.get('/api/verify-session', (req, res) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  res.json({ valid: validTokens.has(token) });
});

const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

const PORT = process.env.PORT || 3000;

// Track active WebSocket clients grouped by tournament ID
const clients = new Map();

wss.on('connection', (ws, req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const tournamentId = url.searchParams.get('tournamentId');
  const isAdmin = url.searchParams.get('admin') === 'true';

  if (!tournamentId) {
    ws.close(4000, "Missing tournamentId");
    return;
  }

  ws.isAdmin = isAdmin;

  if (!clients.has(tournamentId)) {
    clients.set(tournamentId, new Set());
  }
  clients.get(tournamentId).add(ws);

  ws.on('close', () => {
    const list = clients.get(tournamentId);
    if (list) {
      list.delete(ws);
      if (list.size === 0) clients.delete(tournamentId);
    }
  });

  // Handle incoming WebSocket updates for zero-delay synchronization
  ws.on('message', async (message) => {
    try {
      const msg = JSON.parse(message);
      if (msg.type === 'STATE_UPDATE') {
        const { tournamentId: tId, data } = msg;

        // Security check: Only allow updates if user is admin, OR if it is a participant registration during Draft phase
        let isDraft = true;
        try {
          const currentTour = await Tournament.findById(tId).select('status').lean();
          isDraft = !currentTour || currentTour.status === 'Draft';
        } catch (dbErr) {
          console.warn('DB query for tournament status failed, assuming draft:', dbErr);
        }

        const isRegistration = data.action === 'Participant Added';

        if (!ws.isAdmin && (!isDraft || !isRegistration)) {
          console.warn(`Unauthorized state update attempt on tournament ${tId} (Action: ${data.action})`);
          return;
        }

        // 1. Broadcast update to other viewers immediately (excluding sender ws)
        broadcastToTournament(tId, {
          type: 'TOURNAMENT_UPDATE',
          tournamentId: tId,
          data: {
            participants: data.participants,
            matches: data.matches,
            status: data.status
          }
        }, ws);

        // 2. Save in background
        saveStateToDb(tId, data).catch(err => {
          console.error(`[BG SAVE ERROR] Tournament ${tId}:`, err);
        });
      } else if (msg.type === 'TOURNAMENT_STATE_SYNC') {
        const { tournamentId: tId, data } = msg;
        await Tournament.findByIdAndUpdate(tId, { stateJson: JSON.stringify(data) });
        broadcastToTournament(tId, {
          type: 'TOURNAMENT_STATE_SYNC',
          tournamentId: tId,
          data
        }, ws);
      }
    } catch (err) {
      console.error('Error processing WebSocket message:', err);
    }
  });

  ws.on('error', console.error);
});

// Upgrade HTTP to WS
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Helper: Broadcast to all clients viewing a tournament
const broadcastToTournament = (tournamentId, message, senderWs = null) => {
  const list = clients.get(tournamentId);
  if (!list) return;
  const dataString = JSON.stringify(message);
  list.forEach(client => {
    if (client !== senderWs && client.readyState === WebSocket.OPEN) {
      client.send(dataString);
    }
  });
};

// Database background save helper
const saveStateToDb = async (id, data) => {
  const { name, participants, matches, status, action, details, stateSnapshot } = data;
  console.log('Saving tournament state', { id, action });

  // Upsert tournament
  await Tournament.findByIdAndUpdate(
    id,
    { name: name || 'Tournament', status, updatedAt: new Date() },
    { upsert: true, new: true }
  );

  // Replace participants
  await Participant.deleteMany({ tournamentId: id });
  if (participants && participants.length > 0) {
    await Participant.insertMany(participants.map(p => ({
      _id: p.id,
      tournamentId: id,
      name: p.name,
      companyId: p.companyId || p.company_id,
      seed: p.seed
    })));
  }

  // Replace matches
  await Match.deleteMany({ tournamentId: id });
  if (matches && matches.length > 0) {
    await Match.insertMany(matches.map(m => ({
      _id: m.id,
      tournamentId: id,
      round: m.round,
      matchIndex: m.index,
      p1Id: m.p1?.id || null,
      p2Id: m.p2?.id || null,
      score1: m.score1,
      score2: m.score2,
      winnerId: m.winner?.id || null,
      isLocked: m.isLocked || m.is_locked || false,
      p1SourceMatchId: m.p1SourceMatchId || m.p1_source_match_id || null,
      p2SourceMatchId: m.p2SourceMatchId || m.p2_source_match_id || null,
      destMatchId: m.destMatchId || m.dest_match_id || null,
      destParam: m.destParam || m.dest_param || null,
      side: m.side || null,
      isThirdPlace: m.isThirdPlace || m.is_third_place || false
    })));
  }

  // History log
  if (action) {
    if (action === 'Reset Tournament') {
      console.log('Reset Tournament action received: deleting history logs for tournament', id);
      await HistoryLog.deleteMany({ tournamentId: id });
    } else {
      console.log('Inserting history log for action', action);
      await HistoryLog.create({
        tournamentId: id,
        actionType: action,
        details,
        stateSnapshot
      });
    }
  }
};

// REST API endpoints

// Get all tournaments
app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await Tournament.find().lean().sort({ createdAt: -1 });
    const list = await Promise.all(tournaments.map(async t => {
      const playerCount = await Participant.countDocuments({ tournamentId: t._id });
      return {
        id: t._id,
        name: t.name || 'Tournament',
        status: t.status || 'Draft',
        createdAt: t.createdAt ? new Date(t.createdAt).getTime() : Date.now(),
        playerCount,
        adminKey: t.adminKey || null
      };
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate QR Code image (Data URL)
app.get('/api/qrcode', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ error: 'Text query parameter is required' });
  }
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 250,
      margin: 1
    });
    res.json({ dataUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify admin key for a tournament
app.get('/api/tournament/:id/verify-admin', async (req, res) => {
  const { id } = req.params;
  const { adminKey } = req.query;
  if (!adminKey) {
    return res.json({ valid: false });
  }
  try {
    const tour = await Tournament.findById(id).select('adminKey').lean();
    if (!tour) {
      return res.json({ valid: false });
    }
    res.json({ valid: tour.adminKey === adminKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lookup tournament by admin key (for routing)
app.get('/api/tournament-by-admin-key', async (req, res) => {
  const { adminKey } = req.query;
  if (!adminKey) {
    return res.status(400).json({ error: 'Missing adminKey' });
  }
  try {
    const tour = await Tournament.findOne({ adminKey }).select('_id adminKey').lean();
    if (!tour) {
      return res.status(404).json({ error: 'Invalid admin key' });
    }
    res.json({ id: tour._id, adminKey: tour.adminKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new tournament
app.post('/api/tournament', async (req, res) => {
  const { id, name, status } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing tournament ID' });
  }
  try {
    const adminKey = crypto.randomUUID().replace(/-/g, '') + crypto.randomBytes(8).toString('hex');
    await Tournament.create({
      _id: id,
      name: name || 'New Tournament',
      status: status || 'Draft',
      adminKey
    });
    res.json({ success: true, tournament: { id, name, status, adminKey } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a tournament
app.delete('/api/tournament/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Participant.deleteMany({ tournamentId: id });
    await Match.deleteMany({ tournamentId: id });
    await HistoryLog.deleteMany({ tournamentId: id });
    await Tournament.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get raw state JSON of a tournament
app.get('/api/tournament/:id/state', async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tournament.findById(id).select('stateJson').lean();
    if (!tour) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const stateObj = tour.stateJson ? JSON.parse(tour.stateJson) : null;
    res.json(stateObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save full state of a tournament (overwrite)
app.post('/api/tournament/:id/state', async (req, res) => {
  const { id } = req.params;
  const stateObj = req.body;
  try {
    const stateJson = JSON.stringify(stateObj);
    await Tournament.findByIdAndUpdate(id, { stateJson });

    // Broadcast update to other WS clients
    broadcastToTournament(id, {
      type: 'TOURNAMENT_STATE_SYNC',
      tournamentId: id,
      data: stateObj
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a tournament with participants, matches, and history
app.get('/api/tournament/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tournament.findById(id).lean();
    if (!tour) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const participants = await Participant.find({ tournamentId: id }).sort({ seed: 1 }).lean();
    const matches = await Match.find({ tournamentId: id }).sort({ round: 1, matchIndex: 1 }).lean();
    const history = await HistoryLog.find({ tournamentId: id }).sort({ createdAt: 1 }).lean();

    // Format to camelCase for frontend
    const formattedParticipants = participants.map(p => ({
      id: p._id,
      name: p.name,
      companyId: p.companyId,
      seed: p.seed
    }));

    const formattedMatches = matches.map(m => {
      const p1 = formattedParticipants.find(p => p.id === m.p1Id) || null;
      const p2 = formattedParticipants.find(p => p.id === m.p2Id) || null;
      const winner = formattedParticipants.find(p => p.id === m.winnerId) || null;
      return {
        id: m._id,
        round: m.round,
        index: m.matchIndex,
        p1,
        p2,
        score1: m.score1 !== null && m.score1 !== undefined ? parseFloat(m.score1) : null,
        score2: m.score2 !== null && m.score2 !== undefined ? parseFloat(m.score2) : null,
        winner,
        isLocked: m.isLocked,
        p1SourceMatchId: m.p1SourceMatchId,
        p2SourceMatchId: m.p2SourceMatchId,
        destMatchId: m.destMatchId,
        destParam: m.destParam,
        side: m.side,
        isThirdPlace: m.isThirdPlace
      };
    });

    const formattedHistory = history.map(h => ({
      timestamp: new Date(h.createdAt).getTime(),
      user: "Admin",
      action: h.actionType,
      details: h.details,
      stateSnapshot: h.stateSnapshot
    }));

    res.json({
      tournament: {
        id: tour._id,
        name: tour.name,
        status: tour.status,
        adminKey: tour.adminKey,
        createdAt: tour.createdAt,
        updatedAt: tour.updatedAt,
        stateJson: tour.stateJson
      },
      participants: formattedParticipants,
      matches: formattedMatches,
      history: formattedHistory
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update/Save tournament state (REST fallback)
app.post('/api/tournament/:id/save', async (req, res) => {
  const { id } = req.params;
  try {
    const isAdmin = req.query.admin === 'true' || req.body.admin === 'true';

    let isDraft = true;
    try {
      const currentTour = await Tournament.findById(id).select('status').lean();
      isDraft = !currentTour || currentTour.status === 'Draft';
    } catch (dbErr) {
      console.warn('DB query for tournament status failed, assuming draft:', dbErr);
    }

    const isRegistration = req.body.action === 'Participant Added';

    if (!isAdmin && (!isDraft || !isRegistration)) {
      return res.status(403).json({ error: "Unauthorized state modification attempt" });
    }

    await saveStateToDb(id, req.body);

    // Notify connected viewer clients about update
    broadcastToTournament(id, {
      type: 'TOURNAMENT_UPDATE',
      tournamentId: id,
      data: {
        participants: req.body.participants,
        matches: req.body.matches,
        status: req.body.status
      }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Self-registration endpoint — called by QR code registration page
// No admin token needed; only works when tournament is in registration status.
app.post('/api/tournament/:id/register', async (req, res) => {
  const { id } = req.params;
  const { name, companyId } = req.body;

  if (!name || !companyId) {
    return res.status(400).json({ error: 'Name and Company ID are required.' });
  }

  try {
    const tour = await Tournament.findById(id).select('stateJson').lean();
    if (!tour) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    if (!tour.stateJson) {
      return res.status(500).json({ error: "Tournament state is empty" });
    }
    const stateObj = JSON.parse(tour.stateJson);

    if (stateObj.status !== 'registration') {
      return res.status(403).json({ error: 'Registration is closed.' });
    }

    // Check unique Company ID
    if (stateObj.players.some(p => p.companyId.toLowerCase() === companyId.toLowerCase())) {
      return res.status(409).json({ error: `Company ID "${companyId}" is already registered.` });
    }

    // Add player
    stateObj.players.push({
      name: name.trim(),
      companyId: companyId.trim(),
      status: 'active'
    });

    // Save state back
    const stateJson = JSON.stringify(stateObj);
    await Tournament.findByIdAndUpdate(id, { stateJson });

    // Broadcast update to other WS clients
    broadcastToTournament(id, {
      type: 'TOURNAMENT_STATE_SYNC',
      tournamentId: id,
      data: stateObj
    });

    res.json({ success: true, participant: { name, companyId } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
