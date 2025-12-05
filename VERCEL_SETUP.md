# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] All API routes created in `/api` folder
- [x] Vercel configuration (`vercel.json`) created
- [x] Environment variables documented
- [x] Database setup for Vercel compatibility
- [x] No hardcoded localhost URLs
- [x] `.gitignore` updated (excludes .env, node_modules, db files)
- [x] All files ready for GitHub

## 📋 Files Created/Updated for Vercel

### API Serverless Functions
- ✅ `api/contact.js` - Contact form endpoint
- ✅ `api/admin/submissions.js` - Admin API (GET/DELETE)
- ✅ `api/health.js` - Health check
- ✅ `api/db.js` - Database utility (works for local & Vercel)

### Configuration Files
- ✅ `vercel.json` - Vercel routing configuration
- ✅ `.gitignore` - Updated to exclude sensitive files
- ✅ `package.json` - Updated dependencies

### Documentation
- ✅ `DEPLOYMENT.md` - Full deployment guide
- ✅ `GITHUB_DEPLOY.md` - Step-by-step GitHub & Vercel instructions

## 🚀 Quick Deploy Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to vercel.com
   - Import your GitHub repo
   - Add environment variable: `ADMIN_PASS`
   - Deploy!

3. **Set Environment Variable:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `ADMIN_PASS` = `your-secure-password`

## ⚠️ Important Notes

### Database on Vercel
- SQLite files are **ephemeral** on Vercel (reset on each deployment)
- For production, use a cloud database:
  - Vercel Postgres (recommended)
  - Turso (SQLite cloud)
  - PlanetScale (MySQL)
  - Supabase (PostgreSQL)

### Current Behavior
- ✅ Works locally with SQLite
- ⚠️ On Vercel, database resets on redeploy
- 💡 Migrate to cloud DB for persistent storage

## 🔗 After Deployment

Your URLs will be:
- Website: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin.html`
- API: `https://your-project.vercel.app/api/contact`

## 📝 Next Steps After Deployment

1. Test the contact form
2. Test admin dashboard login
3. Set up cloud database for persistent storage
4. Update `api/db.js` to use cloud database
5. Redeploy

