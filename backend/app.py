from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64
import os


app = Flask(__name__)
CORS(app)


# Load model
model = None

def load_model():
    global model
    try:
        # Check if weights file exists
        weights_path = '../trained model/modelcheck.weights.h5'
        if not os.path.exists(weights_path):
            print(f"Weights file not found at {weights_path}")
            return False
            
        # Create model architecture matching the weights - adjusted for larger input
        model = tf.keras.Sequential([
            tf.keras.layers.Conv2D(24, (3, 3), activation='relu', input_shape=(128, 128, 1)),
            tf.keras.layers.BatchNormalization(),
            tf.keras.layers.MaxPooling2D(2, 2),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(2, 2),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(2, 2),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(2, 2),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Conv2D(256, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(2, 2),
            tf.keras.layers.Dropout(0.25),
            
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(2352, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(35, activation='softmax')
        ])
        
        # Build model
        model.build((None, 128, 128, 1))
        
        # Load weights
        model.load_weights(weights_path)
        print("Model loaded successfully")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

def preprocess_image(image_data):
    # Decode base64 image
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))
    # Convert to grayscale (model expects 1 channel)
    image = image.convert('L')
    image = image.resize((128, 128))
    image_array = np.array(image) / 255.0
    # Add channel dimension
    image_array = np.expand_dims(image_array, axis=-1)
    return np.expand_dims(image_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
        
    try:
        data = request.json
        image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64,
        
        # Preprocess image
        processed_image = preprocess_image(image_data)
        
        # Make prediction
        prediction = model.predict(processed_image)
        predicted_class = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]))
        
        # Map to character (A-Z, 0-9) - 35 classes total
        if predicted_class < 26:
            character = chr(ord('A') + predicted_class)
        elif predicted_class < 35:
            character = str(predicted_class - 26)
        else:
            character = 'UNKNOWN'
        
        return jsonify({
            'prediction': character,
            'confidence': confidence,
            'class_index': int(predicted_class)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    model_status = 'loaded' if model is not None else 'not loaded'
    return jsonify({'status': 'healthy', 'model': model_status})

if __name__ == '__main__':
    model_loaded = load_model()
    if not model_loaded:
        print("Warning: Model could not be loaded. Server will start but predictions will fail.")
    app.run(debug=True, host='0.0.0.0', port=5001)

