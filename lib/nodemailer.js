// lib/nodemailer.js
import nodemailer from 'nodemailer';

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: '"School Finder" <no-reply@schoolfinder.com>',
    to: email,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <h1>Your OTP Code is: ${otp}</h1>
      <p>This code will expire in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};