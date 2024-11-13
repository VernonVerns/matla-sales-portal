import axios from "axios";

// Fetch environment variables (ensure they have the REACT_APP_ prefix)
const END_POINT =
  process.env.REACT_APP_WHATSAPP_GRAPHQL_END_POINT ||
  "https://graph.facebook.com/v21.0/500571726463668/messages";

const headers = {
  Authorization: `Bearer ${
    process.env.REACT_APP_WHATSAPP_TOKEN ||
    "EAAgiTLlDwO4BOZB4FnkJyxOy81XXc9chgQ9LQcKlFAokyvVj8ZCFdJDbu5Xq7zEZCFDx9w2vKmL1DYvFWn2qVj0xvHNYtC01wVYZAPdMMrQvxGNOP9yU52ZAZB0IZABkDQ6MeAsyYibvmn3IZCclRoot6SUVHnG8L04V0KiZCocJ9dFZAHZBjxJz2Om54c7zEFt2mjPNAZDZD"
  }`,
  "Content-Type": "application/json",
};

const sendRestApi = async (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(END_POINT, payload, { headers })
      .then((res) => resolve("ok"))
      .catch((error) => reject(error));
  });
};

// Function to send dynamic WhatsApp message
export const sendDynamicMessage = (whatsAppId, messageBody) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "text",
    text: {
      preview_url: false,
      body: messageBody,
    },
  };

  return sendRestApi(payload);
};
