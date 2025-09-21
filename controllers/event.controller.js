import { events, users } from '../models.js';
import { sendEmail } from '../utils/email.js';

export function getEvents(req, res) {
  res.status(200).json({ success: true, data: events, message: 'Events fetched successfully' });
}

export function createEvent(req, res) {
  const { date, time, description } = req.body;
  if (!date || !time || !description) return res.status(400).json({ success: false, data: null, message: 'Missing fields' });
  const event = {
    id: events.length + 1,
    date,
    time,
    description,
    organizer: req.user.username,
    participants: []
  };
  events.push(event);
  res.status(201).json({ success: true, data: event, message: 'Event created successfully' });
}

export function updateEvent(req, res) {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ success: false, data: null, message: 'Event not found' });
  if (event.organizer !== req.user.username) return res.status(403).json({ success: false, data: null, message: 'Not your event' });
  const { date, time, description } = req.body;
  if (date) event.date = date;
  if (time) event.time = time;
  if (description) event.description = description;
  res.status(200).json({ success: true, data: event, message: 'Event updated successfully' });
}

export function deleteEvent(req, res) {
  const idx = events.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Event not found' });
  if (events[idx].organizer !== req.user.username) return res.status(403).json({ success: false, data: null, message: 'Not your event' });
  events.splice(idx, 1);
  res.status(204).send();
}

export async function registerForEvent(req, res) {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ success: false, data: null, message: 'Event not found' });
  if (event.participants.includes(req.user.username)) return res.status(409).json({ success: false, data: null, message: 'Already registered' });
  event.participants.push(req.user.username);
  const user = users.find(u => u.username === req.user.username);
  await sendEmail(user.email, 'Event Registration', `You have registered for event: ${event.description} on ${event.date} at ${event.time}.`);
  res.status(200).json({ success: true, data: event, message: 'Registered for event successfully' });
}

export function getMyEvents(req, res) {
  const myEvents = events.filter(e => e.participants.includes(req.user.username));
  res.status(200).json({ success: true, data: myEvents, message: 'Fetched registered events successfully' });
}
