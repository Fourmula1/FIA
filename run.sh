#!/bin/bash
source venv/bin/activate

# Kill any existing processes on ports 8000 (API) and 8501 (Streamlit)
fuser -k 8000/tcp 2>/dev/null
fuser -k 8501/tcp 2>/dev/null

echo "Starting FIA Backend API..."
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000 > api.log 2>&1 &
API_PID=$!

echo "Waiting for API to initialize..."
sleep 5

echo "Starting FIA Dashboard..."
streamlit run src/ui/dashboard.py
