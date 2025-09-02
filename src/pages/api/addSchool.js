import { PrismaClient } from '@prisma/client';
import { formidable } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

// The Cloudinary library will automatically find and use the CLOUDINARY_URL 
// from your .env file, so no manual configuration is needed here.

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const handleRequest = async () => {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    
    const imageFile = files.image?.[0];

    if (!imageFile) {
      throw new Error("The image file was not uploaded correctly.");
    }

    // Now, the uploader will use the credentials from CLOUDINARY_URL
    const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: "school_images",
    });
    
    const imageUrl = uploadResult.secure_url;

    const schoolData = {};
    for (const key in fields) {
      schoolData[key] = fields[key][0];
    }
    
    schoolData.image = imageUrl;

    const preparedData = {
      ...schoolData,
      rating: parseFloat(schoolData.rating), 
      hostelFacility: schoolData.hostelFacility === 'true',
      transport: schoolData.transport === 'true',
      acClasses: schoolData.acClasses === 'true',
      indoorSports: schoolData.indoorSports === 'true',
      outdoorSports: schoolData.outdoorSports === 'true',
      swimmingPool: schoolData.swimmingPool === 'true',
      musicRoom: schoolData.musicRoom === 'true',
      danceRoom: schoolData.danceRoom === 'true',
      gymRoom: schoolData.gymRoom === 'true',
      healthCheckup: schoolData.healthCheckup === 'true',
    };

    const newSchool = await prisma.school.create({
      data: preparedData,
    });
    
    return newSchool;
  };

  handleRequest()
    .then(newSchool => {
      res.status(201).json(newSchool);
    })
    .catch(error => {
      console.error("Error creating school:", error);
      res.status(500).json({ error: error.message || "Failed to create school" });
    });
}

