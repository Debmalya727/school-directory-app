import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// --- Helper Icons ---
const StarIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);
const CheckIcon = () => ( <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> );
const CrossIcon = () => ( <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );

// --- Reusable component for displaying a detail item ---
const DetailItem = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
        <dd className="mt-1 text-lg text-gray-900 font-semibold">{value}</dd>
    </div>
);

// --- Reusable component for displaying a facility item ---
const FacilityItem = ({ label, isAvailable }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-100/60 rounded-lg border">
        {isAvailable ? <CheckIcon /> : <CrossIcon />}
        <span className="text-md text-gray-800">{label}</span>
    </div>
);


export default function SchoolDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; 

    const fetchSchool = async () => {
      try {
        const response = await fetch(`/api/school/${id}`);
        if (!response.ok) throw new Error('School not found.');
        const data = await response.json();
        setSchool(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <p className="text-center text-red-500 text-lg mt-8">Error: {error}</p>;
  if (!school) return <p className="text-center text-lg mt-8">No school data available.</p>;

  const facilities = [
    { label: 'Transport', isAvailable: school.transport },
    { label: 'A.C. Classes', isAvailable: school.acClasses },
    { label: 'Indoor Sports', isAvailable: school.indoorSports },
    { label: 'Outdoor Sports', isAvailable: school.outdoorSports },
    { label: 'Swimming Pool', isAvailable: school.swimmingPool },
    { label: 'Music Room', isAvailable: school.musicRoom },
    { label: 'Dance Room', isAvailable: school.danceRoom },
    { label: 'Gym Room', isAvailable: school.gymRoom },
    { label: 'Health Check-Up', isAvailable: school.healthCheckup },
  ];

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
       <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span className="font-semibold">Back to Finder</span>
            </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 border">
            {/* --- Top Section: Name and Address --- */}
            <div className="mb-8 pb-8 border-b border-gray-200">
                <h1 className="text-5xl font-bold text-gray-900">{school.name}</h1>
                <p className="text-xl text-gray-600 mt-3">{school.address}, {school.city}, {school.state}</p>
            </div>
            
            {/* --- Main Content Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column: Image */}
                <div className="md:col-span-2">
                    {/* FIXED: Use the full Cloudinary URL directly */}
                    <img 
                        src={school.image} 
                        alt={`Image of ${school.name}`}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
                
                {/* Right Column: Key Details */}
                <div className="md:col-span-1 space-y-6">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-7 w-7 ${i < school.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="ml-3 text-lg text-gray-600">({school.rating.toFixed(1)} stars)</span>
                    </div>
                    <dl className="space-y-6">
                        <DetailItem label="Board" value={school.board} />
                        <DetailItem label="School Type" value={school.schoolType} />
                        <DetailItem label="Admission Status" value={school.admissionStatus} />
                        <DetailItem label="School Level" value={school.schoolLevel} />
                        <DetailItem label="Contact" value={school.contact} />
                        <DetailItem label="Email" value={school.email} />
                        <DetailItem label="Avg. Monthly Fees" value={school.averageMonthlyFees} />
                        <DetailItem label="Hostel" value={school.hostelFacility ? 'Available' : 'Not Available'} />
                    </dl>
                </div>
            </div>

            {/* --- Facilities Section --- */}
            <div className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="text-3xl font-semibold text-gray-800">Facilities</h2>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {facilities.map(facility => (
                        <FacilityItem key={facility.label} label={facility.label} isAvailable={facility.isAvailable} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

