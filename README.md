# The Food Forge: The Taste Buds 🍔

Modern mess management system for hostels and canteens, replacing paper coupons with digital QR attendance.

## 📁 Project Structure

```bash
Mess Management/
├── frontend/               # Next.js Application
│   ├── app/               # App Router pages (Home, Login, Admin, Student)
│   ├── components/        # Reusable UI components
│   └── ...
├── backend/                # Python FastAPI Backend
│   ├── app/               # API routes and logic
│   └── requirements.txt   # Python dependencies
├── run_project.bat        # One-click start script (Windows)
└── README.md              # Documentation
```

## 🛠️ Environment Configuration (Supabase)

This project uses **Supabase** for the database and authentication.

1.  **Create a Project**: Go to [Supabase](https://supabase.com) and create a new project.
2.  **Get Credentials**:
    *   Go to **Project Settings** -> **API**.
    *   Copy the `Project URL` and `anon` public key.
    *   Copy the `service_role` secret key.
3.  **Configure Files**:

    **Backend:** Open `backend/.env`
    ```env
    SUPABASE_URL=your-project-url
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
    ```

    **Frontend:** Open `frontend/.env.local`
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    ```

4.  **Setup Database**:
    *   Open `supabase/migrations/20240205_initial_schema.sql` in this repo.
    *   Copy the content.
    *   Go to **Supabase Dashboard** -> **SQL Editor**.
    *   Paste and click **Run**.

## 🚀 How to Run

### Option 1: The "Easy" Way (Windows)
Just double-click **`run_project.bat`** in the root folder.

### Option 2: Manual Start

**1. Start Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**2. Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔗 Links
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:3000/admin
