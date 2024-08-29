const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

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

const sendRequestToAdmin = async (
  doctorName,
  doctorEmail,
  doctorMobile,
  specialization,
  certificate
) => {
  try {
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
      from:  process.env.ADMIN_MAIL,
      to: process.env.ADMIN_MAIL,
      subject: "careTech Doctor Registration",
      html: `
          <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
              <p style="font-size: 1.1em">Dear Manager,</p>
              <p>I am writing to express my  intrest at Caretech <p/>
              <p>This message is to careTech. Below are the details of my registration:</p>
              <h3>My Details</h3>
              <p><strong>Name:</strong> Dr ${doctorName}</p>
              <p><strong>Email:</strong> ${doctorEmail}</p>
              <p><strong>Mobile:</strong> ${doctorMobile}</p>
              <p><strong>Specialization:</strong> ${specialization}</p>
              <div>
              <strong>Certificate:</strong>
              
              <div/>
              <p style="font-size: 0.9em;">Regards,<br />Dr ${doctorName}</p>
              <hr style="border: none; border-top: 1px solid #eee" />
              <button style="background-color: #00466a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">OK</button>
            </div>
          </div>`,
      attachments: [
        {
          filename: certificate.originalname,
          path: certificate.path,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw error;
  }
};

module.exports = { emailVerification, sendRequestToAdmin };
