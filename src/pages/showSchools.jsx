import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header'; // Import the new dynamic header

// --- Helper Icons ---
const StarIcon = ({ className }) => ( <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> );
const SearchIcon = () => ( <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> );
const PlusIcon = () => ( <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> );
const CheckIcon = () => ( <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> );

// --- School Card Component ---
const SchoolCard = ({ school, onCompare, isCompared }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border">
    <div className="relative">
      <Link href={`/school/${school.id}`} className="block">
        <img src={school.image} alt={`Image of ${school.name}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
      </Link>
      <button onClick={() => onCompare(school)} className={`group absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompared ? 'bg-green-500 shadow-lg' : 'bg-white/80 backdrop-blur-sm hover:bg-indigo-500'}`} aria-label={isCompared ? 'Remove from comparison' : 'Add to comparison'}>
        {isCompared ? <CheckIcon /> : <PlusIcon />}
      </button>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{school.city}</p>
        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{school.board}</span>
      </div>
      <Link href={`/school/${school.id}`} className="block mt-2">
          <h2 className="text-xl font-bold text-gray-800 truncate cursor-pointer hover:text-indigo-600 transition-colors">{school.name}</h2>
      </Link>
      <p className="text-gray-500 mt-1 text-sm truncate flex-grow">{school.address}</p>
      <div className="flex items-center my-4">
        {[...Array(5)].map((_, i) => ( <StarIcon key={i} className={`h-5 w-5 ${i < school.rating ? 'text-yellow-400' : 'text-gray-300'}`} /> ))}
      </div>
      <button className="w-full bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
        Apply Now
      </button>
    </div>
  </div>
);

// --- Compare Bar Component ---
const CompareBar = ({ compareList }) => {
    if (compareList.length === 0) return null;
    const compareIds = compareList.map(school => school.id).join(',');
    return (
        <div className="fixed bottom-5 right-5 bg-indigo-800 text-white py-3 px-6 rounded-lg shadow-2xl flex items-center gap-4 z-50 animate-fade-in-up">
            <span className="font-semibold">Compare Schools ({compareList.length}/4 selected)</span>
            <Link href={`/compare?ids=${compareIds}`} className="bg-white text-indigo-700 font-bold py-1 px-4 rounded-md hover:bg-gray-200 transition-transform hover:scale-105">
                Compare
            </Link>
        </div>
    );
};

// --- Main Page Component ---
export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [filters, setFilters] = useState({ searchTerm: '', city: '', board: '', schoolType: '', hostelFacility: '' });
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = [...new Set(schools.map(s => s.city))].sort();
  const boards = [...new Set(schools.map(s => s.board))].sort();
  const schoolTypes = [...new Set(schools.map(s => s.schoolType))].sort();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/getSchools');
        if (!response.ok) throw new Error('Data could not be fetched.');
        const data = await response.json();
        setSchools(data);
        setFilteredSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    let result = schools;
    if (filters.searchTerm) result = result.filter(s => s.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    if (filters.city) result = result.filter(s => s.city === filters.city);
    if (filters.board) result = result.filter(s => s.board === filters.board);
    if (filters.schoolType) result = result.filter(s => s.schoolType === filters.schoolType);
    if (filters.hostelFacility) {
      const hasHostel = filters.hostelFacility === 'true';
      result = result.filter(s => s.hostelFacility === hasHostel);
    }
    setFilteredSchools(result);
  }, [filters, schools]);

  const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleCompareToggle = (school) => {
    setCompareList(prev => {
        const isPresent = prev.some(item => item.id === school.id);
        if (isPresent) {
            return prev.filter(item => item.id !== school.id);
        }
        if (prev.length < 4) {
            return [...prev, school];
        }
        alert("You can only compare up to 4 schools at a time.");
        return prev;
    });
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <p className="text-center text-red-500 text-lg mt-8">Error: {error}</p>;

  return (
    // Add flexbox classes to make the main content grow and push the footer down
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header /> {/* Use the new dynamic Header component */}

      {/* Add flex-grow to make this section expand */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12 border">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">School Search</h2>
          <p className="text-center text-gray-500 mb-8">Find the right school for your child.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon /></div>
              <input type="text" name="searchTerm" placeholder="Search by school name..." value={filters.searchTerm} onChange={handleFilterChange} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select name="city" value={filters.city} onChange={handleFilterChange} className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-200 text-black cursor-pointer appearance-none transition-colors"><option value="">All Cities</option>{cities.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select name="board" value={filters.board} onChange={handleFilterChange} className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-200 text-black cursor-pointer appearance-none transition-colors"><option value="">All Boards</option>{boards.map(b => <option key={b} value={b}>{b}</option>)}</select>
            <select name="schoolType" value={filters.schoolType} onChange={handleFilterChange} className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-200 text-black cursor-pointer appearance-none transition-colors"><option value="">All Types</option>{schoolTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <select name="hostelFacility" value={filters.hostelFacility} onChange={handleFilterChange} className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-200 text-black cursor-pointer appearance-none transition-colors"><option value="">Hostel?</option><option value="true">Yes</option><option value="false">No</option></select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredSchools.map((school) => ( <SchoolCard key={school.id} school={school} onCompare={handleCompareToggle} isCompared={compareList.some(item => item.id === school.id)} /> ))}
        </div>
        
        {filteredSchools.length === 0 && !loading && ( <div className="text-center col-span-full py-12"><h3 className="text-2xl font-semibold text-gray-700">No Schools Found</h3><p className="text-gray-500 mt-2">Try adjusting your search filters.</p></div> )}
      </main>

      <CompareBar compareList={compareList} />

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} School Finder. All Rights Reserved.</p>
            <p className="text-sm mt-2">A project by Debmalya Panda</p>
        </div>
      </footer>
    </div>
  );
}

