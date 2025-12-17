// Backend MVP for Deadline & Priority-based Productivity Engine with XP & Streak
// Stack: Node.js, Express, MongoDB (Mongoose)

// ======================
// server.js
// ======================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const { expireTasksJob } = require('./src/utils/expireTasks');

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/health', (req, res) => res.json({ status: 'OK' }));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

expireTasksJob();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


