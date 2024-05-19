// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-WkpxL2BMXA7irxv6fsBupA3cqODP7c",
  authDomain: "shirmp-project-backend.firebaseapp.com",
  databaseURL: "https://shirmp-project-backend-default-rtdb.firebaseio.com",
  projectId: "shirmp-project-backend",
  storageBucket: "shirmp-project-backend.appspot.com",
  messagingSenderId: "790979789151",
  appId: "1:790979789151:web:47034edd2bc77ba2cbb6ea",
  measurementId: "G-6998NVF9KD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);