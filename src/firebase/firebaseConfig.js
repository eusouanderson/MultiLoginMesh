import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_nUwSB-KsKXQUEzvboWp4-9KRqdB8v-o",
  authDomain: "sign-up-9600b.firebaseapp.com",
  projectId: "sign-up-9600b",
  storageBucket: "sign-up-9600b.appspot.com",
  messagingSenderId: "928231141665",
  appId: "1:928231141665:web:eaaae48247dbef74020e60",
  measurementId: "G-CKZYJRTD0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)  