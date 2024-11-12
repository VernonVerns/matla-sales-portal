import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Sidebar';

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const displayName = user?.username || user?.email || "User";

  return (
    <div id='main_layout'>
        <SideBar />
        <div className="hcf-inner">
            <div className="top-menu">
                <h4>Welcome back, {displayName}</h4>
            </div>
            <div className="main-side">
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default MainLayout;
