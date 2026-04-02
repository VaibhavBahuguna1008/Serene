const express = require('express');
const router = express.Router();
const {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  deleteJournalEntry,
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createJournalEntry);
router.get('/', protect, getJournalEntries);
router.get('/:id', protect, getJournalEntry);
router.delete('/:id', protect, deleteJournalEntry);

module.exports = router;
