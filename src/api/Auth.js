import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userProfile = await viewProfile(email);

    return {
      ...userCredential.user,
      ...userProfile,
    };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Successfully logged out.");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const viewProfile = async (email) => {
  try {
    const userDoc = await getDoc(doc(db, "users", email));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User profile not found.");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
