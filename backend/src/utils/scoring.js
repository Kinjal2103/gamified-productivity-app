// ======================
// src/utils/scoring.js
// ======================
module.exports.calculateScore = task => {
  const hoursLeft = (task.deadline - Date.now()) / 3600000;
  let urgency = 0;
  if (hoursLeft < 24) urgency = 30;
  else if (hoursLeft < 72) urgency = 20;
  else if (hoursLeft < 168) urgency = 10;
  return task.priority * 10 + urgency;
};