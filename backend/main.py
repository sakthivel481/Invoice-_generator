from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
from data import invoices  # backend/data.py should define invoices list

app = FastAPI(title="Airline Invoice API")

# Allow React frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, restrict to your frontend domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# API Endpoints
# -------------------------

@app.get("/a/invoices")
def get_invoices():
    """Return all invoices with IDs"""
    # Add unique IDs if not present
    return [
        {"id": idx + 1, **inv} for idx, inv in enumerate(invoices)
    ]

@app.get("/a/summary")
def get_summary():
    """Return airline-wise total amount"""
    summary = defaultdict(int)
    for inv in invoices:
        summary[inv["airline"]] += inv["amount"]
    return dict(summary)

@app.get("/a/suggest")
def suggest_high_value():
    """Return invoices flagged as high-value (> 10,000)"""
    suggested = [
        {"id": idx + 1, **inv}
        for idx, inv in enumerate(invoices)
        if inv["amount"] > 10000
    ]
    return suggested

# -------------------------
# Run with Uvicorn
# -------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
