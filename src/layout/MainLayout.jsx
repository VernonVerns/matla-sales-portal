import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/Sidebar'

const MainLayout = () => {
  return (
    <div id='main_layout'>
        <SideBar />
        <div className="hcf-inner">
            <div className="top-menu">
                <h4>Welcome back, User Name</h4>
            </div>
            <div className="main-side">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default MainLayout