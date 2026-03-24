// ======================
// src/routes/journal.js
// ======================
const router = require('express').Router();
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const entry = await Journal.create({ ...req.body, user: req.user.id });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
