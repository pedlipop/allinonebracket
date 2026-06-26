# AllInOneBracket

A full-stack tournament bracket manager with real-time WebSocket sync, QR code self-registration, and support for multiple database backends including Turso (SQLite), PostgreSQL, and a local JSON database fallback.

---

## Features

- **Multi-DB Support**: Connect to Turso (SQLite in the cloud), PostgreSQL, or run completely offline using a local JSON database (`database/db.json`).
- **Automatic Schema Creation**: Automatically initializes or verifies schema tables from `database/schema.sql` on startup when using Turso or PostgreSQL.
- **Real-time Sync**: Uses WebSockets for real-time player/bracket sync between multiple clients.
- **Self-Registration**: Players can scan a QR code to register for the tournament during the registration phase.

---

## Prerequisites

- **Node.js**: Version 18+ (Download from https://nodejs.org)
- **npm**: Bundled with Node.js
- *(Optional)* A **Turso** database account (https://turso.tech) OR a **PostgreSQL** database (version 12+).

---

## Setup & Running Locally

### 1. Configure Environment Variables

Create a `.env` file inside the `backend` directory (you can copy [.env.example](file:///e:/PROJECT/CODING/allinonebracket/backend/.env.example) to get started):

```bash
# Navigate to the backend directory
cd backend

# Copy the template to .env
cp .env.example .env
```

Open `backend/.env` and configure the variables. Do **not** commit this file to Git.

#### Option A: Local JSON Fallback (easiest & offline-friendly)
If you do not specify any database URL, the backend will automatically fall back to using a local JSON file (`database/db.json`) as a lightweight database.

```env
PORT=3000
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
```

#### Option B: Turso (SQLite Cloud)
To use Turso, configure both `TURSO_URL` and `TURSO_AUTH_TOKEN`:

```env
PORT=3000
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
TURSO_URL=libsql://<your-db-name>-<your-username>.turso.io
TURSO_AUTH_TOKEN=<your_auth_token_here>
```

#### Option C: PostgreSQL
To use PostgreSQL, configure `DATABASE_URL` (ensure Turso variables are left blank):

```env
PORT=3000
ADMIN_USERNAME=<your_admin_username>
ADMIN_PASSWORD=<your_admin_password>
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database_name>
```

---

### 2. Install Dependencies

Install the backend dependencies:
```bash
cd backend
npm install
```

---

### 3. Run the Server

Start the development server with hot-reload enabled via `nodemon`:
```bash
npm run dev
```

Expected Output:
```
Connected to Turso (SQLite) successfully.
Turso schema initialized/verified successfully.
Server listening on port 3000
```
*(Or fallback message: `PostgreSQL/Turso connection failed. Falling back to local JSON database.`)*

Open your browser and navigate to: **http://localhost:3000**

---

## Admin Portal

To manage tournaments, navigate to the admin section in the web interface and log in using the credentials defined in your `.env` file:
- **Username**: Value of `ADMIN_USERNAME`
- **Password**: Value of `ADMIN_PASSWORD`

---

## Database Schema Reference

The tables and relation rules are defined in [schema.sql](file:///e:/PROJECT/CODING/allinonebracket/database/schema.sql). When using PostgreSQL or Turso, these tables are automatically verified/created on application startup:

- `tournaments`
- `participants`
- `matches`
- `history_logs`
