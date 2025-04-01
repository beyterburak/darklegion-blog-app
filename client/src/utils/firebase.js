// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "darklegion-blog-app.firebaseapp.com",
  projectId: "darklegion-blog-app",
  storageBucket: "darklegion-blog-app.firebasestorage.app",
  messagingSenderId: "92625543194",
  appId: "1:92625543194:web:9f18ce0b5e3425439031a3",
  measurementId: "G-1TFYVWLFTH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);