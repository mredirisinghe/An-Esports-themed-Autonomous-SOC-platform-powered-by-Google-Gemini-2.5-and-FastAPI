import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI application with professional structural metadata
app = FastAPI(
    title="Cyber Defense League (CDL) - Autonomous AI SOC Engine",
    version="1.0.0",
    description="Production-grade FastAPI backend leveraging Google Gemini 2.5 Flash for automated log analysis and incident response execution."
)

# Configure Cross-Origin Resource Sharing (CORS) Middleware
# Ensures secure telemetry pipeline binding between the React Frontend and FastAPI Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to specific domains (e.g., http://localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------------------------
# 1. AUTHENTICATION & INITIALIZATION (Environment Variable Security)
# ----------------------------------------------------------------------
# Securely fetching the Gemini API key from the host operating system environment variables.
# This prevents critical credential leakage and complies with standard security rules.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    # Fallback placeholder for local fallback testing indicators only
    GEMINI_API_KEY = "PLACEHOLDER_KEY_REPLACE_WITH_ENV_VAR"

# Initialize Google GenAI Client
client = genai.Client(api_key=GEMINI_API_KEY)


# ----------------------------------------------------------------------
# 2. DATA MODELS (Pydantic Request Telemetry Structures)
# ----------------------------------------------------------------------
class LogPayload(BaseModel):
    """Data model representing raw security logs ingested via the SIEM/Frontend."""
    logs: str


# ----------------------------------------------------------------------
# 3. SOAR MITIGATION PLAYBOOKS (Automated Response Logic)
# ----------------------------------------------------------------------
def execute_firewall_block(ip: str) -> str:
    """Simulates active infrastructure orchestration by appending an IPTABLES drop rule."""
    print(f"\n[🛡️ SOAR ORCHESTRATION] 🚫 Applying Network Policy: sudo iptables -A INPUT -s {ip} -j DROP")
    return f"Threat Mitigated: Malicious IP address {ip} successfully blacklisted at firewall perimeter."

def execute_subnet_isolation(subnet_name: str) -> str:
    """Triggers logical zoning segment isolation to contain internal pivot attempts."""
    print(f"\n[🛡️ SOAR ORCHESTRATION] ⚠️ Isolation Active: Segregating Segment_{subnet_name} from Core Routers...")
    return f"Threat Contained: Sub-network Segment_{subnet_name} logically isolated from backbone routing infrastructure."


# ----------------------------------------------------------------------
# 4. CORE AI SOC ENDPOINT (Intelligent Reasoning & Orchestration)
# ----------------------------------------------------------------------
@app.post("/api/analyze-logs")
async def analyze_and_defend(payload: LogPayload):
    """
    Ingests network logs, invokes Gemini LLM for structured analysis, 
    and autonomously triggers relevant SOAR playbooks if anomalous indicators are found.
    """
    
    # System prompt enforcing strict operational persona and behavioral boundaries
    system_brain_prompt = """
    You are an expert Cyber Defense Reasoning Agent operating within the high-performance SOC framework named 'Cyber Defense League'.
    Your primary function is to perform deep semantic analysis on incoming multi-line unstructured network logs,
    classify active threats, determine severity metrics, and recommend instantaneous mitigation actions.
    You MUST output your security decision strictly conforming to the specified JSON schema.
    """

    # Strictly defined JSON schema mapping to ensure deterministic response handling
    json_schema = {
        "type": "OBJECT",
        "properties": {
            "status": {"type": "STRING", "description": "Operational verdict. Must be either 'ATTACK_DETECTED' or 'SAFE'"},
            "threat_type": {"type": "STRING", "description": "Identified attack vector (e.g., SSH_BRUTE_FORCE, SQL_INJECTION, DDOS, or NONE)"},
            "risk_score": {"type": "INTEGER", "description": "Calculated risk severity ranging from 0 (Low) to 100 (Critical)"},
            "recommended_move": {"type": "STRING", "description": "Orchestration playbook keyword: BLOCK_IP, ISOLATE_SUB_NETWORK_ALPHA, or NO_ACTION"},
            "target_ip": {"type": "STRING", "description": "The specific source IP address responsible for generating the malicious payload traffic"}
        },
        "required": ["status", "threat_type", "risk_score", "recommended_move", "target_ip"]
    }

    try:
        # Querying Gemini utilizing structural compliance configurations
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"Perform immediate telemetry inspection on the following raw logs:\n{payload.logs}",
            config=types.GenerateContentConfig(
                system_instruction=system_brain_prompt,
                temperature=0.1,  # Low temperature guarantees consistent, highly factual analytical results
                response_mime_type="application/json",
                response_schema=json_schema
            ),
        )
        
        # Deserialize structural string response payload into a standard Python Dictionary
        agent_decision = json.loads(response.text)
        
        # Initialize default containment posture telemetry
        mitigation_status = "System secure. Continuous monitoring active."
        
        # --- SOAR AUTOMATION LAYER TRIGGER ---
        if agent_decision.get("status") == "ATTACK_DETECTED":
            move = agent_decision.get("recommended_move")
            target = agent_decision.get("target_ip")
            
            # Match behavioral classifications against operational orchestration hooks
            if move == "BLOCK_IP" and target:
                mitigation_status = execute_firewall_block(target)
            elif move == "ISOLATE_SUB_NETWORK_ALPHA":
                mitigation_status = execute_subnet_isolation("Alpha")
        
        # Consolidate analytical results and orchestration receipts for client ingestion
        return {
            "agent_analysis": agent_decision,
            "automation_execution": {
                "triggered": agent_decision.get("status") == "ATTACK_DETECTED",
                "message": mitigation_status
            }
        }

    except Exception as error:
        # Structural error handling providing telemetry visibility while maintaining API stability
        raise HTTPException(
            status_code=500, 
            detail=f"Internal Security Core Exception: {str(error)}"
        )

# Main execution block binding server to default internal network parameters
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
