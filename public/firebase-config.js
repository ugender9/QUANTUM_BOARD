// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwD_J2y1Nf1C5uQrfo5T-KMIWy-PSI3Q0",
  authDomain: "quantumboard9.firebaseapp.com",
  projectId: "quantumboard9",
  storageBucket: "quantumboard9.firebasestorage.app",
  messagingSenderId: "727280019376",
  appId: "1:727280019376:web:c16d18b68a7a1aebbe1875",
  measurementId: "G-SM8BSDK9EV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references
const auth = firebase.auth();
const db = firebase.firestore();

console.log('Firebase initialized successfully');
