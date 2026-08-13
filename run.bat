@echo off
echo ===================================================
echo   Starting Travora Project Setup & Dev Server...
echo ===================================================
echo.

cd /d "c:\Users\shlok\Downloads\Travorai.in-main\Travorai.in-main"

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error during npm install
    pause
    exit /b %ERRORLEVEL%
)

echo [2/4] Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo Error during prisma generate
    pause
    exit /b %ERRORLEVEL%
)

echo [3/4] Pushing Prisma Schema to Supabase Database...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Prisma db push failed or requires attention. Continuing...
)

echo [4/4] Starting Next.js Dev Server...
call npm run dev

pause
