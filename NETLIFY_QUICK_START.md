# Netlify Quick Start Guide

## 🚀 Deploy in 5 Minutes

### 1. Push to GitHub

**If not connected to GitHub yet:**
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/EmpowerYou.git
git add .
git commit -m "Add Netlify deployment configuration"
git branch -M main
git push -u origin main
```

**If already connected:**
```bash
git add .
git commit -m "Add Netlify deployment configuration"
git push origin main
```

### 2. Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import from Git"**
3. Select your **EmpowerYou** repository from GitHub
4. Netlify will auto-detect:
   - **Build command:** (leave empty)
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
5. Click **"Deploy"**

### 3. Set Environment Variable
1. Go to **Site settings** → **Environment variables**
2. Add: `ADMIN_PASS` = `your-password-here`
3. Click **"Save"**

### 4. Done! 🎉
Your site is live at: `https://your-site.netlify.app`

## 📍 Important URLs
- **Website:** `https://your-site.netlify.app`
- **Admin:** `https://your-site.netlify.app/admin.html`
- **API Health:** `https://your-site.netlify.app/api/health`

## ⚠️ Database Note
Data is stored in-memory (resets on redeploy). For production, migrate to:
- Netlify Fauna
- Supabase
- Turso
- MongoDB Atlas

See `NETLIFY_DEPLOY.md` for full details.

