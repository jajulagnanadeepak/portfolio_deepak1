# Portfolio Backend Server

A Node.js/Express backend server for handling contact form submissions from your portfolio website.

## Features

- ✅ **CORS Enabled** - Properly configured for frontend communication
- ✅ **Contact Form API** - `/send-message` endpoint
- ✅ **MongoDB Integration** - Stores contact messages
- ✅ **Email Notifications** - Sends email alerts using Nodemailer
- ✅ **Security** - Helmet, rate limiting, input validation
- ✅ **Admin Endpoints** - View and manage messages

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running locally
   # Or use MongoDB Atlas (cloud)
   ```

4. **Run the Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

Create a `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## API Endpoints

### POST `/send-message`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Message saved and email sent!",
  "messageId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

### GET `/messages`
Get all contact messages (admin endpoint).

### PUT `/messages/:id/read`
Mark a message as read.

### GET `/health`
Health check endpoint.

## CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
- `http://localhost:4173` (Vite preview)
- Your production domain

## Email Setup

### Gmail Setup:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password in `EMAIL_PASS`

### Other Email Providers:
Check their SMTP settings and update the transporter configuration in `server.js`.

## Security Features

- **Helmet** - Security headers
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Mongoose schema validation
- **CORS** - Configured for specific origins
- **Error Handling** - Comprehensive error responses

## Frontend Integration

Update your React contact form to send requests to:
```javascript
const response = await fetch('http://localhost:5000/send-message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    subject,
    message
  })
});
```

## Deployment

1. Set up MongoDB (Atlas recommended for production)
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Vercel, Railway, etc.)
4. Update CORS origins to include your production domain
