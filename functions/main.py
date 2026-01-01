from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app
import google.generativeai as genai
import json
import os

# Initialize Firebase Admin
initialize_app()

# Set global options
set_global_options(max_instances=10)

# Configure Gemini API
# Note: In production, use Firebase Functions secrets or environment variables
# For now, assuming GEMINI_API_KEY is set in environment
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))


@https_fn.on_request()
def api_health(req: https_fn.Request) -> https_fn.Response:
    """Health check endpoint"""
    if req.method != "GET":
        return https_fn.Response("Method not allowed", status=405)

    return https_fn.Response(
        json.dumps({"status": "OK", "message": "API Running!"}),
        status=200,
        headers={"Content-Type": "application/json"}
    )


@https_fn.on_request()
def api_notices(req: https_fn.Request) -> https_fn.Response:
    """Handle notices endpoints"""
    if req.method == "POST":
        return create_notice(req)
    elif req.method == "GET":
        return get_notices(req)
    else:
        return https_fn.Response("Method not allowed", status=405)


def create_notice(req: https_fn.Request) -> https_fn.Response:
    """Create a new notice with AI analysis"""
    try:
        if req.method != "POST":
            return https_fn.Response("Method not allowed", status=405)

        # Get JSON data
        data = req.get_json(silent=True) or {}
        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return https_fn.Response(
                json.dumps({"success": False, "error": "title and content are required"}),
                status=400,
                headers={"Content-Type": "application/json"}
            )

        # AI Analysis prompt
        prompt = f"""
Analyze the following campus notice and classify it.

Title: {title}
Content: {content}

Return ONLY a valid JSON object in this format:
{{
  "category": "Academic" | "Event" | "Deadline" | "Opportunity" | "Other",
  "importance": "low" | "medium" | "high",
  "tags": ["CSE","ECE","MECH","CIVIL"]
}}
"""

        # Use Gemini with JSON output
        model = genai.GenerativeModel(
            model_name="gemini-flash-latest",
            generation_config={"response_mime_type": "application/json"}
        )
        response = model.generate_content(prompt)

        # Model returns JSON string directly
        raw_text = response.text
        analysis = json.loads(raw_text)

        return https_fn.Response(
            json.dumps({"success": True, "analysis": analysis}),
            status=201,
            headers={"Content-Type": "application/json"}
        )

    except json.JSONDecodeError:
        return https_fn.Response(
            json.dumps({"success": False, "error": "Model did not return valid JSON"}),
            status=500,
            headers={"Content-Type": "application/json"}
        )
    except Exception as e:
        return https_fn.Response(
            json.dumps({"success": False, "error": str(e)}),
            status=500,
            headers={"Content-Type": "application/json"}
        )


def get_notices(req: https_fn.Request) -> https_fn.Response:
    """Get all notices (placeholder implementation)"""
    if req.method != "GET":
        return https_fn.Response("Method not allowed", status=405)

    # Placeholder data - in real implementation, this would fetch from Firestore
    notices = [
        {'id': '1', 'title': 'CSE Exam Schedule', 'category': 'Academic', 'importance': 'high'},
        {'id': '2', 'title': 'Hackathon Registration', 'category': 'Event', 'importance': 'medium'}
    ]

    return https_fn.Response(
        json.dumps({"notices": notices}),
        status=200,
        headers={"Content-Type": "application/json"}
    )


@https_fn.on_request()
def api_notices_search(req: https_fn.Request) -> https_fn.Response:
    """Search notices endpoint"""
    if req.method != "GET":
        return https_fn.Response("Method not allowed", status=405)

    query = req.args.get('q', '')
    # Placeholder implementation
    results = [{'id': '1', 'title': 'CSE Exam Schedule', 'matched_query': query}]

    return https_fn.Response(
        json.dumps({"results": results}),
        status=200,
        headers={"Content-Type": "application/json"}
    )
