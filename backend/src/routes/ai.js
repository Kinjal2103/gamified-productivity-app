// ======================
// src/routes/ai.js
// ======================
const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Journal = require('../models/Journal');

router.use(auth);

router.get('/insights', async (req, res) => {
  try {
    // Mocking an AI response for MVP
    const recentMoods = await Journal.find({ user: req.user.id }).sort({ date: -1 }).limit(3);
    const pendingTasks = await Task.find({ user: req.user.id, status: 'pending' });

    let burnoutWarning = false;
    let recommendation = "You're doing great! Keep it up.";

    if (recentMoods.filter(m => m.mood === 'tired' || m.mood === 'stressed').length >= 2) {
      burnoutWarning = true;
      recommendation = "You seem a bit stressed lately. We recommend taking a break or moving some tasks to the Chill Zone.";
    } else if (pendingTasks.length > 5) {
      recommendation = "You have quite a few tasks pending. Try slicing them into smaller chunks or use Focus Mode.";
    }

    res.json({
      burnoutWarning,
      recommendation,
      estimatedPendingTasks: pendingTasks.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
