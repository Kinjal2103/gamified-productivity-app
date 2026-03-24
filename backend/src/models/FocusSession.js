// ======================
// src/models/FocusSession.js
// ======================
const { Schema, model } = require('mongoose');

const FocusSessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true }, // in minutes
  completedAt: { type: Date, default: Date.now },
  xpEarned: { type: Number, default: 0 }
});

module.exports = model('FocusSession', FocusSessionSchema);
