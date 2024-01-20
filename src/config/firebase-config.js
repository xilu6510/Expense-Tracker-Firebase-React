// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa4ACUac67r56SEJkghLDyAlhCqz4-5TI",
  authDomain: "expense-tracker-a6a67.firebaseapp.com",
  projectId: "expense-tracker-a6a67",
  storageBucket: "expense-tracker-a6a67.appspot.com",
  messagingSenderId: "394100378942",
  appId: "1:394100378942:web:ca2b79287ed44bc5cfb06f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(); //get database access, the database is called "cloud firestore"

//firebase login
//firebase init
//firebase deploy
