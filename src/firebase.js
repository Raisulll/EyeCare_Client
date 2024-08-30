// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBT0XMjTc58ixG2gm0e2nvMFiKvEfCXa0",
  authDomain: "eye-care-6bd4a.firebaseapp.com",
  projectId: "eye-care-6bd4a",
  storageBucket: "eye-care-6bd4a.appspot.com",
  messagingSenderId: "94163249486",
  appId: "1:94163249486:web:27d018234ef96c816c961f",
  measurementId: "G-XJ0021GFD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app; 
