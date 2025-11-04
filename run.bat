@echo off
echo [INFORMATION] Kira-X for Windows

REM Run the setup.bat file
echo [Console @ Kira_X] Checking if the runtime programs are installed...echo [Console @ Kira_X] Checking if the runtime programs are installed...
call setup.bat

REM Verify if setup.bat finished successfully
if %errorlevel% neq 0 (
    echo [Console @ Kira_X] setup.bat terminated with errors, but execution will continue.
)

REM Run node index.js
echo [Console @ Kira_X] Starting Kira-X...echo [Console @ Kira_X] Starting Kira-X...
node index.js
if %errorlevel% neq 0 (
    echo [ERROR] An error occurred. Please verify the installation.
)

REM Final pause to keep the window open
echo Press any key to close this window...
pause
