#!/bin/bash

echo "Setting up ISL Backend..."

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "Setup complete! Run 'source venv/bin/activate && python app.py' to start the server"
