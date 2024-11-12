import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { banks } from "../Contants";

const SingleApplication = () => {
  const { id } = useParams(); // Get the dynamic ID parameter from the URL
  const { applications } = useSelector((state) => state.applications); // Get applications from Redux store

  const [application, setApplication] = useState(null);

  useEffect(() => {
    // Find the application by the ID
    const foundApplication = applications.find((app) => app.id === id);
    setApplication(foundApplication);
  }, [id, applications]);

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div id="single_application">
      <div className="content-part">
        <div className="header-part">
          <div className="applicant">
            <h1>
              {application.firstName} {application.lastName}
            </h1>
            <span>{application.email}</span>
          </div>
          <div className="quick-details">
            <div className="detail-item">
              <span>Applied For</span>
              <h4>{application.titleTypeOfCoverSelection}</h4>
            </div>
            <div className="detail-item">
              <span>Email</span>
              <h4>{application.email}</h4>
            </div>
            <div className="detail-item">
              <span>Phone</span>
              <h4>{application.cellNumber}</h4>
            </div>
            <div className="detail-item">
              <span>WhatsApp Number</span>
              <h4>{application.id}</h4>
            </div>
          </div>
        </div>

        <div className="single-application">
          <div className="details-side">
            <div className="amount-details">
              <div className="qualifying">
                <h1>{application.coverAmount}</h1>
                <span>Cover {application.titleTypeOfCoverSelection}</span>
              </div>
              <div className="installments">
                <h4>{application.descriptionMainMemberPremiumDetails}</h4>
                {/* <span>Monthly installments</span> */}
              </div>
            </div>

            <div className="more-details">
              <div className="basic-info full-detail">
                <h4 className="sec-title">Basic Details</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Full Name</td>
                      <td>
                        {application.firstName} {application.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>ID Number</td>
                      <td>{application.idNumber}</td>
                    </tr>
                    <tr>
                      <td>Marital Status</td>
                      <td>{application.maritalStatus}</td>
                    </tr>
                    <tr>
                      <td>Physical Address</td>
                      <td>{application.physicalAddress}</td>
                    </tr>
                    <tr>
                      <td>Zip Code</td>
                      <td>{application.zipCode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Beneficiary Details */}
              <div className="bank-details full-detail">
                <h4 className="sec-title">Beneficiary Details</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Full Names</td>
                      <td>{application.beneficiaryFullNames}</td>
                    </tr>
                    <tr>
                      <td>Age</td>
                      <td>{application.beneficiaryAge} years</td>
                    </tr>
                    <tr>
                      <td>Cell Number</td>
                      <td>{application.beneficiaryCellNumber}</td>
                    </tr>
                    <tr>
                      <td>Relationship</td>
                      <td>{application.beneficiaryRelationship}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bank Details */}
              <div className="bank-details full-detail">
                <h4 className="sec-title">Bank Details</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Bank Name</td>
                      <td>
                        {banks.find((bank) => bank.id === application.bankName)
                          ? banks.find(
                              (bank) => bank.id === application.bankName
                            ).name
                          : "Unknow Bank"}
                      </td>
                    </tr>
                    <tr>
                      <td>Account Type</td>
                      <td>{application.accountType}</td>
                    </tr>
                    <tr>
                      <td>Account Number</td>
                      <td>{application.accountNumber}</td>
                    </tr>
                    <tr>
                      <td>Debit Order Date</td>
                      <td>{application.debitDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Attachments */}
              <div className="attachements full-detail">
                <h4 className="sec-title">Attachments</h4>
                <table className="attachments-list table">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Format</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.attachments.map((file, index) => (
                      <tr key={index}>
                        <td>{file.description}</td>
                        <td>{file.url.split(".").pop()}</td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() =>
                              window.open(
                                `https://storage.googleapis.com/matla-services.appspot.com/attachments/${file.url}`,
                                "_blank"
                              )
                            }
                          >
                            View Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {application.additionalMembers &&
                application.additionalMembers.length > 0 && (
                  <div className="additional-members full-detail">
                    <h4 className="sec-title">Additional Members</h4>
                    {application.additionalMembers.map((member, index) => (
                      <div key={index} className="additional-member-item">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Full Names</td>
                              <td>{member.familyMemberFullName}</td>
                            </tr>
                            <tr>
                              <td>Age</td>
                              <td>{member.familyMemberAge} years</td>
                            </tr>
                            <tr>
                              <td>Relationship</td>
                              <td>{member.familyMemberRelationship}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-btns">
            <Link to="/applications/chat_with" className="main-btn">
              Chat With Client
            </Link>
            <button type="button" className="border-btn">
              Send Mandate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplication;
