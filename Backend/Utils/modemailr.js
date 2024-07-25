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
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "careTech",
      text: `Your OTP is :${genaratedOTP}`,
      html: ` <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi ${email},</p>
                    <p>This message from TimeZone. Use the following OTP to complete your register procedures. OTP is valid for 1 minutes</p>
                    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${genaratedOTP}</h2>
                    <p style="font-size: 0.9em;">Regards,<br />TimeZone</p>
                    <hr style="border: none; border-top: 1px solid #eee" />
                </div>
            </div>`,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("information==>>", info);
    return genaratedOTP;
  } catch (error) {
    console.log("this is the error=", error);
    throw error;
  }
};

module.exports = emailVerification;
