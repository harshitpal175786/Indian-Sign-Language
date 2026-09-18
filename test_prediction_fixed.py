import requests
import base64
from PIL import Image
import io

print("🧪 Testing ISL Backend Prediction...")

# Create a proper test image
img = Image.new('RGB', (100, 100), color='white')
buffer = io.BytesIO()
img.save(buffer, format='PNG')
image_bytes = buffer.getvalue()
image_b64 = base64.b64encode(image_bytes).decode()
image_data = f"data:image/png;base64,{image_b64}"

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
