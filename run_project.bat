@echo off
echo ==========================================
echo    Mess Management System - Quick Start
echo ==========================================
echo.

echo [1/2] Starting Backend Server...
start "Mess Backend" cmd /k "cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload"

echo [2/2] Starting Frontend Server...
start "Mess Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ==========================================
echo    System Starting...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8000
echo ==========================================
echo.
pause
