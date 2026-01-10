# Smart Bulletin Board

AI-powered Smart Campus Bulletin Board using Gemini API & Firebase

## 🎓 Smart Campus Bulletin Board

**AI-Powered Campus Notice Management System**

An intelligent notice management platform that uses **Google's Gemini AI** to automatically categorize, personalize, and deliver campus announcements to students in real-time.

![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

**TechSprint 2025-26 | GDGoC VVIET Mysuru**

---

## 🌐 Live Application

🚀 **Visit Now:** https://quantumboard9.web.app

### 📍 Quick Links

- **Faculty ID Verification**: Additional verification for faculty accounts
- **Data Validation**: Input validation on both frontend and backend

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices
- **Cross-Platform Compatibility**: Works on desktop, tablet, and mobile
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: Designed with accessibility best practices

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design with modern styling
- **Vanilla JavaScript**: No frameworks, pure JS for better performance
- **Firebase SDK**: Authentication, Firestore, and Storage

### Backend
- **Flask**: Lightweight Python web framework
- **Google Gemini AI**: AI-powered content analysis
- **RESTful API**: Clean API design with JSON responses

### Database & Hosting
- **Firebase Firestore**: NoSQL database for real-time data
- **Firebase Storage**: File storage for notice images
- **Firebase Hosting**: Fast, secure web hosting

### Development Tools
- **Git**: Version control
- **VS Code**: Development environment
- **Firebase CLI**: Deployment and project management

---

## 🏗️ Architecture

The application follows a modern web architecture with clear separation of concerns:

### Frontend Architecture
- **Single Page Application (SPA)**: All functionality in one HTML page
- **Component-Based Structure**: Modular JavaScript functions
- **Event-Driven Programming**: Responsive user interactions
- **Real-time Updates**: Live data synchronization with Firestore

### Backend Architecture
- **Microservices Design**: Focused API endpoints
- **AI Integration**: External AI service for content analysis
- **CORS Enabled**: Cross-origin resource sharing for web access
- **Error Handling**: Comprehensive error management

### Data Flow
1. User submits notice through frontend form
2. Frontend sends data to Flask API
3. Flask API calls Gemini AI for analysis
4. AI returns structured analysis (category, importance, tags)
5. Frontend saves notice to Firestore with AI metadata
6. Real-time listeners update all connected clients

---

## 🚀 Installation

### Prerequisites
- Node.js (for Firebase CLI)
- Python 3.8+ (for Flask backend)
- Google Gemini API Key
- Firebase project

### Frontend Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (if not already done)
firebase init

# Deploy to Firebase Hosting
firebase deploy
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export GEMINI_API_KEY="your-gemini-api-key-here"

# Run the Flask server
python app.py
```

### Environment Configuration
Create a `.env` file in the backend directory:
```
GEMINI_API_KEY=your_actual_gemini_api_key
```

---

## 📖 Usage Guide

### For Students
1. **Sign Up/Login**: Create account or login with existing credentials
2. **View Notices**: Browse all published notices in real-time
3. **Filter by Category**: Use categories to find relevant notices
4. **Check Importance**: Pay attention to high-importance notices

### For Faculty
1. **Login**: Use faculty credentials and valid faculty ID
2. **Create Notice**: Fill in title and content
3. **Add Media**: Optionally upload images
4. **Mark as Event**: Check if it's an event
5. **Publish**: AI analyzes and publishes instantly

### Admin Features
- Faculty can post notices
- AI analysis is automatic
- Real-time updates for all users

---

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```
Returns API status and version information.

### Create Notice (AI Analysis)
```http
POST /api/notices
Content-Type: application/json

{
  "title": "Exam Schedule",
  "content": "Final exams start next week",
  "userId": "firebase-user-id"
}
```
Returns AI analysis with category, importance, and tags.

### Get Notices
```http
GET /api/notices
```
Returns list of all notices (currently returns sample data).

### Search Notices
```http
GET /api/notices/search?q=search_term
```
Returns notices matching the search query.

---

## 📸 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x600?text=Login+Page)

### Student Dashboard
![Student Dashboard](https://via.placeholder.com/800x600?text=Student+Dashboard)

### Faculty Notice Creation
![Faculty Dashboard](https://via.placeholder.com/800x600?text=Faculty+Dashboard)

### AI Analysis Results
![AI Analysis](https://via.placeholder.com/800x600?text=AI+Analysis)

---

## 🏆 Judging Criteria

### Innovation (25%)
- AI integration with Gemini API
- Real-time features
- Smart categorization system

### Technical Implementation (25%)
- Clean code architecture
- Firebase integration
- Responsive design
- Error handling

### User Experience (20%)
- Intuitive interface
- Mobile responsiveness
- Accessibility features

### Functionality (20%)
- All features working
- AI accuracy
- Real-time updates

### Presentation (10%)
- Code quality
- Documentation
- Deployment readiness

---

## 🚀 Future Roadmap

### Phase 1 (Completed)
- ✅ Basic notice posting
- ✅ AI categorization
- ✅ Real-time updates
- ✅ User authentication
- ✅ Responsive design

### Phase 2 (Upcoming)
- 🔄 Push notifications
- 🔄 Advanced search and filtering
- 🔄 Notice scheduling
- 🔄 Analytics dashboard
- 🔄 Mobile app

### Phase 3 (Future)
- 📱 Offline support
- 📱 Multi-language support
- 📱 Integration with campus systems
- 📱 Advanced AI features
- 📱 Admin panel

---

## 👥 Team

| Link | Description |
|------|-------------|
| 🔗 [Live Application](https://quantumdashboard9.web.app) | Access the running app |
| 💻 [GitHub Repository](https://github.com/ugender9/QUANTUM_BOARD) | Source code |
| 📹 [Demo Video](https://www.youtube.com) | 3-minute demo walkthrough |
| 📊 [Project Presentation](https://docs.google.com/presentation) | Slides & overview |
| 📱 [Firebase Console](https://console.firebase.google.com/project/quantumboard9) | Backend dashboard |

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Problem & Solution](#problem--solution)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Folder Explanations](#folder-explanations)
- [Screenshots](#screenshots)
- [Judging Criteria](#judging-criteria)
- [Future Roadmap](#future-roadmap)
- [Team](#team)
- [Deployment Info](#deployment-info)

---

## 📁 Project Structure

```
smart-bulletin-board/
├── .firebaserc                 # Firebase project configuration
├── .gitignore                  # Git ignore rules
├── firebase.json               # Firebase hosting configuration
├── package.json                # NPM dependencies
├── package-lock.json           # NPM lock file
├── README.md                   # Project documentation
├── SECURITY.md                 # Security policy
├── backend/                    # Flask backend API
│   ├── app.py                  # Main Flask application with Gemini AI
│   └── requirements.txt        # Python dependencies
├── frontend/                   # Static HTML pages (alternative UI)
│   ├── faculty-dashboard.html  # Faculty dashboard page
│   ├── index.html              # Main landing page
│   └── student-dashboard.html  # Student dashboard page
└── public/                     # Main frontend application
    ├── app.js                  # Main JavaScript logic
    ├── firebase-config.js      # Firebase configuration
    ├── index.html              # Main HTML page
    └── style.css               # CSS styles
```

---

## 📂 Folder Explanations

### Root Directory (`smart-bulletin-board/`)
The root directory contains configuration files and documentation for the entire project.

- **`.firebaserc`**: Specifies the Firebase project ID and aliases for deployment.
- **`.gitignore`**: Defines files and directories to exclude from Git version control (e.g., node_modules, .env files).
- **`firebase.json`**: Configuration for Firebase hosting, including public directory and rewrites.
- **`package.json` & `package-lock.json`**: NPM configuration for managing JavaScript dependencies (primarily Firebase SDK).
- **`README.md`**: This documentation file explaining the project.
- **`SECURITY.md`**: Security policy and guidelines for the project.

### Backend Directory (`backend/`)
Contains the Flask-based REST API that powers the AI functionality.

- **`app.py`**: Main Flask application that integrates with Google's Gemini AI for notice analysis. Handles API endpoints for notice creation, health checks, and AI-powered categorization.
- **`requirements.txt`**: Lists Python dependencies including Flask, Google Generative AI, python-dotenv, and flask-cors.

### Frontend Directory (`frontend/`)
Contains static HTML pages that were likely used for initial prototyping or alternative UI designs.

- **`faculty-dashboard.html`**: HTML page for faculty-specific dashboard features.
- **`index.html`**: Main landing page for the frontend.
- **`student-dashboard.html`**: HTML page for student-specific dashboard features.

*Note: This directory appears to be unused in the current deployment, as the main application uses the `public/` directory.*

### Public Directory (`public/`)
The main frontend application served by Firebase Hosting.

- **`app.js`**: Core JavaScript file handling authentication, notice posting, real-time updates, and UI interactions using Firebase Auth and Firestore.
- **`firebase-config.js`**: Firebase configuration with API keys and project settings.
- **`index.html`**: Main HTML page with the complete UI structure, including forms for login/signup and notice posting.
- **`style.css`**: CSS styles for responsive design, modern UI components, and visual consistency.

---

## 🎯 Overview

**Smart Bulletin Board** is a modern, AI-powered solution to campus notice management. It solves the problem of scattered, outdated, and hard-to-find campus announcements by providing:

- **Centralized Platform** - All campus notices in one place
- **AI Intelligence** - Automatic categorization using Google Gemini API
- **Personalization** - Notices tailored to student interests and departments
- **Real-time Updates** - Firebase ensures instant synchronization
- **Beautiful UI** - Modern, responsive design for all devices

### 🎯 Mission
To eliminate missed announcements and improve campus communication through intelligent, AI-powered notice distribution.

---

## ✨ Key Features

### 📚 Student Dashboard Features
- **Real-time Notice Feed**: View all campus notices in chronological order with automatic updates
- **Personalized Categories**: Notices are automatically categorized as Academic, Event, Deadline, Opportunity, or Other
- **Importance Levels**: Each notice is tagged with low, medium, or high importance for quick prioritization
- **Department Tags**: Notices are tagged with relevant departments (CSE, ECE, MECH, CIVIL) for targeted viewing
- **User Authentication**: Secure login/signup with role-based access (Student/Faculty)

### 👨‍🏫 Faculty Dashboard Features
- **AI-Powered Notice Creation**: Post notices with automatic AI analysis using Google Gemini API
- **Smart Categorization**: AI automatically determines category, importance, and relevant tags
- **Image Upload Support**: Attach images to notices with Firebase Storage integration
- **Event Marking**: Option to mark notices as events for special highlighting
- **Real-time Publishing**: Notices are instantly published and visible to all students

### 🤖 AI Features
- **Automatic Categorization**: Uses Gemini AI to classify notices into predefined categories
- **Importance Assessment**: AI determines the urgency level of each notice
- **Tag Generation**: Automatically generates relevant department tags based on content
- **Content Analysis**: Analyzes notice content to provide structured metadata

### 🔒 Security & Authentication
- **Firebase Authentication**: Secure user authentication with email/password
- **Role-Based Access**: Different permissions for students and faculty
**GDGoC VVIET Mysuru - TechSprint 2025-26**

- **Team Lead**: [Name]
- **Frontend Developer**: [Name]
- **Backend Developer**: [Name]
- **AI/ML Engineer**: [Name]
- **UI/UX Designer**: [Name]

*Contact: gdgc.vviete@gmail.com*

---

## 🚀 Deployment Info

### Firebase Hosting
- **Project ID**: quantumboard9
- **Hosting URL**: https://techsprint-smartboard-d0a55.web.app
- **Region**: us-central1

### Backend Deployment
- **Platform**: Local/Cloud Run
- **Port**: 5000
- **CORS**: Enabled for web access

### Environment Variables
- `GEMINI_API_KEY`: Google AI API key
- `FLASK_ENV`: development/production

### Build Commands
```bash
# Frontend
firebase deploy

# Backend
python app.py
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email gdgc.vviete@gmail.com or join our Discord channel.

---

*Built with ❤️ by GDGoC VVIET Mysuru for TechSprint 2025-26*
