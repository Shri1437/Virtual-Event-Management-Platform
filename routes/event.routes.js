import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getMyEvents
} from '../controllers/event.controller.js';
import { authenticateToken, organizerOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getEvents);
router.post('/', authenticateToken, organizerOnly, createEvent);
router.put('/:id', authenticateToken, organizerOnly, updateEvent);
router.delete('/:id', authenticateToken, organizerOnly, deleteEvent);
router.post('/:id/register', authenticateToken, registerForEvent);
router.get('/me', authenticateToken, getMyEvents);

export default router;
