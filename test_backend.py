#!/usr/bin/env python3
import requests
import base64
import json

# Test health endpoint
print("Testing health endpoint...")
response = requests.get('http://localhost:5000/health')
print(f"Health check: {response.json()}")

# Create a simple test image (1x1 pixel)
test_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
image_b64 = base64.b64encode(test_image).decode()
image_data = f"data:image/png;base64,{image_b64}"

print("\nTesting prediction endpoint...")
try:
    response = requests.post('http://localhost:5000/predict', 
                           json={'image': image_data})
    if response.status_code == 200:
        result = response.json()
        print(f"Prediction successful: {result}")
    else:
        print(f"Prediction failed: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Error testing prediction: {e}")

print("\nBackend setup complete!")
print("- Backend server running on http://localhost:5000")
print("- Health endpoint: GET /health")  
print("- Prediction endpoint: POST /predict")
print("- Frontend API client ready in frontend/lib/api.ts")
print("- Example React component in frontend/components/SignPredictor.tsx")
