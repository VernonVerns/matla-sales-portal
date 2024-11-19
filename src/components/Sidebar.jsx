import React from "react";
import { useSelector, useDispatch } from "react-redux";
import IconLogo from "../assets/img/icon.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { globalActions } from "../slices/GlobalSlice";
import { logoutUser } from "../slices/AuthSlice"; // Import logoutUser action

const SideBar = () => {
    const tab = useSelector((state) => state.global.tab);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHandleTabChange = (tab) => {
        dispatch(globalActions.changeTab(tab));
        navigate("/" + tab);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/"); // Redirect to homepage after logout
    };

    return (
        <>
            <div className="side-bar">
                <div className="top-part">
                    <img src={IconLogo} alt="HCF Icon Logo" />
                    <div className="main-menu">
                        <button className={`${tab === "dashboard" && "active-btn"}`} onClick={() => onHandleTabChange("dashboard")}>
                            <DashboardIcon />
                        </button>
                        <button className={`${tab === "applications" && "active-btn"}`} onClick={() => onHandleTabChange("applications")}>
                            <ListIcon />
                        </button>
                    </div>
                </div>
                <div className="bottom-menu">
                    {/* <button><SettingsIcon /></button> */}
                    <button className="sign-out" onClick={handleLogout}><LogoutIcon /></button>
                </div>
            </div>
        </>
    );
};

export default SideBar;
