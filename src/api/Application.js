import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getApplicationsBySalesmanId = (salesmanId, setApplications, setLoading, setError) => {
  const applicationsRef = collection(db, "registration");
  const q = query(applicationsRef, where("salesmanId", "==", salesmanId));

  // Real-time listener for applications
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const applications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setApplications(applications);  // Update the Redux state with new data
      setLoading(false);  // Set loading state to false when data is received
    },
    (error) => {
      setError(error.message);  // Handle error
      setLoading(false);
    }
  );

  return unsubscribe; // Return the unsubscribe function to be called later
};
