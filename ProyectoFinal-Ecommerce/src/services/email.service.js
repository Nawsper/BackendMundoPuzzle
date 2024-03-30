import { createTransport } from "nodemailer";
import { templateDeleteUser } from "../templates/templateDeleteUser.js";
import { templateRegister } from "../templates/templateRegister.js";
import { logger } from "../utils/logger.js";
import "dotenv/config";

export const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendGmail = async (user, service) => {
    try {
        const { first_name, email } = user;

        let msg = ''

        service === 'register' ? msg = templateRegister : service === 'deleteUsers' ? msg = templateDeleteUser : msg = ''

        let subj = ''

        subj = service === 'register' ? 'Bienvenido/a a Mundopuzzle' : service === 'deleteUsers' ? 'Usuario eliminado' : ''

        const gmailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg,
        };

        const response = await transporter.sendMail(gmailOptions);
        logger.info(`Email sent successfully to ${first_name}`);
        return response

    } catch (error) {
        logger.error(`Error sending email to ${email}: ${error.message}`);
    }
};