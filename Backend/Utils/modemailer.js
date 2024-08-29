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

// const CLIENT_ID = process.env.CLIENT_ID;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN
// const CLIENT_SECRET = process.env.CLIENT_SECRET

// const outh2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,"https://developers.google.com/oauthplayground")

// outh2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// const sendRequestToAdmin = async (
//   doctorName,
//   doctorEmail,
//   doctorMobile,
//   specialization,
//   certificate
// ) => {
//   try {
//     const  accessToken = await outh2Client.getAccessToken()
//     console.log('here is accesing token',accessToken)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: doctorEmail,
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken:REFRESH_TOKEN,
//         accessToken:accessToken.token
//       },
//     });
//     console.log("it overed to the transtort",transporter)
//     const mailOptions = {
//       from: doctorEmail,
//       to: process.env.ADMIN_MAIL,
//       subject: "careTech Doctor Registration",
//       html: `
//         <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
//           <div style="margin: 50px auto; width: 70%; padding: 20px 0">
//             <p style="font-size: 1.1em">Dear Manager,</p>
//             <p>I am writing to express my interest in CareTech.</p>
//             <p>This message is to CareTech. Below are the details of my registration:</p>
//             <h3>My Details</h3>
//             <p><strong>Name:</strong> Dr. ${doctorName}</p>
//             <p><strong>Email:</strong> ${doctorEmail}</p>
//             <p><strong>Mobile:</strong> ${doctorMobile}</p>
//             <p><strong>Specialization:</strong> ${specialization}</p>
//             <div>
//               <strong>Certificate:</strong>
//               <p>Attached below</p>
//             </div>
//             <p style="font-size: 0.9em;">Regards,<br />Dr. ${doctorName}</p>
//             <hr style="border: none; border-top: 1px solid #eee" />
//           </div>
//         </div>`,
//       attachments: [
//         {
//           filename: certificate.originalname,
//           path: certificate.path,
//         },
//       ],
//     };
//     console.log("it overed to the mail options",mailOptions)
//     const result = await transporter.sendMail(mailOptions);
//     console.log("here is result",result);

//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

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
      from: doctorEmail,
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
              <div>
             <strong>Certificate:</strong>
              <p>Please find my certificate Attached below</p>
             </div>
              
              <div/>
              <p style="font-size: 0.9em;">Regards,<br />Dr ${doctorName}</p>
              <hr style="border: none; border-top: 1px solid #eee" />
            </div>
          </div>`,
      attachments: [
        {
          filename: certificate.originalname,
          path: certificate.path,
        },
      ],
    };

    let reuslt = await transporter.sendMail(mailOptions);
    return reuslt;
  } catch (error) {
    throw error;
  }
};

module.exports = { emailVerification, sendRequestToAdmin };
