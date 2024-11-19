import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsBySalesmanId } from "../api/Application";
import {
  setApplications,
  setError,
  setLoading,
} from "../slices/ApplicationSlice";
import PerfomanceGraph from "../components/PerfomanceGraph";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, applications } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.auth);

  // State to handle radio button selection
  const [viewOption, setViewOption] = useState("all");

  useEffect(() => {
    if (!user.id) return; // Don't fetch if there's no user id.

    dispatch(setLoading(true)); // Set loading state to true when we start fetching

    // Conditional fetching based on the selected radio button
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
  }, [dispatch, user.id, viewOption]); // Re-run effect when viewOption changes

  // Filter the applications based on selected view (All or Mine)
  const filteredApplications =
    viewOption === "all"
      ? applications
      : applications.filter((app) => app.salesmanId === user.id);

  // Calculate the counts based on filtered `applications` data
  const completedCount = filteredApplications.filter(
    (app) =>
      app.status === "completed" &&
      app.paymentArrangements &&
      app.paymentArrangements.length > 0 &&
      app.paymentArrangements[app.paymentArrangements.length - 1].errorItems ===
        null
  ).length;

  const unadvisedDebitOrderCount = filteredApplications.filter(
    (app) =>
      app.paymentArrangements &&
      app.paymentArrangements.length > 0 &&
      app.paymentArrangements[app.paymentArrangements.length - 1].errorItems !==
        null
  ).length;

  const uncompletedCount = filteredApplications.filter(
    (app) =>
      app.status !== "completed" &&
      (!app.paymentArrangements ||
        app.paymentArrangements.length === 0 ||
        app.paymentArrangements[app.paymentArrangements.length - 1]
          .errorItems === null)
  ).length;

  return (
    <div id="dashboard">
      <div className="header-part">
        <h1>Dashboard</h1>
      </div>
      <div
        className="radio-buttons"
        style={{
          display: "flex",
          justifyContent: "flex-end", // Align to the far right
          paddingRight: "20px", // Optional: adds some space from the right edge
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

      <div className="applications_stats">
        <div className="stat-card">
          <div className="card-header">
            <span className="color bg-success"></span>
            <h1>#Completed</h1>
          </div>
          <h4>
            <span className="number">{completedCount}</span> Completed
            Applications
          </h4>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <span className="color bg-warning"></span>
            <h1>#Unadvised Debit Order</h1>
          </div>
          <h4>
            <span className="number">{unadvisedDebitOrderCount}</span> Unadvised
            Debit Order
          </h4>
        </div>
        <div className="stat-card incomplete">
          <div className="card-header">
            <span className="color bg-danger"></span>
            <h1>#Incomplete</h1>
          </div>
          <h4>
            <span className="number">{uncompletedCount}</span> Incomplete
            Applications
          </h4>
        </div>
      </div>

      <div>
        <PerfomanceGraph />
      </div>
    </div>
  );
};

export default Dashboard;
