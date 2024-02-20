// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c725f.firebaseapp.com",
  projectId: "mern-blog-c725f",
  storageBucket: "mern-blog-c725f.appspot.com",
  messagingSenderId: "891968492500",
  appId: "1:891968492500:web:c4dd9876e3fadb0451bc41"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);