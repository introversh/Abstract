import os
import time
import requests
from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_URL = "https://router.huggingface.co/models/facebook/bart-large-cnn"
HF_TOKEN = os.getenv("HF_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

if not HF_TOKEN:
    print("Warning: HF_TOKEN is missing. Please set it in .env file.")

def query(payload, retries=3, delay=5):
    for attempt in range(retries):
        try:
            response = requests.post(API_URL, headers=headers, json=payload)
            print(f"Attempt {attempt+1}: Status Code: {response.status_code}")
            
            if response.status_code == 503:
                time.sleep(delay)
                continue

            try:
                return response.json()
            except ValueError:
                print("Error decoding JSON from HF:", response.text)
                return {"error": f"HF API returned non-JSON: {response.text[:100]}"}
                
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return {"error": f"Connection error: {str(e)}"}

    return {"error": "Model still loading after retries."}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/summarize", methods=["POST"])
def summarize():
    if request.is_json:
        data = request.json.get("data")
        maxL = int(request.json.get("maxL", 150))
    else:
        # Fallback for form data if needed (though we're moving to React)
        data = request.form.get("data")
        maxL = int(request.form.get("maxL", 150))
    
    minL = maxL // 4

    payload = {
        "inputs": data,
        "parameters": {
            "min_length": minL,
            "max_length": maxL,
            "do_sample": True,
            "temperature": 1.2,
            "top_p": 0.9,
            "repetition_penalty": 1.2
        }
    }

    result = query(payload)

    if isinstance(result, dict) and "error" in result:
        return {"error": "Model is loading or API error. Try again."}, 500

    summary = result[0].get("summary_text", "No summary returned.")

    if request.is_json:
        return {"summary": summary}
    
    return render_template("index.html", result=summary)


if __name__ == "__main__":
    app.run(debug=True)
