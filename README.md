# Virtual Event Management Backend

A Node.js backend for a virtual event management platform using in-memory data structures.

## Features
- User registration & login (bcrypt, JWT)
- Event CRUD (organizer only)
- Participant registration
- Email notifications (nodemailer)
- RESTful API endpoints

## Endpoints
- `POST /register` — Register user (organizer/attendee)
- `POST /login` — Login, returns JWT
- `GET /events` — List events (auth required)
- `POST /events` — Create event (organizer only)
- `PUT /events/:id` — Update event (organizer only)
- `DELETE /events/:id` — Delete event (organizer only)
- `POST /events/:id/register` — Register for event (attendee)
- `GET /me/events` — List my registered events

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Update email credentials in `index.js` (`EMAIL_USER`, `EMAIL_PASS`)
3. Start server:
   ```bash
   npm start
   ```

## Notes
- All data is stored in memory (arrays/objects)
- Email sending uses Gmail by default (update as needed)
- For production, use environment variables for secrets
