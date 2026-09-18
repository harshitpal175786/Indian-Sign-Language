import requests
import base64
import json

# Create a simple test image (1x1 pixel PNG)
test_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
image_b64 = base64.b64encode(test_image).decode()
image_data = f"data:image/png;base64,{image_b64}"

print("🧪 Testing ISL Backend Prediction...")

try:
    response = requests.post('http://localhost:5001/predict', 
                           json={'image': image_data})
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Prediction successful!")
        print(f"   Character: {result['prediction']}")
        print(f"   Confidence: {result['confidence']:.1%}")
        print(f"   Class Index: {result['class_index']}")
        print(f"   Status: {result['status']}")
    else:
        print(f"❌ Prediction failed: {response.status_code}")
        print(f"   Response: {response.text}")
        
except Exception as e:
    print(f"❌ Error: {e}")

print("\n🎯 Backend is ready for frontend integration!")
