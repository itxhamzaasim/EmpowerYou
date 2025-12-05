# EmpowerYou Backend Setup Instructions

## ✅ What's Already Done

1. ✓ npm packages installed
2. ✓ Backend server code created (`server.js`)
3. ✓ Frontend form updated to connect to backend
4. ✓ All necessary files created

## 📝 Next Steps - Complete Setup

### Step 1: Create .env File

Create a file named `.env` in the project root (`D:\EmpowerYou\.env`) with the following content:

```
EMAIL_USER=hamza.itchamp@gmail.com
EMAIL_PASS=your-gmail-app-password-here
ADMIN_EMAIL=hamza.itchamp@gmail.com
PORT=3000
```

### Step 2: Get Gmail App Password

**IMPORTANT:** You cannot use your regular Gmail password. You need an App Password.

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Make sure **2-Step Verification** is enabled
3. Scroll down and click on **App Passwords**
4. Select **Mail** as the app
5. Select **Other (Custom name)** as device, enter "EmpowerYou Backend"
6. Click **Generate**
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
8. Paste it in the `.env` file, replacing `your-gmail-app-password-here`
   - Remove spaces: `abcdefghijklmnop`

### Step 3: Start the Server

Open terminal in the project folder and run:

```bash
npm start
```

Or for development (auto-reload on changes):

```bash
npm run dev
```

You should see:
```
Server is running on http://localhost:3000
Contact form endpoint: http://localhost:3000/api/contact
```

### Step 4: Test the Form

1. Open `contact.html` in your browser (or use `http://localhost:3000/contact.html`)
2. Fill out the "Join Us" form
3. Submit the form
4. Check:
   - Success message appears on the page
   - Email sent to `hamza.itchamp@gmail.com` (admin notification)
   - Confirmation email sent to the user

## 🔧 Troubleshooting

### Email Not Sending?

1. **Check .env file exists** and has correct values
2. **Verify App Password** - Make sure you're using App Password, not regular password
3. **Check 2-Step Verification** - Must be enabled to use App Passwords
4. **Check server logs** - Look for error messages in terminal

### Port Already in Use?

Change PORT in `.env` to a different number (e.g., 3001, 3002)

### CORS Errors?

The server already includes CORS middleware. If issues persist, check that the server is running.

## 📧 Email Configuration

The backend sends two emails:

1. **Admin Email** → `hamza.itchamp@gmail.com`
   - Contains: Name, Email, Course, Message, Date

2. **User Confirmation Email** → User's email address
   - Confirms their enrollment request was received

## 🚀 Production Deployment

For production:
1. Use environment variables on your hosting platform
2. Consider using a dedicated email service (SendGrid, Mailgun)
3. Use HTTPS for secure connections
4. Set up proper error logging

## 📞 Support

If you encounter issues:
- Check server terminal for error messages
- Verify .env file configuration
- Ensure Gmail App Password is correct
- Test email sending manually


