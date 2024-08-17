// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6f4e5.firebaseapp.com",
  projectId: "mern-estate-6f4e5",
  storageBucket: "mern-estate-6f4e5.appspot.com",
  messagingSenderId: "832738757998",
  appId: "1:832738757998:web:b2602565f2dd216392857f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);