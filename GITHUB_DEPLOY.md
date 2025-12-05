# GitHub & Vercel Deployment Instructions

## 📦 Step 1: Push to GitHub

### If you already have a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "EmpowerYou website - ready for deployment"

# Add your GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/empoweryou.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### If repository already exists and you want to update:

```bash
git add .
git commit -m "Update: Added admin dashboard and Vercel configuration"
git push origin main
```

## 🚀 Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "Add New Project"**
4. **Import** your `empoweryou` repository
5. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as is)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`
6. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `ADMIN_PASS` = `your-secure-password`
   - (Use a strong password, not the default)
7. **Click "Deploy"**

## ⚙️ Step 3: Configure Environment Variables in Vercel

After deployment, go to:
- **Project Settings** → **Environment Variables**
- Add: `ADMIN_PASS` = `your-password-here`
- **Redeploy** after adding variables

## 📝 Important Notes

### Database on Vercel
- SQLite files don't persist on Vercel (ephemeral filesystem)
- For production, consider using:
  - **Vercel Postgres** (recommended)
  - **Turso** (SQLite cloud)
  - **PlanetScale** (MySQL)
  - **Supabase** (PostgreSQL)

### Current Setup
- Works locally with SQLite
- On Vercel, database will reset on each deployment
- For persistent storage, migrate to cloud database

## 🔗 After Deployment

Your site will be available at:
- **Website**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin.html`
- **API**: `https://your-project.vercel.app/api/contact`

## 🔄 Updating Your Site

After making changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy!

## ✅ Checklist Before Deploying

- [ ] All files committed to Git
- [ ] `.env` file is NOT committed (in .gitignore)
- [ ] `submissions.db` is NOT committed (in .gitignore)
- [ ] Environment variables set in Vercel
- [ ] Test locally with `npm start`
- [ ] Admin password changed from default



