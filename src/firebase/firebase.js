import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigDev = {
  apiKey: "AIzaSyAjBC8GFjk5SpnrPBKi0S944zlaZJpVHSo",
  authDomain: "matla-services.firebaseapp.com",
  projectId: "matla-services",
  storageBucket: "matla-services.appspot.com",
  messagingSenderId: "17101190164",
  appId: "1:17101190164:web:0fcd373977397599eda301",
  measurementId: "G-571GENBRBY",
};

export const app = initializeApp(firebaseConfigDev);
export const db = getFirestore(app);
export const auth = getAuth(app);
