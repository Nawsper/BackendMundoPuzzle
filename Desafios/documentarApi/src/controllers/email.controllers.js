import "dotenv/config";
import { template } from "../templates/template.js";
import { transporter } from "../services/email.service.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export const sendGmail = async (req, res) => {
    try {
        const { dest } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: "Bienvenido/a a Mundopuzzle",
            html: template,
        };
        const response = await transporter.sendMail(gmailOptions);
        return httpResponse.Ok(res, response);
    } catch (error) {
        console.log(error);
    }
};