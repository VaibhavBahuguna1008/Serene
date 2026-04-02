const Mood = require('../models/Mood');

// @desc    Check and log mood
// @route   POST /api/mood
// @access  Private
exports.logMood = async (req, res) => {
  const { mood, intensity, note } = req.body;

  try {
    const moodLog = await Mood.create({
      user: req.user._id,
      mood,
      intensity,
      note,
    });

    res.status(201).json(moodLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all mood logs for a user
// @route   GET /api/mood
// @access  Private
exports.getMoodHistory = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a mood log
// @route   DELETE /api/mood/:id
// @access  Private
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findOne({ _id: req.params.id, user: req.user._id });
    if (!mood) return res.status(404).json({ message: 'Entry not found' });
    await mood.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mood stats for analytics
// @route   GET /api/mood/stats
// @access  Private
exports.getMoodStats = async (req, res) => {
  try {
    const moods = await Mood.find({ 
      user: req.user._id,
      timestamp: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    }).sort({ timestamp: 1 });
    
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
