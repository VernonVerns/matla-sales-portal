import React from "react";
// import DeclineReason from "./DeclineReason";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";

const SingleApplication = () => {
    return(
        <div id="single_application">
            <div class="content-part">
                <div class="header-part">
                    <div class="applicant">
                        <h1>Nkosazana Zulu Daughter</h1>
                        <span>nkosazanazd@gmail.com</span>
                    </div>
                    <div class="quick-details">
                        <div class="detail-item">
                            <span>COMPANY</span>
                            <h4>Moret Mining</h4>
                        </div>
                        <div class="detail-item">
                            <span>Applied For</span>
                            <h4>Medical Expense</h4>
                        </div>
                        <div class="detail-item">
                            <span>Citizenship</span>
                            <h4>South Africa</h4>
                        </div>
                        <div class="detail-item">
                            <span>Phone</span>
                            <h4>0838969792</h4>
                        </div>
                    </div>
                </div>
                
                <div class="single-application">
                    <div class="details-side">
                        <div class="amount-details">
                            <div class="qualifying">
                                <h1>R20,000.00</h1>
                                <span>Cover Main Member</span>
                            </div>
                            <div class="installments">
                                <h4>R109.00</h4>
                                <span>Monthly installments</span>
                            </div>
                        </div>
                        <div class="more-details">
                            <div class="basic-info full-detail">
                                <h4 class="sec-title">Basic Details</h4>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Full name</td>
                                            <td>Nkosazana Zulu Daughter</td>
                                        </tr>
                                        <tr>
                                            <td>ID Number</td>
                                            <td>79021 25987 08 3</td>
                                        </tr>
                                        <tr>
                                            <td>Marital Status</td>
                                            <td>Single</td>
                                        </tr>
                                        <tr>
                                            <td>Marriage Type</td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td>Residential Address</td>
                                            <td>3 Raglan Street, Oakdale, CT, 7530</td>
                                        </tr>
                                        <tr>
                                            <td>Alternative Number</td>
                                            <td>089 258 8595</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="bank-details full-detail">
                                <h4 class="sec-title">Salary Info</h4>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Net Income</td>
                                            <td>R5500.00</td>
                                        </tr>
                                        <tr>
                                            <td>Total Expenses</td>
                                            <td>R3200.00</td>
                                        </tr>
                                        <tr>
                                            <td>Payment Frequency</td>
                                            <td>Monthly</td>
                                        </tr>
                                        <tr>
                                            <td>Contract End Date</td>
                                            <td>N/A</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="bank-details full-detail">
                                <h4 class="sec-title">Bank Details</h4>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Bank Name</td>
                                            <td>Discovery Bank</td>
                                        </tr>
                                        <tr>
                                            <td>Account Type</td>
                                            <td>Cheque</td>
                                        </tr>
                                        <tr>
                                            <td>Account Number</td>
                                            <td>1234567890</td>
                                        </tr>
                                        <tr>
                                            <td>Debit Order</td>
                                            <td>Yes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="attachements full-detail">
                                <h4 class="sec-title">Attachments</h4>
                                <table class="attachments-list table">
                                    <thead>
                                        <tr>
                                            <th>Document</th>
                                            <th>Format</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Identity Document</td>
                                            <td>PDF</td>
                                            <td>
                                                <button class="view-btn">View Now</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Bank Statement</td>
                                            <td>PDF</td>
                                            <td>
                                                <button class="view-btn">View Now</button>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Proof of Residence</td>
                                            <td>Image</td>
                                            <td>
                                                <button class="view-btn">View Now</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-btns">
                        <Link to="/applications/chat_with" class="main-btn">Chat With Client</Link>
                        <button type="button" class="border-btn">Send Mandate</button>
                    </div>
                </div>
                {/* <DeclineReason /> */}
            </div>
        </div>
    )
}

export default SingleApplication;