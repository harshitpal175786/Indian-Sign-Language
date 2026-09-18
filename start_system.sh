#!/bin/bash

echo "🚀 Starting ISL System..."

# Start backend
echo "📡 Starting backend server..."
cd backend
source venv/bin/activate
python app.py > server.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend server running on http://localhost:5001"
else
    echo "❌ Backend server failed to start"
    exit 1
fi
# Start frontend (if needed)
echo "🎨 Frontend ready at: frontend/"
echo "📁 API client available at: frontend/lib/api.ts"
echo "🧩 Example component at: frontend/components/SignPredictor.tsx"

echo ""
echo "🎯 System Status:"
echo "   Backend: http://localhost:5001"
echo "   Health: http://localhost:5001/health"
echo "   Predict: POST http://localhost:5001/predict"
echo ""
echo "📝 To stop backend: kill $BACKEND_PID"
echo "📝 To start frontend: cd frontend && npm run dev"
