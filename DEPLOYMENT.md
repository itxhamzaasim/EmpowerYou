# Deployment Guide for EmpowerYou

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EmpowerYou website"
   ```

2. **Add your GitHub repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/empoweryou.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `empoweryou` repository
4. Vercel will auto-detect settings:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

5. **Add Environment Variables** in Vercel:
   - Go to Project Settings → Environment Variables
   - Add: `ADMIN_PASS` = `your-secure-password-here`
   - (Optional) Add other env vars if needed

6. Click **Deploy**

### Step 3: Database Setup for Vercel

**Important:** SQLite files don't persist on Vercel. For production, use one of these options:

#### Option 1: Use Vercel Postgres (Recommended)
1. In Vercel dashboard, go to Storage → Create Database → Postgres
2. Update `api/db.js` to use Postgres instead of SQLite
3. Connection string will be in environment variables

#### Option 2: Use Turso (SQLite Cloud)
1. Sign up at [turso.tech](https://turso.tech)
2. Create a database
3. Get connection details
4. Update database connection in `api/db.js`

#### Option 3: Use JSON File Storage (Simple, but limited)
- Works for small scale
- Data stored in Vercel KV or similar

### Step 4: Access Your Site

After deployment:
- **Website:** `https://your-project.vercel.app`
- **Admin Panel:** `https://your-project.vercel.app/admin.html`

## 📝 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
ADMIN_PASS=your-secure-admin-password
```

## 🔧 Local Development

For local development, use:
```bash
npm start
```

Server runs on `http://localhost:3000`

## 📁 Project Structure

```
EmpowerYou/
├── api/                    # Vercel serverless functions
│   ├── contact.js         # Contact form endpoint
│   ├── admin/
│   │   └── submissions.js # Admin API
│   ├── health.js          # Health check
│   └── db.js              # Database utility
├── *.html                  # Website pages
├── styles.css              # Styles
├── script.js               # Frontend JavaScript
├── server.js               # Local development server
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
└── .gitignore              # Git ignore rules
```

## 🐛 Troubleshooting

### Database Issues on Vercel
- SQLite files don't persist on Vercel
- Use cloud database (Postgres, Turso, etc.)
- Or use Vercel KV for simple storage

### API Routes Not Working
- Check `vercel.json` routes configuration
- Ensure API files are in `api/` directory
- Check Vercel function logs

### Environment Variables
- Make sure `ADMIN_PASS` is set in Vercel
- Redeploy after adding environment variables

## 🔐 Security Notes

- Change default `ADMIN_PASS` in production
- Use strong passwords
- Consider adding rate limiting
- Enable HTTPS (automatic on Vercel)


