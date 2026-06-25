import mongoose from 'mongoose';

// ─── Schemas ───────────────────────────────────────────────────────────────

const tournamentSchema = new mongoose.Schema(
  {
    _id: { type: String },          // user-supplied string ID
    name: { type: String, default: 'Tournament' },
    status: { type: String, default: 'Draft' },
    adminKey: { type: String },
    stateJson: { type: String },    // raw JSON snapshot
  },
  { timestamps: true }
);

const participantSchema = new mongoose.Schema({
  _id: { type: String },
  tournamentId: { type: String, required: true, index: true },
  name: { type: String },
  companyId: { type: String },
  seed: { type: Number },
});

const matchSchema = new mongoose.Schema({
  _id: { type: String },
  tournamentId: { type: String, required: true, index: true },
  round: { type: Number },
  matchIndex: { type: Number },
  p1Id: { type: String, default: null },
  p2Id: { type: String, default: null },
  score1: { type: mongoose.Schema.Types.Mixed, default: null },
  score2: { type: mongoose.Schema.Types.Mixed, default: null },
  winnerId: { type: String, default: null },
  isLocked: { type: Boolean, default: false },
  p1SourceMatchId: { type: String, default: null },
  p2SourceMatchId: { type: String, default: null },
  destMatchId: { type: String, default: null },
  destParam: { type: String, default: null },
  side: { type: String, default: null },
  isThirdPlace: { type: Boolean, default: false },
});

const historyLogSchema = new mongoose.Schema(
  {
    tournamentId: { type: String, required: true, index: true },
    actionType: { type: String },
    details: { type: String },
    stateSnapshot: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

// ─── Models ────────────────────────────────────────────────────────────────

export const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', tournamentSchema);
export const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);
export const Match = mongoose.models.Match || mongoose.model('Match', matchSchema);
export const HistoryLog = mongoose.models.HistoryLog || mongoose.model('HistoryLog', historyLogSchema);

// ─── Connection ────────────────────────────────────────────────────────────

import dns from 'dns';

// Force Node's dns module to use IPv4 DNS servers explicitly.
// On some Windows setups the system DNS resolves to a link-local IPv6
// address (fe80::x) that doesn't respond to SRV queries, causing
// `querySrv ECONNREFUSED`. Setting IPv4 DNS servers fixes this.
dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8']);

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tournament_bracket';
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

