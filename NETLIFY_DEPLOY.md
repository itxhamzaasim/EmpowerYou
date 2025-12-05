# Netlify Deployment Guide for EmpowerYou

## 🚀 Quick Start

This guide will help you deploy your EmpowerYou website to Netlify with a working backend server for admin functionality.

## Prerequisites

- GitHub account
- Netlify account (free tier works perfectly)
- Node.js installed locally (for testing)

## Step 1: Prepare Your Repository

### If you haven't connected to your GitHub repository yet:

1. **Initialize Git (if not already done):**
   ```bash
   git init
   ```

2. **Add your existing GitHub repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/EmpowerYou.git
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add Netlify deployment configuration"
   git branch -M main
   git push -u origin main
   ```

### If your repository is already connected:

1. **Make sure all files are committed:**
   ```bash
   git add .
   git commit -m "Add Netlify deployment configuration"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub account and select your `EmpowerYou` repository
4. Netlify will auto-detect settings:
   - **Build command:** (leave empty - no build needed)
   - **Publish directory:** `.` (root directory)
   - **Functions directory:** `netlify/functions`
5. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Step 3: Configure Environment Variables

1. In Netlify Dashboard, go to **Site settings** → **Environment variables**
2. Add the following variable:
   - **Key:** `ADMIN_PASS`
   - **Value:** `your-secure-password-here` (choose a strong password)
   - **Scopes:** All scopes (Production, Deploy previews, Branch deploys)

3. Click **"Save"**

## Step 4: Verify Deployment

After deployment, your site will be available at:
- **Website:** `https://your-site-name.netlify.app`
- **Admin Panel:** `https://your-site-name.netlify.app/admin.html`
- **Health Check:** `https://your-site-name.netlify.app/api/health`

## 📋 API Endpoints

Your backend API endpoints are available at:

- `POST /api/contact` - Submit enrollment form
- `GET /api/admin/submissions?admin_pass=YOUR_PASSWORD` - View all submissions
- `DELETE /api/admin/submissions?admin_pass=YOUR_PASSWORD&id=ID` - Delete a submission
- `GET /api/health` - Health check

## 🗄️ Database Storage

**Important:** The current setup uses **in-memory storage** on Netlify, which means:
- ✅ Data persists during the function execution
- ⚠️ Data is **lost** when the function times out or redeploys
- 💡 For production use, consider migrating to a cloud database

### Recommended Database Options:

1. **Netlify Fauna** (Recommended)
   - Built-in integration with Netlify
   - Free tier available
   - Easy to set up

2. **Supabase** (PostgreSQL)
   - Free tier with generous limits
   - Easy to use
   - Great documentation

3. **Turso** (SQLite Cloud)
   - SQLite-compatible
   - Easy migration from current setup

4. **MongoDB Atlas**
   - Free tier available
   - NoSQL database

## 🔧 Local Development

To test locally with Netlify Functions:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Start local development server:
   ```bash
   netlify dev
   ```

3. Your site will be available at `http://localhost:8888`

## 📝 Project Structure

```
EmpowerYou/
├── netlify/
│   └── functions/          # Netlify serverless functions
│       ├── contact.js      # Contact form handler
│       ├── admin-submissions.js  # Admin API
│       └── health.js       # Health check
├── api/                    # Shared utilities
│   └── db.js              # Database utility
├── netlify.toml           # Netlify configuration
├── *.html                 # Frontend pages
└── package.json           # Dependencies
```

## 🐛 Troubleshooting

### Functions Not Working?

1. **Check function logs:**
   - Go to Netlify Dashboard → Functions → View logs

2. **Verify environment variables:**
   - Make sure `ADMIN_PASS` is set correctly

3. **Check redirects:**
   - Verify `netlify.toml` redirects are correct

### Database Not Persisting?

- This is expected with in-memory storage
- Migrate to a cloud database for persistent storage (see Database Storage section above)

### CORS Errors?

- CORS headers are already configured in the functions
- If issues persist, check browser console for specific errors

## 🔒 Security Notes

1. **Admin Password:**
   - Use a strong password for `ADMIN_PASS`
   - Never commit the password to Git
   - Use environment variables only

2. **HTTPS:**
   - Netlify automatically provides HTTPS
   - All API calls are secure

3. **Rate Limiting:**
   - Consider adding rate limiting for production
   - Netlify Functions have built-in timeout limits

## 📚 Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify site created and connected to GitHub
- [ ] Environment variable `ADMIN_PASS` set
- [ ] Site deployed successfully
- [ ] Test contact form submission
- [ ] Test admin panel login
- [ ] Verify API endpoints are working
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Migrate to persistent database

## 🎉 You're Done!

Your EmpowerYou website is now live on Netlify with a working backend server for admin functionality!

