const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
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
};

const OTP = () => {
  const otp = Math.floor(100000 + Math.random(4) * 900000).toString();
  return otp;
};

const commonStyles = `
     <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
    <div style="margin: 50px auto; width: 70%; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 2px solid #00466a;">
`;

const emailVerification = async (email) => {
  try {
    const genaratedOTP = OTP();
    const transporter = createTransporter();
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: email,
      subject: "careTech",
      text: `Your OTP is :${OTP}`,
      html: `${commonStyles}
      <p style="font-size: 1.1em">Hi ${email},</p>
      <p>This message is from CareTech. Use the following OTP to complete your registration procedures. OTP is valid for 1 minute.</p>
      <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${genaratedOTP}</h2>
      <p style="font-size: 0.9em;">Regards,<br />CareTech</p>
      <hr style="border: none; border-top: 1px solid #eee" />
    </div></div>`,
    };
    let info = await transporter.sendMail(mailOptions);
    return genaratedOTP;
  } catch (error) {
    throw error;
  }
};

const responseToDoctor = async (drEmail, drName, drDegree) => {
  try {
    const genaratedOTP = OTP();
    const transporter = createTransporter();
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: drEmail,
      subject: "CareTech Registration Verification",
      text: `Your OTP is :${genaratedOTP}`,
      html: `${commonStyles}
              <p style="font-size: 1.1em">Hi ${drEmail},</p>
              <p>Dear Dr. ${drName} ${drDegree},</p>
              <p>This message is from CareTech. You are required to verify your email address to complete your registration process.</p>
              <p>Please use the OTP below to complete your email verification:</p>
              <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${genaratedOTP}</h2>
              <p>If you did not initiate this verification, please contact our support team immediately.</p>
              <p style="font-size: 0.9em;">Regards,<br />The CareTech Team</p>
              <hr style="border: none; border-top: 1px solid #eee" />
            </div></div>`,
    };
    await transporter.sendMail(mailOptions);
    return genaratedOTP;
  } catch (error) {
    throw error;
  }
};

const requestForVerification = async (drEmail, drName, drDegree) => {
  try {
    const transporter = createTransporter();
    let mailOptions = {
      from: drEmail,
      to: process.env.ADMIN_MAIL,
      subject: "New Doctor Verification Request",
      text: `A new doctor has requested verification.\n\nDoctor Details:\nName: Dr. ${drName} ${drDegree}\nEmail: ${drEmail}`,
      html: `${commonStyles}
      <p style="font-size: 1.1em">Hello Admin,</p>
      <p style="font-size: 0.9em;">A new doctor has requested verification on CareTech:</p>
      <p><strong>Doctor Name:</strong> Dr. ${drName} ${drDegree}</p>
      <p><strong>Email:</strong> ${drEmail}</p>
      <p>Please review the request and proceed with the verification process as needed.</p>
      <p style="font-size: 0.9em;">Regards,<br />The CareTech Team</p>
      <hr style="border: none; border-top: 1px solid #eee" />
    </div></div>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const verificationSuccess = async (drName, drEmail, drDegree) => {
  try {
    const transporter = createTransporter();
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: drEmail,
      subject: "Your Account Has Been Successfully Verified",
      html: `${commonStyles}
          <p style="font-size: 1.1em">Hello Dr. ${drName},</p>
          <p style="font-size: 0.9em;">Congratulations! Your account has been successfully verified on CareTech.</p>
          <p><strong>Doctor Name:</strong> Dr. ${drName} ${drDegree}</p>
          <p><strong>Email:</strong> ${drEmail}</p>
          <p>You can now log in to your account and start providing your services on our platform.</p>
          <p style="font-size: 0.9em;">If you have any questions, feel free to contact us.</p>
          <p style="font-size: 0.9em;">Regards,<br />The CareTech Team</p>
          <hr style="border: none; border-top: 1px solid #eee" />
        </div></div>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const unVerifyResponse = async (drEmail,drName) => {
  try {
    const transporter = createTransporter();
    let mailOptions = {
      from: process.env.ADMIN_MAIL,
      to: drEmail,
      subject: "Verification Unsuccessful: Certification Issue",
      html: `${commonStyles}
        <p style="font-size: 1.1em">Dear Dr. ${drName},</p>
        <p style="font-size: 0.9em;">We regret to inform you that your account verification on CareTech was unsuccessful due to issues with the certification you provided.</p>
        <p>Please review your submitted documents and ensure they meet the necessary requirements before trying again.</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p style="font-size: 0.9em;">Regards,<br />The CareTech Team</p>
        <hr style="border: none; border-top: 1px solid #eee" />
      </div></div>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  emailVerification,
  responseToDoctor,
  requestForVerification,
  verificationSuccess,
  unVerifyResponse,
};
