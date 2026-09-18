#!/bin/bash

echo "🚀 Starting ISL Backend Server..."

# Kill any existing servers
pkill -f "app_simple.py" 2>/dev/null
pkill -f "app.py" 2>/dev/null

# Wait a moment
sleep 2

# Start the backend
cd backend
source venv/bin/activate
python app_simple.py &
BACKEND_PID=$!

echo "📡 Backend server starting with PID: $BACKEND_PID"
echo "⏳ Waiting for server to initialize..."

# Wait for server to start
sleep 3

# Test the server
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend server running successfully!"
    echo "🌐 Health endpoint: http://localhost:5001/health"
    echo "🎯 Predict endpoint: http://localhost:5001/predict"
    echo "ℹ️  Info endpoint: http://localhost:5001/info"
    echo ""
    echo "📝 To stop server: kill $BACKEND_PID"
    echo "📝 Server logs: backend/server.log"
else
    echo "❌ Backend server failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi
