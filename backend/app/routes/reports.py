from fastapi import APIRouter, Depends
from datetime import date

router = APIRouter()

@router.get("/daily")
def daily_report(date: date, mess_id: str):
    # TODO: Aggregate stats from meal_scans vs meal_opt
    return {
        "date": date,
        "mess_id": mess_id,
        "stats": {
            "breakfast": {"opted": 100, "served": 85},
            "lunch": {"opted": 120, "served": 110},
            "dinner": {"opted": 115, "served": 0}
        }
    }
