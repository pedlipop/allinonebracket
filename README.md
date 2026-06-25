# AllInOneBracket

A full-stack tournament bracket manager with real-time WebSocket sync, QR code self-registration, and MongoDB persistence.

---

## Prerequisites

| Tool | Version | Download |
|---|---|---|
| **Node.js** | 18+ | https://nodejs.org |
| **MongoDB** | 6+ (Community Edition) | https://www.mongodb.com/try/download/community |
| **npm** | bundled with Node.js | — |

> MongoDB must be running locally before you start the backend.

---

## Project Structure

```
allinonebracket/
├── backend/
│   ├── server.js        # Express + WebSocket server
│   ├── db.js            # Mongoose models & connection
│   ├── .env             # Environment variables (not committed)
│   └── package.json
├── frontend/            # Static HTML/CSS/JS files served by Express
└── database/            # (legacy — no longer used)
```

---

## Setup & Run

### 1. Start MongoDB

**Windows (if installed as a service):**
```powershell
Start-Service -Name MongoDB
```

**Or run manually:**
```powershell
mongod --dbpath "C:\data\db"
```

**macOS / Linux:**
```bash
brew services start mongodb-community   # macOS (Homebrew)
sudo systemctl start mongod             # Linux (systemd)
```

---

### 2. Install Dependencies

```bash
cd backend
npm install
```

---

### 3. Configure Environment

The `backend/.env` file is pre-configured. Edit it to match your setup:

**MongoDB Atlas (cloud) — recommended:**
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/tournament_bracket?appName=Cluster0
PORT=3000
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
```

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/tournament_bracket
PORT=3000
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
```

> **Atlas note:** Make sure your current IP address is whitelisted in Atlas → Network Access → Add IP Address.

---

### 4. Run the Development Server

```bash
cd backend
npm run dev
```

Expected output:
```
Connected to MongoDB successfully.
Server listening on port 3000
```

Open your browser at: **http://localhost:3000**

---

### 5. Run in Production

```bash
cd backend
npm start
```

---

## Admin Login

Navigate to the admin panel and log in with the credentials from your `.env`:

| Field | Description |
|---|---|
| Username | Set in `.env` as `ADMIN_USERNAME` |
| Password | Set in `.env` as `ADMIN_PASSWORD` |

---

## API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Admin login, returns session token |
| `GET` | `/api/verify-session` | Validate an existing token |

### Tournaments
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tournaments` | List all tournaments with player count |
| `POST` | `/api/tournament` | Create a new tournament |
| `GET` | `/api/tournament/:id` | Get full tournament data (participants, matches, history) |
| `DELETE` | `/api/tournament/:id` | Delete a tournament and all related data |

### Tournament State
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tournament/:id/state` | Get raw state JSON |
| `POST` | `/api/tournament/:id/state` | Overwrite state JSON (broadcasts via WS) |
| `POST` | `/api/tournament/:id/save` | Save full state with authorization check |
| `POST` | `/api/tournament/:id/register` | Public self-registration (registration phase only) |

### Utilities
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/qrcode?text=...` | Generate a QR code as a data URL |
| `GET` | `/api/tournament/:id/verify-admin` | Verify a per-tournament admin key |
| `GET` | `/api/tournament-by-admin-key?adminKey=...` | Look up tournament by its admin key |

---

## WebSocket Events

Connect to `ws://localhost:3000?tournamentId=<id>&admin=true|false`

### Client → Server
| Type | Payload | Description |
|---|---|---|
| `STATE_UPDATE` | `{ tournamentId, data }` | Save & broadcast full state update |
| `TOURNAMENT_STATE_SYNC` | `{ tournamentId, data }` | Sync raw state JSON to DB & broadcast |

### Server → Client
| Type | Description |
|---|---|
| `TOURNAMENT_UPDATE` | Broadcast participants/matches/status update |
| `TOURNAMENT_STATE_SYNC` | Broadcast raw state JSON sync |

---

## Database Collections (MongoDB)

| Collection | Description |
|---|---|
| `tournaments` | Tournament metadata + raw state JSON snapshot |
| `participants` | Players belonging to a tournament |
| `matches` | Match bracket data (scores, seeds, links) |
| `historylogs` | Audit log of state changes |

---

## Troubleshooting

**`MongoDB connection failed`** — Make sure `mongod` is running and `MONGODB_URI` in `.env` is correct.

**Port already in use** — Change `PORT` in `.env` or kill the process using port 3000:
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```

**`Cannot find package 'dotenv'`** — Run `npm install` inside the `backend/` directory.
