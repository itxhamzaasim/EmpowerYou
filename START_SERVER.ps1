Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EmpowerYou Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""

node server.js

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

