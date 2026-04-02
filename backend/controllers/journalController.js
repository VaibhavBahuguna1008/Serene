const Journal = require('../models/Journal');
const { analyzeJournal } = require('../services/aiService');

// @desc    Create new journal entry
// @route   POST /api/journal
// @access  Private
exports.createJournalEntry = async (req, res) => {
  const { title, content } = req.body;

  try {
    const analysis = await analyzeJournal(content);
    
    const entry = await Journal.create({
      user: req.user._id,
      title,
      content,
      aiSummary: analysis.summary,
      aiEmotion: analysis.emotion,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all journal entries for a user
// @route   GET /api/journal
// @access  Private
exports.getJournalEntries = async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
exports.getJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);

    if (entry && entry.user.toString() === req.user._id.toString()) {
      res.json(entry);
    } else {
      res.status(404).json({ message: 'Journal entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
exports.deleteJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);

    if (!entry || entry.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    await entry.deleteOne();
    res.json({ message: 'Journal entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
