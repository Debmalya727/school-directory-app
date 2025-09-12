// pages/api/auth/verify-otp.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { email_token: { email, token: otp } },
    });

    if (!verificationToken) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (new Date() > new Date(verificationToken.expires)) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // OTP is valid, get the user
    const user = await prisma.user.findUnique({ where: { email } });

    // Clean up the used token
    await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Session expires in 7 days
    );

    // Set the cookie
    res.setHeader('Set-Cookie', serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
}