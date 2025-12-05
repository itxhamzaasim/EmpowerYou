# EmpowerYou Backend Setup Guide

## Overview
This backend handles form submissions from the "Join Us" contact form. It sends email notifications to both the admin and the user.

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Gmail account with App Password enabled

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Edit `.env` and add your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=hamza.itchamp@gmail.com
   PORT=3000
   ```

3. **Get Gmail App Password**
   - Go to your Google Account settings
   - Navigate to Security > 2-Step Verification
   - Scroll down to "App passwords"
   - Generate a new app password for "Mail"
   - Use this password in the `.env` file (not your regular Gmail password)

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/contact`
Handles form submissions from the Join Us page.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Web Development",
  "message": "Optional message"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you! We have received your enrollment request..."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET `/api/health`
Health check endpoint to verify server is running.

## Email Configuration

The backend sends two emails:
1. **Admin Email**: Sent to `ADMIN_EMAIL` with enrollment details
2. **Confirmation Email**: Sent to the user confirming their submission

## Frontend Integration

The frontend automatically detects if it's running on localhost and uses the appropriate API URL:
- Localhost: `http://localhost:3000/api/contact`
- Production: `/api/contact` (relative path)

## Troubleshooting

### Email Not Sending
- Verify your Gmail App Password is correct
- Check that 2-Step Verification is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set correctly in `.env`

### CORS Errors
- The server includes CORS middleware to allow requests from the frontend
- If issues persist, check the CORS configuration in `server.js`

### Port Already in Use
- Change the PORT in `.env` file
- Or stop the process using port 3000

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Consider using a dedicated email service (SendGrid, Mailgun) for production

## Deployment

For production deployment:
1. Set environment variables on your hosting platform
2. Use a process manager like PM2: `pm2 start server.js`
3. Configure reverse proxy (nginx) if needed
4. Use HTTPS for secure connections


