@echo off
setlocal
title gumi_plants - GitHub Auto Deploy

echo ========================================================
echo   gumi_plants - GitHub and Vercel Auto Deploy
echo ========================================================
echo.

set PATH=C:\Users\kei_i\.gemini\antigravity\bin\git\cmd;C:\Users\kei_i\.gemini\antigravity\bin\git\mingw64\bin;C:\Users\kei_i\.gemini\antigravity\bin\node;%PATH%
cd /d C:\Users\kei_i\.gemini\antigravity\scratch\plant-id-manager

echo [1/3] Staging changes...
git add .

echo [2/3] Creating commit...
git commit -m "Update from deploy tool" >nul 2>&1

echo.
echo [3/3] Pushing to GitHub...
echo * If your browser opens, click "Sign in with your browser" / "Authorize" *
echo.

git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS: Upload to GitHub completed successfully!
    echo   Vercel will automatically update your site in ~30s.
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   NOTE: Please authorize in the browser window to complete.
    echo ========================================================
)

echo.
pause
