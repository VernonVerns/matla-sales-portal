import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import SingleApplication from "../pages/SingleApplication";
import AllApplications from "../pages/AllApplications";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route key="/login" path="/" element={<Login />}/>,
        <Route path="/" element={<MainLayout />}>
            <Route key="dashboard" path="dashboard" element={<Dashboard />}/>,
            <Route path="applications" element={<AllApplications />} children={[
                <Route key="applications" path="" element={<Applications />}/>,
                <Route key="single_application" path="single_application" element={<SingleApplication />} />,
            ]} />,
        </Route>
    ])
);

export default router;