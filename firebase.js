import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAUvW2DCYJWYDbeOOh_En02Aku5vnLueYQ",
  authDomain: "openplug-f3567.firebaseapp.com",
  projectId: "openplug-f3567",
  storageBucket: "openplug-f3567.firebasestorage.app",
  messagingSenderId: "688731978431",
  appId: "1:688731978431:web:d55a3daf76649b4839640a",
  measurementId: "G-4V4CX7XYLM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
