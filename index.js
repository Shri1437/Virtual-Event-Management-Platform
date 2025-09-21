
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';

const app = express();
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/events', eventRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Event backend running on port ${PORT}`));
