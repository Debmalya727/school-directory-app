import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Get the ID from the URL parameter, e.g., /api/school/1
  const { id } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const schoolId = parseInt(id);

    // Check if the ID from the URL is a valid number
    if (isNaN(schoolId)) {
      return res.status(400).json({ error: 'Invalid school ID provided.' });
    }

    // Use Prisma to find a unique school that matches the ID
    const school = await prisma.school.findUnique({
      where: {
        id: schoolId,
      },
    });

    // If no school is found, return a 404 error
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    // If the school is found, return it with a 200 success status
    res.status(200).json(school);

  } catch (error) {
    console.error(`Failed to retrieve school with id ${id}:`, error);
    res.status(500).json({ error: `Failed to retrieve school` });
  }
}

