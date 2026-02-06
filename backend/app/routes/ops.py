from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class MealOptIn(BaseModel):
    mess_id: str
    opt_date: date
    meal: str
    is_opted: bool

class ScanAttempt(BaseModel):
    mess_id: str
    user_id: str
    meal: str

@router.post("/opt")
def opt_meal(payload: MealOptIn):
    # TODO: Upsert into meal_opt table
    return {"status": "success", "data": payload}

@router.post("/scan")
def scan_qr(payload: ScanAttempt):
    # TODO: Check eligibility and insert into meal_scans
    # Logical steps:
    # 1. Check if user is active member of mess
    # 2. Check if user opted in for this meal
    # 3. Check if already scanned (unique constraint)
    return {"status": "served", "scan_time": "now"}
