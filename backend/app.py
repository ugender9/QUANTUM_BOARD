from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env
load_dotenv()

# Configure Gemini API using API key from .env
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'API Running!'}), 200


@app.route('/api/notices', methods=['POST'])
def create_notice():
    try:
        data = request.json or {}
        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return jsonify({'success': False, 'error': 'title and content are required'}), 400

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

        return jsonify({'success': True, 'analysis': analysis}), 201

    except json.JSONDecodeError:
        return jsonify({'success': False, 'error': 'Model did not return valid JSON'}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/notices', methods=['GET'])
def get_notices():
    notices = [
        {'id': '1', 'title': 'CSE Exam Schedule', 'category': 'Academic', 'importance': 'high'},
        {'id': '2', 'title': 'Hackathon Registration', 'category': 'Event', 'importance': 'medium'}
    ]
    return jsonify({'notices': notices}), 200


@app.route('/api/notices/search', methods=['GET'])
def search_notices():
    query = request.args.get('q', '')
    return jsonify({'results': [{'id': '1', 'title': 'CSE Exam Schedule', 'matched_query': query}]}), 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
