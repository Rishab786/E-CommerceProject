import Sib from "sib-api-v3-sdk";
import { API_KEY } from "./config.js";

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = API_KEY;

const userConfirmationEmail = async (email) => {
  try {
    
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      email: "singlarishab@gmail.com",
      name: "Rishab",
    };
    const receivers = [
      {
        email: email,
      },
    ];
    tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Order Confirmation",
      textContent: `
        Thank you for purchasing from eKart.
        `,
      htmlContent: `
        <h1>Thank you for purchasing from eKart</h1>
        
                `,
    });
  } catch (error) {
    console.log("invalid email address",error);
  }
};

export default userConfirmationEmail;
