import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplate.js";
import { transport, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [email];
 
  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending email", error);
    throw new Error("Error sending email: " + error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [email];
  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipient,
      subject: "Welcome to our platform",
      html: WELCOME_EMAIL_TEMPLATE.replace("{user_name}", name),
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw new Error("Error sending email: " + error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const reciepent = [email];
  try {
    const response = await transport.sendMail({
      from: sender,
      to: reciepent,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    throw new Error("Error sending reset password email: " + error);
  }
};

export const sendPasswordResetSuccessEmail = async (email) => {
  const recipent = [email];
  try {
    const response = await transport.sendMail({
      from: sender,
      to: recipent,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset success email sent successfully", response);
    
  } catch (error) {
    throw new Error("Error sending password reset success email: " + error);
  }
};

