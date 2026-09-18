const API_BASE_URL = 'http://localhost:5001';

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  class_index?: number;
  status?: string;
}

export interface ErrorResponse {
  error: string;
}

export async function predictSign(imageData: string): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageData }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Prediction failed');
  }

  return response.json();
}

export async function checkHealth(): Promise<{ status: string; model?: string; message?: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}

export async function getInfo(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/info`);
  return response.json();
}
