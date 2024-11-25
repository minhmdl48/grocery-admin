// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAftib8OED0MjKljGnOy0PlVTq7xvwHE60",
  authDomain: "shopping-app-5395c.firebaseapp.com",
  databaseURL: "https://shopping-app-5395c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopping-app-5395c",
  storageBucket: "shopping-app-5395c.firebasestorage.app",
  messagingSenderId: "940588297434",
  appId: "1:940588297434:web:3a2bc37306880dada309e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

