import React, { useEffect } from "react";
import ListTable from "../components/ListTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplications,
  setLoading,
  setError,
} from "../slices/ApplicationSlice";
import { getApplicationsBySalesmanId } from "../api/Application";

const Applications = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.id) return; // Don't fetch if there's no user id.

    dispatch(setLoading(true)); // Set loading state to true when we start fetching

    const unsubscribeFromUpdates = user.isAdmin
      ? getApplicationsBySalesmanId(
          "all",
          (apps) => dispatch(setApplications(apps)), // Update Redux state
          (loadingState) => dispatch(setLoading(loadingState)), // Update loading state
          (err) => dispatch(setError(err)) // Update error state
        )
      : getApplicationsBySalesmanId(
          user.id.toLowerCase(),
          (apps) => dispatch(setApplications(apps)), // Update Redux state
          (loadingState) => dispatch(setLoading(loadingState)), // Update loading state
          (err) => dispatch(setError(err)) // Update error state
        );

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribeFromUpdates(); // Unsubscribe from the real-time listener
    };
  }, [dispatch, user.id]); 
  
  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="all_applications">
      <div className="header-part">
        <h1>All Applications</h1>
      </div>
      <div className="nav-tabs">
        <button type="button" className="active-tab">
          All
        </button>
        {/* <button type="button">Completed</button>
        <button type="button">Mandate Approved</button>
        <button type="button">Mandate Pending</button>
        <button type="button" className="incomplete">
          Incomplete <span className="badge bg-dark">21</span>
        </button> */}
      </div>

      <div className="all-apps">
        <div className="sec-header">
          <h4>Applications</h4>
          {/* <div className="action-side">
            <select name="filter" id="">
              <option value="">
                <i className="fa bars-filter"></i> Filter
              </option>
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="sorted-by">
              Sorted by: <span>Recent added</span>
            </div>
          </div> */}
        </div>
        <div className="sec-main">
          <ListTable />
        </div>
      </div>
    </div>
  );
};

export default Applications;
