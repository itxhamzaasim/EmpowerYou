Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Committing Netlify Configuration Files" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Staging files..." -ForegroundColor Yellow
git add netlify.toml
git add netlify/
git add NETLIFY_*.md
git add README_NETLIFY.md
git add GITHUB_CONNECTION.md
git add api/db.js
git add .gitignore

Write-Host ""
Write-Host "Files staged. Committing..." -ForegroundColor Yellow
git commit -m "Add Netlify deployment configuration with serverless functions"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Done! Your Netlify configuration is now on GitHub." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

