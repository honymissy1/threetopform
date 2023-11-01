// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPK8yjBQVBPggAgU0dy7gr9gVntoAfcho",
  authDomain: "threetop-backend-1.firebaseapp.com",
  projectId: "threetop-backend-1",
  storageBucket: "threetop-backend-1.appspot.com",
  messagingSenderId: "382312807732",
  appId: "1:382312807732:web:5fa949b4cef37096377961",
  measurementId: "G-MVB5ZFD3EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app)

export default db;
// const analytics = getAnalytics(app);