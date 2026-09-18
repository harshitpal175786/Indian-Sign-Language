from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import base64
import random

app = Flask(__name__)
CORS(app)

# Character mapping for ISL (A-Z, 0-9)
CHARACTERS = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

# Simple text responses for common phrases
TEXT_RESPONSES = {
    "how are you": "I am good",
    "hello": "Hello, nice to meet you",
    "thank you": "You are welcome",
    "what is your name": "My name is ISL Assistant",
    "good morning": "Good morning to you too",
    "how old are you": "I am a computer program",
    "where are you from": "I am from India",
    "nice to meet you": "Nice to meet you too",
    "goodbye": "See you later",
    "help me": "I am here to help you"
}

def preprocess_image(image_data):
    """Process image for prediction"""
    try:
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        image = image.convert('L')  # Convert to grayscale
        image = image.resize((128, 128))
        image_array = np.array(image) / 255.0
        return image_array
    except Exception as e:
        raise ValueError(f"Image processing failed: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if 'image' in data:
            # Image prediction
            image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64,
            
            # Process image
            processed_image = preprocess_image(image_data)
            
            # Mock prediction
            predicted_class = random.randint(0, len(CHARACTERS) - 1)
            character = CHARACTERS[predicted_class]
            confidence = random.uniform(0.7, 0.95)
            
            return jsonify({
                'prediction': character,
                'confidence': round(confidence, 3),
                'class_index': predicted_class,
                'status': 'mock_prediction'
            })
        else:
            return jsonify({'error': 'No image provided'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/translate', methods=['POST'])
def translate_text():
    try:
        data = request.json
        if 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
            
        input_text = data['text'].lower().strip()
        
        # Check for exact match
        if input_text in TEXT_RESPONSES:
            response = TEXT_RESPONSES[input_text]
        else:
            # Generate a simple response
            response = f"I understand you said: {input_text}"
        
        return jsonify({
            'input': data['text'],
            'response': response,
            'type': 'text_translation'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model': 'mock_ready',
        'message': 'Backend ready - supports image prediction and text translation'
    })

@app.route('/info', methods=['GET'])
def info():
    return jsonify({
        'backend': 'ISL Sign Language Predictor',
        'version': '1.0',
        'supported_classes': len(CHARACTERS),
        'characters': CHARACTERS,
        'text_responses': len(TEXT_RESPONSES),
        'endpoints': {
            'health': 'GET /health',
            'predict': 'POST /predict (image)',
            'translate': 'POST /translate (text)',
            'info': 'GET /info'
        }
    })

if __name__ == '__main__':
    print("🚀 ISL Backend starting...")
    print("📡 Server will run on http://localhost:5001")
    print("🖼️  Image prediction: POST /predict")
    print("💬 Text translation: POST /translate")
    app.run(debug=False, port=5001)
