
// ======================
// src/models/User.js
// ======================
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActive: Date
});

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.methods.compare = function (pw) {
  return bcrypt.compare(pw, this.password);
};

UserSchema.methods.addXP = function (xpToAdd) {
  this.xp += xpToAdd;
  while(this.xp >= 100){ // Example: 100 XP per level
    this.xp -= 100;
    this.level += 1;
  }
};

UserSchema.methods.updateStreak = function () {
  const today = new Date().toDateString();
  if(this.lastActive && new Date(this.lastActive).toDateString() === today){
    return; // Already counted today
  }
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if(this.lastActive && new Date(this.lastActive).toDateString() === yesterday){
    this.streak += 1;
  } else {
    this.streak = 1;
  }
  this.lastActive = new Date();
};

module.exports = model('User', UserSchema);