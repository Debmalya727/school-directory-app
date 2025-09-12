import { serialize } from 'cookie';

export default function handler(req, res) {
  // Ensure we only handle POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Add headers to prevent caching
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // Clear the cookie by setting its maxAge to -1
  res.setHeader('Set-Cookie', serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  }));

  res.status(200).json({ message: 'Logout successful' });
}

