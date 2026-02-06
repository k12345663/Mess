import os
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "your-service-role-key")

# Client initialization
# NOTE: In a real app, use the service role key CAREFULLY. 
# For end-user actions, you might want to forward the user's JWT.
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Warning: Supabase client failed to initialize (Config missing?): {e}")
    supabase = None

app = FastAPI(title="The Food Forge API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_user_id(authorization: str = Header(None)) -> str:
    """
    Extracts and validates ID from Supabase JWT.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    
    token = authorization.split(" ")[1]
    
    # Validating the JWT with Supabase Auth
    # Retrieve the User object to ensure the token is valid
    try:
        res = supabase.auth.get_user(token)
        if not res.user:
            raise HTTPException(status_code=401, detail="Invalid Token or User not found")
        return res.user.id
    except Exception as e:
        print(f"Auth Error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed") 

@app.get("/")
def health_check():
    return {"status": "ok", "service": "The Food Forge API"}

# Import and include routers (to be created)
from app.routes import menu, ops, reports

app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(ops.router, prefix="/api/ops", tags=["Operations"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
