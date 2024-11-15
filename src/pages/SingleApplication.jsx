import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { banks } from "../Contants";
import { getSingleApplicationById } from "../api/Application";

const SingleApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openApplication, loading, error } = useSelector(
    (state) => state.applications
  );
  const [applicationId, setApplicationId] = useState(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const match = fullUrl.match(/single_application\/([^/?#]+)/);

    if (match && match[1]) {
      setApplicationId(match[1]);
    } else {
      console.error("Application ID not found in URL");
    }
  }, []); // Run only once when component mounts

  useEffect(() => {
    let unsubscribe;

    if (applicationId) {
      unsubscribe = getSingleApplicationById(applicationId, dispatch);
    }

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [applicationId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!openApplication) return <div>Application not found</div>;

  const getSafeValue = (value, fallback = "Unknown") => value ?? fallback;

  return (
    <div id="single_application">
      <div className="content-part">
        <div className="header-part">
          <div className="applicant">
            <h1>
              {getSafeValue(openApplication.firstName)}{" "}
              {getSafeValue(openApplication.lastName)}
            </h1>
            <span>{getSafeValue(openApplication.email)}</span>
          </div>
          <div className="quick-details">
            <div className="detail-item">
              <span>Applied For</span>
              <h4>{getSafeValue(openApplication.titleTypeOfCoverSelection)}</h4>
            </div>
            <div className="detail-item">
              <span>Email</span>
              <h4>{getSafeValue(openApplication.email)}</h4>
            </div>
            <div className="detail-item">
              <span>Phone</span>
              <h4>{getSafeValue(openApplication.cellNumber)}</h4>
            </div>
            <div className="detail-item">
              <span>WhatsApp Number</span>
              <h4>{getSafeValue(openApplication.id)}</h4>
            </div>
          </div>
        </div>

        <div className="single-application">
          <div className="details-side">
            <div className="amount-details">
              <div className="qualifying">
                <h1>{getSafeValue(openApplication.coverAmount)}</h1>
                <span>
                  Cover{" "}
                  {getSafeValue(openApplication.titleTypeOfCoverSelection)}
                </span>
              </div>
              <div className="installments">
                <h4>
                  {getSafeValue(
                    openApplication.descriptionMainMemberPremiumDetails
                  )}
                </h4>
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
                        {getSafeValue(openApplication.firstName)}{" "}
                        {getSafeValue(openApplication.lastName)}
                      </td>
                    </tr>
                    <tr>
                      <td>ID Number</td>
                      <td>{getSafeValue(openApplication.idNumber)}</td>
                    </tr>
                    <tr>
                      <td>Marital Status</td>
                      <td>{getSafeValue(openApplication.maritalStatus)}</td>
                    </tr>
                    <tr>
                      <td>Physical Address</td>
                      <td>{getSafeValue(openApplication.physicalAddress)}</td>
                    </tr>
                    <tr>
                      <td>Zip Code</td>
                      <td>{getSafeValue(openApplication.zipCode)}</td>
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
                      <td>
                        {getSafeValue(openApplication.beneficiaryFullNames)}
                      </td>
                    </tr>
                    <tr>
                      <td>Age</td>
                      <td>
                        {getSafeValue(openApplication.beneficiaryAge)} years
                      </td>
                    </tr>
                    <tr>
                      <td>Cell Number</td>
                      <td>
                        {getSafeValue(openApplication.beneficiaryCellNumber)}
                      </td>
                    </tr>
                    <tr>
                      <td>Relationship</td>
                      <td>
                        {getSafeValue(openApplication.beneficiaryRelationship)}
                      </td>
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
                        {banks.find(
                          (bank) => bank.id === openApplication.bankName
                        )?.name ?? "Unknown Bank"}
                      </td>
                    </tr>
                    <tr>
                      <td>Account Type</td>
                      <td>{getSafeValue(openApplication.accountType)}</td>
                    </tr>
                    <tr>
                      <td>Account Number</td>
                      <td>{getSafeValue(openApplication.accountNumber)}</td>
                    </tr>
                    <tr>
                      <td>Debit Order Date</td>
                      <td>{getSafeValue(openApplication.debitDate)}</td>
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
                    {openApplication.attachments?.map((file, index) => (
                      <tr key={index}>
                        <td>{getSafeValue(file.description)}</td>
                        <td>{getSafeValue(file.url?.split(".").pop())}</td>
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
                    )) ?? (
                      <tr>
                        <td colSpan="3">No attachments found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {openApplication.additionalMembers?.length > 0 && (
                <div className="additional-members full-detail">
                  <h4 className="sec-title">Additional Members</h4>
                  {openApplication.additionalMembers.map((member, index) => (
                    <div key={index} className="additional-member-item">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Full Names</td>
                            <td>{getSafeValue(member.familyMemberFullName)}</td>
                          </tr>
                          <tr>
                            <td>Age</td>
                            <td>
                              {getSafeValue(member.familyMemberAge)} years
                            </td>
                          </tr>
                          <tr>
                            <td>Relationship</td>
                            <td>
                              {getSafeValue(member.familyMemberRelationship)}
                            </td>
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
            <Link to={`/applications/chat_with/${id}`} className="main-btn">
              Chat With Client
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplication;
