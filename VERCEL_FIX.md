# Vercel 404 Error Fix

## Issue
Getting `404: NOT_FOUND` error on Vercel deployment.

## Solution Applied

1. **Simplified vercel.json** - Removed complex routing, using Vercel's auto-detection
2. **Vercel automatically detects** serverless functions in the `api/` folder

## How Vercel Works

Vercel automatically maps:
- `/api/contact` → `/api/contact.js`
- `/api/admin/submissions` → `/api/admin/submissions.js`
- `/api/health` → `/api/health.js`

## If Still Getting 404

### Option 1: Remove vercel.json entirely
Delete `vercel.json` and let Vercel auto-detect everything.

### Option 2: Check Vercel Project Settings
1. Go to Vercel Dashboard → Your Project → Settings
2. Check "Build & Development Settings"
3. Ensure:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (empty)
   - Output Directory: (empty)
   - Install Command: `npm install`

### Option 3: Check Function Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Check the logs for any errors
3. Look for import/dependency issues

### Option 4: Verify File Structure
Make sure these files exist:
```
api/
  ├── contact.js
  ├── admin/
  │   └── submissions.js
  ├── health.js
  └── db.js
```

## Testing

After redeploying, test:
- `https://your-project.vercel.app/api/health` - Should return JSON
- `https://your-project.vercel.app/` - Should show homepage
- `https://your-project.vercel.app/admin.html` - Should show admin page

