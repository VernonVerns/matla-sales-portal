import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";

const ListTable = () => {
    const navigate = useNavigate();

    const onViewApplicationHandler = () => {
        navigate('single_application');
    }
    return(
        <div className="list-table">
            <div className="list-item">
                <div className="item-data">
                    <h3 className="name">John Doe</h3>
                </div>
                <div className="item-data">
                    <span className="data-label">Premium</span>
                    <h4>R126 (Plan A)</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Cover Selection</span>
                    <h4>Member Only</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Date Applied</span>
                    <h4>05 Nov 2024</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Status</span>
                    <h4 className="pending">Pending</h4>
                </div>
                <div className="item-data">
                    <button className="border-btn" onClick={() => onViewApplicationHandler()}>Full Review</button>
                </div>
                <div className="item-data">
                    <button className="no-border-btn"><MoreVertIcon /></button>
                </div>
            </div>
            <div className="list-item">
                <div className="item-data">
                    <h3 className="name">Nkosazana Zulu Daughter</h3>
                </div>
                <div className="item-data">
                    <span className="data-label">Premium</span>
                    <h4>R530 (Plan B)</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Cover Selection</span>
                    <h4>Member + Family</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Date Applied</span>
                    <h4>02 Nov 2024</h4>
                </div>
                <div className="item-data">
                    <span className="data-label">Status</span>
                    <h4 className="approved">Complete</h4>
                </div>
                <div className="item-data">
                    <button className="border-btn" onClick={() => onViewApplicationHandler()}>Full Review</button>
                </div>
                <div className="item-data">
                    <button className="no-border-btn"><MoreVertIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default ListTable;