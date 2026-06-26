/**
 * Apex Bracket - Tournament Engine v2.0
 * Multi-Tournament | Double Elimination | Fixed Connectors | Full Feature Set
 */

const STORAGE_KEY = 'apex_bracket_v2';

// ==========================================================================
// TRANSLATIONS (i18n)
// ==========================================================================
const TRANSLATIONS = {
  en: {
    admin_login: "Admin <span>Login</span>",
    login_subtitle: "Enter your credentials to manage tournaments",
    username: "Username",
    password: "Password",
    enter_username: "Enter username",
    enter_password: "Enter password",
    sign_in: "Sign In",
    tournament_hub: "Tournament Hub",
    welcome_hub: "Welcome to <span>Apex Bracket</span>",
    hub_subtitle: "Create a new tournament or continue an existing one",
    create_new_tournament: "Create New Tournament",
    create_new_desc: "Start fresh with a new bracket configuration",
    existing_tournaments: "Existing Tournaments",
    no_tournaments_yet: "No tournaments created yet.",
    back_to_hub: "Back to Hub",
    setup_phase: "Setup Phase",
    undo: "Undo (Ctrl+Z)",
    redo: "Redo (Ctrl+Y)",
    reset_match: "Reset Match",
    reset_entire_tournament: "Reset Entire Tournament",
    pause: "Pause",
    start_tournament: "Start Tournament",
    tournament_entry: "Tournament Entry",
    time_remaining: "Time remaining",
    register_desc: "Register to join the live tournament bracket.",
    participant_name: "Participant Name",
    enter_full_name: "Enter your full name",
    company_id: "Company ID",
    enter_company_id: "Enter Company ID",
    submit_registration: "Submit Registration",
    single_view: "Single View",
    double_view: "Double View",
    winners: "Winners",
    losers: "Losers",
    zoom_in: "Zoom In",
    reset_view: "Reset View",
    zoom_out: "Zoom Out",
    live: "Live",
    winners_bracket: "Winners Bracket",
    losers_bracket: "Losers Bracket",
    
    // Statuses
    running: "In Progress",
    paused: "Paused",
    completed: "Completed",
    setup: "Setup Phase",
    registration: "Registration Open",

    // Hub meta labels & options
    double_elim: "Double Elim",
    single_elim: "Single Elim",
    auto_size: "Auto Size",
    players_count: "{count} Players",
    no_tournaments_msg: 'No tournaments yet. Click "Create New Tournament" to begin!',
    open: "Open",

    // Bracket labels & headers
    winners_final: "Winners Final",
    final: "Final",
    losers_final: "Losers Final",
    round_num: "Round {num}",
    l_round_num: "L-Round {num}",
    third_place_match: "3rd Place Match",
    match_num: "Match {num}",
    fill_slot: "Fill Slot",
    playing: "Playing",
    champion: "🏆 Champion",
    grand_final: "Grand Final",
    resume: "Resume",

    // Added translations
    tournament_setup: "Tournament Setup",
    bracket_size: "Bracket Size",
    auto_fit: "Auto (fit players)",
    players_4: "4 Players",
    players_8: "8 Players",
    players_16: "16 Players",
    players_32: "32 Players",
    players_64: "64 Players",
    players_128: "128 Players",
    bracket_format: "Bracket Format",
    single_elimination: "Single Elimination",
    double_elimination: "Double Elimination",
    include_3rd_place: "Include 3rd Place Match",
    qr_timer_limit: "QR Registration Time Limit",
    seconds_30: "30 seconds",
    minute_1: "1 minute",
    minutes_2: "2 minutes",
    minutes_3: "3 minutes",
    minutes_5: "5 minutes",
    minutes_10: "10 minutes",
    minutes_15: "15 minutes",
    minutes_30: "30 minutes",
    hour_1: "1 hour",
    unlimited_manual: "Unlimited (manual close)",
    open_qr_reg: "Open QR Registration",
    generate_bracket: "Generate Bracket",
    registration_open: "Registration Open",
    close_entry: "Close Entry",
    scan_to_register: "Scan to register name & company ID",
    copy_url: "Copy URL",
    participants: "Participants",
    shuffle_players: "Shuffle Players",
    add_player_manually: "Add Player Manually",
    search_participant: "Search participant...",
    no_participants_yet: "No participants registered yet.",
    progress: "Progress",
    matches: "Matches",
    done: "Done",
    round: "Round",
    bracket: "Bracket",
    share_export: "Share & Export",
    click_match_manage: "Click match to manage &nbsp;|&nbsp; Drag to pan &nbsp;|&nbsp; Scroll to zoom",
    bye_slots_active: "Bye slots active — Click to fill manually",
    participants_database: "Participants Database",
    search_name_company: "Search name/company...",
    all_status: "All Status",
    active: "Active",
    bye: "Bye",
    refresh: "Refresh",
    import_csv: "Import CSV",
    add: "Add",
    hash_col: "#",
    name_col: "Name",
    company_id_col: "Company ID",
    status_col: "Status",
    actions_col: "Actions",
    showing_info: "Showing {start} to {end} of {total} participants",
    share_live_updates: "Share Live Updates",
    player_live_url: "Player Live View URL",
    share_live_desc: "Share this with players so they can watch the bracket live.",
    copy: "Copy",
    open_btn: "Open",
    export: "Export",
    export_csv: "Export CSV",
    export_csv_desc: "Download participant list as CSV",
    export_pdf: "Export PDF",
    export_pdf_desc: "Print full-page bracket as PDF",
    new_tournament: "New Tournament",
    tournament_name: "Tournament Name",
    tournament_name_placeholder: "e.g. Spring Championship 2026",
    format: "Format",
    create_tournament: "Create Tournament",
    match_panel: "Match Panel",
    vs: "VS",
    mark_in_progress: "Mark as In-Progress",
    declare_winner: "Declare Winner:",
    reset_rematch: "Reset / Rematch",
    edit_participant: "Edit Participant",
    save_changes: "Save Changes",
    confirm_reset_title: "Reset Tournament",
    confirm_reset_desc: "This will permanently reset all match results and return the tournament to setup phase. Participants will be kept. This cannot be undone.",
    cancel: "Cancel",
    reset_all: "Reset All",
    remove_participant: "Remove Participant",
    confirm_delete_desc: "Are you sure you want to remove this participant?",
    delete: "Delete",
    delete_tournament: "Delete Tournament",
    confirm_delete_tournament_desc: "Are you sure you want to delete this tournament? This cannot be undone.",
    export_pdf_desc: "Print full-page bracket as PDF",
    new_tournament: "New Tournament",
    tournament_name: "Tournament Name",
    tournament_name_placeholder: "e.g. Spring Championship 2026",
    format: "Format",
    create_tournament: "Create Tournament",
    match_panel: "Match Panel",
    vs: "VS",
    mark_in_progress: "Mark as In-Progress",
    declare_winner: "Declare Winner:",
    reset_rematch: "Reset / Rematch",
    edit_participant: "Edit Participant",
    save_changes: "Save Changes",
    confirm_reset_title: "Reset Tournament",
    confirm_reset_desc: "This will permanently reset all match results and return the tournament to setup phase. Participants will be kept. This cannot be undone.",
    cancel: "Cancel",
    reset_all: "Reset All",
    remove_participant: "Remove Participant",
    confirm_delete_desc: "Are you sure you want to remove this participant?",
    delete: "Delete",
    delete_tournament: "Delete Tournament",
    confirm_delete_tournament_desc: "Are you sure you want to delete this tournament? This cannot be undone.",
    match_not_seeded: "This match has not been seeded yet.",
    player_not_found_matches: "Player not found in active matches.",
    replace_player_locked: "Replace Player (Bracket Locked)",
    no_matching_participants: "No matching participants found.",
    copied_to_clipboard: "Copied to clipboard!",
    copy_failed: "Copy failed — please copy manually.",
    reg_missing_id: "Registration is not available (Missing Tournament ID).",
    reg_fill_fields: "Please fill in all fields.",
    reg_success: "🎉 You have been successfully registered!"
  },
  zh: {
    admin_login: "管理员 <span>登录</span>",
    login_subtitle: "输入您的凭据以管理赛事",
    username: "用户名",
    password: "密码",
    enter_username: "输入用户名",
    enter_password: "输入密码",
    sign_in: "登录",
    tournament_hub: "赛事中心",
    welcome_hub: "欢迎使用 <span>Apex Bracket</span>",
    hub_subtitle: "创建新赛事或继续进行已有赛事",
    create_new_tournament: "创建新赛事",
    create_new_desc: "从头开始配置新的对阵表",
    existing_tournaments: "已有赛事",
    no_tournaments_yet: "暂无已创建赛事。",
    back_to_hub: "返回中心",
    setup_phase: "准备阶段",
    undo: "撤销 (Ctrl+Z)",
    redo: "重做 (Ctrl+Y)",
    reset_match: "重置赛事",
    reset_entire_tournament: "重置整场赛事",
    pause: "暂停",
    start_tournament: "开始赛事",
    tournament_entry: "赛事登记",
    time_remaining: "剩余时间",
    register_desc: "登记加入实时对阵表。",
    participant_name: "参赛者姓名",
    enter_full_name: "输入您的姓名",
    company_id: "工号/公司ID",
    enter_company_id: "输入工号/公司ID",
    submit_registration: "提交登记",
    single_view: "单栏视图",
    double_view: "双栏视图",
    winners: "胜者组",
    losers: "败者组",
    zoom_in: "放大",
    reset_view: "重置视图",
    zoom_out: "缩小",
    live: "实时",
    winners_bracket: "胜者组对阵",
    losers_bracket: "败者组对阵",
    
    // Statuses
    running: "进行中",
    paused: "已暂停",
    completed: "已结束",
    setup: "准备阶段",
    registration: "登记开放",

    // Hub meta labels & options
    double_elim: "双败淘汰",
    single_elim: "单败淘汰",
    auto_size: "自动适配",
    players_count: "{count} 参赛者",
    no_tournaments_msg: '暂无赛事。点击“创建新赛事”开始！',
    open: "打开",

    // Bracket labels & headers
    winners_final: "胜者组决赛",
    final: "决赛",
    losers_final: "败者组决赛",
    round_num: "第 {num} 轮",
    l_round_num: "败者组第 {num} 轮",
    third_place_match: "三四名决赛",
    match_num: "对局 {num}",
    fill_slot: "填充空位",
    playing: "比赛中",
    champion: "🏆 冠军",
    grand_final: "总决赛",
    resume: "恢复",

    // Added translations
    tournament_setup: "赛事设置",
    bracket_size: "对阵规模",
    auto_fit: "自动 (适配参赛者)",
    players_4: "4 位参赛者",
    players_8: "8 位参赛者",
    players_16: "16 位参赛者",
    players_32: "32 位参赛者",
    players_64: "64 位参赛者",
    players_128: "128 位参赛者",
    bracket_format: "对阵格式",
    single_elimination: "单败淘汰",
    double_elimination: "双败淘汰",
    include_3rd_place: "包含三四名决赛",
    qr_timer_limit: "扫码登记限时",
    seconds_30: "30 秒",
    minute_1: "1 分钟",
    minutes_2: "2 分钟",
    minutes_3: "3 分钟",
    minutes_5: "5 分钟",
    minutes_10: "10 分钟",
    minutes_15: "15 分钟",
    minutes_30: "30 分钟",
    hour_1: "1 小时",
    unlimited_manual: "无限制 (手动关闭)",
    open_qr_reg: "开放扫码登记",
    generate_bracket: "生成对阵表",
    registration_open: "登记已开放",
    close_entry: "关闭通道",
    scan_to_register: "扫码登记姓名与工号/公司ID",
    copy_url: "复制链接",
    participants: "参赛者",
    shuffle_players: "打乱参赛者",
    add_player_manually: "手动添加参赛者",
    search_participant: "搜索参赛者...",
    no_participants_yet: "暂无已登记参赛者。",
    progress: "进度",
    matches: "对局数",
    done: "已完成",
    round: "轮次",
    bracket: "对阵表",
    share_export: "分享与导出",
    click_match_manage: "点击对局进行管理 &nbsp;|&nbsp; 拖拽平移 &nbsp;|&nbsp; 滚轮缩放",
    bye_slots_active: "轮空位置已启用 — 点击手动填充",
    participants_database: "参赛者数据库",
    search_name_company: "搜索姓名/公司...",
    all_status: "所有状态",
    active: "活跃",
    bye: "轮空",
    refresh: "刷新",
    import_csv: "导入 CSV",
    add: "添加",
    hash_col: "#",
    name_col: "姓名",
    company_id_col: "工号/公司ID",
    status_col: "状态",
    actions_col: "操作",
    showing_info: "显示第 {start} 至 {end} 项，共 {total} 项",
    share_live_updates: "分享实时动态",
    player_live_url: "玩家实时视图链接",
    share_live_desc: "将此链接分享给选手，即可实时查看对阵表。",
    copy: "复制",
    open_btn: "打开",
    export: "导出",
    export_csv: "导出 CSV",
    export_csv_desc: "下载参赛者列表为 CSV 格式",
    export_pdf: "导出 PDF",
    export_pdf_desc: "打印完整对阵表为 PDF",
    new_tournament: "新赛事",
    tournament_name: "赛事名称",
    tournament_name_placeholder: "例如：2026春季锦标赛",
    format: "格式",
    create_tournament: "创建赛事",
    match_panel: "比赛面板",
    vs: "VS",
    mark_in_progress: "标记为进行中",
    declare_winner: "宣布胜者：",
    reset_rematch: "重置 / 重赛",
    edit_participant: "编辑参赛者",
    save_changes: "保存修改",
    confirm_reset_title: "重置赛事",
    confirm_reset_desc: "这将永久重置所有比赛结果，并将赛事退回准备阶段。参赛者将被保留。此操作无法撤销。",
    cancel: "取消",
    reset_all: "重置全部",
    remove_participant: "移除参赛者",
    confirm_delete_desc: "您确定要移除这位参赛者吗？",
    delete: "删除",
    delete_tournament: "删除赛事",
    confirm_delete_tournament_desc: "您确定要删除此赛事吗？此操作无法撤销。",
    export_pdf_desc: "打印完整对阵表为 PDF",
    new_tournament: "新赛事",
    tournament_name: "赛事名称",
    tournament_name_placeholder: "例如：2026春季锦标赛",
    format: "格式",
    create_tournament: "创建赛事",
    match_panel: "比赛面板",
    vs: "VS",
    mark_in_progress: "标记为进行中",
    declare_winner: "宣布胜者：",
    reset_rematch: "重置 / 重赛",
    edit_participant: "编辑参赛者",
    save_changes: "保存修改",
    confirm_reset_title: "重置赛事",
    confirm_reset_desc: "这将永久重置所有比赛结果，并将赛事退回准备阶段。参赛者将被保留。此操作无法撤销。",
    cancel: "取消",
    reset_all: "重置全部",
    remove_participant: "移除参赛者",
    confirm_delete_desc: "您确定要移除这位参赛者吗？",
    delete: "删除",
    delete_tournament: "删除赛事",
    confirm_delete_tournament_desc: "您确定要删除此赛事吗？此操作无法撤销。",
    match_not_seeded: "这场比赛尚未生成对阵。",
    player_not_found_matches: "在活跃对局中未找到该参赛者。",
    replace_player_locked: "替换参赛者 (对阵已锁定)",
    no_matching_participants: "未找到匹配的参赛者。",
    copied_to_clipboard: "已复制到剪贴板！",
    copy_failed: "复制失败，请手动复制。",
    reg_missing_id: "登记不可用 (缺少赛事 ID)。",
    reg_fill_fields: "请填写所有字段。",
    reg_success: "🎉 您已成功登记！"
  }
};

let currentLang = localStorage.getItem('apex_bracket_lang') || 'en';

function getTranslation(key) {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
    return TRANSLATIONS['en'][key];
  }
  return key;
}

function t(key, replacements = {}) {
  let text = getTranslation(key);
  Object.keys(replacements).forEach(k => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), replacements[k]);
  });
  return text;
}

function translatePage() {
  document.documentElement.lang = currentLang;

  // Static translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getTranslation(key);
    if (translation) {
      el.innerHTML = translation;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = getTranslation(key);
    if (translation) {
      el.title = translation;
    }
  });

  // Highlight active buttons in language selectors
  document.querySelectorAll('.btn-lang').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

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
let participantsCurrentPage = 1;

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
  translatePage();
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
function saveState(pushToUndo = true, persist = true) {
  if (pushToUndo && state) {
    undoStack.push(JSON.stringify(state));
    redoStack = [];
    updateUndoRedoButtons();
  }
  if (persist) {
    persistAppData();
  }
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
    list.innerHTML = `<div class="empty-list-placeholder">${t('no_tournaments_msg')}</div>`;
    return;
  }

  list.innerHTML = '';
  ts.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tournament-card glass-panel';
    const playerCount = t.player_count !== undefined ? t.player_count : (t.players || []).length;
    const typeLabel = t.bracketType === 'double' ? getTranslation('double_elim') : getTranslation('single_elim');
    const sizeLabel = (!t.bracketSizeConfig || t.bracketSizeConfig === 'auto') ? getTranslation('auto_size') : t('players_count', {count: t.bracketSizeConfig});
    
    const dateVal = t.created_at || t.createdAt;
    const dateStr = dateVal ? new Date(dateVal).toLocaleDateString() : 'Unknown';
    const statusStr = getTranslation(t.status || 'setup');
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
        <button class="btn-primary btn-sm" onclick="openTournament('${t.id}')"><i class="fa-solid fa-arrow-right"></i> ${getTranslation('open')}</button>
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
    if (qrImg && (!qrImg.getAttribute('src') || qrImg.getAttribute('src') === '')) {
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

  const showGenBtn = state.status === 'setup' && (state.players || []).length >= 2;
  const genBtn = document.getElementById('btn-generate-bracket');
  if (genBtn) genBtn.classList.toggle('hidden', !showGenBtn);

  if (isActive) {
    const btnPause = document.getElementById('btn-pause');
    if (state.status === 'paused') {
      btnPause.innerHTML = `<i class="fa-solid fa-play"></i> ${getTranslation('resume')}`;
      btnPause.className = 'btn-glow btn-pause-toggle';
    } else {
      btnPause.innerHTML = `<i class="fa-solid fa-pause"></i> ${getTranslation('pause')}`;
      btnPause.className = 'btn-secondary btn-pause-toggle';
    }
  }

  // Sync setup panel dropdowns to state
  if (!isActive) {
    const bsEl = document.getElementById('bracket-size');
    if (bsEl) bsEl.value = state.bracketSizeConfig || 'auto';
    const btEl = document.getElementById('bracket-type');
    if (btEl) btEl.value = state.bracketType || 'single';
    const tpEl = document.getElementById('include-third-place');
    if (tpEl) tpEl.checked = !!state.includeThirdPlace;

    const includeThirdPlaceGroup = document.getElementById('include-third-place-group');
    if (includeThirdPlaceGroup) {
      includeThirdPlaceGroup.classList.toggle('hidden', state.bracketType !== 'single');
    }
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
    setup:        { c: 'var(--warning)',        l: getTranslation('setup_phase') },
    registration: { c: 'var(--accent-cyan)',    l: getTranslation('registration') },
    running:      { c: 'var(--success)',        l: getTranslation('running') },
    paused:       { c: 'var(--warning)',        l: getTranslation('paused') },
    completed:    { c: '#9c27b0',              l: getTranslation('completed') }
  }[state.status] || { c: 'var(--warning)', l: getTranslation('setup_phase') };
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

function getSeedingOrder(size) {
  let order = [1];
  while (order.length < size) {
    const nextOrder = [];
    const target = order.length * 2 + 1;
    for (const s of order) {
      nextOrder.push(s);
      nextOrder.push(target - s);
    }
    order = nextOrder;
  }
  return order;
}

// ==========================================================================
// BRACKET GENERATION
// ==========================================================================
function generateBracket() {
  saveState();

  const size = computeActualBracketSize();
  state.bracketSize = size;

  // Pad with BYEs up to bracket size
  const playersList = state.players.map((p, idx) => ({ ...p, originalIndex: idx }));
  while (playersList.length < size) {
    playersList.push({ name: 'BYE', companyId: 'BYE', status: 'bye', originalIndex: playersList.length });
  }

  // Seeding distribution: Map players list to standard seeding order positions
  const seedingOrder = getSeedingOrder(size);
  const seeded = seedingOrder.map(seedNum => playersList[seedNum - 1]);

  if (state.bracketType === 'double' && size >= 4) {
    state.bracket = buildDoubleBracket(size, seeded);
    propagateDoubleElim();
  } else {
    state.bracket = buildSingleBracket(size, seeded);
    propagateSingleAll();
  }

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
    const p1Orig = seeded[p1i].originalIndex;
    const p2Orig = seeded[p2i].originalIndex;
    if (state && state.status === 'running') {
      if (p1B && p2B) { winner = p1Orig; status = 'completed'; }
      else if (p1B)   { winner = p2Orig; status = 'completed'; }
      else if (p2B)   { winner = p1Orig; status = 'completed'; }
    }
    r0.push({ id: `0-${i}`, players: [p1Orig, p2Orig], scores: [0,0], winner, status });
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

  // Include 3rd Place Match if single elimination and checked
  if (state.includeThirdPlace && size >= 4) {
    const finalRoundIdx = numRounds - 1;
    rounds[finalRoundIdx].push({
      id: `${finalRoundIdx}-3rd`,
      players: [-1, -1],
      scores: [0, 0],
      winner: null,
      status: 'pending',
      isThirdPlace: true
    });
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
    const p1Orig = seeded[p1i].originalIndex;
    const p2Orig = seeded[p2i].originalIndex;
    if (state && state.status === 'running') {
      if (p1B && p2B) { winner = p1Orig; status = 'completed'; }
      else if (p1B)   { winner = p2Orig; status = 'completed'; }
      else if (p2B)   { winner = p1Orig; status = 'completed'; }
    }
    wr0.push({ id: `w0-${i}`, players: [p1Orig, p2Orig], scores: [0,0], winner, status });
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

      // If semi-final round and 3rd place match exists, propagate loser to 3rd place match (next[1])
      if (state.includeThirdPlace && rIdx === state.bracket.rounds.length - 2 && next[1]) {
        const loser = match.players.find(p => p !== match.winner);
        next[1].players[slot] = loser !== undefined ? loser : -1;
      }
    } else {
      next[nextMatchIdx].players[slot] = -1;
      if (state.includeThirdPlace && rIdx === state.bracket.rounds.length - 2 && next[1]) {
        next[1].players[slot] = -1;
      }
    }
  });

  // Auto-complete byes in next round
  next.forEach(m => {
    if (m.status === 'completed') return;
    const [p1, p2] = m.players;
    if (p1 === -1 || p2 === -1) return;
    const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
    if (state && state.status === 'running') {
      if (p1B && p2B)    { m.winner = p1; m.status = 'completed'; }
      else if (p1B)      { m.winner = p2; m.status = 'completed'; }
      else if (p2B)      { m.winner = p1; m.status = 'completed'; }
    }
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
      if (state && state.status === 'running') {
        if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
        else if (p1B)   { m.winner = p2; m.status = 'completed'; }
        else if (p2B)   { m.winner = p1; m.status = 'completed'; }
      }
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
      if (state && state.status === 'running') {
        if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
        else if (p1B)   { m.winner = p2; m.status = 'completed'; }
        else if (p2B)   { m.winner = p1; m.status = 'completed'; }
      }
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

  // Size constraints for dynamic absolute coordinate layout
  const matchWidth = 260;
  const matchHeight = 110;
  const horizontalGap = 120; // column gap
  const roundWidth = matchWidth + horizontalGap;
  const initialVerticalGap = 40;
  const headerHeight = 60;

  // Calculate canvas dimensions dynamically
  const numRounds = rounds.length;
  const canvasWidth = numRounds * roundWidth + 100;

  // Winners Bracket layout logic (recursive vertical centering)
  // Store computed top coordinates in match objects for quick retrieval
  rounds.forEach((round, rIdx) => {
    round.forEach((match, mIdx) => {
      let topVal;
      if (rIdx === 0) {
        // Round 0: spaced evenly
        topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap);
      } else {
        // Subsequent rounds: center parent card between its two child cards
        const child1Top = rounds[rIdx - 1][mIdx * 2]?.yCoord;
        const child2Top = rounds[rIdx - 1][mIdx * 2 + 1]?.yCoord;
        if (child1Top !== undefined && child2Top !== undefined) {
          topVal = (child1Top + child2Top) / 2;
        } else if (child1Top !== undefined) {
          topVal = child1Top;
        } else {
          topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap * Math.pow(2, rIdx));
        }
      }
      match.yCoord = topVal;
      match.xCoord = rIdx * roundWidth;
    });
  });

  // Determine maximum height to scale canvas container bounds
  let maxContentHeight = 600;
  rounds[0].forEach((match) => {
    const bottom = match.yCoord + matchHeight + 100;
    if (bottom > maxContentHeight) maxContentHeight = bottom;
  });

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${maxContentHeight}px`;

  // SVG overlay for connector lines (placed first so nodes render on top)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'connector-svg');
  svg.id = `svg-${prefix}-${canvasId}`;
  svg.setAttribute('width', canvasWidth);
  svg.setAttribute('height', maxContentHeight);
  canvas.appendChild(svg);

  // Render rounds and match nodes
  rounds.forEach((round, rIdx) => {
    const col = document.createElement('div');
    col.className = 'round-column';
    col.style.position = 'absolute';
    col.style.left = `${rIdx * roundWidth}px`;
    col.style.top = '0px';
    col.style.width = `${matchWidth}px`;
    col.style.height = '100%';

    const header = document.createElement('div');
    header.className = 'round-title-header';
    header.style.position = 'absolute';
    header.style.top = '10px';
    header.style.width = '100%';
    header.style.margin = '0';
    const isFinal = rIdx === rounds.length - 1;
    if (prefix === 'w') {
      header.textContent = isFinal
        ? (state.bracket.type === 'double' ? getTranslation('winners_final') : getTranslation('final'))
        : t('round_num', { num: rIdx + 1 });
    } else {
      header.textContent = isFinal ? getTranslation('losers_final') : t('l_round_num', { num: rIdx + 1 });
    }
    col.appendChild(header);

    round.forEach((match, mIdx) => {
      const p1 = getPlayerInfo(match.players[0]);
      const p2 = getPlayerInfo(match.players[1]);

      const node = document.createElement('div');
      node.className = `match-node ${match.status}`;
      node.id = `mn-${prefix}-${canvasId}-${rIdx}-${mIdx}`;
      node.style.position = 'absolute';
      node.style.top = `${match.yCoord}px`;
      node.style.left = '0px';
      node.style.width = `${matchWidth}px`;
      node.style.height = `${matchHeight}px`;

      let hdrHtml = match.isThirdPlace ? getTranslation('third_place_match') : t('match_num', { num: mIdx + 1 });
      let hdrCls = '';
      if (match.status === 'in-progress') { hdrHtml = `<i class="fa-solid fa-gamepad"></i> ${getTranslation('playing')}`; hdrCls = 'active-tag'; }

      const p1W = match.winner === match.players[0] && match.status === 'completed';
      const p2W = match.winner === match.players[1] && match.status === 'completed';
      const clickable = !isLive && state.status === 'running';
      const clickStr = clickable ? `onclick="handleMatchClick('${prefix}','${canvasId}',${rIdx},${mIdx})"` : '';

      // Bye filler for setup (both brackets)
      const showByeFill = !isLive && (state.status === 'running' || state.status === 'setup') && match.status !== 'completed';
      const p1IsBye = (match.players[0] === -2 || (match.players[0] >= (state.players?.length || 0) && match.players[0] >= 0));
      const p2IsBye = (match.players[1] === -2 || (match.players[1] >= (state.players?.length || 0) && match.players[1] >= 0));

      // Calculate Seed Numbers for Winners Round 0 matches in setup mode
      const seedingOrder = getSeedingOrder(rounds[0].length * 2);
      const seed1 = seedingOrder[mIdx * 2];
      const seed2 = seedingOrder[mIdx * 2 + 1];

      const isSeedLocked1 = (state.lockedSeeds || []).includes(seed1);
      const isSeedLocked2 = (state.lockedSeeds || []).includes(seed2);

      const canDrag = !isLive && state.status === 'setup' && prefix === 'w' && rIdx === 0;

      let p1RowPrefix = '';
      let p2RowPrefix = '';
      let p1RowSuffix = '';
      let p2RowSuffix = '';

      if (!isLive && prefix === 'w' && rIdx === 0) {
        // Show Seed Badge and Lock/Unlock Icon
        const lockIcon1 = isSeedLocked1 ? 'fa-lock' : 'fa-lock-open';
        const lockIcon2 = isSeedLocked2 ? 'fa-lock' : 'fa-lock-open';
        const lockClass1 = isSeedLocked1 ? 'locked' : '';
        const lockClass2 = isSeedLocked2 ? 'locked' : '';

        p1RowPrefix = `<span class="seed-badge">Seed #${seed1}</span>`;
        p2RowPrefix = `<span class="seed-badge">Seed #${seed2}</span>`;

        if (state.status === 'setup') {
          p1RowSuffix = `<button class="btn-lock-seed ${lockClass1}" onclick="event.stopPropagation(); toggleSeedLock(${seed1})"><i class="fa-solid ${lockIcon1}"></i></button>`;
          p2RowSuffix = `<button class="btn-lock-seed ${lockClass2}" onclick="event.stopPropagation(); toggleSeedLock(${seed2})"><i class="fa-solid ${lockIcon2}"></i></button>`;
        }
      }

      const p1Row = showByeFill && p1IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},0)"><i class="fa-solid fa-user-plus"></i> ${getTranslation('fill_slot')}</button>`
        : `<span class="team-name" title="${escapeHTML(p1.name)}">${p1RowPrefix}${escapeHTML(p1.name)}</span><span class="team-score">${p1W ? 'W' : ''}</span>${p1RowSuffix}`;

      const p2Row = showByeFill && p2IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},1)"><i class="fa-solid fa-user-plus"></i> ${getTranslation('fill_slot')}</button>`
        : `<span class="team-name" title="${escapeHTML(p2.name)}">${p2RowPrefix}${escapeHTML(p2.name)}</span><span class="team-score">${p2W ? 'W' : ''}</span>${p2RowSuffix}`;

      const drAttr1 = canDrag ? `draggable="true" data-seed="${seed1}"` : '';
      const drAttr2 = canDrag ? `draggable="true" data-seed="${seed2}"` : '';
      const dragClass1 = canDrag ? 'draggable' : '';
      const dragClass2 = canDrag ? 'draggable' : '';
      const lockedSeedClass1 = isSeedLocked1 ? 'locked-seed' : '';
      const lockedSeedClass2 = isSeedLocked2 ? 'locked-seed' : '';

      node.innerHTML = `
        <div class="match-node-header ${hdrCls}">${hdrHtml}</div>
        <div class="team-row ${p1W ? 'winner' : ''} ${p2W ? 'loser' : ''} ${p1.cls} ${dragClass1} ${lockedSeedClass1}" ${drAttr1} ${clickStr}>${p1Row}</div>
        <div class="team-row ${p2W ? 'winner' : ''} ${p1W ? 'loser' : ''} ${p2.cls} ${dragClass2} ${lockedSeedClass2}" ${drAttr2} ${clickStr}>${p2Row}</div>
      `;
      col.appendChild(node);
    });

    canvas.appendChild(col);
  });

  // Draw connectors after layout paint
  setTimeout(() => drawConnectors(canvas, `svg-${prefix}-${canvasId}`, rounds, prefix, canvasId), 80);
}

// ==========================================================================
// SVG CONNECTOR LINES — FIXED: use canvas-local offsetLeft/offsetTop
// ==========================================================================
function drawConnectors(canvas, svgId, rounds, prefix, canvasId) {
  const svg = document.getElementById(svgId);
  if (!svg || !rounds) return;

  svg.innerHTML = '';
  const matchWidth = 260;
  const matchHeight = 110;

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

  // Reset state and center the view dynamically based on generated bracket size
  setTimeout(() => {
    centerBracketView(canvasId, containerId);
  }, 50);

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

function centerBracketView(canvasId, containerId) {
  const canvas = document.getElementById(canvasId);
  const container = document.getElementById(containerId);
  if (!canvas || !container) return;

  const originalTransform = canvas.style.transform;
  canvas.style.transform = 'none';

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  let contentWidth = canvas.scrollWidth;
  let contentHeight = canvas.scrollHeight;

  canvas.style.transform = originalTransform;

  if (contentWidth <= 0 || contentHeight <= 0) {
    zoomScale = 0.75;
    panX = 40;
    panY = 50;
    applyTransform(canvasId);
    return;
  }

  const zoomX = (containerWidth * 0.9) / contentWidth;
  const zoomY = (containerHeight * 0.9) / contentHeight;
  zoomScale = Math.min(zoomX, zoomY, 1.2);
  zoomScale = Math.max(zoomScale, 0.2);
  zoomScale = Math.round(zoomScale * 100) / 100;

  panX = Math.round((containerWidth - contentWidth * zoomScale) / 2);
  panY = Math.round((containerHeight - contentHeight * zoomScale) / 2);

  applyTransform(canvasId);
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
  } else if (prefix === 'gfr') {
    match = state.bracket.grandFinalReset;
  } else if (prefix === 'w') {
    match = state.bracket.type === 'double'
      ? state.bracket.winnersRounds?.[rIdx]?.[mIdx]
      : state.bracket.rounds?.[rIdx]?.[mIdx];
  } else if (prefix === 'l') {
    match = state.bracket.losersRounds?.[rIdx]?.[mIdx];
  }

  if (!match) return;
  if (match.players[0] === -1 || match.players[1] === -1) {
    showToast(getTranslation('match_not_seeded'), 'info'); return;
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
  if (prefix === 'gfr') return state.bracket.grandFinalReset;
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
    showToast(getTranslation('player_not_found_matches'), 'info');
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
  if (title) title.textContent = (state.status === 'running' || state.status === 'paused') ? getTranslation('replace_player_locked') : getTranslation('edit_participant');
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

  const searchVal = document.getElementById('participants-tab-search')?.value.toLowerCase().trim() || '';
  const filterVal = document.getElementById('participants-tab-filter')?.value || 'all';

  // Map players to track their original indexes for actions
  const filteredPlayers = state.players
    .map((p, idx) => ({ ...p, originalIndex: idx }))
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.companyId.toLowerCase().includes(searchVal);
      const matchesFilter = filterVal === 'all' || (p.status || 'active') === filterVal;
      return matchesSearch && matchesFilter;
    });

  const itemsPerPage = 20;
  const totalItems = filteredPlayers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  if (participantsCurrentPage > totalPages) {
    participantsCurrentPage = totalPages;
  }

  const startIndex = (participantsCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pagePlayers = filteredPlayers.slice(startIndex, startIndex + itemsPerPage);

  // Render pagination info
  const infoEl = document.getElementById('participants-pagination-info');
  if (infoEl) {
    infoEl.textContent = t('showing_info', { start: totalItems ? startIndex + 1 : 0, end: endIndex, total: totalItems });
  }

  // Render pagination buttons
  const buttonsEl = document.getElementById('participants-pagination-buttons');
  if (buttonsEl) {
    buttonsEl.innerHTML = '';
    if (totalPages > 1) {
      // Prev button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'btn-secondary btn-sm';
      prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      prevBtn.disabled = participantsCurrentPage === 1;
      prevBtn.addEventListener('click', () => {
        participantsCurrentPage--;
        renderParticipantsTable();
      });
      buttonsEl.appendChild(prevBtn);

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `btn-sm ${participantsCurrentPage === i ? 'btn-primary' : 'btn-secondary'}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
          participantsCurrentPage = i;
          renderParticipantsTable();
        });
        buttonsEl.appendChild(pageBtn);
      }

      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn-secondary btn-sm';
      nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
      nextBtn.disabled = participantsCurrentPage === totalPages;
      nextBtn.addEventListener('click', () => {
        participantsCurrentPage++;
        renderParticipantsTable();
      });
      buttonsEl.appendChild(nextBtn);
    }
  }

  if (!totalItems) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-list-placeholder">${getTranslation('no_matching_participants')}</td></tr>`;
    return;
  }

  pagePlayers.forEach((item, idx) => {
    const tr = document.createElement('tr');
    const p = item;
    const realIdx = item.originalIndex;
    
    let seedingBtns = '';
    if (state.status === 'setup') {
      tr.dataset.index = realIdx;
      seedingBtns = `
        <div class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></div>
        <div class="btn-seeding-container" style="display:flex;gap:0.25rem">
          <button class="btn-icon-sm" onclick="movePlayerSeeding(${realIdx}, -1)" ${realIdx === 0 ? 'disabled' : ''} title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>
          <button class="btn-icon-sm" onclick="movePlayerSeeding(${realIdx}, 1)" ${realIdx === state.players.length - 1 ? 'disabled' : ''} title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
      `;
    }

    const pStatus = p.status || 'active';

    tr.innerHTML = `
      <td>${realIdx + 1}</td>
      <td><input type="text" class="table-input" value="${escapeHTML(p.name)}" onchange="updatePlayerFromTable(${realIdx},'name',this.value)"></td>
      <td><input type="text" class="table-input" value="${escapeHTML(p.companyId)}" onchange="updatePlayerFromTable(${realIdx},'companyId',this.value)"></td>
      <td><span class="badge-status ${pStatus}">${pStatus.toUpperCase()}</span></td>
      <td>
        <div style="display:flex;gap:0.35rem;align-items:center">
          ${seedingBtns}
          <button class="btn-icon-sm" onclick="openEditPlayerModal(${realIdx})" title="Edit"><i class="fa-solid fa-user-pen"></i></button>
          <button class="btn-icon-sm" onclick="deletePlayer(${realIdx})" title="Delete" style="background:rgba(255,71,87,0.1);border-color:rgba(255,71,87,0.3);color:var(--danger)"><i class="fa-solid fa-trash"></i></button>
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
  saveState(true, false);
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
  navigator.clipboard.writeText(text).then(() => showToast(getTranslation('copied_to_clipboard'), 'success'))
    .catch(() => showToast(getTranslation('copy_failed'), 'error'));
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
    if (!tid) { showRegMsg(getTranslation('reg_missing_id'), 'error'); return; }

    const name = document.getElementById('reg-name').value.trim();
    const companyId = document.getElementById('reg-company-id').value.trim();
    if (!name || !companyId) { showRegMsg(getTranslation('reg_fill_fields'), 'error'); return; }

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

      showRegMsg(getTranslation('reg_success'), 'success');
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
      setup:        { c: 'var(--warning)',     l: getTranslation('setup_phase') },
      registration: { c: 'var(--accent-cyan)', l: getTranslation('registration') },
      running:      { c: 'var(--success)',     l: getTranslation('running') },
      paused:       { c: 'var(--warning)',     l: getTranslation('paused') },
      completed:    { c: '#9c27b0',           l: getTranslation('completed') }
    }[state.status] || { c: 'var(--warning)', l: getTranslation('setup_phase') };
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
  // Language switcher event listener
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-lang');
    if (btn) {
      const lang = btn.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('apex_bracket_lang', lang);
        translatePage();
        
        // Refresh views to translate dynamic parts
        const params = new URLSearchParams(window.location.search);
        if (params.has('view') && params.get('view') === 'live') {
          renderLiveView();
        } else if (params.has('register')) {
          renderRegistrationView();
        } else {
          if (state) {
            renderHostView();
          }
          renderTournamentHub();
        }
      }
    }
  });

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
  document.getElementById('btn-generate-bracket')?.addEventListener('click', () => {
    if (!state || state.players.length < 2) { showToast('Need at least 2 players to start!', 'error'); return; }
    generateBracket();
  });
  document.getElementById('btn-start').addEventListener('click', () => {
    if (!state || state.players.length < 2) { showToast('Need at least 2 players to start!', 'error'); return; }
    saveState();
    if (!state.bracket) {
      generateBracket();
    }
    state.status = 'running';
    
    // Auto-advance byes when starting the tournament
    if (state.bracket.type === 'double') {
      state.bracket.winnersRounds[0].forEach(m => {
        const [p1, p2] = m.players;
        const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
        if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
        else if (p1B)   { m.winner = p2; m.status = 'completed'; }
        else if (p2B)   { m.winner = p1; m.status = 'completed'; }
      });
      propagateDoubleElim();
    } else {
      state.bracket.rounds[0].forEach(m => {
        const [p1, p2] = m.players;
        const p1B = isByePlayer(p1), p2B = isByePlayer(p2);
        if (p1B && p2B) { m.winner = p1; m.status = 'completed'; }
        else if (p1B)   { m.winner = p2; m.status = 'completed'; }
        else if (p2B)   { m.winner = p1; m.status = 'completed'; }
      });
      propagateSingleAll();
    }
    
    saveState(false);
    renderHostView();
  });

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

  // Participants tab table search and filter
  const tabSearch = document.getElementById('participants-tab-search');
  if (tabSearch) {
    tabSearch.addEventListener('input', () => {
      participantsCurrentPage = 1;
      renderParticipantsTable();
    });
  }

  const tabFilter = document.getElementById('participants-tab-filter');
  if (tabFilter) {
    tabFilter.addEventListener('change', () => {
      participantsCurrentPage = 1;
      renderParticipantsTable();
    });
  }

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

  document.getElementById('include-third-place').addEventListener('change', (e) => {
    if (!state) return;
    saveState();
    state.includeThirdPlace = e.target.checked;
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

  // Refresh participants list
  document.getElementById('btn-refresh-participants').addEventListener('click', async () => {
    if (!state) return;
    try {
      const btn = document.getElementById('btn-refresh-participants');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Refreshing...';
      
      await fetchTournamentState(state.id);
      
      renderParticipantsTable();
      renderSidebarPlayers();
      
      showToast('Participants list refreshed.', 'success');
    } catch (err) {
      console.error('Failed to refresh participants:', err);
      showToast('Could not refresh participants.', 'error');
    } finally {
      const btn = document.getElementById('btn-refresh-participants');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Refresh';
      }
    }
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
    centerBracketView('bracket-canvas', 'bracket-canvas-container');
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
    centerBracketView('live-bracket-canvas', 'live-bracket-canvas-container');
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

  // Import CSV
  const btnImportCsv = document.getElementById('btn-import-csv');
  const csvFileInput = document.getElementById('csv-file-input');
  if (btnImportCsv && csvFileInput) {
    btnImportCsv.addEventListener('click', () => {
      csvFileInput.click();
    });
    csvFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/);
        const parsed = [];
        
        for (let line of lines) {
          line = line.trim();
          if (!line) continue;
          const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
          // Ignore header row if first item is '#', 'name', 'id', 'status', etc.
          if (parts[0] === '#' || parts[0].toLowerCase().includes('name') || parts[0].toLowerCase().includes('id')) {
            continue;
          }
          if (parts.length >= 3) {
            // format: #, Name, Company ID, Status or Name, Company ID, Status
            const name = parts[1];
            const companyId = parts[2];
            parsed.push({ name, companyId });
          } else if (parts.length === 2) {
            // format: Name, Company ID
            parsed.push({ name: parts[0], companyId: parts[1] });
          } else if (parts.length === 1 && parts[0]) {
            parsed.push({ name: parts[0], companyId: `ID-${Math.floor(Math.random() * 10000)}` });
          }
        }
        
        if (parsed.length === 0) {
          showToast('No valid participants found in CSV.', 'error');
          return;
        }
        
        saveState();
        let importedCount = 0;
        for (const p of parsed) {
          if (!p.name) continue;
          // Check if companyId already exists to prevent duplicates
          if (!state.players.some(existing => existing.companyId.toLowerCase() === p.companyId.toLowerCase())) {
            state.players.push({ name: p.name, companyId: p.companyId || `ID-${Math.floor(Math.random() * 10000)}`, status: 'active' });
            importedCount++;
          }
        }
        saveState(false);
        renderHostView();
        showToast(`Successfully imported ${importedCount} participants!`, 'success');
        
        // Reset file input value so user can upload the same file again if needed
        csvFileInput.value = '';
      };
      reader.readAsText(file);
    });
  }

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
    const regDuration = 60; // Default to 1 minute, configurable on setup panel

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

  // Bracket View Drag & Drop Seeding swaps
  const bracketContainers = [
    document.getElementById('bracket-canvas-container'),
    document.getElementById('losers-bracket-canvas-container')
  ];

  bracketContainers.forEach(container => {
    if (!container) return;

    container.addEventListener('dragstart', (e) => {
      const row = e.target.closest('.team-row.draggable');
      if (!row || state.status !== 'setup') return;
      const seed = parseInt(row.dataset.seed);
      if ((state.lockedSeeds || []).includes(seed)) {
        e.preventDefault();
        showToast('This seed slot is locked.', 'warning');
        return;
      }
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'bracket', seed }));
      row.classList.add('dragging');
    });

    container.addEventListener('dragover', (e) => {
      const row = e.target.closest('.team-row.draggable');
      if (!row || state.status !== 'setup') return;
      e.preventDefault();
      const seed = parseInt(row.dataset.seed);
      if ((state.lockedSeeds || []).includes(seed)) return;
      row.classList.add('drag-over');
    });

    container.addEventListener('dragleave', (e) => {
      const row = e.target.closest('.team-row.draggable');
      if (row) row.classList.remove('drag-over');
    });

    container.addEventListener('drop', (e) => {
      const row = e.target.closest('.team-row.draggable');
      if (!row || state.status !== 'setup') return;
      e.preventDefault();
      row.classList.remove('drag-over');
      
      const targetSeed = parseInt(row.dataset.seed);
      if ((state.lockedSeeds || []).includes(targetSeed)) {
        showToast('Target seed slot is locked.', 'warning');
        return;
      }

      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data && data.type === 'bracket') {
          const sourceSeed = data.seed;
          if (sourceSeed !== targetSeed) {
            swapPlayerSeeds(sourceSeed, targetSeed);
          }
        }
      } catch (err) {
        console.error(err);
      }
    });

    container.addEventListener('dragend', (e) => {
      container.querySelectorAll('.team-row.draggable').forEach(r => r.classList.remove('dragging', 'drag-over'));
    });
  });
}

function toggleSeedLock(seedNum) {
  if (!state) return;
  state.lockedSeeds = state.lockedSeeds || [];
  const idx = state.lockedSeeds.indexOf(seedNum);
  if (idx > -1) {
    state.lockedSeeds.splice(idx, 1);
    showToast(t('seed_unlocked_toast', { num: seedNum }) || `Seed #${seedNum} unlocked.`, 'info');
  } else {
    state.lockedSeeds.push(seedNum);
    showToast(t('seed_locked_toast', { num: seedNum }) || `Seed #${seedNum} locked.`, 'info');
  }
  saveState(false);
  renderHostView();
}

function swapPlayerSeeds(srcSeed, tgtSeed) {
  if (!state || state.status !== 'setup') return;
  saveState();

  const size = state.bracketSize || computeActualBracketSize();
  const seedingOrder = getSeedingOrder(size);
  
  // Find array index in state.players using seeding order
  const srcPlayerIdx = seedingOrder.indexOf(srcSeed);
  const tgtPlayerIdx = seedingOrder.indexOf(tgtSeed);

  if (srcPlayerIdx > -1 && tgtPlayerIdx > -1) {
    const temp = state.players[srcPlayerIdx];
    state.players[srcPlayerIdx] = state.players[tgtPlayerIdx];
    state.players[tgtPlayerIdx] = temp;
    
    saveState(false);
    generateBracket();
    showToast(`Swapped Seed #${srcSeed} and Seed #${tgtSeed}`, 'success');
  }
}

// ==========================================================================
// UNIFIED DOUBLE ELIMINATION CANVAS RENDERER
// ==========================================================================
function renderUnifiedDoubleBracket(canvasId, isLive) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !state || !state.bracket) return;
  canvas.innerHTML = '';

  // SVG overlay for connector lines
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'connector-svg');
  svg.id = `svg-unified-${canvasId}`;
  canvas.appendChild(svg);

  // Create layout wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'unified-layout-wrapper';

  const bracketsCol = document.createElement('div');
  bracketsCol.className = 'unified-brackets-column';

  // 1. Winners Bracket Row
  const winnersRow = document.createElement('div');
  winnersRow.className = 'unified-bracket-row winners-row';
  const winnersLabel = document.createElement('div');
  winnersLabel.className = 'unified-row-label';
  winnersLabel.textContent = getTranslation('winners_bracket');
  winnersRow.appendChild(winnersLabel);

  const winnersRoundsCont = document.createElement('div');
  winnersRoundsCont.className = 'unified-rounds-container';
  renderRoundColumnsInto(winnersRoundsCont, state.bracket.winnersRounds, 'w', canvasId, isLive);
  winnersRow.appendChild(winnersRoundsCont);
  bracketsCol.appendChild(winnersRow);

  // 2. Losers Bracket Row
  const losersRow = document.createElement('div');
  losersRow.className = 'unified-bracket-row losers-row';
  const losersLabel = document.createElement('div');
  losersLabel.className = 'unified-row-label';
  losersLabel.textContent = getTranslation('losers_bracket');
  losersRow.appendChild(losersLabel);

  const losersRoundsCont = document.createElement('div');
  losersRoundsCont.className = 'unified-rounds-container';
  renderRoundColumnsInto(losersRoundsCont, state.bracket.losersRounds, 'l', canvasId, isLive);
  losersRow.appendChild(losersRoundsCont);
  bracketsCol.appendChild(losersRow);

  wrapper.appendChild(bracketsCol);

  // 3. Grand Final Column (placed on the right)
  const gfCol = document.createElement('div');
  gfCol.className = 'unified-gf-column';
  const gfLabel = document.createElement('div');
  gfLabel.className = 'unified-row-label';
  gfLabel.textContent = getTranslation('grand_final');
  gfCol.appendChild(gfLabel);

  const gfMatchCont = document.createElement('div');
  gfMatchCont.className = 'unified-gf-match-container';
  renderGrandFinalInto(gfMatchCont, canvasId, isLive);
  gfCol.appendChild(gfMatchCont);
  wrapper.appendChild(gfCol);

  canvas.appendChild(wrapper);

  // Draw connector lines for all sections
  setTimeout(() => {
    drawUnifiedConnectors(canvas, `svg-unified-${canvasId}`, canvasId);
  }, 120);
}

function renderRoundColumnsInto(container, rounds, prefix, canvasId, isLive) {
  if (!rounds || !rounds.length) return;

  const matchWidth = 260;
  const matchHeight = 110;
  const horizontalGap = 120;
  const roundWidth = matchWidth + horizontalGap;
  const initialVerticalGap = 40;
  const headerHeight = 60;

  // Calculate top/left absolute coordinates recursively
  rounds.forEach((round, rIdx) => {
    round.forEach((match, mIdx) => {
      let topVal;
      if (prefix === 'w') {
        // Winners Bracket
        if (rIdx === 0) {
          topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap);
        } else {
          const child1Top = rounds[rIdx - 1][mIdx * 2]?.yCoord;
          const child2Top = rounds[rIdx - 1][mIdx * 2 + 1]?.yCoord;
          if (child1Top !== undefined && child2Top !== undefined) {
            topVal = (child1Top + child2Top) / 2;
          } else if (child1Top !== undefined) {
            topVal = child1Top;
          } else {
            topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap * Math.pow(2, rIdx));
          }
        }
      } else {
        // Losers Bracket
        if (rIdx === 0) {
          // Space LR0 matches wider (same spacing as Winners Round 1 since it has half the matches of WR0)
          topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap * 2.5 + matchHeight / 2);
        } else if (rIdx % 2 === 1) {
          // External Round: same number of matches as previous losers round. Align directly.
          topVal = rounds[rIdx - 1][mIdx]?.yCoord;
        } else {
          // Internal Round: half the number of matches as previous losers round. Center between them.
          const child1Top = rounds[rIdx - 1][mIdx * 2]?.yCoord;
          const child2Top = rounds[rIdx - 1][mIdx * 2 + 1]?.yCoord;
          if (child1Top !== undefined && child2Top !== undefined) {
            topVal = (child1Top + child2Top) / 2;
          } else if (child1Top !== undefined) {
            topVal = child1Top;
          } else {
            topVal = headerHeight + mIdx * (matchHeight + initialVerticalGap * Math.pow(2, Math.floor(rIdx / 2) + 1));
          }
        }
      }
      match.yCoord = topVal;
      match.xCoord = rIdx * roundWidth;
    });
  });

  rounds.forEach((round, rIdx) => {
    const col = document.createElement('div');
    col.className = 'round-column';
    col.style.position = 'absolute';
    col.style.left = `${rIdx * roundWidth}px`;
    col.style.top = '0px';
    col.style.width = `${matchWidth}px`;
    col.style.height = '100%';

    const header = document.createElement('div');
    header.className = 'round-title-header';
    header.style.position = 'absolute';
    header.style.top = '10px';
    header.style.width = '100%';
    header.style.margin = '0';
    const isFinal = rIdx === rounds.length - 1;
    if (prefix === 'w') {
      header.textContent = isFinal
        ? (state.bracket.type === 'double' ? getTranslation('winners_final') : getTranslation('final'))
        : t('round_num', {num: rIdx + 1});
    } else {
      header.textContent = isFinal ? getTranslation('losers_final') : t('l_round_num', {num: rIdx + 1});
    }
    col.appendChild(header);

    round.forEach((match, mIdx) => {
      const p1 = getPlayerInfo(match.players[0]);
      const p2 = getPlayerInfo(match.players[1]);

      const node = document.createElement('div');
      node.className = `match-node ${match.status}`;
      node.id = `mn-${prefix}-${canvasId}-${rIdx}-${mIdx}`;
      node.style.position = 'absolute';
      node.style.top = `${match.yCoord}px`;
      node.style.left = '0px';
      node.style.width = `${matchWidth}px`;
      node.style.height = `${matchHeight}px`;

      let hdrHtml = match.isThirdPlace ? getTranslation('third_place_match') : t('match_num', {num: mIdx + 1});
      let hdrCls = '';
      if (match.status === 'in-progress') { hdrHtml = `<i class="fa-solid fa-gamepad"></i> ${getTranslation('playing')}`; hdrCls = 'active-tag'; }

      const p1W = match.winner === match.players[0] && match.status === 'completed';
      const p2W = match.winner === match.players[1] && match.status === 'completed';
      const clickable = !isLive && state.status === 'running';
      const clickStr = clickable ? `onclick="handleMatchClick('${prefix}','${canvasId}',${rIdx},${mIdx})"` : '';

      const showByeFill = !isLive && (state.status === 'running' || state.status === 'setup') && match.status !== 'completed';
      const p1IsBye = (match.players[0] === -2 || (match.players[0] >= (state.players?.length || 0) && match.players[0] >= 0));
      const p2IsBye = (match.players[1] === -2 || (match.players[1] >= (state.players?.length || 0) && match.players[1] >= 0));

      // Calculate Seed Numbers for Winners Round 0 matches in setup mode
      const seedingOrder = getSeedingOrder(rounds[0].length * 2);
      const seed1 = seedingOrder[mIdx * 2];
      const seed2 = seedingOrder[mIdx * 2 + 1];

      const isSeedLocked1 = (state.lockedSeeds || []).includes(seed1);
      const isSeedLocked2 = (state.lockedSeeds || []).includes(seed2);

      const canDrag = !isLive && state.status === 'setup' && prefix === 'w' && rIdx === 0;

      let p1RowPrefix = '';
      let p2RowPrefix = '';
      let p1RowSuffix = '';
      let p2RowSuffix = '';

      if (!isLive && prefix === 'w' && rIdx === 0) {
        const lockIcon1 = isSeedLocked1 ? 'fa-lock' : 'fa-lock-open';
        const lockIcon2 = isSeedLocked2 ? 'fa-lock' : 'fa-lock-open';
        const lockClass1 = isSeedLocked1 ? 'locked' : '';
        const lockClass2 = isSeedLocked2 ? 'locked' : '';

        p1RowPrefix = `<span class="seed-badge">Seed #${seed1}</span>`;
        p2RowPrefix = `<span class="seed-badge">Seed #${seed2}</span>`;

        if (state.status === 'setup') {
          p1RowSuffix = `<button class="btn-lock-seed ${lockClass1}" onclick="event.stopPropagation(); toggleSeedLock(${seed1})"><i class="fa-solid ${lockIcon1}"></i></button>`;
          p2RowSuffix = `<button class="btn-lock-seed ${lockClass2}" onclick="event.stopPropagation(); toggleSeedLock(${seed2})"><i class="fa-solid ${lockIcon2}"></i></button>`;
        }
      }

      const p1Row = showByeFill && p1IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},0)"><i class="fa-solid fa-user-plus"></i> ${getTranslation('fill_slot')}</button>`
        : `<span class="team-name" title="${escapeHTML(p1.name)}">${p1RowPrefix}${escapeHTML(p1.name)}</span><span class="team-score">${p1W ? 'W' : ''}</span>${p1RowSuffix}`;

      const p2Row = showByeFill && p2IsBye
        ? `<button class="bye-direct-input" onclick="event.stopPropagation();fillByeSlotDirectly('${prefix}','${canvasId}',${rIdx},${mIdx},1)"><i class="fa-solid fa-user-plus"></i> ${getTranslation('fill_slot')}</button>`
        : `<span class="team-name" title="${escapeHTML(p2.name)}">${p2RowPrefix}${escapeHTML(p2.name)}</span><span class="team-score">${p2W ? 'W' : ''}</span>${p2RowSuffix}`;

      const drAttr1 = canDrag ? `draggable="true" data-seed="${seed1}"` : '';
      const drAttr2 = canDrag ? `draggable="true" data-seed="${seed2}"` : '';
      const dragClass1 = canDrag ? 'draggable' : '';
      const dragClass2 = canDrag ? 'draggable' : '';
      const lockedSeedClass1 = isSeedLocked1 ? 'locked-seed' : '';
      const lockedSeedClass2 = isSeedLocked2 ? 'locked-seed' : '';

      node.innerHTML = `
        <div class="match-node-header ${hdrCls}">${hdrHtml}</div>
        <div class="team-row ${p1W ? 'winner' : ''} ${p2W ? 'loser' : ''} ${p1.cls} ${dragClass1} ${lockedSeedClass1}" ${drAttr1} ${clickStr}>${p1Row}</div>
        <div class="team-row ${p2W ? 'winner' : ''} ${p1W ? 'loser' : ''} ${p2.cls} ${dragClass2} ${lockedSeedClass2}" ${drAttr2} ${clickStr}>${p2Row}</div>
      `;
      col.appendChild(node);
    });

    container.appendChild(col);
  });

  // Calculate and set the container's height dynamically based on the round matches bounds
  let maxContentHeight = 600;
  rounds[0].forEach((match) => {
    const bottom = match.yCoord + matchHeight + 100;
    if (bottom > maxContentHeight) maxContentHeight = bottom;
  });
  container.style.height = `${maxContentHeight}px`;
}

function renderGrandFinalInto(container, canvasId, isLive) {
  const gf = state.bracket.grandFinal;
  if (!gf) return;

  const col = document.createElement('div');
  col.className = 'round-column';
  col.style.position = 'relative';
  col.style.width = '260px';
  col.style.height = '100%';

  const header = document.createElement('div');
  header.className = 'round-title-header';
  header.style.position = 'absolute';
  header.style.top = '10px';
  header.style.width = '100%';
  header.style.margin = '0';
  header.textContent = getTranslation('grand_final');
  col.appendChild(header);

  const p1 = getPlayerInfo(gf.players[0]);
  const p2 = getPlayerInfo(gf.players[1]);

  const node = document.createElement('div');
  node.className = `match-node ${gf.status}`;
  node.id = `mn-gf-${canvasId}-0-0`;
  node.style.position = 'absolute';
  node.style.top = '160px';
  node.style.left = '0px';
  node.style.width = '260px';
  node.style.height = '90px';

  let hdrHtml = getTranslation('grand_final');
  let hdrCls = '';
  if (gf.status === 'in-progress') { hdrHtml = `<i class="fa-solid fa-gamepad"></i> ${getTranslation('playing')}`; hdrCls = 'active-tag'; }

  const p1W = gf.winner === gf.players[0] && gf.status === 'completed';
  const p2W = gf.winner === gf.players[1] && gf.status === 'completed';
  const clickable = !isLive && state.status === 'running';
  const clickStr = clickable ? `onclick="handleMatchClick('gf','${canvasId}',0,0)"` : '';

  const p1Row = `<span class="team-name" title="${escapeHTML(p1.name)}">${escapeHTML(p1.name)}</span><span class="team-score">${p1W ? 'W' : ''}</span>`;
  const p2Row = `<span class="team-name" title="${escapeHTML(p2.name)}">${escapeHTML(p2.name)}</span><span class="team-score">${p2W ? 'W' : ''}</span>`;

  node.innerHTML = `
    <div class="match-node-header ${hdrCls}">${hdrHtml}</div>
    <div class="team-row ${p1W ? 'winner' : ''} ${p2W ? 'loser' : ''} ${p1.cls}" ${clickStr}>${p1Row}</div>
    <div class="team-row ${p2W ? 'winner' : ''} ${p1W ? 'loser' : ''} ${p2.cls}" ${clickStr}>${p2Row}</div>
  `;
  col.appendChild(node);

  if (gf.status === 'completed' && gf.winner === gf.players[1]) {
    const nodeReset = document.createElement('div');
    const gfReset = state.bracket.grandFinalReset || { id: 'gfr', players: [gf.players[0], gf.players[1]], scores: [0,0], winner: null, status: 'pending' };
    state.bracket.grandFinalReset = gfReset;

    nodeReset.className = `match-node ${gfReset.status}`;
    nodeReset.id = `mn-gfr-${canvasId}-0-0`;
    nodeReset.style.position = 'absolute';
    nodeReset.style.top = '280px';
    nodeReset.style.left = '0px';
    nodeReset.style.width = '260px';
    nodeReset.style.height = '90px';

    const pr1 = getPlayerInfo(gfReset.players[0]);
    const pr2 = getPlayerInfo(gfReset.players[1]);
    const pr1W = gfReset.winner === gfReset.players[0] && gfReset.status === 'completed';
    const pr2W = gfReset.winner === gfReset.players[1] && gfReset.status === 'completed';
    const clickStrReset = clickable ? `onclick="handleMatchClick('gfr','${canvasId}',0,0)"` : '';

    const pr1Row = `<span class="team-name" title="${escapeHTML(pr1.name)}">${escapeHTML(pr1.name)}</span><span class="team-score">${pr1W ? 'W' : ''}</span>`;
    const pr2Row = `<span class="team-name" title="${escapeHTML(pr2.name)}">${escapeHTML(pr2.name)}</span><span class="team-score">${pr2W ? 'W' : ''}</span>`;

    nodeReset.innerHTML = `
      <div class="match-node-header ${gfReset.status === 'in-progress' ? 'active-tag' : ''}">GF Bracket Reset</div>
      <div class="team-row ${pr1W ? 'winner' : ''} ${pr2W ? 'loser' : ''} ${pr1.cls}" ${clickStrReset}>${pr1Row}</div>
      <div class="team-row ${pr2W ? 'winner' : ''} ${pr1W ? 'loser' : ''} ${pr2.cls}" ${clickStrReset}>${pr2Row}</div>
    `;
    col.appendChild(nodeReset);
  }

  container.appendChild(col);
}

function drawUnifiedConnectors(canvas, svgId, canvasId) {
  const svg = document.getElementById(svgId);
  if (!svg || !state?.bracket) return;

  svg.innerHTML = '';
  
  // Set dimensions dynamically based on parent scroll dimensions
  const scrollW = Math.max(canvas.scrollWidth, 2400);
  const scrollH = Math.max(canvas.scrollHeight, 1200);
  svg.setAttribute('width', scrollW);
  svg.setAttribute('height', scrollH);

  // 1. Winners Bracket connectors
  drawConnectorGroup(svg, canvas, 'w', canvasId, state.bracket.winnersRounds);

  // 2. Losers Bracket connectors
  drawConnectorGroup(svg, canvas, 'l', canvasId, state.bracket.losersRounds);

  // 3. Connect Winners Final to Grand Final
  const wfRIdx = state.bracket.winnersRounds.length - 1;
  const wfId = `mn-w-${canvasId}-${wfRIdx}-0`;
  const gfId = `mn-gf-${canvasId}-0-0`;
  drawSingleConnectorLine(svg, canvas, wfId, gfId);

  // 4. Connect Losers Final to Grand Final
  const lfRIdx = state.bracket.losersRounds.length - 1;
  const lfId = `mn-l-${canvasId}-${lfRIdx}-0`;
  drawSingleConnectorLine(svg, canvas, lfId, gfId);

  // 5. Connect Grand Final to Grand Final Reset (if active)
  const gfrId = `mn-gfr-${canvasId}-0-0`;
  if (document.getElementById(gfrId)) {
    drawSingleConnectorLine(svg, canvas, gfId, gfrId);
  }
}

function drawConnectorGroup(svg, canvas, prefix, canvasId, rounds) {
  const matchWidth = 260;
  const matchHeight = 110;
  rounds.forEach((round, rIdx) => {
    if (rIdx >= rounds.length - 1) return;
    round.forEach((match, mIdx) => {
      let nextMi;
      if (prefix === 'l') {
        const isNextInternal = (rIdx + 1) >= 2 && (rIdx + 1) % 2 === 0;
        nextMi = isNextInternal ? Math.floor(mIdx / 2) : mIdx;
      } else {
        nextMi = Math.floor(mIdx / 2);
      }
      const nextMatch = rounds[rIdx + 1][nextMi];
      if (!nextMatch) return;

      const x1 = match.xCoord + matchWidth;
      const y1 = match.yCoord + matchHeight / 2;
      const x2 = nextMatch.xCoord;
      const y2 = nextMatch.yCoord + matchHeight / 2;
      const midX = (x1 + x2) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`);
      path.setAttribute('class', `connector-line ${match.status === 'in-progress' ? 'active' : ''} ${match.status === 'completed' ? 'done' : ''}`);
      svg.appendChild(path);
    });
  });
}

function drawSingleConnectorLine(svg, canvas, startId, endId) {
  const startNode = document.getElementById(startId);
  const endNode = document.getElementById(endId);
  if (!startNode || !endNode) return;

  const s = getOffsetRelativeTo(startNode, canvas);
  const e = getOffsetRelativeTo(endNode, canvas);

  const x1 = s.left + startNode.offsetWidth;
  const y1 = s.top + startNode.offsetHeight / 2;
  const x2 = e.left;
  const y2 = e.top + endNode.offsetHeight / 2;
  const midX = (x1 + x2) / 2;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`);
  path.setAttribute('class', 'connector-line');
  svg.appendChild(path);
}
