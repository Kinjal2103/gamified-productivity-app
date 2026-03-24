// ======================
// src/routes/auth.js
// ======================
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email: user.email, xp: user.xp, level: user.level, streak: user.streak, lastActive: user.lastActive, dailyXP: user.dailyXP, lastXPDate: user.lastXPDate } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const ok = await user.compare(password);
  if (!ok) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, email: user.email, xp: user.xp, level: user.level, streak: user.streak, lastActive: user.lastActive, dailyXP: user.dailyXP, lastXPDate: user.lastXPDate } });
});

module.exports = router;