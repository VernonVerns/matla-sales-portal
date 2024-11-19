import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListTable = ({ viewOption, tabFilter }) => {
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onViewApplicationHandler = (applicationId) => {
    navigate(`single_application/${applicationId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the applications based on the radio button (viewOption) and tab filter (tabFilter)
  const filteredApplications =
    viewOption === "mine"
      ? applications.filter((app) => app.salesmanId === user.id) // Filter by user's salesmanId
      : applications; // If 'all', show all applications

  const tabFilteredApplications = filteredApplications.filter((app) => {
    switch (tabFilter) {
      case "completed":
        return app.status === "completed" && !app.errorItem;
      case "unadvised":
        // Check if paymentArrangements exists and if the last item in the array has errorItems that is not null
        return (
          app.paymentArrangements &&
          app.paymentArrangements.length > 0 &&
          app.paymentArrangements[app.paymentArrangements.length - 1]
            .errorItems !== null
        );
      case "incomplete":
        // Check if no paymentArrangements or status is not completed
        return (
          !app.paymentArrangements ||
          (app.status !== "completed" && app.status !== "unadvised")
        );
      default:
        return true; // 'all' case, show all applications
    }
  });

  return (
    <div className="list-table">
      {tabFilteredApplications.map((application) => (
        <div key={application.id} className="list-item">
          <div className="item-data">
            <h3 className="name">
              {application.firstName} {application.lastName}
            </h3>
          </div>
          <div className="item-data">
            <span className="data-label">Premium</span>
            <h4>
              {" "}
              {application.titleMainMemberPremiumDetails
                ? `R ${application.totalPremium} (${application.titleMainMemberPremiumDetails})`
                : ""}
            </h4>
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
            <h4
              className={
                application.status === "completed" ? "completed" : "pending"
              }
            >
              {application.status}
            </h4>
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
