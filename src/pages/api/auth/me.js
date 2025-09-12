import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Add a header to prevent this response from being cached by the browser
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const token = req.cookies.auth_token;

  if (!token) {
    // If there's no token, the user is not logged in
    return res.status(200).json({ user: null });
  }

  try {
    // Verify the JWT to ensure it's valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database based on the ID from the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true }, // Only return safe, non-sensitive data
    });

    if (!user) {
      // If the user ID from the token doesn't exist in the DB
      return res.status(200).json({ user: null });
    }
    
    // Return the authenticated user's data
    res.status(200).json({ user });
  } catch (error) {
    // If the token is invalid or any other error occurs
    res.status(200).json({ user: null });
  }
}

