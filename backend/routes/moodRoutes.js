const express = require('express');
const router = express.Router();
const {
  logMood,
  getMoodHistory,
  getMoodStats,
  deleteMood,
} = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, logMood);
router.get('/', protect, getMoodHistory);
router.get('/stats', protect, getMoodStats);
router.delete('/:id', protect, deleteMood);

module.exports = router;
