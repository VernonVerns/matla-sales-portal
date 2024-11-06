import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconLogo from "../assets/img/icon.png"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate} from "react-router-dom";
import { globalActions } from "../slices/GlobalSlice";

const SideBar = () => {
    const tab = useSelector((state) => state.global.tab);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHandleTabChange = (tab) => {
        dispatch(globalActions.changeTab(tab));
        navigate("/" + tab)
    }

    return(
        <>
            <div className="side-bar">
                <div className="top-part">
                    <img src={IconLogo} alt="HCF Icon Logo" />
                    <div className="main-menu">
                        <button className={`${tab === "dashboard" && "active-btn"}`} onClick={() => onHandleTabChange("dashboard")}><DashboardIcon /></button>
                        <button className={`${tab === "applications" && "active-btn"}`} onClick={() => onHandleTabChange("applications")}><ListIcon /></button>
                        <button className={`${tab === "finances" && "active-btn"}`} onClick={() => onHandleTabChange("finances")}><AttachMoneyIcon /></button>
                        {/* <button className=""><i className="fa fa-sign-out"></i></button> */}
                    </div>
                </div>
                <div className="bottom-menu">
                    <button className=""><SettingsIcon /></button>
                    <button className="sign-out"><LogoutIcon /></button>
                </div>
            </div>
        </>
    )
}

export default SideBar;