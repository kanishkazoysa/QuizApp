import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Chathura",
};
const recipients = ["priyadasunkc.21@itfac.mrt.ac.lk"];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
