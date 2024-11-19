import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsBySalesmanId } from "../api/Application";
import {
  setApplications,
  setError,
  setLoading,
} from "../slices/ApplicationSlice";
import PerfomanceGraph from "../components/PerfomanceGraph";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, applications } = useSelector(
    (state) => state.applications
  );
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

  // Calculate the counts based on the `applications` data
  const completedCount = applications.filter(
    (app) =>
      app.status === "completed" &&
      app.paymentArrangements &&
      app.paymentArrangements.length > 0 &&
      app.paymentArrangements[app.paymentArrangements.length - 1].errorItems ===
        null
  ).length;

  const unadvisedDebitOrderCount = applications.filter(
    (app) =>
      app.paymentArrangements &&
      app.paymentArrangements.length > 0 &&
      app.paymentArrangements[app.paymentArrangements.length - 1].errorItems !==
        null
  ).length;

  const uncompletedCount = applications.filter(
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
