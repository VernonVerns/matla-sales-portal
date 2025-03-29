import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigDev = {
  apiKey: "AIzaSyDTCxZj79diyXX4dLDiaRYkMJwLnM4593Q",
  authDomain: "lighthousemedicare-dev.firebaseapp.com",
  projectId: "lighthousemedicare-dev",
  storageBucket: "lighthousemedicare-dev.firebasestorage.app",
  messagingSenderId: "575070505115",
  appId: "1:575070505115:web:838bdbf7d876973c87de3e",
  measurementId: "G-F2FLVTDFL7",
};

export const app = initializeApp(firebaseConfigDev);
export const db = getFirestore(app);
export const auth = getAuth(app);
