// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtdUZ4nB5ebxFjxCzONhYclTdtpY2Xybo",
    authDomain: "kiddocircle.firebaseapp.com",
    projectId: "kiddocircle",
    storageBucket: "kiddocircle.appspot.com",
    messagingSenderId: "944950942825",
    appId: "1:944950942825:web:9f7b2a830df3d2e777d6f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const dataBase = getFirestore(app);