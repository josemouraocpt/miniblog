// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrYn5rfNY8gnd_ObOJ9GstAzJaiNl0zJc",
  authDomain: "mini-blog-63dc1.firebaseapp.com",
  projectId: "mini-blog-63dc1",
  storageBucket: "mini-blog-63dc1.appspot.com",
  messagingSenderId: "657646620430",
  appId: "1:657646620430:web:541b66862d6be00f68115f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };

