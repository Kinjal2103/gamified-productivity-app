// ======================
// src/routes/tasks.js
// ======================
const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');
const { calculateScore } = require('../utils/scoring');

router.use(auth);

router.post('/', async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.json(task);
});

router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.get('/next', async (req, res) => {
  const tasks = await Task.find({ user: req.user.id, status: 'pending' });
  tasks.sort((a, b) => calculateScore(b) - calculateScore(a));
  res.json(tasks[0] || null);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if(!task) return res.status(404).json({error: 'Task not found'});
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if(!task) return res.status(404).json({error: 'Task not found'});
  res.json({ success: true });
});

router.post('/:id/complete', async (req, res) => {
  const task = await Task.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if(!task || task.status !== 'pending') return res.status(400).json({error: 'Invalid task'});

  task.status = 'completed';

  // Calculate XP with priority & streak
  const baseXP = task.priority * 10;
  let xpBonus = 0;
  if(new Date(task.deadline) > new Date()){ xpBonus = 5; } // Early bonus
  task.xp = baseXP + xpBonus;

  user.addXP(task.xp);
  user.updateStreak();

  await task.save();
  await user.save();

  res.json({task, user});
});

module.exports = router;