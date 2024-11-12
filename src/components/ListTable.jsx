import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListTable = () => {
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );
  const navigate = useNavigate();

  const onViewApplicationHandler = (applicationId) => {
    // Navigate to the specific application details page
    navigate(`single_application/${applicationId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list-table">
      {applications.map((application) => (
        <div key={application.id} className="list-item">
          <div className="item-data">
            <h3 className="name">{application.firstName} {application.lastName}</h3>
          </div>
          <div className="item-data">
            <span className="data-label">Premium</span>
            <h4>R{application.totalPremium} ({application.titleMainMemberPremiumDetails})</h4>
          </div>
          <div className="item-data">
            <span className="data-label">Cover Selection</span>
            <h4>{application.titleTypeOfCoverSelection}</h4>
          </div>
          <div className="item-data">
            <span className="data-label">Date Applied</span>
            <h4>{new Date(application.dateCreated).toLocaleDateString()}</h4>
          </div>
          <div className="item-data">
            <span className="data-label">Status</span>
            <h4 className={application.status === "completed" ? "completed" : "pending"}>{application.status}</h4>
          </div>
          <div className="item-data">
            <button
              className="border-btn"
              onClick={() => onViewApplicationHandler(application.id)}
            >
              Full Review
            </button>
          </div>
          <div className="item-data">
            <button className="no-border-btn">
              <MoreVertIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTable;
