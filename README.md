# Indian Sign Language Learning and Translation

A web application that promotes inclusive communication through Indian Sign Language (ISL). It helps Deaf and hard-of-hearing people, people who communicate without speech, caregivers, educators, and anyone who wants to learn ISL connect through visual language and accessible learning resources.

## Features

- ISL learning pages for letters, numbers, and common signs
- Image prediction interface for sign recognition
- Text translation endpoint for common phrases
- Accessible communication support for people who are non-speaking or have difficulty communicating verbally
- Beginner-friendly resources for families, caregivers, teachers, and hearing learners
- Health and backend information endpoints
- Next.js frontend with a Flask backend

## Accessibility and Inclusion

This project is designed to make communication and ISL learning more accessible for people who are Deaf, hard of hearing, non-speaking, or otherwise prefer visual communication. It can also help families, caregivers, educators, and community members learn signs and communicate more effectively.

ISL is a complete visual language used by the Deaf community. This application is a learning and assistive tool; it does not replace qualified interpreters or professional accessibility support when those services are needed.

## Project Structure

```text
.
├── backend/              Flask API and Python dependencies
├── frontend/             Next.js web application
├── Indian/               Local training dataset (ignored by Git)
├── trained model/        Local TensorFlow weights (ignored by Git)
├── start_backend.sh      Start the demo backend
└── start_system.sh       Start the real-model backend
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm or pnpm
- The trained model file is required for real predictions and is not included in this repository

## Setup

### Backend

Create and activate a virtual environment, then install the Python dependencies:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### Frontend

Install the frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Run the Demo

The demo backend does not require the trained model. It returns mock image predictions and supports text translation:

```bash
./start_backend.sh
```

In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The demo backend runs at [http://localhost:5001](http://localhost:5001).

## Run With the Trained Model

Place the model weights at:

```text
trained model/modelcheck.weights.h5
```

Then start the real-model backend:

```bash
./start_system.sh
```

The real backend expects the model weights to match its 128x128 grayscale CNN architecture. The `Indian/` dataset and model files are deliberately excluded from Git because of their size and should be provided locally or through separate artifact storage.

## API

### Health

```bash
curl http://localhost:5001/health
```

### Backend Information

Available in demo mode:

```bash
curl http://localhost:5001/info
```

### Image Prediction

Send a base64 data URL in the `image` field:

```bash
curl -X POST http://localhost:5001/predict \
  -H 'Content-Type: application/json' \
  -d '{"image":"data:image/jpeg;base64,<base64-image-data>"}'
```

The response includes `prediction`, `confidence`, and `class_index`.

### Text Translation

Available in demo mode:

```bash
curl -X POST http://localhost:5001/translate \
  -H 'Content-Type: application/json' \
  -d '{"text":"hello"}'
```

## Frontend Commands

Run these commands from `frontend/`:

```bash
npm run dev      # Start development server
npm run build    # Create a production build
npm start        # Serve the production build
npm run lint     # Run linting if supported by the installed Next.js version
```

The frontend expects the backend at `http://localhost:5001`.

## Git and Large Files

Sensitive files, local environments, logs, generated build output, the `Indian/` dataset, and trained model artifacts are excluded in the root `.gitignore`. Do not commit credentials or local model/data files to the public repository.
