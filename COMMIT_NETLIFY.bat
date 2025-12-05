@echo off
echo ========================================
echo Committing Netlify Configuration Files
echo ========================================
echo.

git add netlify.toml
git add netlify/
git add NETLIFY_*.md
git add README_NETLIFY.md
git add GITHUB_CONNECTION.md
git add api/db.js
git add .gitignore

echo.
echo Files staged. Committing...
git commit -m "Add Netlify deployment configuration with serverless functions"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Done! Your Netlify configuration is now on GitHub.
echo ========================================
pause

