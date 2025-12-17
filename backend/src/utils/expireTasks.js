// ======================
// src/utils/expireTasks.js
// ======================
const Task = require('../models/Task');
module.exports.expireTasksJob = () => {
  setInterval(async () => {
    await Task.updateMany(
      { status: 'pending', deadline: { $lt: new Date() } },
      { status: 'expired' }
    );
  }, 60000);
};