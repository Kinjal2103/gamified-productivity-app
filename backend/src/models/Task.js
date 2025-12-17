// ======================
// src/models/Task.js
// ======================

const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  deadline: Date,
  priority: { type: Number, min: 1, max: 5 },
  estimatedTime: Number,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  status: { type: String, enum: ['pending', 'completed', 'expired'], default: 'pending' },
  xp: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Task', TaskSchema);