# Connect to Your Existing GitHub Repository

## 🔗 Connect Your Local Project to GitHub

If you have an existing GitHub repository named **EmpowerYou**, follow these steps to connect your local project:

### Step 1: Check if Git is Initialized

Open terminal/PowerShell in your project folder and run:
```bash
git status
```

If you see "not a git repository", initialize Git:
```bash
git init
```

### Step 2: Add Your GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/EmpowerYou.git
```

**Example:**
If your GitHub username is `johndoe`, the command would be:
```bash
git remote add origin https://github.com/johndoe/EmpowerYou.git
```

### Step 3: Verify Connection

Check if the remote was added correctly:
```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/EmpowerYou.git (fetch)
origin  https://github.com/YOUR_USERNAME/EmpowerYou.git (push)
```

### Step 4: Pull Existing Files (if any)

If your GitHub repository already has files, pull them first:
```bash
git pull origin main --allow-unrelated-histories
```

### Step 5: Add and Commit Your Files

```bash
git add .
git commit -m "Add Netlify deployment configuration"
```

### Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## ✅ Verification

After pushing, check your GitHub repository:
- Go to `https://github.com/YOUR_USERNAME/EmpowerYou`
- You should see all your files including the new Netlify configuration

## 🚀 Next Steps

Once your code is on GitHub, you can:
1. Deploy to Netlify (see `NETLIFY_QUICK_START.md`)
2. Your repository will be available for Netlify to import

## 🔧 Troubleshooting

### "remote origin already exists"
If you get this error, remove the existing remote first:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/EmpowerYou.git
```

### "Permission denied"
- Make sure you're logged into GitHub
- Use GitHub Desktop or authenticate via SSH/HTTPS
- Check your GitHub credentials

### "Repository not found"
- Verify the repository name is exactly `EmpowerYou` (case-sensitive)
- Make sure the repository exists on GitHub
- Check your GitHub username is correct

