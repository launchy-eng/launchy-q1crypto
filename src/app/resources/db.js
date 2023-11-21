import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "pawwsstudio.firebaseapp.com",
    projectId: "pawwsstudio",
    storageBucket: "pawwsstudio.appspot.com",
    messagingSenderId: "1004091483681",
    appId: "1:1004091483681:web:0ca2f8a84206c54acee560",
    measurementId: "G-BF80TD272P"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
