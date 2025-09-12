// pages/api/auth/request-otp.js
import { PrismaClient } from '@prisma/client';
import { sendOTPEmail } from '@/lib/nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find or create the user
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes from now

    // Store the OTP in the database
    await prisma.verificationToken.create({
      data: {
        email,
        token: otp, // In a real app, you should HASH this token before saving
        expires,
      },
    });

    // Send the OTP email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
}