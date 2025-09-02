// src/pages/api/getSchools.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Use Prisma to find all records in the School table
    const schools = await prisma.school.findMany({
      // Sort the results by creation date, newest first
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Send the list of schools back as a successful response
    res.status(200).json(schools);

  } catch (error) {
    console.error("Failed to retrieve schools:", error);
    // Send an error response if something goes wrong
    res.status(500).json({ error: "Failed to retrieve schools" });
  }
}