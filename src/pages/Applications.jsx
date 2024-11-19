import React, { useEffect, useState } from "react";
import ListTable from "../components/ListTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplications,
  setLoading,
  setError,
} from "../slices/ApplicationSlice";
import { getApplicationsBySalesmanId } from "../api/Application";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const Applications = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  const [viewOption, setViewOption] = useState("all"); // For radio buttons (all/mine)
  const [tabFilter, setTabFilter] = useState("all"); // For tab filtering (All, Completed, Unadvised, Incomplete)

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
        <h1>Applications</h1>
      </div>
      <div className="nav-tabs">
        <button
          type="button"
          className={tabFilter === "all" ? "active-tab" : ""}
          onClick={() => setTabFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={tabFilter === "completed" ? "active-tab" : ""}
          onClick={() => setTabFilter("completed")}
        >
          Completed
        </button>
        <button
          type="button"
          className={tabFilter === "unadvised" ? "active-tab" : ""}
          onClick={() => setTabFilter("unadvised")}
        >
          Unadvised Debit Order
        </button>
        <button
          type="button"
          className={tabFilter === "incomplete" ? "active-tab" : ""}
          onClick={() => setTabFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>
      <div
        className="radio-buttons"
        style={{
          display: "flex",
          justifyContent: "flex-end", // Align to the far right
          paddingRight: "60px", // Optional: adds some space from the right edge
          color: "white",
        }}
      >
        <RadioGroup
          row
          value={viewOption}
          onChange={(e) => setViewOption(e.target.value)}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All"
            style={{ color: "white" }}
          />
          <FormControlLabel
            value="mine"
            control={<Radio />}
            label="Mine"
            style={{ color: "white" }}
          />
        </RadioGroup>
      </div>

      <div className="all-apps">
        <div className="sec-header">
          <h4>Applications</h4>
        </div>
        <div className="sec-main">
          {/* Pass both viewOption and tabFilter to ListTable */}
          <ListTable viewOption={viewOption} tabFilter={tabFilter} />
        </div>
      </div>
    </div>
  );
};

export default Applications;
