@echo off
title Plant ID Manager
cd /d "%~dp0"

set "PATH=C:\Users\kei_i\.gemini\antigravity\bin\node;%PATH%"

echo ========================================================
echo   Plant ID Manager (Plant ID Management Web App)
echo ========================================================
echo.
echo [1/2] Opening browser at http://localhost:5173 ...
start http://localhost:5173
echo.
echo [2/2] Starting server...
echo --------------------------------------------------------
echo NOTE: Do not close this window while using the app.
echo --------------------------------------------------------
echo.

call "C:\Users\kei_i\.gemini\antigravity\bin\node\npm.cmd" run dev -- --host 0.0.0.0 --port 5173

echo.
echo ========================================================
echo Server stopped.
echo ========================================================
pause
