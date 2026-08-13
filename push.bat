@echo off
echo ===================================================
echo   Pushing code changes to GitHub (Rahul20s/Travorai.in)...
echo ===================================================
echo.

cd /d "%~dp0"

if not exist ".git" (
    echo Initializing git repository...
    call git init
    call git remote add origin https://github.com/Rahul20s/Travorai.in.git
)

echo [1/3] Staging all changed files...
call git add .

echo [2/3] Committing changes...
call git commit -m "Configure Travelpayouts affiliate integration and environment setup"

echo [3/3] Pushing to GitHub repository...
call git branch -M main
call git push -u origin main

echo.
echo ===================================================
echo   Done! All changes pushed to GitHub successfully.
echo ===================================================
pause
