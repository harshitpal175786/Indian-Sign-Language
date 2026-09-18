'use client';

import { useState, useRef } from 'react';
import { predictSign } from '@/lib/api';

export default function SignPredictor() {
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        const result = await predictSign(imageData);
        setPrediction(result.prediction);
        setConfidence(result.confidence);
      } catch (error) {
        console.error('Prediction error:', error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">ISL Sign Predictor</h2>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      
      {loading && <p className="text-blue-600">Predicting...</p>}
      
      {prediction && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="text-lg font-semibold">Prediction: {prediction}</p>
          <p className="text-sm text-gray-600">Confidence: {(confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
