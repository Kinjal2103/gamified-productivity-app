// ======================
// src/routes/focus.js
// ======================
const router = require('express').Router();
const auth = require('../middleware/auth');
const FocusSession = require('../models/FocusSession');
const User = require('../models/User');

router.use(auth);

router.post('/session', async (req, res) => {
  try {
    const { duration } = req.body;
    
    // basic calculation: 1 XP per minute of focus
    const xpEarned = Math.floor(duration);

    const session = await FocusSession.create({
      user: req.user.id,
      duration,
      xpEarned
    });

    const user = await User.findById(req.user.id);
    user.addXP(xpEarned);
    user.updateStreak();
    await user.save();

    res.json({ session, user: { xp: user.xp, level: user.level, streak: user.streak } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const sessions = await FocusSession.find({ user: req.user.id }).sort({ completedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
