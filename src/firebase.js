// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-e06f2.firebaseapp.com",
  projectId: "x-next-e06f2",
  storageBucket: "x-next-e06f2.appspot.com",
  messagingSenderId: "358844572908",
  appId: "1:358844572908:web:936f813c336c7b8239b1c9",
  measurementId: "G-SQR0VWSEQW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);