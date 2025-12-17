// ======================
// src/routes/auth.js
// ======================
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user || !(await user.compare(req.body.password))) {
//     return res.status(401).json({ error: 'Invalid creds' });
//   }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });
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
  res.json({ token });
});


module.exports = router;