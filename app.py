import os
import time
import requests
from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_URL = "https://api-inference.huggingface.co/models/google/pegasus-xsum"
HF_TOKEN = os.getenv("HF_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

def query(payload, retries=3, delay=5):
    for attempt in range(retries):
        response = requests.post(API_URL, headers=headers, json=payload)

        print("Status Code:", response.status_code)
        print("Response:", response.text)

        if response.status_code == 503:
            time.sleep(delay)
            continue

        if response.status_code == 200:
            return response.json()

        return {"error": response.json()}

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
            "max_length": maxL
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
