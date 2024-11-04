// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-53cc5.firebaseapp.com",
  projectId: "mern-blog-53cc5",
  storageBucket: "mern-blog-53cc5.firebasestorage.app",
  messagingSenderId: "242706565531",
  appId: "1:242706565531:web:96390e73158f02e533393e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
