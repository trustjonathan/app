@echo off
title Study Hub - Notes Index Generator

echo ----------------------------------------------
echo   STUDY HUB - AUTO PDF INDEX GENERATOR
echo ----------------------------------------------

REM Navigate to your project folder
cd /d "C:\Users\Perfect Elect\Documents\study app\scripts\notes"

echo Running generator...
node generateIndex.js

echo.
echo ----------------------------------------------
echo ✔ notesIndex.json created successfully!
echo ----------------------------------------------
echo Press any key to exit...
pause >nul
