# Virtual Event Management Platform# Virtual Event Management Backend



A comprehensive Node.js backend API for managing virtual events with user authentication, event management, and participant registration.A Node.js backend for a virtual event management platform using in-memory data structures.



## 🚀 Features## Features

- User registration & login (bcrypt, JWT)

- **User Authentication**: Secure registration and login with JWT tokens- Event CRUD (organizer only)

- **Role-based Access**: Organizer and attendee roles with different permissions- Participant registration

- **Event Management**: Full CRUD operations for events (organizer-only)- Email notifications (nodemailer)

- **Event Registration**: Attendees can register for events- RESTful API endpoints

- **Email Notifications**: Automated email notifications for registrations

- **Security**: Password hashing with bcrypt, JWT-based authentication## Endpoints

- **Environment Configuration**: Secure environment variable management- `POST /register` — Register user (organizer/attendee)

- `POST /login` — Login, returns JWT

## 🛠️ Tech Stack- `GET /events` — List events (auth required)

- `POST /events` — Create event (organizer only)

- **Node.js**: Runtime environment- `PUT /events/:id` — Update event (organizer only)

- **Express.js**: Web framework- `DELETE /events/:id` — Delete event (organizer only)

- **JWT**: JSON Web Tokens for authentication- `POST /events/:id/register` — Register for event (attendee)

- **bcrypt**: Password hashing- `GET /me/events` — List my registered events

- **Nodemailer**: Email notifications

- **dotenv**: Environment variable management## Setup

1. Install dependencies:

## 📋 Prerequisites   ```bash

   npm install

- Node.js (v14 or higher)   ```

- npm (Node Package Manager)2. Update email credentials in `index.js` (`EMAIL_USER`, `EMAIL_PASS`)

3. Start server:

## ⚡ Quick Start   ```bash

   npm start

### 1. Clone the Repository   ```

```bash

git clone https://github.com/Shri1437/Virtual-Event-Management-Platform.git## Notes

cd virtual-event-management- All data is stored in memory (arrays/objects)

```- Email sending uses Gmail by default (update as needed)

- For production, use environment variables for secrets

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=3001

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=1h

# Email Configuration (optional - currently disabled)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_email_password

# Environment
NODE_ENV=development
```

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword",
  "email": "john@example.com",
  "role": "organizer" // or "attendee"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword"
}
```
**Response**: Returns JWT token for authentication

### Event Endpoints

#### Get All Events (Authentication Required)
```http
GET /api/events
Authorization: Bearer <your-jwt-token>
```

#### Create Event (Organizer Only)
```http
POST /api/events
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15",
  "time": "10:00 AM",
  "location": "Virtual Platform"
}
```

#### Update Event (Organizer Only)
```http
PUT /api/events/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated Tech Conference 2024",
  "description": "Updated description",
  "date": "2024-12-15",
  "time": "11:00 AM",
  "location": "Virtual Platform"
}
```

#### Delete Event (Organizer Only)
```http
DELETE /api/events/:id
Authorization: Bearer <your-jwt-token>
```

#### Register for Event (Attendee)
```http
POST /api/events/:id/register
Authorization: Bearer <your-jwt-token>
```

#### Get My Registered Events
```http
GET /api/me/events
Authorization: Bearer <your-jwt-token>
```

## 🔧 Development

### Run in Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

## 🏗️ Project Structure

```
virtual-event-management/
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   └── event.controller.js   # Event management logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.routes.js       # Authentication routes
│   └── event.routes.js      # Event routes
├── utils/
│   └── email.js            # Email utility functions
├── .env                    # Environment variables (not in repo)
├── .gitignore             # Git ignore rules
├── index.js               # Main application file
├── models.js              # Data models (in-memory)
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Role-based Authorization**: Different permissions for organizers and attendees
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Ready**: Prepared for cross-origin requests

## 📊 Data Models

### User Model
```javascript
{
  username: String,
  password: String (hashed),
  email: String,
  role: String // "organizer" or "attendee"
}
```

### Event Model
```javascript
{
  id: Number,
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  organizer: String,
  attendees: Array
}
```

## 🚨 Important Notes

- **Data Storage**: Currently uses in-memory storage (arrays/objects). Data will be lost when server restarts.
- **Email**: Email functionality is currently disabled for development. Uncomment email configuration in `.env` to enable.
- **Production**: For production deployment, use a proper database and update environment variables accordingly.
- **Security**: Change the default JWT_SECRET in production.

## ✅ Testing

Run the test suite to verify functionality:
```bash
npm test
```

All tests should pass. The current test configuration verifies that the server can start properly.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for Airtribe Backend Engineering Launchpad**