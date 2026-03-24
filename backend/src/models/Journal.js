// ======================
// src/models/Journal.js
// ======================
const { Schema, model } = require('mongoose');

const JournalSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['happy', 'neutral', 'stressed', 'tired', 'sad', 'motivated'], required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = model('Journal', JournalSchema);
