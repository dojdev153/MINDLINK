// Trigger restart
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const waitlistRoutes = require('./routes/waitlist.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/waitlist', waitlistRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const start = async () => {
  try {
    const server = app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
    server.on('error', (e) => console.error('Server Error:', e));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
