const express = require('express');
const router = express.Router();
const { chatWithAI, getReframe } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithAI);
router.post('/reframe', protect, getReframe);

module.exports = router;
