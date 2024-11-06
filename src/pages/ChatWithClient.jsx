import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const dummyData = [
    {
        ticketNumber: 1,
        dateCreated: "2023-09-10",
        requesterName: "John Doe",
        question: "My savings account is not working and I want transact.",
        category: "Accounts",
        status: "Attending",
        attendeeName: "Jane Smith",
    },
    {
        ticketNumber: 2,
        dateCreated: "2023-09-11",
        requesterName: "Alice Johnson",
        question: "Unable to login.",
        category: "Apps",
        status: "Open",
        attendeeName: "Unassigned",
    },
    {
        ticketNumber: 3,
        dateCreated: "2023-09-12",
        requesterName: "Bob Brown",
        question: "I would like to enquire about a loan for buying a home",
        category: "Loans",
        status: "Closed",
        attendeeName: "David Wilson",
    },
    {
        ticketNumber: 4,
        dateCreated: "2023-09-12",
        requesterName: "Nkosazana Daughter",
        question: "I would to ask about a lost payment",
        category: "Payments",
        status: "Unknown",
        attendeeName: "Unassigned",
    },
];

const quickMessages = [
    {
        "id": 1,
        "message": "Hello! How can I assist you today?"
    },
    {
        "id": 2,
        "message": "I have resent the mandate for debit order approval. Please approve and let me know once done."
    },
    {
        "id": 3,
        "message": "I understand your concern. Let me look into this for you."
    },
    {
        "id": 4,
        "message": "Thank you for your patience. I am still working on your request."
    },
    {
        "id": 5,
        "message": "Your issue has been resolved. Is there anything else I can help you with?"
    },
    {
        "id": 6,
        "message": "For your security, please do not share sensitive information like passwords or PINs in the chat."
    }
];


const ChatWithClient = () => {
    const ticketNumber  = 2;
    const [message, setMessage] = useState('');

    const ticket = dummyData.find(
        (t) => t.ticketNumber === parseInt(ticketNumber, 10)
    );

    if (!ticket) {
        return <div>Ticket not found. {ticketNumber}</div>;
    }

    const handleUseQuickMessage = (msg) => {
        setMessage('');
        setMessage(msg)
    }

    return (
        <div className='chat-with-client'>
            <div className="chat-header">
                <h4>Chat with {ticket.requesterName}</h4>
                <div className='action-btns'>
                    <button className='attend-btn'>Attend Chat</button>
                </div>
            </div>
            <div className="chat-wrapper">
                <div className='chat-container'>
                    <div className="msgs-container">
                        <div className="chat-msg">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:22 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    {ticket.question}
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:23 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    Maiores nesciunt eveniet cum dolore est aliquam ipsum non expedita eaque deleniti fugiat deserunt iure commodi neque quam quasi!
                                </div>
                            </div>
                        </div>

                        <div className="chat-msg from">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:29 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    I will answer you shortly
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg from">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:24 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic beatae cumque a dolore cupiditate, aperiam debitis quia consequuntur excepturi reiciendis eveniet adipisci voluptatum eligendi sint tempora nobis sit aspernatur deleniti.
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:22 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    {ticket.question}
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:23 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    Maiores nesciunt eveniet cum dolore est aliquam ipsum non expedita eaque deleniti fugiat deserunt iure commodi neque quam quasi!
                                </div>
                            </div>
                        </div>

                        <div className="chat-msg from">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:29 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    I will answer you shortly
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg from">
                            <div class="chat-msg-profile">
                                <div class="chat-msg-date">11:24 am</div>
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic beatae cumque a dolore cupiditate, aperiam debitis quia consequuntur excepturi reiciendis eveniet adipisci voluptatum eligendi sint tempora nobis sit aspernatur deleniti.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="textbox-container">
                        <textarea name="message" id="message" onChange={(e) => setMessage(e.target.value)} value={message} placeholder={`Message ${ticket.requesterName}`}></textarea>
                        <div className='textbox-btns'>
                            <button type="button" className='attach-file-btn'><AttachFileIcon /></button>
                            <button type="button" className='send-msg-btn'><SendIcon /></button>
                        </div>
                    </div>
                </div>
                <div className='quick-msgs-container'>
                    <h4>Quick replies</h4>
                    {quickMessages.map((message) => (
                        <div className='quick-msg' onClick={() => handleUseQuickMessage(message.message)} key={message.id}>{message.message}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatWithClient