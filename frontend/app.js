/**
 * Apex Bracket - Tournament Engine v2.0
 * Multi-Tournament | Double Elimination | Fixed Connectors | Full Feature Set
 */

const STORAGE_KEY = 'apex_bracket_v2';

let appData = {
  currentId: null,
  tournaments: {}
};

let state = null;           // Currently active tournament
let undoStack = [];
let redoStack = [];
let timerInterval = null;
let activeSelectedMatch = null; // { bracket: 'w'|'l'|'gf', roundIndex, matchIndex }
let editTargetPlayerIndex = null;
let bracketViewMode = 'double';     // 'single' or 'double'
let bracketSingleActive = 'winners'; // 'winners' or 'losers'

// Zoom / Pan state (shared across brackets within a view)
let zoomScale = 0.75;
let panX = 40;
let panY = 50;
let isDragging = false;
let startDragX = 0, startDragY = 0;

// WebSocket connection
let socket = null;

// ==========================================================================
// CONSTANTS
// ==========================================================================
const RANDOM_NAMES = [
  "Alexander Wright", "Sophia Martinez", "Liam Henderson", "Olivia Jenkins",
  "Noah Fletcher", "Ava Patel", "Oliver Vance", "Isabella Drake",
  "Lucas Sterling", "Mia Thorne", "Mason Caldwell", "Charlotte Vance",
  "Ethan Blackwell", "Amelia Mercer", "Elijah Cross", "Harper Sterling",
  "Jameson Stark", "Evelyn Creed", "Benjamin Hayes", "Abigail Frost",
  "Logan Creed", "Emily Thorne", "Daniel Pierce", "Elizabeth Brooks"
];

// ==========================================================================
// INITIALIZATION & ROUTING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupSync();
  routeApp();
});

function connectWebSocket(tid) {
  if (socket) {
    try { socket.close(); } catch(e) {}
  }
  
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  let host = window.location.host;
  // If running locally, point to port 3000 for the backend server
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    host = `${window.location.hostname}:3000`;
  }
  
  const wsUrl = `${protocol}//${host}?tournamentId=${tid}&admin=true`;
  try {
    socket = new WebSocket(wsUrl);
  } catch (err) {
    console.warn('Failed to construct WebSocket connection:', err);
    return;
  }
  
  socket.onerror = (err) => {
    console.warn('WebSocket connection error (expected if serverless/Vercel handles requests):', err);
  };
  
  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'TOURNAMENT_STATE_SYNC' && message.tournamentId === tid) {
        console.log('WS Sync: state updated from other client');
        state = message.data;
        
        // Refresh UI
        const params = new URLSearchParams(window.location.search);
        if (params.has('view') && params.get('view') === 'live') {
          renderLiveView();
        } else if (params.has('register')) {
          renderRegistrationView();
        } else {
          renderHostView();
        }
      }
    } catch (err) {
      console.error('Failed to parse WS state sync:', err);
    }
  };

  socket.onclose = () => {
    console.log('WS closed. Reconnecting in 3s...');
    setTimeout(() => connectWebSocket(tid), 3000);
  };
}

function sendWSStateUpdate(stateObj) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'TOURNAMENT_STATE_SYNC',
      tournamentId: stateObj.id,
      data: stateObj
    }));
  }
}

async function loadAppData() {
  try {
    const res = await fetch('/api/tournaments');
    if (res.ok) {
      const list = await res.json();
      appData.tournaments = {};
      list.forEach(t => {
        appData.tournaments[t.id] = t;
      });
    }
  } catch (err) {
    console.warn('Failed to load tournaments list from server:', err);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) appData = JSON.parse(saved);
  }
}

async function persistAppData() {
  if (state && appData.currentId) {
    appData.tournaments[appData.currentId] = state;
    
    // Broadcast via WS
    sendWSStateUpdate(state);

    // Save to server
    try {
      await fetch(`/api/tournament/${state.id}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
    } catch (err) {
      console.error('Failed to save state to server:', err);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  window.dispatchEvent(new Event('storage'));
}

async function fetchTournamentState(tid) {
  try {
    const res = await fetch(`/api/tournament/${tid}/state`);
    if (res.ok) {
      state = await res.json();
      if (state) {
        appData.tournaments[tid] = state;
        appData.currentId = tid;
      }
    }
  } catch (err) {
    console.error('Failed to fetch tournament state from server:', err);
  }
}

// Check if admin is logged in
function isAdminLoggedIn() {
  return !!sessionStorage.getItem('adminToken');
}

function showLoginView(redirectAfterLogin) {
  switchView('login-view');

  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  // Remove old listener by cloning
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('adminToken', data.token);
        errEl.classList.add('hidden');
        // Continue routing after login
        if (redirectAfterLogin) {
          redirectAfterLogin();
        } else {
          routeApp();
        }
      } else {
        errEl.textContent = data.error || 'Invalid credentials';
        errEl.classList.remove('hidden');
      }
    } catch (err) {
      errEl.textContent = 'Connection error. Please try again.';
      errEl.classList.remove('hidden');
    }
  });
}

async function routeApp() {
  const params = new URLSearchParams(window.location.search);

  if (params.has('view') && params.get('view') === 'live') {
    // PUBLIC: Live view — no login needed
    const tid = params.get('tid') || appData.currentId;
    if (tid) {
      await fetchTournamentState(tid);
      connectWebSocket(tid);
    }
    switchView('player-live-view');
    renderLiveView();
    setupZoomPan('live-bracket-canvas-container', 'live-bracket-canvas');
  } else if (params.has('register')) {
    // PUBLIC: Registration view — no login needed
    const tid = params.get('tid') || appData.currentId;
    if (tid) {
      await fetchTournamentState(tid);
      connectWebSocket(tid);
    }
    switchView('player-registration-view');
    initRegistrationView();
    renderRegistrationView();
  } else if (!isAdminLoggedIn()) {
    // NOT LOGGED IN — show login page for any admin route
    showLoginView();
  } else if (params.has('tournamentId')) {
    // ADMIN (logged in): Open a tournament by ID
    const tid = params.get('tournamentId');
    if (tid) {
      appData.currentId = tid;
      await fetchTournamentState(tid);
      connectWebSocket(tid);
      switchView('host-view');
      renderHostView();
      setupZoomPan('bracket-canvas-container', 'bracket-canvas');
    } else {
      switchView('tournament-hub-view');
      await loadAppData();
      renderTournamentHub();
    }
  } else {
    // ADMIN (logged in): Show tournament hub
    switchView('tournament-hub-view');
    await loadAppData();
    renderTournamentHub();
  }
}


// ==========================================================================
// STATE MANAGEMENT & UNDO/REDO
// ==========================================================================
function saveState(pushToUndo = true) {
  if (pushToUndo && state) {
    undoStack.push(JSON.stringify(state));
    redoStack = [];
    updateUndoRedoButtons();
  }
  persistAppData();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(JSON.stringify(state));
  state = JSON.parse(undoStack.pop());
  updateUndoRedoButtons();
  saveState(false);
  renderHostView();
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(JSON.stringify(state));
  state = JSON.parse(redoStack.pop());
  updateUndoRedoButtons();
  saveState(false);
  renderHostView();
}

function updateUndoRedoButtons() {
  const u = document.getElementById('btn-undo');
  const r = document.getElementById('btn-redo');
  if (u) u.disabled = !undoStack.length;
  if (r) r.disabled = !redoStack.length;
}

// ==========================================================================
// NAVIGATION
// ==========================================================================
function switchView(viewId) {
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(viewId);
  if (el) el.classList.add('active');
}

// ==========================================================================
// TOURNAMENT HUB
// ==========================================================================
function renderTournamentHub() {
  const list = document.getElementById('tournament-list');
  if (!list) return;

  const ts = Object.values(appData.tournaments).sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at) : new Date(a.createdAt || 0);
    const dateB = b.created_at ? new Date(b.created_at) : new Date(b.createdAt || 0);
    return dateB - dateA;
  });

  if (!ts.length) {
    list.innerHTML = '<div class="empty-list-placeholder">No tournaments yet. Click "Create New Tournament" to begin!</div>';
    return;
  }

  list.innerHTML = '';
  ts.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tournament-card glass-panel';
    const playerCount = t.player_count !== undefined ? t.player_count : (t.players || []).length;
    const statusMap = {
      setup: 'Setup', registration: 'Registration Open',
      running: 'In Progress', paused: 'Paused', completed: 'Completed'
    };
    const typeLabel = t.bracketType === 'double' ? 'Double Elim' : 'Single Elim';
    const sizeLabel = (!t.bracketSizeConfig || t.bracketSizeConfig === 'auto') ? 'Auto Size' : `${t.bracketSizeConfig} Players`;
    
    const dateVal = t.created_at || t.createdAt;
    const dateStr = dateVal ? new Date(dateVal).toLocaleDateString() : 'Unknown';
    const statusStr = statusMap[t.status] || 'Setup';
    const statusCls = t.status || 'setup';

    card.innerHTML = `
      <div class="tc-main">
        <div class="tc-icon"><i class="fa-solid fa-trophy"></i></div>
        <div class="tc-info">
          <h3 class="tc-name">${escapeHTML(t.name)}</h3>
          <div class="tc-meta">
            <span><i class="fa-solid fa-users"></i> ${playerCount}</span>
            <span><i class="fa-solid fa-diagram-project"></i> ${typeLabel}</span>
            <span><i class="fa-solid fa-expand"></i> ${sizeLabel}</span>
            <span><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
          </div>
        </div>
        <span class="status-badge ${statusCls}"><span class="status-dot"></span>${statusStr}</span>
      </div>
      <div class="tc-actions">
        <button class="btn-primary btn-sm" onclick="openTournament('${t.id}')"><i class="fa-solid fa-arrow-right"></i> Open</button>
        <button class="btn-danger btn-sm" onclick="deleteTournamentCard('${t.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    list.appendChild(card);
  });
}

function openTournament(id) {
  window.location.search = `?tournamentId=${id}`;
}

let deleteTournamentTargetId = null;

function deleteTournamentCard(id) {
  const t = appData.tournaments[id];
  if (!t) return;
  
  deleteTournamentTargetId = id;
  const textEl = document.getElementById('confirm-delete-tournament-text');
  if (textEl) textEl.textContent = `Are you sure you want to delete "${t.name}"? This cannot be undone.`;
  
  document.getElementById('confirm-delete-tournament-modal').classList.remove('hidden');
}

// ==========================================================================
// HOST DASHBOARD VIEW
// ==========================================================================
function renderHostView() {
  if (!state) { switchView('tournament-hub-view'); renderTournamentHub(); return; }

  updateStatusBadge();
  renderSidebarPlayers();
  renderProgressPanel();
  renderMainTabs();

  const nameEl = document.getElementById('host-tournament-name');
  if (nameEl) nameEl.innerHTML = `${escapeHTML(state.name)}<span></span>`;

  const isActive = state.status === 'running' || state.status === 'paused';
  const isRegistration = state.status === 'registration';

  document.getElementById('qr-panel').classList.toggle('hidden', !isRegistration);
  document.getElementById('setup-panel').classList.toggle('hidden', isActive || isRegistration);
  document.getElementById('btn-pause').classList.toggle('hidden', !isActive);
  document.getElementById('btn-reset-tournament').classList.toggle('hidden', !isActive);

  // If page was loaded during registration phase, restore QR Panel values and start countdown
  if (isRegistration) {
    const tid = state.id;
    const loc = window.location;
    const regUrl = `${loc.origin}${loc.pathname}?register=true&tid=${encodeURIComponent(tid)}`;
    
    const regInput = document.getElementById('registration-url-input');
    if (regInput) regInput.value = regUrl;

    const compNameEl = document.getElementById('qr-competition-name');
    if (compNameEl) compNameEl.textContent = state.name;

    const qrImg = document.getElementById('qr-image');
    if (qrImg && !qrImg.src) {
      generateQRCode(regUrl).then(url => {
        qrImg.src = url;
      });
    }

    if (state.registrationTimer && state.registrationTimer.isActive) {
      const remaining = Math.max(0, Math.ceil((state.registrationTimer.endTime - Date.now()) / 1000));
      if (remaining <= 0) {
        state.registrationTimer.isActive = false;
        state.status = 'setup';
        setTimeout(() => {
          saveState();
          renderHostView();
        }, 0);
        return;
      }
      state.registrationTimer.remaining = remaining;
      if (!timerInterval) {
        startRegistrationTimer();
      }
    } else {
      const cd = document.getElementById('registration-countdown');
      if (cd) cd.textContent = '∞';
    }
  }

  // Start: allow with >= 2 players
  const canStart = (state.status === 'setup' || state.status === 'registration') && (state.players || []).length >= 2;
  document.getElementById('btn-start').classList.toggle('hidden', !canStart);

  if (isActive) {
    const btnPause = document.getElementById('btn-pause');
    if (state.status === 'paused') {
      btnPause.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
      btnPause.className = 'btn-glow btn-pause-toggle';
    } else {
      btnPause.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
      btnPause.className = 'btn-secondary btn-pause-toggle';
    }
  }

  // Sync setup panel dropdowns to state
  if (!isActive) {
    const bsEl = document.getElementById('bracket-size');
    if (bsEl) bsEl.value = state.bracketSizeConfig || 'auto';
    const btEl = document.getElementById('bracket-type');
    if (btEl) btEl.value = state.bracketType || 'single';
  }

  // Active tab
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) {
    const tid = activeBtn.dataset.tab;
    if (tid === 'tab-bracket') renderBracketView('host');
    else if (tid === 'tab-participants-list') renderParticipantsTable();
    else if (tid === 'tab-share-export') renderShareExportTab();
  }
}

function updateStatusBadge() {
  const badge = document.getElementById('tournament-status-badge');
  if (!badge || !state) return;
  const cfg = {
    setup:        { c: 'var(--warning)',        l: 'Setup Phase' },
    registration: { c: 'var(--accent-cyan)',    l: 'Registration Open' },
    running:      { c: 'var(--success)',        l: 'In Progress' },
    paused:       { c: 'var(--warning)',        l: 'Paused' },
    completed:    { c: '#9c27b0',              l: 'Completed' }
  }[state.status] || { c: 'var(--warning)', l: 'Setup Phase' };
  badge.innerHTML = `<span class="status-dot" style="background:${cfg.c};box-shadow:0 0 8px ${cfg.c}"></span>${cfg.l}`;
}

// ==========================================================================
// SIDEBAR PLAYERS
// ==========================================================================
function renderSidebarPlayers() {
  const listEl = document.getElementById('sidebar-players-list');
  const countBadge = document.getElementById('player-count-badge');
  if (!listEl || !state) return;

  const actualSize = computeActualBracketSize();
  const isAuto = !state.bracketSizeConfig || state.bracketSizeConfig === 'auto';
  if (countBadge) countBadge.textContent = isAuto ? `${state.players.length}` : `${state.players.length}/${actualSize}`;

  const searchVal = (document.getElementById('player-search')?.value || '').toLowerCase();
  const filtered = state.players.filter(p =>
    p.name.toLowerCase().includes(searchVal) || p.companyId.toLowerCase().includes(searchVal)
  );

  listEl.innerHTML = '';
  if (!filtered.length) {
    listEl.innerHTML = `<div class="empty-list-placeholder">${searchVal ? 'No matches.' : 'No participants yet.'}</div>`;
    return;
  }

  filtered.forEach(p => {
    const origIdx = state.players.indexOf(p);
    const row = document.createElement('div');
    row.className = 'player-item-row';
    
    let seedingControls = '';
    if (state.status === 'setup') {
      row.dataset.index = origIdx;
      seedingControls = `
        <div class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></div>
        <div class="seeding-controls" style="display:flex;flex-direction:column;gap:2px;margin-right:8px">
          <button class="btn-seeding" onclick="movePlayerSeeding(${origIdx}, -1)" ${origIdx === 0 ? 'disabled' : ''} title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>
          <button class="btn-seeding" onclick="movePlayerSeeding(${origIdx}, 1)" ${origIdx === state.players.length - 1 ? 'disabled' : ''} title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
      `;
    }

    row.innerHTML = `
      ${seedingControls}
      <div class="player-item-info btn-clickable" onclick="trackPlayerInBracket(${origIdx})" title="Click to track in bracket" style="cursor:pointer">
        <span class="player-item-name">${escapeHTML(p.name)}</span>
        <span class="player-item-id">ID: ${escapeHTML(p.companyId)}</span>
      </div>
      <div class="player-item-actions">
        <button class="btn-icon-item" onclick="openEditPlayerModal(${origIdx})" title="Edit"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon-item delete" onclick="deletePlayer(${origIdx})" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    listEl.appendChild(row);
  });
}

// ==========================================================================
// PROGRESS PANEL
// ==========================================================================
function renderProgressPanel() {
  if (!state) return;
  const els = {
    total: document.getElementById('stat-total-matches'),
    done: document.getElementById('stat-completed-matches'),
    pct: document.getElementById('stat-percentage'),
    round: document.getElementById('stat-current-round'),
    fill: document.getElementById('progress-bar-fill')
  };

  if (!state.bracket) {
    if (els.total) els.total.textContent = '0';
    if (els.done) els.done.textContent = '0';
    if (els.pct) els.pct.textContent = '0%';
    if (els.round) els.round.textContent = 'Setup';
    if (els.fill) els.fill.style.width = '0%';
    return;
  }

  let total = 0, completed = 0, currentRound = 1;
  const allRounds = state.bracket.type === 'double'
    ? [...(state.bracket.winnersRounds || []), ...(state.bracket.losersRounds || [])]
    : (state.bracket.rounds || []);

  allRounds.forEach((round, rIdx) => {
    let roundHasActive = false;
    round.forEach(m => { total++; if (m.status === 'completed') completed++; else roundHasActive = true; });
    if (roundHasActive && currentRound === 1) currentRound = rIdx + 1;
  });

  if (state.bracket.type === 'double' && state.bracket.grandFinal) {
    total++;
    if (state.bracket.grandFinal.status === 'completed') completed++;
  }

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  if (els.total) els.total.textContent = total;
  if (els.done) els.done.textContent = completed;
  if (els.pct) els.pct.textContent = `${pct}%`;
  if (els.round) els.round.textContent = `Round ${currentRound}`;
  if (els.fill) els.fill.style.width = `${pct}%`;
}

function renderMainTabs() {
  const byeBox = document.getElementById('bye-filler-box');
  if (byeBox && state) {
    const show = state.status === 'running' && hasEmptyByeSlots();
    byeBox.classList.toggle('hidden', !show);
  }
}

// ==========================================================================
// BRACKET SIZE HELPERS
// ==========================================================================
function computeActualBracketSize() {
  if (!state) return 8;
  const cfg = state.bracketSizeConfig;
  if (!cfg || cfg === 'auto') {
    const n = Math.max(2, (state.players || []).length);
    let size = 2;
    while (size < n) size *= 2;
    return size;
  }
  return parseInt(cfg) || 8;
}

function hasEmptyByeSlots() {
  if (!state || !state.players) return false;
  return state.players.some(p => p.status === 'bye');
}

// ==========================================================================
// BRACKET GENERATION
// ==========================================================================
function generateBracket() {
  saveState();

  const size = computeActualBracketSize();
  state.bracketSize = size;

  // Pad with BYEs up to bracket size
  const seeded = [...state.players];
  while (seeded.length < size) {
    seeded.push({ name: 'BYE', companyId: 'BYE', status: 'bye' });
  }

  if (state.bracketType === 'double' && size >= 4) {
    state.bracket = buildDoubleBracket(size, seeded);
    propagateDoubleElim();
  } else {
    state.bracket = buildSingleBracket(size, seeded);
    propagateSingleAll();
  }

  state.status = 'running';
  saveState(false);
  renderHostView();
}

function buildSingleBracket(size, seeded) {
  const numRounds = Math.log2(size);
  const rounds = [];

  // Round 0
  const r0 = [];
  for (let i = 0; i < size / 2; i++) {
    const p1i = i * 2, p2i = i * 2 + 1;
    let winner = null, status = 'pending';
    const p1B = seeded[p1i]?.status === 'bye';
    const p2B = seeded[p2i]?.status === 'bye';
    if (p1B && p2B) { winner = p1i; status = 'completed'; }
    else if (p1B)   { winner = p2i; status = 'completed'; }
    else if (p2B)   { winner = p1i; status = 'completed'; }
    r0.push({ id: `0-${i}`, players: [p1i, p2i], scores: [0,0], winner, status });
  }
  rounds.push(r0);

  // Subsequent rounds
  for (let r = 1; r < numRounds; r++) {
    const n = size / Math.pow(2, r + 1);
    const round = [];
    for (let m = 0; m < n; m++) {
      round.push({ id: `${r}-${m}`, players: [-1,-1], scores: [0,0], winner: null, status: 'pending' });
    }
    rounds.push(round);
  }

  return { type: 'single', size, rounds };
}

function buildDoubleBracket(size, seeded) {
  const numWR = Math.log2(size);

  // --- WINNERS BRACKET ---
  const winnersRounds = [];

  // WR0
  const wr0 = [];
  for (let i = 0; i < size / 2; i++) {
    const p1i = i * 2, p2i = i * 2 + 1;
    let winner = null, status = 'pending';
    const p1B = seeded[p1i]?.status === 'bye';
    const p2B = seeded[p2i]?.status === 'bye';
    if (p1B && p2B) { winner = p1i; status = 'completed'; }
    else if (p1B)   { winner = p2i; status = 'completed'; }
    else if (p2B)   { winner = p1i; status = 'completed'; }
    wr0.push({ id: `w0-${i}`, players: [p1i, p2i], scores: [0,0], winner, status });
  }
  winnersRounds.push(wr0);

  for (let r = 1; r < numWR; r++) {
    const n = size / Math.pow(2, r + 1);
    const round = [];
    for (let m = 0; m < n; m++) {
      round.push({ id: `w${r}-${m}`, players: [-1,-1], scores: [0,0], winner: null, status: 'pending' });
    }
    winnersRounds.push(round);
  }

  // --- LOSERS BRACKET ---
  const losersRounds = [];

  // LR0: WR0 losers pair up → size/4 matches
  const lr0n = Math.max(1, size / 4);
  const lr0 = [];
  for (let m = 0; m < lr0n; m++) {
    lr0.push({ id: `l0-${m}`, players: [-1,-1], scores: [0,0], winner: null, status: 'pending' });
  }
  losersRounds.push(lr0);

  // LR1..last: alternate external (prev LR winners + WR(k) losers) and internal (LR winners pair)
  for (let k = 1; k <= numWR - 1; k++) {
    const n = size / Math.pow(2, k + 1);

    // LR(2k-1): external — prev LR winners (slot 0) + WR(k) losers (slot 1)
    const lrOdd = [];
    for (let m = 0; m < n; m++) {
      lrOdd.push({ id: `l${2*k-1}-${m}`, players: [-1,-1], scores: [0,0], winner: null, status: 'pending' });
    }
    losersRounds.push(lrOdd);

    // LR(2k): internal — only if k < numWR-1
    if (k < numWR - 1) {
      const lrEven = [];
      for (let m = 0; m < Math.max(1, n / 2); m++) {
        lrEven.push({ id: `l${2*k}-${m}`, players: [-1,-1], scores: [0,0], winner: null, status: 'pending' });
      }
      losersRounds.push(lrEven);
    }
  }

  const grandFinal = { id: 'gf', players: [-1,-1], scores: [0,0], winner: null, status: 'pending' };

  return { type: 'double', size, numWR, winnersRounds, losersRounds, grandFinal };
}

// ==========================================================================
// SINGLE ELIMINATION PROPAGATION
// ==========================================================================
function propagateSingleAll() {
  if (!state.bracket || !state.bracket.rounds) return;
  for (let r = 0; r < state.bracket.rounds.length - 1; r++) {
    propagateWinnersRound(r);
  }
}

function propagateWinnersRound(rIdx) {
  if (!state.bracket || !state.bracket.rounds) return;
  const current = state.bracket.rounds[rIdx];
  const next = state.bracket.rounds[rIdx + 1];
  if (!current || !next) return;

  current.forEach((match, mIdx) => {
    const nextMatchIdx = Math.floor(mIdx / 2);
    const slot = mIdx % 2;
    if (match.status === 'completed' && match.winner !== null) {
      next[nextMatchIdx].players[slot] = match.winner;
    } else {
      next[nextMatchIdx].players[slot] = -1;
    }
  });

  // Auto-complete byes in next round
  next.forEach(m => {
    if (m.status === 'completed') return;
    const [p1, p2] = m.players;
    if (p1 === -1 || p2 === -1) return;
    const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
    if (p1B && p2B)    { m.winner = p1; m.status = 'completed'; }
    else if (p1B)      { m.winner = p2; m.status = 'completed'; }
    else if (p2B)      { m.winner = p1; m.status = 'completed'; }
  });

  if (rIdx + 1 < state.bracket.rounds.length - 1) {
    propagateWinnersRound(rIdx + 1);
  }
}

// ==========================================================================
// DOUBLE ELIMINATION PROPAGATION (full re-derive)
// ==========================================================================
function propagateDoubleElim() {
  if (!state.bracket || state.bracket.type !== 'double') return;
  const { winnersRounds, losersRounds, grandFinal } = state.bracket;

  // ---- Step 1: Clear non-manually-completed losers slots ----
  losersRounds.forEach(round => round.forEach(m => {
    m.players = [-1, -1];
    // Preserve manual status/winner decisions
  }));
  grandFinal.players = [-1, -1];
  if (grandFinal.status !== 'completed') { grandFinal.winner = null; grandFinal.status = 'pending'; }

  // ---- Step 2: Propagate within winners bracket ----
  for (let r = 0; r < winnersRounds.length - 1; r++) {
    winnersRounds[r].forEach((match, mIdx) => {
      if (match.status === 'completed' && match.winner !== null) {
        const ni = Math.floor(mIdx / 2), slot = mIdx % 2;
        if (winnersRounds[r + 1][ni]) winnersRounds[r + 1][ni].players[slot] = match.winner;
      }
    });
    // Auto-complete byes
    winnersRounds[r + 1].forEach(m => {
      if (m.status === 'completed') return;
      const [p1, p2] = m.players;
      if (p1 === -1 || p2 === -1) return;
      const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
      if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
      else if (p1B)   { m.winner = p2; m.status = 'completed'; }
      else if (p2B)   { m.winner = p1; m.status = 'completed'; }
    });
  }

  // Winners final winner → GF slot 0
  const wf = winnersRounds[winnersRounds.length - 1]?.[0];
  if (wf?.status === 'completed' && wf.winner !== null) {
    grandFinal.players[0] = wf.winner;
  }

  // ---- Step 3: Send WR0 losers → LR0 ----
  if (losersRounds.length > 0) {
    winnersRounds[0].forEach((m, mIdx) => {
      if (m.status === 'completed' && m.winner !== null) {
        const loser = m.players.find(p => p !== m.winner && p >= 0);
        if (loser !== undefined) {
          const lrMi = Math.floor(mIdx / 2), slot = mIdx % 2;
          if (losersRounds[0][lrMi]) losersRounds[0][lrMi].players[slot] = loser;
        }
      }
    });
  }

  // ---- Step 4: Send WR(k) losers → LR(2k-1) slot 1 ----
  for (let k = 1; k < winnersRounds.length; k++) {
    const lrIdx = 2 * k - 1;
    if (lrIdx < losersRounds.length) {
      winnersRounds[k].forEach((m, mIdx) => {
        if (m.status === 'completed' && m.winner !== null) {
          const loser = m.players.find(p => p !== m.winner && p >= 0);
          if (loser !== undefined && losersRounds[lrIdx][mIdx]) {
            losersRounds[lrIdx][mIdx].players[1] = loser;
          }
        }
      });
    }
  }

  // ---- Step 5: Propagate within losers bracket ----
  for (let lrIdx = 0; lrIdx < losersRounds.length; lrIdx++) {
    const round = losersRounds[lrIdx];

    // Auto-complete byes
    round.forEach(m => {
      if (m.status === 'completed') return;
      const [p1, p2] = m.players;
      if (p1 === -1 || p2 === -1) return;
      const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
      if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
      else if (p1B)   { m.winner = p2; m.status = 'completed'; }
      else if (p2B)   { m.winner = p1; m.status = 'completed'; }
    });

    if (lrIdx === losersRounds.length - 1) {
      // Last LR round → GF slot 1
      if (round[0]?.status === 'completed' && round[0].winner !== null) {
        grandFinal.players[1] = round[0].winner;
      }
    } else {
      const nextLR = losersRounds[lrIdx + 1];
      // isNextInternal: even index >= 2 (e.g. LR2, LR4, ...)
      const isNextInternal = (lrIdx + 1) >= 2 && (lrIdx + 1) % 2 === 0;

      round.forEach((m, mIdx) => {
        if (m.status === 'completed' && m.winner !== null) {
          if (isNextInternal) {
            // Internal: pair matches together
            const ni = Math.floor(mIdx / 2), slot = mIdx % 2;
            if (nextLR[ni]) nextLR[ni].players[slot] = m.winner;
          } else {
            // External: winner → slot 0 (slot 1 comes from WR losers above)
            if (nextLR[mIdx]) nextLR[mIdx].players[0] = m.winner;
          }
        }
      });
    }
  }

  // ---- Step 6: Auto-complete GF byes ----
  if (grandFinal.players[0] !== -1 && grandFinal.players[1] !== -1 && grandFinal.status !== 'completed') {
    const p1B = isByePlayer(grandFinal.players[0]);
    const p2B = isByePlayer(grandFinal.players[1]);
    if (p1B) { grandFinal.winner = grandFinal.players[1]; grandFinal.status = 'completed'; }
    else if (p2B) { grandFinal.winner = grandFinal.players[0]; grandFinal.status = 'completed'; }
  }
}

// ==========================================================================
// PLAYER HELPERS
// ==========================================================================
function isByePlayer(idx) {
  if (idx < 0) return false;
  if (!state || !state.players) return true;
  if (idx >= state.players.length) return true; // padded BYE
  return state.players[idx]?.status === 'bye';
}

function getPlayerInfo(idx) {
  if (idx === -1) return { name: 'TBD', companyId: '-', cls: 'tbd' };
  if (isByePlayer(idx)) return { name: 'BYE', companyId: 'BYE', cls: 'bye' };
  const p = state.players[idx];
  if (p) return { name: p.name, companyId: p.companyId, cls: p.status || 'active' };
  return { name: 'BYE', companyId: 'BYE', cls: 'bye' };
}

// ==========================================================================
// BRACKET VIEW ORCHESTRATOR
// ==========================================================================
function renderBracketView(context) {
  const isLive = context === 'live';
  const wCanvasId   = isLive ? 'live-bracket-canvas'        : 'bracket-canvas';
  const lCanvasId   = isLive ? 'live-losers-bracket-canvas' : 'losers-bracket-canvas';
  const wLabelId    = isLive ? 'live-winners-label'         : 'winners-label';
  const lLabelId    = isLive ? 'live-losers-label'          : 'losers-label';
  const lContId     = isLive ? 'live-losers-bracket-canvas-container' : 'losers-bracket-canvas-container';
  const gfContId    = isLive ? 'live-grand-final-container' : 'grand-final-container';
  const lSectId     = isLive ? null : 'losers-bracket-section';

  const wLabel  = document.getElementById(wLabelId);
  const lLabel  = document.getElementById(lLabelId);
  const lCont   = document.getElementById(lContId);
  const gfCont  = document.getElementById(gfContId);
  const lSect   = lSectId ? document.getElementById(lSectId) : null;

  if (!state || !state.bracket) {
    renderBracketCanvas(wCanvasId, null, 'w', isLive);
    if (wLabel) wLabel.classList.add('hidden');
    if (lLabel) lLabel.classList.add('hidden');
    if (lCont)  lCont.classList.add('hidden');
    if (lSect)  lSect.classList.add('hidden');
    if (gfCont) gfCont.classList.add('hidden');
    return;
  }

  const isDouble = state.bracket.type === 'double';

  // Winners label: only show for double elim
  if (wLabel) wLabel.classList.toggle('hidden', !isDouble);

  if (isDouble) {
    renderBracketCanvas(wCanvasId, state.bracket.winnersRounds, 'w', isLive);

    if (lLabel) lLabel.classList.remove('hidden');
    if (lCont)  lCont.classList.remove('hidden');
    if (lSect)  lSect.classList.remove('hidden');
    renderBracketCanvas(lCanvasId, state.bracket.losersRounds, 'l', isLive);

    if (gfCont) { gfCont.classList.remove('hidden'); renderGrandFinal(gfContId, isLive); }
  } else {
    renderBracketCanvas(wCanvasId, state.bracket.rounds, 'w', isLive);
    if (lLabel) lLabel.classList.add('hidden');
    if (lCont)  lCont.classList.add('hidden');
    if (lSect)  lSect.classList.add('hidden');
    if (gfCont) gfCont.classList.add('hidden');
  }
  updateBracketViewClasses();
}

function updateBracketViewClasses() {
  const isDouble = state && state.bracket && state.bracket.type === 'double';
  
  const hostToggleCont = document.getElementById('bracket-view-toggle-container');
  const hostSubToggleCont = document.getElementById('bracket-sub-toggle-container');
  const liveToggleCont = document.getElementById('live-bracket-view-toggle-container');
  const liveSubToggleCont = document.getElementById('live-bracket-sub-toggle-container');

  if (hostToggleCont) hostToggleCont.classList.toggle('hidden', !isDouble);
  if (hostSubToggleCont) hostSubToggleCont.classList.toggle('hidden', !isDouble || bracketViewMode !== 'single');
  if (liveToggleCont) liveToggleCont.classList.toggle('hidden', !isDouble);
  if (liveSubToggleCont) liveSubToggleCont.classList.toggle('hidden', !isDouble || bracketViewMode !== 'single');

  const updateButtons = (mode, singleActive) => {
    document.getElementById('btn-view-single')?.classList.toggle('active', mode === 'single');
    document.getElementById('btn-view-double')?.classList.toggle('active', mode === 'double');
    document.getElementById('btn-sub-winners')?.classList.toggle('active', singleActive === 'winners');
    document.getElementById('btn-sub-losers')?.classList.toggle('active', singleActive === 'losers');

    document.getElementById('btn-live-view-single')?.classList.toggle('active', mode === 'single');
    document.getElementById('btn-live-view-double')?.classList.toggle('active', mode === 'double');
    document.getElementById('btn-live-sub-winners')?.classList.toggle('active', singleActive === 'winners');
    document.getElementById('btn-live-sub-losers')?.classList.toggle('active', singleActive === 'losers');
  };

  updateButtons(bracketViewMode, bracketSingleActive);

  const hostWinnersSect = document.getElementById('winners-bracket-section');
  const hostLosersSect = document.getElementById('losers-bracket-section');
  const hostGfSect = document.getElementById('grand-final-container');

  const liveWinnersLabel = document.getElementById('live-winners-label');
  const liveWinnersCont = document.getElementById('live-bracket-canvas-container');
  const liveLosersLabel = document.getElementById('live-losers-label');
  const liveLosersCont = document.getElementById('live-losers-bracket-canvas-container');
  const liveGfSect = document.getElementById('live-grand-final-container');

  if (isDouble) {
    if (bracketViewMode === 'double') {
      if (hostWinnersSect) hostWinnersSect.classList.remove('hidden');
      if (hostLosersSect) hostLosersSect.classList.remove('hidden');
      if (hostGfSect) hostGfSect.classList.remove('hidden');

      if (liveWinnersLabel) liveWinnersLabel.classList.remove('hidden');
      if (liveWinnersCont) liveWinnersCont.classList.remove('hidden');
      if (liveLosersLabel) liveLosersLabel.classList.remove('hidden');
      if (liveLosersCont) liveLosersCont.classList.remove('hidden');
      if (liveGfSect) liveGfSect.classList.remove('hidden');
    } else {
      const showWinners = bracketSingleActive === 'winners';
      
      if (hostWinnersSect) hostWinnersSect.classList.toggle('hidden', !showWinners);
      if (hostLosersSect) hostLosersSect.classList.toggle('hidden', showWinners);
      if (hostGfSect) hostGfSect.classList.toggle('hidden', !showWinners);

      if (liveWinnersLabel) liveWinnersLabel.classList.toggle('hidden', !showWinners);
      if (liveWinnersCont) liveWinnersCont.classList.toggle('hidden', !showWinners);
      if (liveLosersLabel) liveLosersLabel.classList.toggle('hidden', showWinners);
      if (liveLosersCont) liveLosersCont.classList.toggle('hidden', showWinners);
      if (liveGfSect) liveGfSect.classList.toggle('hidden', !showWinners);
    }
  }
}


// ==========================================================================
// BRACKET CANVAS RENDERER (single + double rounds)
// ==========================================================================
function renderBracketCanvas(canvasId, rounds, prefix, isLive) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  canvas.innerHTML = '';

  if (!rounds || !rounds.length) {
    canvas.innerHTML = '<div class="empty-list-placeholder" style="margin:auto;padding:2rem;font-size:1.1rem">Set up the tournament and click "Start" to generate the bracket.</div>';
    return;
  }

  // SVG overlay for connector lines (placed first so nodes render on top)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'connector-svg');
  svg.id = `svg-${prefix}-${canvasId}`;
  canvas.appendChild(svg);

  // Render round columns
  rounds.forEach((round, rIdx) => {
    const col = document.createElement('div');
    col.className = 'round-column';

    const header = document.createElement('div');
    header.className = 'round-title-header';
    const isFinal = rIdx === rounds.length - 1;
    if (prefix === 'w') {
      header.textContent = isFinal
        ? (state.bracket.type === 'double' ? 'Winners Final' : 'Final')
        : `Round ${rIdx + 1}`;
    } else {
      header.textContent = isFinal ? 'Losers Final' : `L-Round ${rIdx + 1}`;
    }
    col.appendChild(header);

    round.forEach((match, mIdx) => {
      const p1 = getPlayerInfo(match.players[0]);
      const p2 = getPlayerInfo(match.players[1]);

      const node = document.createElement('div');
      node.className = `match-node ${match.status}`;
      node.id = `mn-${prefix}-${canvasId}-${rIdx}-${mIdx}`;

      let hdrHtml = `Match ${mIdx + 1}`;
      let hdrCls = '';
      if (match.status === 'in-progress') { hdrHtml = '<i class="fa-solid fa-gamepad"></i> Playing'; hdrCls = 'active-tag'; }

      const p1W = match.winner === match.players[0] && match.status === 'completed';
      const p2W = match.winner === match.players[1] && match.status === 'completed';
      const clickable = !isLive && state.status === 'running';
      const clickStr = clickable ? `onclick="handleMatchClick('${prefix}','${canvasId}',${rIdx},${mIdx})"` : '';

      // Bye filler for setup (both brackets)
      const showByeFill = !isLive && state.status === 'running';
      const p1IsBye = (match.players[0] === -2 || (match.players[0] >= (state.players?.length || 0) && match.players[0] >= 0));
      const p2IsBye = (match.players[1] === -2 || (match.players[1] >= (state.players?.length || 0) && match.players[1] >= 0));

      const p1Row = showByeFill && p1IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},0)"><i class="fa-solid fa-user-plus"></i> Fill Slot</button>`
        : `<span class="team-name" title="${escapeHTML(p1.name)}">${escapeHTML(p1.name)}</span><span class="team-score">${p1W ? 'W' : ''}</span>`;

      const p2Row = showByeFill && p2IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},1)"><i class="fa-solid fa-user-plus"></i> Fill Slot</button>`
        : `<span class="team-name" title="${escapeHTML(p2.name)}">${escapeHTML(p2.name)}</span><span class="team-score">${p2W ? 'W' : ''}</span>`;

      node.innerHTML = `
        <div class="match-node-header ${hdrCls}">${hdrHtml}</div>
        <div class="team-row ${p1W ? 'winner' : ''} ${p2W ? 'loser' : ''} ${p1.cls}" ${clickStr}>${p1Row}</div>
        <div class="team-row ${p2W ? 'winner' : ''} ${p1W ? 'loser' : ''} ${p2.cls}" ${clickStr}>${p2Row}</div>
      `;
      col.appendChild(node);
    });

    canvas.appendChild(col);
  });

  // Draw connectors after layout paint
  setTimeout(() => drawConnectors(canvas, `svg-${prefix}-${canvasId}`, rounds, prefix, canvasId), 80);
}

// ==========================================================================
// GRAND FINAL RENDERER
// ==========================================================================
function renderGrandFinal(containerId, isLive) {
  const container = document.getElementById(containerId);
  if (!container || !state?.bracket?.grandFinal) { if (container) container.classList.add('hidden'); return; }

  const gf = state.bracket.grandFinal;
  const p1 = getPlayerInfo(gf.players[0]);
  const p2 = getPlayerInfo(gf.players[1]);
  const p1W = gf.winner === gf.players[0] && gf.status === 'completed';
  const p2W = gf.winner === gf.players[1] && gf.status === 'completed';
  const clickable = !isLive && state.status === 'running';
  const clickStr = clickable ? `onclick="handleMatchClick('gf','gf-canvas',0,0)"` : '';

  container.innerHTML = `
    <div class="bracket-section-label grand-final-label"><i class="fa-solid fa-crown"></i> Grand Final</div>
    <div class="grand-final-wrap">
      <div class="match-node grand-final-node ${gf.status}" id="mn-gf-gf-canvas-0-0" ${clickStr}>
        <div class="match-node-header ${gf.status === 'in-progress' ? 'active-tag' : ''}">
          ${gf.status === 'in-progress' ? '<i class="fa-solid fa-gamepad"></i> Playing' : '<i class="fa-solid fa-crown"></i> Grand Final'}
        </div>
        <div class="team-row ${p1W ? 'winner' : ''} ${p2W ? 'loser' : ''} ${p1.cls}" ${clickStr}>
          <span class="team-name">${escapeHTML(p1.name)}</span>
          <span class="team-score gf-badge">${p1W ? '🏆 Champion' : ''}</span>
        </div>
        <div class="team-row ${p2W ? 'winner' : ''} ${p1W ? 'loser' : ''} ${p2.cls}" ${clickStr}>
          <span class="team-name">${escapeHTML(p2.name)}</span>
          <span class="team-score gf-badge">${p2W ? '🏆 Champion' : ''}</span>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// SVG CONNECTOR LINES — FIXED: use canvas-local offsetLeft/offsetTop
// ==========================================================================
function drawConnectors(canvas, svgId, rounds, prefix, canvasId) {
  const svg = document.getElementById(svgId);
  if (!svg || !rounds) return;

  svg.innerHTML = '';
  // Size SVG to match full canvas content
  svg.setAttribute('width', Math.max(canvas.scrollWidth, 2000));
  svg.setAttribute('height', Math.max(canvas.scrollHeight, 1000));

  rounds.forEach((round, rIdx) => {
    if (rIdx >= rounds.length - 1) return; // No connector from last round

    round.forEach((match, mIdx) => {
      const startId = `mn-${prefix}-${canvasId}-${rIdx}-${mIdx}`;
      const nextMi  = Math.floor(mIdx / 2);
      const endId   = `mn-${prefix}-${canvasId}-${rIdx + 1}-${nextMi}`;

      const startNode = document.getElementById(startId);
      const endNode   = document.getElementById(endId);
      if (!startNode || !endNode) return;

      // Compute positions relative to canvas element (not viewport)
      // This is NOT affected by pan/zoom transforms
      const s = getOffsetRelativeTo(startNode, canvas);
      const e = getOffsetRelativeTo(endNode, canvas);

      const x1 = s.left + startNode.offsetWidth;
      const y1 = s.top  + startNode.offsetHeight / 2;
      const x2 = e.left;
      const y2 = e.top  + endNode.offsetHeight  / 2;
      const midX = (x1 + x2) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`);
      path.setAttribute('class', `connector-line ${match.status === 'in-progress' ? 'active' : ''} ${match.status === 'completed' ? 'done' : ''}`);
      svg.appendChild(path);
    });
  });
}

/** Walk the DOM offset chain up to ancestor, accumulating offsetLeft/offsetTop */
function getOffsetRelativeTo(el, ancestor) {
  let top = 0, left = 0, curr = el;
  while (curr && curr !== ancestor) {
    top  += curr.offsetTop  || 0;
    left += curr.offsetLeft || 0;
    curr  = curr.offsetParent;
  }
  return { top, left };
}

// ==========================================================================
// ZOOM / PAN ENGINE
// ==========================================================================
function setupZoomPan(containerId, canvasId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Reset state
  zoomScale = 0.75; panX = 40; panY = 50;
  applyTransform(canvasId);

  function applyTf() { applyTransform(canvasId); }

  container.addEventListener('mousedown', (e) => {
    if (e.target.closest('button, input, .team-row')) return;
    isDragging = true; container.style.cursor = 'grabbing';
    startDragX = e.clientX - panX; startDragY = e.clientY - panY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX = e.clientX - startDragX; panY = e.clientY - startDragY; applyTf();
  });
  window.addEventListener('mouseup', () => { isDragging = false; container.style.cursor = 'grab'; });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = (mx - panX) / zoomScale, cy = (my - panY) / zoomScale;
    zoomScale = e.deltaY < 0
      ? Math.min(zoomScale + 0.05, 2.5)
      : Math.max(zoomScale - 0.05, 0.15);
    panX = mx - cx * zoomScale; panY = my - cy * zoomScale; applyTf();
  }, { passive: false });

  // Touch support
  container.addEventListener('touchstart', (e) => {
    if (e.target.closest('button, input, .team-row')) return;
    if (e.touches.length === 1) {
      isDragging = true; startDragX = e.touches[0].clientX - panX; startDragY = e.touches[0].clientY - panY;
    }
  }, { passive: true });
  container.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    panX = e.touches[0].clientX - startDragX; panY = e.touches[0].clientY - startDragY; applyTf();
  }, { passive: true });
  container.addEventListener('touchend', () => { isDragging = false; });
}

function applyTransform(canvasId) {
  const el = document.getElementById(canvasId);
  if (el) el.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
}

// ==========================================================================
// MATCH CLICK & MODAL
// ==========================================================================
function handleMatchClick(prefix, canvasId, rIdx, mIdx) {
  if (!state || state.status !== 'running') return;

  let match;
  if (prefix === 'gf') {
    match = state.bracket.grandFinal;
  } else if (prefix === 'w') {
    match = state.bracket.type === 'double'
      ? state.bracket.winnersRounds?.[rIdx]?.[mIdx]
      : state.bracket.rounds?.[rIdx]?.[mIdx];
  } else if (prefix === 'l') {
    match = state.bracket.losersRounds?.[rIdx]?.[mIdx];
  }

  if (!match) return;
  if (match.players[0] === -1 || match.players[1] === -1) {
    showToast('This match has not been seeded yet.', 'info'); return;
  }

  activeSelectedMatch = { prefix, canvasId, rIdx, mIdx };

  const p1 = getPlayerInfo(match.players[0]);
  const p2 = getPlayerInfo(match.players[1]);

  document.getElementById('modal-player1-name').textContent = p1.name;
  document.getElementById('modal-player1-id').textContent   = p1.companyId !== 'BYE' ? `ID: ${p1.companyId}` : 'BYE';
  document.getElementById('modal-player2-name').textContent = p2.name;
  document.getElementById('modal-player2-id').textContent   = p2.companyId !== 'BYE' ? `ID: ${p2.companyId}` : 'BYE';
  document.getElementById('modal-p1-label').textContent = p1.name;
  document.getElementById('modal-p2-label').textContent = p2.name;

  const btnProg = document.getElementById('btn-set-in-progress');
  if (match.status === 'in-progress') {
    btnProg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Already In-Progress';
    btnProg.disabled = true;
  } else {
    btnProg.innerHTML = '<i class="fa-solid fa-circle-play"></i> Mark as In-Progress';
    btnProg.disabled = false;
  }

  document.getElementById('match-options-modal').classList.remove('hidden');
}

function getActiveMatch() {
  if (!activeSelectedMatch || !state?.bracket) return null;
  const { prefix, rIdx, mIdx } = activeSelectedMatch;
  if (prefix === 'gf') return state.bracket.grandFinal;
  if (prefix === 'w') return state.bracket.type === 'double'
    ? state.bracket.winnersRounds?.[rIdx]?.[mIdx]
    : state.bracket.rounds?.[rIdx]?.[mIdx];
  if (prefix === 'l') return state.bracket.losersRounds?.[rIdx]?.[mIdx];
  return null;
}

function setWinner(playerSlot) {
  if (!activeSelectedMatch) return;
  saveState();

  const match = getActiveMatch();
  if (!match) return;

  const { prefix } = activeSelectedMatch;
  const winnerIdx = match.players[playerSlot];
  const loserIdx  = match.players[playerSlot === 0 ? 1 : 0];

  match.winner = winnerIdx;
  match.status = 'completed';

  // Update player status based on bracket type & position
  if (winnerIdx >= 0 && winnerIdx < (state.players?.length || 0)) {
    state.players[winnerIdx].status = 'active';
  }
  if (loserIdx >= 0 && loserIdx < (state.players?.length || 0)) {
    // In double elim winners bracket: loser still alive (goes to losers bracket)
    if (state.bracket.type === 'double' && prefix === 'w') {
      state.players[loserIdx].status = 'active';
    } else {
      state.players[loserIdx].status = 'eliminated';
    }
  }

  if (state.bracket.type === 'double') {
    propagateDoubleElim();
  } else {
    propagateWinnersRound(activeSelectedMatch.rIdx);
  }

  saveState(false);
  closeMatchModal();
  renderHostView();
}

function resetMatch() {
  if (!activeSelectedMatch) return;
  saveState();

  const match = getActiveMatch();
  if (!match) return;

  match.winner = null;
  match.status = 'pending';
  match.scores = [0, 0];

  match.players.forEach(idx => {
    if (idx >= 0 && idx < (state.players?.length || 0)) state.players[idx].status = 'active';
  });

  if (state.bracket.type === 'double') {
    propagateDoubleElim();
  } else {
    propagateWinnersRound(activeSelectedMatch.rIdx);
  }

  saveState(false);
  closeMatchModal();
  renderHostView();
}

function closeMatchModal() {
  document.getElementById('match-options-modal').classList.add('hidden');
  activeSelectedMatch = null;
}

// ==========================================================================
// BYE SLOT FILLER
// ==========================================================================
function fillByeSlotDirectly(prefix, canvasId, rIdx, mIdx, slot) {
  const name = prompt('Enter Participant Name:');
  if (!name?.trim()) return;
  const companyId = prompt('Enter Company ID:');
  if (!companyId?.trim()) return;

  saveState();
  const newPlayer = { name: name.trim(), companyId: companyId.trim(), status: 'active' };
  state.players.push(newPlayer);
  const newIdx = state.players.length - 1;

  let match;
  if (prefix === 'w') {
    match = state.bracket.type === 'double'
      ? state.bracket.winnersRounds[rIdx][mIdx]
      : state.bracket.rounds[rIdx][mIdx];
  } else {
    match = state.bracket.losersRounds[rIdx][mIdx];
  }

  match.players[slot] = newIdx;
  const other = match.players[slot === 0 ? 1 : 0];

  if (isByePlayer(other)) { match.winner = newIdx; match.status = 'completed'; }
  else { match.winner = null; match.status = 'pending'; }

  if (state.bracket.type === 'double') propagateDoubleElim();
  else propagateWinnersRound(rIdx);

  saveState(false);
  renderHostView();
}

// ==========================================================================
// PLAYER MANAGEMENT
// ==========================================================================
function addPlayer(name, companyId) {
  if (!state) return false;
  saveState();
  state.players.push({ name, companyId, status: 'active' });
  saveState(false);
  renderHostView();
  return true;
}

let deleteTargetIndex = null;

function deletePlayer(index) {
  if (!state) return;
  deleteTargetIndex = index;
  const isRunning = state.status === 'running' || state.status === 'paused';
  const confirmMsg = isRunning
    ? 'Tournament is running. Deleting a player will RESET the bracket. Continue?'
    : 'Remove this participant?';

  const textEl = document.getElementById('confirm-delete-text');
  if (textEl) textEl.textContent = confirmMsg;

  document.getElementById('confirm-delete-modal').classList.remove('hidden');
}

function movePlayerSeeding(index, direction) {
  if (!state || state.status !== 'setup') return;
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.players.length) return;

  saveState();
  const temp = state.players[index];
  state.players[index] = state.players[newIndex];
  state.players[newIndex] = temp;
  saveState(false);
  renderHostView();
}

function movePlayerInList(fromIndex, toIndex) {
  if (!state || state.status !== 'setup') return;
  if (fromIndex === toIndex) return;
  if (fromIndex < 0 || fromIndex >= state.players.length) return;
  if (toIndex < 0 || toIndex >= state.players.length) return;

  saveState();
  const player = state.players.splice(fromIndex, 1)[0];
  state.players.splice(toIndex, 0, player);
  saveState(false);
  renderHostView();
}

function trackPlayerInBracket(playerIndex) {
  if (!state || !state.bracket) {
    showToast('Start the tournament to view in bracket!', 'info');
    return;
  }
  
  // Switch to bracket tab first if not active
  const bracketTab = document.querySelector('.tab-btn[data-tab="tab-bracket"]');
  if (bracketTab && !bracketTab.classList.contains('active')) {
    bracketTab.click();
  }

  const matchesToHighlight = [];
  const findMatchesInRound = (rounds, prefix, canvasId) => {
    if (!rounds) return;
    rounds.forEach((round, rIdx) => {
      round.forEach((match, mIdx) => {
        if (match.players && match.players.includes(playerIndex)) {
          matchesToHighlight.push({
            id: `mn-${prefix}-${canvasId}-${rIdx}-${mIdx}`,
            canvasId
          });
        }
      });
    });
  };

  if (state.bracket.type === 'double') {
    findMatchesInRound(state.bracket.winnersRounds, 'w', 'bracket-canvas');
    findMatchesInRound(state.bracket.losersRounds, 'l', 'losers-bracket-canvas');
    if (state.bracket.grandFinal && state.bracket.grandFinal.players && state.bracket.grandFinal.players.includes(playerIndex)) {
      matchesToHighlight.push({
        id: 'mn-gf-gf-canvas-0-0',
        canvasId: 'bracket-canvas'
      });
    }
  } else {
    findMatchesInRound(state.bracket.rounds, 'w', 'bracket-canvas');
  }

  if (!matchesToHighlight.length) {
    showToast('Player not found in active matches.', 'info');
    return;
  }

  // Clear existing highlights
  document.querySelectorAll('.match-node').forEach(n => {
    n.classList.remove('track-highlight');
  });

  // Highlight matches
  matchesToHighlight.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) {
      el.classList.add('track-highlight');
      setTimeout(() => el.classList.remove('track-highlight'), 5000);
    }
  });

  // Focus and center the first match found
  const first = matchesToHighlight[0];
  const nodeEl = document.getElementById(first.id);
  const canvasEl = document.getElementById(first.canvasId);
  const containerEl = canvasEl ? canvasEl.parentElement : null;

  if (nodeEl && canvasEl && containerEl) {
    // If the canvas is hidden because of single view, switch sub-view
    if (state.bracket.type === 'double') {
      const isLoserMatch = first.id.includes('-l-');
      if (isLoserMatch && bracketSingleActive !== 'losers') {
        bracketSingleActive = 'losers';
        updateBracketViewClasses();
      } else if (!isLoserMatch && bracketSingleActive !== 'winners') {
        bracketSingleActive = 'winners';
        updateBracketViewClasses();
      }
    }

    const offset = getOffsetRelativeTo(nodeEl, canvasEl);
    const nodeCenterX = offset.left + nodeEl.offsetWidth / 2;
    const nodeCenterY = offset.top + nodeEl.offsetHeight / 2;

    const rect = containerEl.getBoundingClientRect();
    panX = rect.width / 2 - nodeCenterX * zoomScale;
    panY = rect.height / 2 - nodeCenterY * zoomScale;
    applyTransform(first.canvasId);
  }
}


let editTargetIndex = null;

function openEditPlayerModal(index) {
  editTargetIndex = index;
  const p = state.players[index];
  const title = document.getElementById('participant-modal-title');
  if (title) title.textContent = (state.status === 'running' || state.status === 'paused') ? 'Replace Player (Bracket Locked)' : 'Edit Participant';
  document.getElementById('edit-player-name').value = p.name;
  document.getElementById('edit-player-id').value = p.companyId;
  document.getElementById('participant-edit-modal').classList.remove('hidden');
}

// ==========================================================================
// PARTICIPANTS TABLE
// ==========================================================================
function renderParticipantsTable() {
  const tbody = document.getElementById('participants-table-body');
  if (!tbody || !state) return;
  tbody.innerHTML = '';

  if (!state.players.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-list-placeholder">No participants registered yet.</td></tr>';
    return;
  }

  state.players.forEach((p, idx) => {
    const tr = document.createElement('tr');
    
    let seedingBtns = '';
    if (state.status === 'setup') {
      tr.dataset.index = idx;
      seedingBtns = `
        <div class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></div>
        <div class="btn-seeding-container" style="display:flex;gap:0.25rem">
          <button class="btn-icon-sm" onclick="movePlayerSeeding(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>
          <button class="btn-icon-sm" onclick="movePlayerSeeding(${idx}, 1)" ${idx === state.players.length - 1 ? 'disabled' : ''} title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
      `;
    }

    const pStatus = p.status || 'active';

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><input type="text" class="table-input" value="${escapeHTML(p.name)}" onchange="updatePlayerFromTable(${idx},'name',this.value)"></td>
      <td><input type="text" class="table-input" value="${escapeHTML(p.companyId)}" onchange="updatePlayerFromTable(${idx},'companyId',this.value)"></td>
      <td><span class="badge-status ${pStatus}">${pStatus.toUpperCase()}</span></td>
      <td>
        <div style="display:flex;gap:0.35rem;align-items:center">
          ${seedingBtns}
          <button class="btn-icon-sm" onclick="openEditPlayerModal(${idx})" title="Edit"><i class="fa-solid fa-user-pen"></i></button>
          <button class="btn-icon-sm" onclick="deletePlayer(${idx})" title="Delete" style="background:rgba(255,71,87,0.1);border-color:rgba(255,71,87,0.3);color:var(--danger)"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updatePlayerFromTable(index, field, value) {
  saveState();
  if (state.players[index]) state.players[index][field] = value.trim();
  saveState(false);
  renderSidebarPlayers();
}

/**
 * QR Code Generator Helper.
 * Placeholder for the npm package 'qrcode'.
 *
 * To transition to the local 'qrcode' package later:
 * 1. Run: npm install qrcode
 * 2. Import qrcode on the server (or bundle it for client) and replace this helper.
 */
async function generateQRCode(text) {
  try {
    const res = await fetch(`/api/qrcode?text=${encodeURIComponent(text)}`);
    if (res.ok) {
      const data = await res.json();
      return data.dataUrl;
    }
  } catch (err) {
    console.error('Failed to generate QR Code from server:', err);
  }
  // Fallback to public api if server endpoint fails
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;
}

// ==========================================================================
// QR REGISTRATION ENGINE
// ==========================================================================
function openQRRegistration() {
  saveState();
  state.status = 'registration';

  // FIXED ID: 'registration-timer-select' (was 'registration-timer' — broken)
  const timerEl = document.getElementById('registration-timer-select');
  const duration = timerEl ? (parseInt(timerEl.value) || 0) : 60;
  const endTime = duration > 0 ? (Date.now() + duration * 1000) : null;

  state.registrationTimer = {
    duration,
    remaining: duration,
    endTime,
    isActive: duration > 0
  };

  const tid = appData.currentId || '';
  const loc = window.location;
  const regUrl = `${loc.origin}${loc.pathname}?register=true&tid=${encodeURIComponent(tid)}`;

  const regInput = document.getElementById('registration-url-input');
  if (regInput) regInput.value = regUrl;

  const compNameEl = document.getElementById('qr-competition-name');
  if (compNameEl && state) {
    compNameEl.textContent = state.name;
  }

  const qrImg = document.getElementById('qr-image');
  if (qrImg) {
    generateQRCode(regUrl).then(url => {
      qrImg.src = url;
    });
  }

  document.getElementById('setup-panel').classList.add('hidden');
  document.getElementById('qr-panel').classList.remove('hidden');

  if (duration > 0) {
    startRegistrationTimer();
  } else {
    const cd = document.getElementById('registration-countdown');
    if (cd) cd.textContent = '∞';
  }

  saveState(false);
  renderHostView();
}

function startRegistrationTimer() {
  if (timerInterval) clearInterval(timerInterval);
  const countdownEl = document.getElementById('registration-countdown');

  timerInterval = setInterval(() => {
    if (!state?.registrationTimer?.isActive) { clearInterval(timerInterval); return; }
    
    // Calculate accurate remaining time based on absolute endTime
    const remaining = Math.max(0, Math.ceil((state.registrationTimer.endTime - Date.now()) / 1000));
    state.registrationTimer.remaining = remaining;

    if (countdownEl) {
      countdownEl.textContent = remaining > 60 ? `${Math.floor(remaining/60)}m ${remaining%60}s` : `${remaining}s`;
    }
    
    if (remaining <= 0) {
      clearInterval(timerInterval);
      closeQRRegistration();
    }
  }, 1000);
}

function closeQRRegistration() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (state) {
    state.registrationTimer.isActive = false;
    state.status = 'setup';
  }
  const qrPanel = document.getElementById('qr-panel');
  const setupPanel = document.getElementById('setup-panel');
  if (qrPanel) qrPanel.classList.add('hidden');
  if (setupPanel) setupPanel.classList.remove('hidden');
  saveState();
  renderHostView();
}

// ==========================================================================
// SHARE & EXPORT TAB
// ==========================================================================
function renderShareExportTab() {
  const tid = appData.currentId || '';
  const loc = window.location;
  const liveUrl = `${loc.origin}${loc.pathname}?view=live&tid=${encodeURIComponent(tid)}`;
  const input = document.getElementById('player-live-url-input');
  if (input) input.value = liveUrl;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!', 'success'))
    .catch(() => showToast('Copy failed — please copy manually.', 'error'));
}

// ==========================================================================
// PLAYER REGISTRATION VIEW
// ==========================================================================
function initRegistrationView() {
  const form = document.getElementById('participant-registration-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tid = new URLSearchParams(window.location.search).get('tid');
    if (!tid) { showRegMsg('Registration is not available (Missing Tournament ID).', 'error'); return; }

    const name = document.getElementById('reg-name').value.trim();
    const companyId = document.getElementById('reg-company-id').value.trim();
    if (!name || !companyId) { showRegMsg('Please fill in all fields.', 'error'); return; }

    try {
      const res = await fetch(`/api/tournament/${tid}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, companyId })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      showRegMsg('🎉 You have been successfully registered!', 'success');
      form.reset();
    } catch (err) {
      showRegMsg(`⚠️ ${err.message}`, 'error');
    }
  });
}

function showRegMsg(text, type) {
  const box = document.getElementById('registration-message-box');
  const form = document.getElementById('participant-registration-form');
  if (box) { box.textContent = text; box.className = `registration-message ${type}`; box.classList.remove('hidden'); }
  if (type === 'success' && form) form.classList.add('hidden');
}

let clientTimerInterval = null;

function startClientRegistrationTimer() {
  if (clientTimerInterval) clearInterval(clientTimerInterval);
  const countdownEl = document.getElementById('register-time-left');
  const timerContainer = document.getElementById('register-timer-countdown');

  if (!state || !state.registrationTimer || !state.registrationTimer.isActive || !state.registrationTimer.endTime) {
    if (timerContainer) timerContainer.classList.add('hidden');
    return;
  }

  const initialRemaining = Math.max(0, Math.ceil((state.registrationTimer.endTime - Date.now()) / 1000));
  if (initialRemaining <= 0) {
    if (timerContainer) timerContainer.classList.add('hidden');
    return;
  }

  if (timerContainer) timerContainer.classList.remove('hidden');
  if (countdownEl) {
    countdownEl.textContent = initialRemaining > 60 ? `${Math.floor(initialRemaining/60)}m ${initialRemaining%60}s` : `${initialRemaining}s`;
  }

  clientTimerInterval = setInterval(() => {
    if (!state?.registrationTimer?.isActive || !state.registrationTimer.endTime) {
      clearInterval(clientTimerInterval);
      if (timerContainer) timerContainer.classList.add('hidden');
      return;
    }
    
    const remaining = Math.max(0, Math.ceil((state.registrationTimer.endTime - Date.now()) / 1000));
    state.registrationTimer.remaining = remaining;
    
    if (remaining <= 0) {
      state.registrationTimer.isActive = false;
      clearInterval(clientTimerInterval);
      if (timerContainer) timerContainer.classList.add('hidden');
      renderRegistrationView();
      return;
    }
    
    if (countdownEl) {
      countdownEl.textContent = remaining > 60 ? `${Math.floor(remaining/60)}m ${remaining%60}s` : `${remaining}s`;
    }
  }, 1000);
}

function renderRegistrationView() {
  const formContainer = document.getElementById('registration-form-container');
  const titleEl = document.getElementById('register-competition-title');
  const descEl = document.getElementById('register-competition-desc');
  const messageBox = document.getElementById('registration-message-box');

  if (state) {
    if (titleEl) titleEl.textContent = `${state.name} - Entry`;
    
    const isRegOpen = state.status === 'registration' && (!state.registrationTimer || !state.registrationTimer.isActive || state.registrationTimer.remaining > 0);
    
    if (isRegOpen) {
      if (formContainer) formContainer.classList.remove('hidden');
      if (descEl) descEl.textContent = 'Register to join the live tournament bracket.';
      if (messageBox) messageBox.classList.add('hidden');
      
      startClientRegistrationTimer();
    } else {
      if (formContainer) formContainer.classList.add('hidden');
      if (descEl) descEl.textContent = 'Registration has ended or is currently closed.';
      
      if (messageBox) {
        messageBox.textContent = '⚠️ Registration is closed.';
        messageBox.className = 'registration-message error';
        messageBox.classList.remove('hidden');
      }
      
      if (clientTimerInterval) {
        clearInterval(clientTimerInterval);
        clientTimerInterval = null;
      }
      const timerContainer = document.getElementById('register-timer-countdown');
      if (timerContainer) timerContainer.classList.add('hidden');
    }
  } else {
    if (titleEl) titleEl.textContent = 'Tournament Entry';
    if (formContainer) formContainer.classList.add('hidden');
    if (messageBox) {
      messageBox.textContent = '⚠️ Tournament not found.';
      messageBox.className = 'registration-message error';
      messageBox.classList.remove('hidden');
    }
  }
}

// ==========================================================================
// PLAYER LIVE VIEW (auto-syncs via storage events)
// ==========================================================================
function renderLiveView() {
  const badge = document.getElementById('live-tournament-status-badge');
  if (badge && state) {
    const cfg = {
      setup:        { c: 'var(--warning)',     l: 'Setup Phase' },
      registration: { c: 'var(--accent-cyan)', l: 'Registration Open' },
      running:      { c: 'var(--success)',     l: 'In Progress' },
      paused:       { c: 'var(--warning)',     l: 'Paused' },
      completed:    { c: '#9c27b0',           l: 'Completed' }
    }[state.status] || { c: 'var(--warning)', l: 'Setup' };
    badge.innerHTML = `<span class="status-dot" style="background:${cfg.c};box-shadow:0 0 8px ${cfg.c}"></span>${cfg.l}`;
  }

  renderBracketView('live');
}

// ==========================================================================
// MULTI-TAB SYNC
// ==========================================================================
function setupSync() {
  window.addEventListener('storage', () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const fresh = JSON.parse(saved);

      const params = new URLSearchParams(window.location.search);
      if (params.has('view') && params.get('view') === 'live') {
        const tid = params.get('tid') || fresh.currentId;
        if (tid && fresh.tournaments[tid]) state = fresh.tournaments[tid];
        renderLiveView();
      } else if (!params.has('register')) {
        appData = fresh;
        if (appData.currentId && appData.tournaments[appData.currentId]) {
          state = appData.tournaments[appData.currentId];
          renderHostView();
        }
      }
    } catch(e) {}
  });
}

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
      renderHostView();
    });
  });

  // Start Tournament / Generate Bracket
  const handleStartOrGenerate = () => {
    if (!state || state.players.length < 2) { showToast('Need at least 2 players to start!', 'error'); return; }
    generateBracket();
  };
  document.getElementById('btn-start').addEventListener('click', handleStartOrGenerate);
  document.getElementById('btn-generate-bracket')?.addEventListener('click', handleStartOrGenerate);

  // Pause / Resume
  document.getElementById('btn-pause').addEventListener('click', () => {
    if (!state) return;
    saveState();
    state.status = state.status === 'running' ? 'paused' : 'running';
    saveState(false);
    renderHostView();
  });

  // Undo / Redo
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);

  // Search players
  document.getElementById('player-search').addEventListener('input', renderSidebarPlayers);

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
    if (e.key === 'Escape') {
      closeMatchModal();
      document.getElementById('participant-edit-modal')?.classList.add('hidden');
      document.getElementById('confirm-reset-modal')?.classList.add('hidden');
      document.getElementById('confirm-delete-modal')?.classList.add('hidden');
      document.getElementById('confirm-delete-tournament-modal')?.classList.add('hidden');
    }
  });

  // Setup panel dropdowns
  document.getElementById('bracket-size').addEventListener('change', (e) => {
    if (!state) return;
    saveState();
    state.bracketSizeConfig = e.target.value;
    state.bracketSize = e.target.value === 'auto' ? 'auto' : parseInt(e.target.value);
    saveState(false);
    renderHostView();
  });

  document.getElementById('bracket-type').addEventListener('change', (e) => {
    if (!state) return;
    saveState();
    state.bracketType = e.target.value;
    saveState(false);
    renderHostView();
  });

  // Add manual player
  document.getElementById('btn-add-manual').addEventListener('click', () => {
    if (!state) return;
    const name = prompt('Participant Name:');
    if (!name?.trim()) return;
    const id = prompt('Company ID:');
    if (!id?.trim()) return;
    addPlayer(name.trim(), id.trim());
  });

  // Shuffle players
  document.getElementById('btn-shuffle').addEventListener('click', () => {
    if (!state) return;
    if (state.status !== 'setup') { showToast('Can only shuffle before the tournament starts.', 'warning'); return; }
    if (!state.players.length) { showToast('No players to shuffle.', 'info'); return; }
    saveState();
    for (let i = state.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.players[i], state.players[j]] = [state.players[j], state.players[i]];
    }
    saveState(false);
    renderHostView();
  });

  // Add table row
  document.getElementById('btn-add-table-row').addEventListener('click', () => {
    if (!state) return;
    saveState();
    state.players.push({
      name: `Player ${state.players.length + 1}`,
      companyId: `ID-${1000 + state.players.length}`,
      status: 'active'
    });
    saveState(false);
    renderHostView();
  });

  // Match modal buttons
  document.getElementById('btn-set-in-progress').addEventListener('click', () => {
    if (!activeSelectedMatch) return;
    saveState();
    const match = getActiveMatch();
    if (match) { match.status = 'in-progress'; }
    saveState(false);
    closeMatchModal();
    renderHostView();
  });
  document.getElementById('btn-winner-player1').addEventListener('click', () => setWinner(0));
  document.getElementById('btn-winner-player2').addEventListener('click', () => setWinner(1));
  document.getElementById('btn-match-rematch').addEventListener('click', resetMatch);
  document.getElementById('btn-close-modal').addEventListener('click', closeMatchModal);

  // Edit participant modal
  document.getElementById('edit-participant-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (editTargetIndex === null) return;
    saveState();
    state.players[editTargetIndex].name = document.getElementById('edit-player-name').value.trim();
    state.players[editTargetIndex].companyId = document.getElementById('edit-player-id').value.trim();
    document.getElementById('participant-edit-modal').classList.add('hidden');
    editTargetIndex = null;
    saveState(false);
    renderHostView();
  });
  document.getElementById('btn-close-edit-modal').addEventListener('click', () => {
    document.getElementById('participant-edit-modal').classList.add('hidden');
    editTargetIndex = null;
  });

  // Delete participant modal
  document.getElementById('btn-confirm-delete').addEventListener('click', () => {
    if (deleteTargetIndex === null || !state) return;
    saveState();
    const isRunning = state.status === 'running' || state.status === 'paused';
    state.players.splice(deleteTargetIndex, 1);
    if (isRunning) {
      state.bracket = null;
      state.status = 'setup';
      showToast('Player removed. Tournament reset to setup.', 'warning');
    }
    document.getElementById('confirm-delete-modal').classList.add('hidden');
    deleteTargetIndex = null;
    saveState(false);
    renderHostView();
  });
  const closeDeleteModal = () => {
    document.getElementById('confirm-delete-modal').classList.add('hidden');
    deleteTargetIndex = null;
  };
  document.getElementById('btn-cancel-delete').addEventListener('click', closeDeleteModal);
  document.getElementById('btn-close-delete-modal').addEventListener('click', closeDeleteModal);

  // Reset tournament modal
  document.getElementById('btn-reset-tournament').addEventListener('click', () => {
    document.getElementById('confirm-reset-modal').classList.remove('hidden');
  });
  document.getElementById('btn-confirm-reset').addEventListener('click', () => {
    document.getElementById('confirm-reset-modal').classList.add('hidden');
    if (!state) return;
    saveState();
    state.status = 'setup';
    state.bracket = null;
    state.players.forEach(p => p.status = 'active');
    saveState(false);
    showToast('Tournament reset to setup.', 'success');
    renderHostView();
  });
  document.getElementById('btn-cancel-reset').addEventListener('click', () => {
    document.getElementById('confirm-reset-modal').classList.add('hidden');
  });
  document.getElementById('btn-close-reset-modal').addEventListener('click', () => {
    document.getElementById('confirm-reset-modal').classList.add('hidden');
  });

  // Delete Tournament modal
  document.getElementById('btn-confirm-delete-tournament').addEventListener('click', async () => {
    if (deleteTournamentTargetId === null) return;
    const id = deleteTournamentTargetId;
    document.getElementById('confirm-delete-tournament-modal').classList.add('hidden');
    deleteTournamentTargetId = null;
    
    try {
      const res = await fetch(`/api/tournament/${id}`, { method: 'DELETE' });
      if (res.ok) {
        delete appData.tournaments[id];
        if (appData.currentId === id) { appData.currentId = null; state = null; }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        await loadAppData();
        renderTournamentHub();
        showToast(`Deleted tournament successfully.`, 'success');
      } else {
        throw new Error('Failed to delete tournament on server');
      }
    } catch (err) {
      console.error(err);
      showToast('Could not delete tournament from server.', 'error');
    }
  });

  const closeDeleteTournamentModal = () => {
    document.getElementById('confirm-delete-tournament-modal').classList.add('hidden');
    deleteTournamentTargetId = null;
  };
  document.getElementById('btn-cancel-delete-tournament').addEventListener('click', closeDeleteTournamentModal);
  document.getElementById('btn-close-delete-tournament-modal').addEventListener('click', closeDeleteTournamentModal);

  // QR Registration
  document.getElementById('btn-open-registration').addEventListener('click', openQRRegistration);
  document.getElementById('btn-close-registration').addEventListener('click', closeQRRegistration);

  // Copy URLs
  document.getElementById('btn-copy-reg-url').addEventListener('click', () => {
    copyToClipboard(document.getElementById('registration-url-input').value);
  });
  document.getElementById('btn-copy-live-url').addEventListener('click', () => {
    copyToClipboard(document.getElementById('player-live-url-input').value);
  });
  document.getElementById('btn-open-live-view').addEventListener('click', () => {
    const url = document.getElementById('player-live-url-input').value;
    if (url) window.open(url, '_blank');
  });

  // Zoom controls (host view)
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    zoomScale = Math.min(zoomScale + 0.15, 2.5);
    applyTransform('bracket-canvas');
  });
  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    zoomScale = Math.max(zoomScale - 0.15, 0.15);
    applyTransform('bracket-canvas');
  });
  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    zoomScale = 0.75; panX = 40; panY = 50;
    applyTransform('bracket-canvas');
  });

  // Zoom controls (live view)
  document.getElementById('btn-live-zoom-in').addEventListener('click', () => {
    zoomScale = Math.min(zoomScale + 0.15, 2.5);
    applyTransform('live-bracket-canvas');
  });
  document.getElementById('btn-live-zoom-out').addEventListener('click', () => {
    zoomScale = Math.max(zoomScale - 0.15, 0.15);
    applyTransform('live-bracket-canvas');
  });
  document.getElementById('btn-live-zoom-reset').addEventListener('click', () => {
    zoomScale = 0.75; panX = 40; panY = 50;
    applyTransform('live-bracket-canvas');
  });

  // Single / Double View Toggles
  const setViewMode = (mode) => {
    bracketViewMode = mode;
    updateBracketViewClasses();
  };
  const setSingleActive = (active) => {
    bracketSingleActive = active;
    updateBracketViewClasses();
  };

  document.getElementById('btn-view-single')?.addEventListener('click', () => setViewMode('single'));
  document.getElementById('btn-view-double')?.addEventListener('click', () => setViewMode('double'));
  document.getElementById('btn-sub-winners')?.addEventListener('click', () => setSingleActive('winners'));
  document.getElementById('btn-sub-losers')?.addEventListener('click', () => setSingleActive('losers'));

  document.getElementById('btn-live-view-single')?.addEventListener('click', () => setViewMode('single'));
  document.getElementById('btn-live-view-double')?.addEventListener('click', () => setViewMode('double'));
  document.getElementById('btn-live-sub-winners')?.addEventListener('click', () => setSingleActive('winners'));
  document.getElementById('btn-live-sub-losers')?.addEventListener('click', () => setSingleActive('losers'));

  // Export CSV
  document.getElementById('btn-export-csv').addEventListener('click', () => {
    if (!state?.players.length) { showToast('No data to export.', 'info'); return; }
    let csv = 'data:text/csv;charset=utf-8,#,Name,Company ID,Status\n';
    state.players.forEach((p, i) => {
      csv += `"${i+1}","${p.name.replace(/"/g,'""')}","${p.companyId.replace(/"/g,'""')}","${p.status}"\n`;
    });
    const link = Object.assign(document.createElement('a'), {
      href: encodeURI(csv),
      download: `apex_bracket_${Date.now()}.csv`
    });
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  });

  // Export PDF
  document.getElementById('btn-export-pdf').addEventListener('click', () => window.print());

  // Back to Hub
  document.getElementById('btn-back-hub').addEventListener('click', () => {
    window.location.search = '';
  });

  // Hub: Create Tournament button
  document.getElementById('btn-create-tournament').addEventListener('click', () => {
    document.getElementById('create-tournament-modal').classList.remove('hidden');
    document.getElementById('new-tournament-name').focus();
  });

  // Hub: Close Create Modal
  document.getElementById('btn-close-create-modal').addEventListener('click', () => {
    document.getElementById('create-tournament-modal').classList.add('hidden');
    document.getElementById('create-tournament-form').reset();
  });

  // Hub: Create Tournament Form
  document.getElementById('create-tournament-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('new-tournament-name').value.trim();
    if (!name) return;
    const bracketSizeConfig = document.getElementById('new-bracket-size').value;
    const bracketType = document.getElementById('new-bracket-type').value;
    const regDuration = parseInt(document.getElementById('new-registration-time').value || '60');

    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const tournament = {
      id, name,
      createdAt: Date.now(),
      bracketType,
      bracketSizeConfig,
      bracketSize: bracketSizeConfig === 'auto' ? 'auto' : parseInt(bracketSizeConfig),
      status: 'setup',
      players: [],
      bracket: null,
      registrationTimer: { duration: regDuration, remaining: regDuration, isActive: false }
    };

    let adminKey = null;
    try {
      const res = await fetch('/api/tournament', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, status: 'setup' })
      });
      if (res.ok) {
        const data = await res.json();
        adminKey = data.tournament.adminKey;
      }
    } catch (err) {
      console.error('Failed to create tournament on server:', err);
    }

    appData.tournaments[id] = tournament;
    appData.currentId = id;
    state = tournament;
    
    await persistAppData();

    document.getElementById('create-tournament-modal').classList.add('hidden');
    document.getElementById('create-tournament-form').reset();

    window.location.search = `?tournamentId=${id}`;
  });

  setupDragAndDrop();
} // end setupEventListeners

// ==========================================================================
// TOAST NOTIFICATION
// ==========================================================================
function showToast(message, type = 'info') {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.className = `app-toast ${type}`;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

// ==========================================================================
// UTILITIES
// ==========================================================================
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// DRAG & DROP IMPLEMENTATION
// ==========================================================================
function setupDragAndDrop() {
  const sidebarList = document.getElementById('sidebar-players-list');
  if (sidebarList) {
    sidebarList.addEventListener('mousedown', (e) => {
      const handle = e.target.closest('.drag-handle');
      if (handle) {
        const row = handle.closest('.player-item-row');
        if (row) row.setAttribute('draggable', 'true');
      }
    });

    sidebarList.addEventListener('mouseup', (e) => {
      const row = e.target.closest('.player-item-row');
      if (row) row.setAttribute('draggable', 'false');
    });

    sidebarList.addEventListener('dragstart', (e) => {
      const row = e.target.closest('.player-item-row');
      if (!row || state.status !== 'setup') {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'sidebar', index: parseInt(row.dataset.index) }));
      row.classList.add('dragging');
    });

    sidebarList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const row = e.target.closest('.player-item-row');
      if (!row || state.status !== 'setup') return;
      row.classList.add('drag-over');
    });

    sidebarList.addEventListener('dragleave', (e) => {
      const row = e.target.closest('.player-item-row');
      if (row) row.classList.remove('drag-over');
    });

    sidebarList.addEventListener('drop', (e) => {
      e.preventDefault();
      const row = e.target.closest('.player-item-row');
      if (!row || state.status !== 'setup') return;
      row.classList.remove('drag-over');
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data && (data.type === 'sidebar' || data.type === 'table')) {
          movePlayerInList(data.index, parseInt(row.dataset.index));
        }
      } catch (err) {
        console.error(err);
      }
    });

    sidebarList.addEventListener('dragend', (e) => {
      const row = e.target.closest('.player-item-row');
      if (row) {
        row.classList.remove('dragging');
        row.setAttribute('draggable', 'false');
      }
      sidebarList.querySelectorAll('.player-item-row').forEach(r => r.classList.remove('drag-over', 'dragging'));
    });
  }

  const tableBody = document.getElementById('participants-table-body');
  if (tableBody) {
    tableBody.addEventListener('mousedown', (e) => {
      const handle = e.target.closest('.drag-handle');
      if (handle) {
        const row = handle.closest('tr');
        if (row) row.setAttribute('draggable', 'true');
      }
    });

    tableBody.addEventListener('mouseup', (e) => {
      const row = e.target.closest('tr');
      if (row) row.setAttribute('draggable', 'false');
    });

    tableBody.addEventListener('dragstart', (e) => {
      const row = e.target.closest('tr');
      if (!row || state.status !== 'setup') {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'table', index: parseInt(row.dataset.index) }));
      row.classList.add('dragging');
    });

    tableBody.addEventListener('dragover', (e) => {
      e.preventDefault();
      const row = e.target.closest('tr');
      if (!row || state.status !== 'setup') return;
      row.classList.add('drag-over');
    });

    tableBody.addEventListener('dragleave', (e) => {
      const row = e.target.closest('tr');
      if (row) row.classList.remove('drag-over');
    });

    tableBody.addEventListener('drop', (e) => {
      e.preventDefault();
      const row = e.target.closest('tr');
      if (!row || state.status !== 'setup') return;
      row.classList.remove('drag-over');
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data && (data.type === 'table' || data.type === 'sidebar')) {
          movePlayerInList(data.index, parseInt(row.dataset.index));
        }
      } catch (err) {
        console.error(err);
      }
    });

    tableBody.addEventListener('dragend', (e) => {
      const row = e.target.closest('tr');
      if (row) {
        row.classList.remove('dragging');
        row.setAttribute('draggable', 'false');
      }
      tableBody.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over', 'dragging'));
    });
  }
}
