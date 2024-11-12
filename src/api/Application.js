import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getApplicationsBySalesmanId = async (salesmanId) => {
  try {
    const applicationsRef = collection(db, "registration");
    const q = query(applicationsRef, where("salesmanId", "==", salesmanId));
    const querySnapshot = await getDocs(q);

    const applications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};
