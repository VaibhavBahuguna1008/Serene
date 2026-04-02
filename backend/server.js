const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const aiRoutes = require('./routes/aiRoutes');
const journalRoutes = require('./routes/journalRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/journal', journalRoutes);

// API check
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// 🔥 Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});