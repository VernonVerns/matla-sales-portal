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
  const user = useSelector((state) => state.user);
  // const { id: salesmanId } = useSelector((state) => state.user); // Get `id` from user state as salesmanId
  let salesmanId = "Fez12";
  useEffect(() => {
    const fetchApplications = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const apps = await getApplicationsBySalesmanId(salesmanId);
        dispatch(setApplications(apps));
        console.log(apps);
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (salesmanId) {
      fetchApplications();
    }
  }, [dispatch, salesmanId]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="all_applications">
      <div class="header-part">
        <h1>All Applications</h1>
      </div>
      <div class="nav-tabs">
        <button type="button" class="active-tab">
          All
        </button>
        <button type="button">Completed</button>
        <button type="button">Mandate Approved</button>
        <button type="button">Mandate Pending</button>
        <button type="button" className="incomplete">
          Incomplete <span className="badge bg-dark">21</span>
        </button>
      </div>

      <div class="all-apps">
        <div class="sec-header">
          <h4>Applications</h4>
          <div class="action-side">
            <select name="filter" id="">
              <option value="">
                <i class="fa bars-filter"></i> Filter
              </option>
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
            <div class="sorted-by">
              Sorted by: <span>Recent added</span>
            </div>
          </div>
        </div>
        <div class="sec-main">
          <ListTable />
        </div>
      </div>
    </div>
  );
};

export default Applications;
