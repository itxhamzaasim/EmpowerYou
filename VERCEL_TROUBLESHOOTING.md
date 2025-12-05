# Vercel 404 Error - Troubleshooting Guide

## Current Status
- ✅ API functions are in `/api` folder
- ✅ Functions are properly exported with `module.exports`
- ✅ No `vercel.json` (using auto-detection)
- ✅ Node.js version set to 18.x

## Critical Vercel Project Settings

Go to **Vercel Dashboard → Your Project → Settings → Build & Development Settings**

### Required Settings:
1. **Framework Preset:** `Other` (NOT Express, NOT Node.js)
2. **Root Directory:** `./` (leave as default)
3. **Build Command:** (EMPTY - leave blank)
4. **Output Directory:** (EMPTY - leave blank)
5. **Install Command:** `npm install` (or leave default)
6. **Development Command:** (EMPTY - leave blank)

### ⚠️ Common Mistakes:
- ❌ Setting Framework to "Express" or "Node.js"
- ❌ Adding a build command
- ❌ Setting an output directory
- ❌ Using a custom root directory

## How Vercel Auto-Detection Works

Vercel automatically maps:
- `/api/contact.js` → `/api/contact`
- `/api/admin/submissions.js` → `/api/admin/submissions`
- `/api/health.js` → `/api/health`

**No configuration file needed!**

## Testing After Fix

1. **Wait for deployment to complete**
2. **Test endpoints:**
   - `https://your-project.vercel.app/api/health` - Should return JSON
   - `https://your-project.vercel.app/api/contact` - Should accept POST
   - `https://your-project.vercel.app/` - Should show homepage

## If Still Getting 404

### Check Function Logs:
1. Go to Vercel Dashboard → Your Project → **Functions** tab
2. Click on any function (e.g., `api/contact`)
3. Check the **Logs** tab for errors

### Common Issues:
- **Function not found:** Check that files are in `api/` folder
- **Import errors:** Check that `db.js` is accessible
- **Runtime errors:** Check function logs for specific errors

### Verify File Structure:
```
EmpowerYou/
├── api/
│   ├── contact.js          ✅
│   ├── admin/
│   │   └── submissions.js  ✅
│   ├── health.js           ✅
│   ├── db.js               ✅
│   └── index.js            ✅
├── index.html
├── package.json
└── (other files...)
```

## Next Steps

1. **Update Vercel Project Settings** (most important!)
2. **Redeploy** (or wait for auto-deploy)
3. **Test endpoints**
4. **Check function logs** if still failing


