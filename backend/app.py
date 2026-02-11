from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)  # Allow React to talk to Flask

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, '../data/processed')

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "API is running"})

@app.route('/api/results', methods=['GET'])
def get_analysis_results():
    """Serves the Change Point Analysis results (JSON)."""
    try:
        with open(os.path.join(DATA_DIR, 'analysis_results.json'), 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Analysis not found. Run the notebook first."}), 404

@app.route('/api/events', methods=['GET'])
def get_events():
    """Serves the list of historical events."""
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'oil_price_events.csv'))
        # Convert to list of dicts
        events = df.to_dict(orient='records')
        return jsonify(events)
    except FileNotFoundError:
        return jsonify({"error": "Events file not found."}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)