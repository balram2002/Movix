import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA-ozy8lyn_NcwPsAsFVV_frVncQSBNXHA",
    authDomain: "moviesverseapp-52347.firebaseapp.com",
    projectId: "moviesverseapp-52347",
    storageBucket: "moviesverseapp-52347.appspot.com",
    messagingSenderId: "555065751820",
    appId: "1:555065751820:web:811c865e33ac5034953129",
    measurementId: "G-JFCEC8MF62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
