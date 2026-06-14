# 🛡️ Cyber Defense League (CDL) - Autonomous AI SOC Engine

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Gemini](https://img.shields.io/badge/AI_Core-Gemini_2.5_Flash-blue?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

An Esports cyberpunk-themed **Autonomous Security Operations Center (SOC)** engine. The system ingests raw, unstructured network logs, leverages the semantic reasoning of **Google Gemini 2.5 Flash** to identify critical threat vectors, and triggers automatic network/firewall containment playbooks (SOAR) in real-time.

---

## 🚀 Core Features

- **AI-Driven Threat Intelligence:** Performs deep inspection on unstructured multi-line server/router logs to extract structured intelligence.
- **Deterministic JSON Output:** Utilizes Gemini's `response_schema` to guarantee reliable data types for strict backend routing.
- **SOAR Automation:** Programmatically simulates security playbook actions such as perimeter firewall blocking (`IPTABLES`) and logical network segment isolation.
- **Esports-Inspired Telemetry Dashboard:** High-octane, dark-mode visual interface built with React and Tailwind CSS v4 for real-time monitoring.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Vite, Tailwind CSS v4 (Esports Cyberpunk UI)
- **Backend:** FastAPI, Pydantic, Uvicorn (Asynchronous API Gateway)
- **Orchestration Core:** Google GenAI SDK (Gemini 2.5 Flash Model)

---

## ⚙️ Installation & Deployment

### 1. Prerequisites
Ensure you have Python 3.10+, Node.js (v18+), and a Gemini API Key from Google AI Studio.

### 2. Backend Setup
```bash
# Navigate to root directory
cd "Project 6"

# Initialize and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install fastapi uvicorn google-genai pydantic

# Inject API Credentials securely into host environment
export GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Boot up the FastAPI application gateway
python3 main.py
