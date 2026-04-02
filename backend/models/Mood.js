const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  mood: {
    type: String,
    required: [true, 'Please add a mood'],
    enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Stressed', 'Angry', 'Tired'],
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  note: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Mood', moodSchema);
