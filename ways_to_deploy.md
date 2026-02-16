# Deploying Abstract to Render

This guide outlines the steps to deploy your Flask backend and React frontend to Render.

## Prerequisites
- A GitHub account.
- Your code pushed to a GitHub repository (with `frontend` and backend files).
- A Render account (https://render.com).

## Part 1: Deploying the Backend (Flask)

1. **Dashboard**: Go to your Render Dashboard and click **New +** -> **Web Service**.
2. **Connect Repo**: Select your GitHub repository.
3. **Configure Service**:
   - **Name**: `abstract-backend` (or similar).
   - **Runtime**: Python 3.
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
4. **Environment Variables**:
   - Scroll down to "Environment Variables" and add:
     - Key: `HF_TOKEN`
     - Value: [Your Hugging Face Token]
     - Key: `PYTHON_VERSION`
     - Value: `3.10.0` (Recommended)
5. **Deploy**: Click **Create Web Service**.
6. **Copy URL**: Once deployed, copy the service URL (e.g., `https://abstract-backend.onrender.com`). You will need this for the frontend.

## Part 2: Deploying the Frontend (React)

1. **Dashboard**: Click **New +** -> **Static Site**.
2. **Connect Repo**: Select the same GitHub repository.
3. **Configure Site**:
   - **Name**: `abstract-frontend` (or similar).
   - **Root Directory**: `frontend` (Important: This tells Render the app is in the `frontend` folder).
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - Add the following variable to connect to your backend:
     - Key: `VITE_API_URL`
     - Value: [The Backend URL from Part 1] (e.g., `https://abstract-backend.onrender.com`) - **Do not include a trailing slash**.
5. **Deploy**: Click **Create Static Site**.

## Part 3: Verification

1. Wait for both deployments to finish.
2. Visit your frontend URL.
3. Try summarizing text. It should send the request to your deployed backend and return the result.

## Troubleshooting
- **CORS Issues**: If the frontend cannot reach the backend, restart the backend service (sometimes CORS settings need a fresh start) or ensure the backend URL in the frontend environment variable is correct.
- **Build Fails**: Check the logs on Render. Ensure `requirements.txt` is in the root for the backend, and `package.json` is in `frontend/` for the frontend.
