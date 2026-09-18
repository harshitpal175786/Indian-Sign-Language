import requests
import time

def test_backend():
    print("🧪 Testing Backend Connection...")
    try:
        response = requests.get('http://localhost:5001/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend: {data['status']} - {data.get('message', '')}")
            return True
        else:
            print(f"❌ Backend: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend: {e}")
        return False

def test_frontend():
    print("🌐 Testing Frontend Connection...")
    try:
        response = requests.get('http://localhost:3000', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend: Running on http://localhost:3000")
            return True
        else:
            print(f"❌ Frontend: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend: {e}")
        return False

if __name__ == "__main__":
    print("🔗 Testing ISL System Connection...\n")
    
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    
    print(f"\n📊 Connection Status:")
    print(f"   Backend (API): {'✅' if backend_ok else '❌'}")
    print(f"   Frontend (UI): {'✅' if frontend_ok else '❌'}")
    
    if backend_ok and frontend_ok:
        print(f"\n🎉 System is fully connected!")
        print(f"   🌐 Frontend: http://localhost:3000")
        print(f"   📡 Backend: http://localhost:5001")
        print(f"   🎯 Test translation: http://localhost:3000/translate")
    else:
        print(f"\n⚠️  System needs attention - check logs")
