import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBWM0KjH2a1OCH27QTJYtWoqKK3_KZ7lPM",
  authDomain: "nextjs-with-firebaseauth-cec38.firebaseapp.com",
  projectId: "nextjs-with-firebaseauth-cec38",
  storageBucket: "nextjs-with-firebaseauth-cec38.appspot.com",
  messagingSenderId: "747361919518",
  appId: "1:747361919518:web:a665148bfaf6a70e73c40f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()