@echo off
title Plant ID Manager - Stop
cd /d "%~dp0"
echo Stopping Plant ID Manager server...
powershell -Command "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like '*node*' } | Stop-Process -Force -ErrorAction SilentlyContinue"
echo Server stopped.
timeout /t 2 > nul
