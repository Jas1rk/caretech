const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");

const emailVerification = async (email) => {
  try {
    const genaratedOTP = Math.floor(
      100000 + Math.random(4) * 900000
    ).toString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: email,
      subject: "careTech",
      text: `Your OTP is :${genaratedOTP}`,
      html: ` <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi ${email},</p>
                    <p>This message from careTech. Use the following OTP to complete your register procedures. OTP is valid for 1 minutes</p>
                    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${genaratedOTP}</h2>
                    <p style="font-size: 0.9em;">Regards,<br />careTech</p>
                    <hr style="border: none; border-top: 1px solid #eee" />
                </div>
            </div>`,
    };
    let info = await transporter.sendMail(mailOptions);
    return genaratedOTP;
  } catch (error) {
    throw error;
  }
};





const responseToDoctor = async (drEmail,drName,drDegree) => {
  try {
    const genaratedOTP = Math.floor(
      100000 + Math.random(4) * 900000
    ).toString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: drEmail,
      subject: "careTech",
      text: `Your OTP is :${genaratedOTP}`,
      html: ` <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
    <div style="margin: 50px auto; width: 70%; padding: 20px; border: 2px solid #00466a; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 1.1em">Hi ${drEmail} </p>
        <p style="font-size: 0.9em;">Dear Dr.${drName} ${drDegree}</p>
        <p>This message is from CareTech. You are required to verify your email address to complete your registration process.</p>
        <p>Please use the OTP below to complete your email verification:</p>
        <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${genaratedOTP}</h2>
        
        <p>If you did not initiate this verification, please contact our support team immediately.</p>
        <p style="font-size: 0.9em;">Regards,<br />The CareTech Team</p>
        <hr style="border: none; border-top: 1px solid #eee" />
        <p style="font-size: 0.8em; color: #888;">This email was sent by CareTech, an online doctor booking platform. Please do not reply directly to this email.</p>
    </div>
</div>`,
    };
    let info = await transporter.sendMail(mailOptions);
    return genaratedOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { emailVerification, responseToDoctor };
