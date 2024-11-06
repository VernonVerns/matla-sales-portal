import React from "react";
import ListTable from "../components/ListTable";

const Applications = () => {
    return(
        <div id="all_applications">
            <div class="header-part">
                <h1>All Applications</h1>
            </div>
            <div class="nav-tabs">
                    <button type="button" class="active-tab">All</button>
                    <button type="button">Completed</button>
                    <button type="button">Mandate Approved</button>
                    <button type="button">Mandate Pending</button>
                    <button type="button" className="incomplete">Incomplete <span className="badge bg-dark">21</span></button>
            </div>

            <div class="all-apps">
                <div class="sec-header">
                    <h4>Applications</h4>
                    <div class="action-side">
                        <select name="filter" id="">
                            <option value=""><i class="fa bars-filter"></i> Filter</option>
                            <option value="all">All</option>
                            <option value="recent">Recent</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        <div class="sorted-by">
                            Sorted by: <span>Recent added</span>
                        </div>
                    </div>
                </div>
                <div class="sec-main">
                    <ListTable />
                </div>
            </div>
        </div>
    )
}

export default Applications;