@echo off
REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [Console @ Kira-X] Node.js is not installed. Running installer...
    start /wait node-installer.msi
) else (
    echo [Console @ Kira-X] Node.js is already installed.
)

REM Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [Console @ Kira-X] Git is not installed. Running installer...
    start /wait git-installer.exe
) else (
    echo [Console @ Kira-X] Git is already installed.
)

REM Check if ImageMagick is installed
where convert >nul 2>nul
if %errorlevel% neq 0 (
    echo [Console @ Kira-X] ImageMagick is not installed. Running installer...
    start /wait imagemagick-installer.exe
) else (
    echo [Console @ Kira-X] ImageMagick is already installed.
)

REM Run Git pull
echo [Console @ Kira-X] Checking for updates...
git pull

REM Run npm install (ignore crash)
echo [Console @ Kira-X] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo [Console @ Kira-X] A problem was detected after npm install, but it will be ignored to continue.
)

REM Run node index.js
echo [Console @ Kira-X] Launching node index.js...
node index.js

pause
