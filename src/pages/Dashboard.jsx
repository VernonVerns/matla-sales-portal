import React from 'react';

const Dashboard = () => {
    return(
        <>
        <div id="dashboard">
            <div className="header-part">
                    <h1>Dashboard</h1>
                    {/* <div className="right-hand"></div> */}
            </div>
            <div className="applications_stats">
                <div className="stat-card">
                    <div className="card-header">
                        <span className="color bg-success"></span>
                        <h1>#Completed</h1>
                    </div>

                    <h4><span className="number">203</span> Completed Applications</h4>
                </div>
                <div className="stat-card">
                    <div className="card-header">
                        <span className="color bg-primary"></span>
                        <h1>#Mandate Approved</h1>
                    </div>

                    <h4><span className="number">133</span> Approved Debit Order</h4>
                </div>
                <div className="stat-card">
                    <div className="card-header">
                        <span className="color bg-danger"></span>
                        <h1>#Mandate Pending</h1>
                    </div>

                    <h4><span className="number">70</span> Pending Debit Order</h4>
                </div>
                <div className="stat-card incomplete">
                    <div className="card-header">
                        <span className="color bg-dark"></span>
                        <h1>#Incomplete</h1>
                    </div>

                    <h4><span className="number">16</span> Incomplete Applications</h4>
                </div>
            </div>

            <div className="pending-application">
                <div className="sec-header">
                    <h4>Pending Applications</h4>
                    <div className="action-side">
                        <select name="filter" id="">
                            <option value=""><i className="fa bars-filter"></i> Filter</option>
                            <option value="all">All</option>
                            <option value="recent">Recent</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        <div className="sorted-by">
                            Sorted by: <span>Recent added</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard;