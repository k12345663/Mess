# Mess Management System 🍔

A modern, full-stack mess management application designed for hostels, featuring QR-based attendance, real-time tracking, and a premium mobile-first UI inspired by Zomato/OYO.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Lucide Icons
- **Backend**: Python FastAPI, Supabase Client
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (Frontend), Railway/Render (Backend compatible)

## ✨ Key Features

### 📱 Student Dashboard
- **Mobile-First Design**: Optimized for on-the-go usage.
- **Dynamic Meal Status**: Real-time status for Breakfast, Lunch, and Dinner.
- **QR Token**: Auto-generated QR code for contactless meal verification.
- **Attendance History**: View past meal scans and activity logs.

### 🔐 Admin Panel
- **QR Scanner**: Built-in camera scanner for verifying student tokens.
- **Real-Time Stats**: Live counters for total meals served (Breakfast/Lunch/Dinner).
- **Student Management**: View registered students and manage access.
- **Secure Login**: Role-based access control.

### 🎨 Modern UI/UX
- **Glassmorphism**: Premium frosted glass effects.
- **Animations**: Smooth transitions and interaction feedback.
- **Theme**: Coral Red (#E23744) & Warm Orange palette.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase Account

## 🚀 Quick Start (Windows)

**The easiest way to run the app:**
1.  Double-click **`run_project.bat`** in the root folder.
2.  That's it! It will install dependencies and start both servers automatically.

---

## 🛠️ Manual Setup Guide

If you prefer running commands manually:

### 1. Backend Setup (Python)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
*Server running at http://localhost:8000*

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*App running at http://localhost:3000*

## 📁 Project Structure

```
MESS MANAGEMENT/
├── frontend/          # Next.js Application
│   ├── app/           # Pages & Routes (Admin, Login, Student)
│   ├── components/    # Reusable UI Components
│   └── public/        # Static Assets
├── backend/           # Python API
│   ├── app/
│   │   ├── routes/    # API Endpoints (Ops, Menu, Reports)
│   │   └── main.py    # Entry Point
│   └── requirements.txt
└── README.md          # Project Documentation
```

## 🛠️ Environment Variables

Create `.env` in `backend/` and `.env.local` in `frontend/`:

**Frontend (.env.local)**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend (.env)**
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
```

## 🚀 Deployment

### Cloud Deployment (Vercel + Render/Railway)

1.  **Frontend (Vercel)**:
    - Push `frontend` folder to GitHub.
    - Import project in Vercel.
    - Add Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
    - Deploy!

2.  **Backend (Render/Railway)**:
    - Push `backend` folder to GitHub.
    - Create a new Web Service.
    - Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
    - Add Environment Variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
    - Deploy!

## 🧪 Deployment Verification
Before pushing, verify builds locally:
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
# Ensure requirements are installed
pip install -r requirements.txt
```
