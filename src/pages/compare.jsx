import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// --- Helper Icons ---
const CheckIcon = () => ( <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> );
const CrossIcon = () => ( <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );
const CloseIcon = () => ( <svg className="w-4 h-4 text-gray-500 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );
const PlusCircleIcon = () => ( <svg className="w-10 h-10 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> );

export default function ComparePage() {
  const router = useRouter();
  const { ids } = router.query;
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ids) {
        setLoading(false);
        return;
    };

    const fetchCompareSchools = async () => {
      try {
        const response = await fetch(`/api/compare?ids=${ids}`);
        if (!response.ok) throw new Error('Could not fetch schools for comparison.');
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareSchools();
  }, [ids]);

  const handleRemoveSchool = (schoolId) => {
    const newIds = ids.split(',').filter(id => id !== String(schoolId)).join(',');
    if (!newIds) {
        router.push('/');
    } else {
        router.push(`/compare?ids=${newIds}`);
    }
  };
  
  const features = [
    { label: 'Admission Status', key: 'admissionStatus' },
    { label: 'School Level', key: 'schoolLevel' },
    { label: 'School Address', key: 'address' },
    { label: 'School Board', key: 'board' },
    { label: 'School Type', key: 'schoolType' },
    { label: 'Hostel Facility', key: 'hostelFacility' },
    { label: 'Average Monthly Fees', key: 'averageMonthlyFees' },
    { label: 'Transport', key: 'transport' },
    { label: 'A.C. Classes', key: 'acClasses' },
    { label: 'Indoor Sports', key: 'indoorSports' },
    { label: 'Outdoor Sports', key: 'outdoorSports' },
    { label: 'Swimming Pool', key: 'swimmingPool' },
    { label: 'Music Room', key: 'musicRoom' },
    { label: 'Dance Room', key: 'danceRoom' },
    { label: 'Gym Room', key: 'gymRoom' },
    { label: 'Health Check-Up', key: 'healthCheckup' },
  ];
  
  const booleanFeatures = ['transport', 'acClasses', 'indoorSports', 'outdoorSports', 'swimmingPool', 'musicRoom', 'danceRoom', 'gymRoom', 'healthCheckup'];

  const paddedSchools = [...schools];
  while (paddedSchools.length < 4) { paddedSchools.push(null); }

  const renderBoolean = (value) => value ? <CheckIcon /> : <CrossIcon />;

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <p className="text-center text-red-500 text-lg mt-8">Error: {error}</p>;

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

      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Compare Schools</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-[72px] bg-white/90 backdrop-blur-sm">
              <tr className="border-b-2 border-gray-200">
                <th className="p-4 w-[20%] text-left text-sm font-semibold text-gray-600">FEATURES</th>
                {paddedSchools.map((school, index) => (
                  <th key={school?.id || `placeholder-${index}`} className="p-4 border-l w-[20%] align-top text-center">
                    {school ? (
                       <div className="relative group">
                            {/* FIXED: Use the full Cloudinary URL directly */}
                            <img src={school.image} alt={school?.name} className="h-32 w-full object-contain rounded-lg mb-2 bg-gray-100" />
                            <button onClick={() => handleRemoveSchool(school.id)} className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <CloseIcon />
                            </button>
                       </div>
                    ) : (
                        <Link href="/" className="group h-32 w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors">
                            <PlusCircleIcon />
                            <span className="text-sm mt-1">Add School</span>
                        </Link>
                    )}
                    <p className="text-md font-semibold text-gray-800 mt-2 h-10">{school?.name || ''}</p>
                    <button className={`w-full mt-4 py-2 px-4 text-sm font-bold rounded-lg transition-transform hover:scale-105 ${school ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                      Apply Now
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map(feature => (
                <tr key={feature.key} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-semibold text-gray-600 bg-gray-50/70 sticky left-0">{feature.label}</td>
                  {paddedSchools.map((school, index) => (
                    <td key={school?.id || `placeholder-cell-${index}`} className="p-4 border-l text-sm text-center text-gray-800 align-middle min-h-[50px]">
                      {school ? (
                        booleanFeatures.includes(feature.key) ? ( renderBoolean(school[feature.key]) ) : 
                        feature.key === 'hostelFacility' ? ( school.hostelFacility ? 'Residential' : 'Day School' ) :
                        (school[feature.key] || 'N/A')
                      ) : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

