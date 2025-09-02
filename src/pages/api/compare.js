import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Get the comma-separated IDs from the URL query, e.g., "1,3,4"
  const { ids } = req.query;

  if (!ids) {
    return res.status(400).json({ error: 'No school IDs provided for comparison.' });
  }

  // Convert the string of IDs into an array of numbers
  const schoolIds = ids.split(',').map(id => parseInt(id.trim()));

  try {
    const schools = await prisma.school.findMany({
      where: {
        id: {
          // Use the 'in' filter to find all schools whose ID is in our array
          in: schoolIds,
        },
      },
    });

    res.status(200).json(schools);
  } catch (error) {
    console.error('Failed to retrieve schools for comparison:', error);
    res.status(500).json({ error: 'Failed to retrieve schools for comparison' });
  }
}
