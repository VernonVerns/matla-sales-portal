import React from "react";
import ListTable from "../components/ListTable";
import { Outlet } from "react-router-dom";

const AllApplications = () => {
    return(
        <div id="applications">
            <Outlet />
        </div>
    )
}

export default AllApplications;