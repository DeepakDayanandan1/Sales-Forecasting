## Sales Forecasting (Next.js + Flask)

Three-page web app that predicts item outlet sales using your trained ML artifacts.

- Home: `/`
- Form: `/form`
- Result: `/result`

### Prerequisites
- Python 3.10+ (Windows)
- Node.js 18+

### Files Required (already present in project root)
- `lr_model.pkl`
- `scaler.pkl`
- `feature_columns.pkl`

---

### Backend (Flask)
1) Create venv and install deps
```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```
2) Run API (http://localhost:5001)
```
python app.py
```

Endpoints
- GET `/health` → `{ status: "ok" }`
- POST `/predict` → body:
```json
{
  "Item_Weight": 6.0,
  "Item_Visibility": 0.12,
  "Item_MRP": 200.0,
  "Item_Fat_Content": "Low Fat",
  "Outlet_Size": "Small",
  "Outlet_Location_Type": "Tier 1",
  "Outlet_Type": "Supermarket Type1",
  "New_Item_Type": "Food"
}
```
Response:
```json
{ "prediction": 1234.56 }
```

---

### Frontend (Next.js)
1) Install and run
```
cd frontend
npm i
npm run dev
# http://localhost:3000
```
2) Configure API base (optional)
```
set NEXT_PUBLIC_API_BASE=http://localhost:5001
npm run dev
```

---

### Common Tasks
- Clean Next build output:
```
cd frontend
rd /s /q .next
```
- Start backend with correct paths (model files are in project root; backend loads via `../`).

### Notes
- On PowerShell, chain commands without `&&` (run on separate lines).
- If `pandas` build fails on Windows, ensure latest `pip` and use the pinned versions in `backend/requirements.txt` (already adjusted for wheels on Windows).

### Project Structure (key files)
```
SalesForecast1/
  backend/
    app.py
    requirements.txt
  frontend/
    app/
      page.tsx
      form/page.tsx
      result/page.tsx
      globals.css
    components/ui/
      button.tsx
      card.tsx
    package.json
```


