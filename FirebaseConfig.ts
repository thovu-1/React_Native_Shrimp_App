// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import AsyncStorage from '@react-native-async-storage/async-storage'
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
  measurementId: "G-6998NVF9KD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_STOREAGE_BUCKET = getStorage(app)
export const FIREBASE_AUTH = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);


export const uploadToFirebase = async (uri:any, name:any, onProgress:any) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
  
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
        }, 
        (error) => {
        reject(error);
        }, 
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              downloadURL,
              metadata: uploadTask.snapshot.metadata,
            })
        
      }
    );
  });
};





// const analytics = getAnalytics(FIREBASE_APP);