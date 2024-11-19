import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  setOpenApplication,
  setLoading,
  setError,
} from "../slices/ApplicationSlice";

export const getApplicationsBySalesmanId = (
  salesmanId,
  setApplications,
  setLoading,
  setError
) => {
  const applicationsRef = collection(db, "registration");

  let q = null;
  if (salesmanId == "all") {
    q = query(applicationsRef);
  } else {
    q = query(applicationsRef, where("salesmanId", "==", salesmanId));
  }

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const applications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(applications)
      setApplications(applications); // Update the Redux state with new data
      setLoading(false); // Set loading state to false when data is received
    },
    (error) => {
      setError(error.message); // Handle error
      setLoading(false);
    }
  );

  return unsubscribe; // Return the unsubscribe function to be called later
};

export const getSingleApplicationById = (applicationId, dispatch) => {
  const applicationRef = doc(db, "registration", applicationId);

  // Real-time listener for single application
  dispatch(setLoading(true));
  const unsubscribe = onSnapshot(
    applicationRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        dispatch(
          setOpenApplication({ id: docSnapshot.id, ...docSnapshot.data() })
        );
      } else {
        dispatch(setError("Application not found"));
      }
      dispatch(setLoading(false));
    },
    (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  );

  return unsubscribe; // Return the unsubscribe function to stop listening when needed
};
