import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import SingleApplication from "../pages/SingleApplication";
import AllApplications from "../pages/AllApplications";
import ChatWithClient from "../pages/ChatWithClient";

// ProtectedRoute component to check if user is authenticated
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="/login" path="/" element={<Login />} />,
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route key="dashboard" path="dashboard" element={<Dashboard />} />,
      <Route path="applications" element={<AllApplications />}>
        <Route key="applications" path="" element={<Applications />} />,
        <Route
          key="single_application"
          path="single_application/:id" // Dynamic route for application ID
          element={<SingleApplication />}
        />
        ,
        <Route
          key="chat-with-client"
          path="chat_with/:id"
          element={<ChatWithClient />}
        />
        ,
      </Route>
    </Route>,
  ])
);

export default router;
