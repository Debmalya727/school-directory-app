import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// --- Data for the dropdowns (with duplicates removed) ---
const cities = [...new Set(["Lucknow", "Noida", "New Delhi", "Gurgaon", "Faridabad", "Hyderabad", "Greater Noida", "Pune", "Ghaziabad", "Dehradun", "Kolkata", "Chennai", "Mumbai", "Thiruvananthapuram", "Kozhikode", "Ernakulam", "Malappuram", "Wayanad", "Thrissur", "Idukki", "Alappuzha", "Pathanamthitta", "Kollam", "Kannur", "Kottayam", "Kasaragod", "Palakkad", "Bengaluru", "Udupi", "Mangalore", "Mysuru", "Davanagere", "Belagavi", "Shivamogga", "Hubli-Dharwad", "Vijayapura", "Ballari", "Tumakuru", "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar", "Pali", "Sri Ganganagar", "Bharatpur", "Chittorgarh", "Nagaur", "Tonk", "Jhunjhunu", "Hanumangarh", "Dausa", "Banswara", "Dholpur", "Pratapgarh", "Jaisalmer", "Sirohi", "Bundi", "Baran", "Jhalawar", "Karauli", "Sawai Madhopur", "Dungarpur", "Rajsamand", "Barmer", "Jalore", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Navsari", "Morbi", "Mehsana", "Bharuch", "Valsad", "Patan", "Godhra", "Porbandar", "Kheda", "Amreli", "Surendranagar", "Dahod", "Gandhidham", "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Bettiah", "Saharsa", "Hajipur", "Sasaram", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Lakhisarai", "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Dhar", "Shahdol", "Balaghat", "Ashoknagar", "Tikamgarh", "Harda", "Sheopur", "Shajapur", "Narsinghpur", "Mandla", "Sidhi", "Barwani", "Panna", "Raisen", "Jhabua", "Alirajpur", "Dindori", "Anuppur", "Umaria", "Agar", "Morena", "Agra", "Kanpur", "Lakhimpur Kheri", "Fatehpur", "Chitrakoot", "Gonda", "Prayagraj", "Bareilly", "Mirzapur", "Aligarh", "Azamgarh", "Jhansi", "Mathura", "Bulandshahar", "Budaun", "Unnao", "Raebareli", "Balrampur", "Shahjahanpur", "Pilibhit", "Barabanki", "Mainpuri", "Jyotiba Phule Nagar", "Sultanpur", "Baghpat", "Firozabad", "Amethi", "Hathras", "Hapur", "Ayodhya", "Hardoi", "Etawah", "Fatehgarh", "Kannauj", "Etah", "Deoria", "Chandauli", "Bhadohi", "Banda", "Maharajganj", "Sant Kabir Nagar", "Rampur", "Shamli", "Auraiya", "Jalaun", "Bahraich", "Lalitpur", "Hamirpur", "Kushi Nagar", "Sonbhadra", "Kanshi Ram Nagar", "Sitapur", "Sant Ravidas Nagar", "Akbarpur", "Ambedkar Nagar", "Siddharthnagar", "Mahoba", "Shravasti", "Padrauna", "Bastar", "Raipur", "Bilaspur", "Dantewada", "Kawardha", "Raigarh", "Koriya", "Durg", "Surguja", "Mungeli", "Janjgir Champa", "Korba", "Mahasamund", "Balod", "Jashpur", "Surajpur", "Bijapur", "Narayanpur", "Baloda Bazar", "Gariaband", "Kondagaon", "Bemetara", "Kabirdham", "Rajnandgaon", "Dhamtari", "Kanker", "Sabarkantha Himmatnagar", "Bhuj", "Panchmahal", "Una", "Kangra", "Sirmaur", "Solan", "Mandi", "Kullu", "Shimla", "Chamba", "Kinnaur", "Lahaul Spiti", "Bokaro", "Koderma", "Dhanbad", "Hazaribagh", "East Singhbhum", "Deoghar", "Ranchi", "Giridih", "Garhwa", "Godda", "Palamu", "West Singhbhum", "Ramgarh", "Seraikella Kharsawan", "Jamtara", "Chatra", "Gumla", "Pakur", "Simdega", "Lohardaga", "Dumka", "Sahibganj", "Latehar", "Jalandhar", "Rupnagar", "Muktsar", "Ludhiana", "Firozpur", "Pathankot", "Patiala", "Hoshiarpur", "Sangrur", "Gurdaspur", "Amritsar", "Sas Nagar", "Mansa", "Tarn Taran", "Fatehgarh Sahib", "Faridkot", "Moga", "Barnala", "Bathinda", "Kapurthala", "Nawanshahr", "Sbs Nagar", "Fazilka", "Khanna", "Taran", "Cuttack", "Bhadrak", "Rayagada", "Sambalpur", "Khurda", "Koraput", "Jharsuguda", "Jajpur", "Ganjam", "Balangir", "Bargarh", "Dhenkanal", "Gajapati", "Puri", "Keonjhar", "Khordha", "Jagatsinghpur", "Sundargarh", "Angul", "Balasore", "Kalahandi", "Mayurbhanj", "Kandhamal", "Malkangiri", "Nabarangpur", "Nuapada", "Kendrapara", "Sonepur", "Boudh", "Nayagarh", "Deogarh", "Phulbani", "Berhampur", "Nabrangpur", "Chandahandi", "Chandrapur", "Gwalior", "Khargone", "Morena", "Satna", "Harda", "Chhatarpur", "Shivpuri", "Dhar", "Jabalpur", "Mandsaur", "Rajgarh", "Vidisha", "Panna", "Dewas", "Sagar", "Bhopal", "Raisen", "Tikamgarh", "Khandwa", "Badwani", "Jhabua", "Seoni", "Burhanpur", "Shahdol", "Rewa", "Balaghat", "Betul", "Katni", "Hoshangabad", "Chhindwara", "Sehore", "Datia", "Ratlam", "Neemuch", "Narsinghpur", "Umaria", "Bhind", "Guna", "Sidhi", "Singhrouli", "Damoh", "Alirajpur", "Dindori", "Shajapur", "Sheopur", "Mandla", "Chandigarh", "Dadar and Nagar Haveli", "Goa (South)", "Goa (North)", "Haveri", "Bidar", "Mandya", "South Kannada", "North Kannada", "Belagavi", "Kodagu", "Gulbarga", "Chikkamagaluru", "Bagalkot", "Tumkur", "Ballari", "Gadag", "Raichur", "Kolar", "Hassan", "Chitradurga", "Koppal", "Chamaraja Nagar", "Imphal", "Senapati", "Ukhrul", "Thoubal", "Chandel", "Imphal-West", "Imphal-East", "Churachandpur", "Bishnupur", "Tamenglong", "Manipur Central", "East Khasi Hills", "Ri-Bhoi", "West Garo Hills", "East Jaintia Hills", "East Garo Hills", "West Khasi Hills", "West Tripura", "Dhalai", "South Tripura", "East Tripura", "North Tripura", "East District", "North District", "South District", "West District", "Barapathing", "Karaikal", "Puducherry", "Mahe", "Dimapur", "Mon", "Phek", "Mokokchung", "Kohima", "Tuensang", "Zunheboto", "Longleng", "Wokha", "Peren", "Kiphire", "South Andaman", "East Godavari", "Chittoor", "Guntur", "Krishna", "West Godavari", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Cuddapah", "Ananthapur", "Medak", "KV Rangareddy", "Mahabub Nagar", "Papum Pare", "East Champaran", "South Delhi", "North Delhi", "South Goa", "North Goa", "Panch Mahals", "Gandhi Nagar", "Ambala", "Yamuna Nagar", "Sirsa", "Hisar", "Karnal", "Panchkula", "Jind", "Kurukshetra", "Fatehabad", "Palamau", "Giridh", "Hazaribag", "Seraikela Kharsawan", "Jamshedpur", "Jammu", "Kalaburagi", "Tumakuru", "Dakshina Kannada", "Chamrajnagar", "Davangere", "Ramanagar", "Uttara Kannada", "Yadgir", "Vijayapura", "Kasargod", "Nashik", "Kolhapur", "Satara", "Nagpur", "Thane", "Beed", "Jalgaon", "Jalna", "Amravati", "Dhule", "Sangli", "Solapur", "Latur", "Akola", "Gadchiroli", "Wardha", "Ahmed Nagar", "Gondia", "Jaintia Hills", "Kendujhar", "Baleswar", "Jagatsinghapur", "Sundergarh", "Jajapur", "Sonapur", "Pondicherry", "Mohali", "Sirohi", "Ganganagar", "Banswara", "East Sikkim", "South Sikkim", "West Sikkim", "Madurai", "Kanchipuram", "Nilgiris", "Karur", "Dindigul", "Ooty", "Tirunelveli", "Salem", "Tuticorin", "Tiruchirappalli", "Thanjavur", "Kanyakumari", "Vellore", "Virudhunagar", "Krishnagiri", "Coimbatore", "Theni", "Erode", "Sivaganga", "Ramanathapuram", "Tiruvannamalai", "Tiruvallur", "Karim Nagar", "Allahabad", "Kheri", "Shrawasti", "Kushinagar", "Siddharthnagar", "Faizabad", "Pauri Garhwal", "Nainital", "Haridwar", "Uttarkashi", "Tehri Garhwal", "Almora", "Chamoli", "Udham Singh Nagar", "Pithoragarh", "Paschim Bardhaman", "Murshidabad", "Purba Bardhaman", "Hooghly", "North Parganas", "Darjeeling", "Howrah", "Jalpaiguri", "Kalimpong", "West Midnapore", "Malda", "Nadia", "South Parganas", "East Midnapore", "Cooch Behar", "Alipurduar", "Purulia", "North Dinajpur", "Birbhum", "South Dinajpur", "Ponnur", "Godavari", "Thiruvathapuram", "Ajamer", "Medinipur", "Aizawl", "Lunglei", "Serchhip", "Saiha", "Kolasib", "Champhai", "Mamit", "Daman", "Diu", "Lakshadweep", "Asansol", "Bankura", "Burdwan", "Durgapur", "Midnapur", "North Pargana", "Siliguri", "South Pargana", "Chengalpattu", "Cuddalore", "Dharmapuri", "Kancheepuram", "Nagapattinam", "Namakkal", "North Arcot", "Pasumpon Muthuramalinga T", "Perambalur", "Ponmuthuramalingam", "Pudukkottai", "Quide Millath", "South Arcot", "The Nilgiris", "Thiruvallur", "Thoothukudi", "Trichirappalli", "VOC", "Vaigai Veeran Alagamuthu", "Viluppuram", "Kolathupalayam", "Periyar", "Kannikapuram", "Karattoor", "Gudiyattam", "Walaja", "Kavundachipalayam", "Thirupattur", "Solur", "Dharapuram", "Arakkonam", "Kangayam", "Ariyappampalayam", "Adilabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal", "Bhiwani", "Hissar", "Jhajjar", "Kaithal", "Mahendragarh", "Mewat", "Narnaul", "Palwal", "Panipat", "Rewari", "Rohtak", "Sonipat", "Yamunanagar", "Ahmednagar", "Bhandara", "Buldhana", "Hingoli", "Nanded", "Nandurbar", "Osmanabad", "Parbhani", "Raigad", "Ratnagiri", "Sindhudurg", "Washim", "Yavat Mal", "Ananatpur", "Secunderabad", "Vijayawada", "Kurnool", "Vizianagram", "Bhilwara", "Swai Madhopur", "Karauli", "Surat Garh", "Bageshwar", "Champawat", "Haldwani", "Roorkee", "Rudraprayag", "Mussoorie", "Kodaikanal", "ï»¿Ahmedabad", "Cochin", "Delhi", "Gandhidham", "Guwahati", "ï»¿Hyderabad", "Male", "Maldives", "Doha", "Dubai Jumeirah", "Kathmandu", "Khalilabad", "Manipur", "Mundra", "Mysore", "Pattambi", "Tirupur", "Tiruttani", "Trichy", "Kochi"])].sort();
const boards = ["ICSE", "CBSE", "IB", "Cambridge", "State Board", "Pre-School"];
const schoolTypes = ["All Boys", "All Girls", "Co-Education"];

const YesNoRadio = ({ label, name, register }) => (
    <div className="flex flex-col">
        <label className="block text-sm font-medium text-black mb-2">{label}</label>
        <div className="flex items-center gap-x-6">
            <label className="flex items-center gap-2 text-black cursor-pointer"><input type="radio" value="true" {...register(name)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /> Yes</label>
            <label className="flex items-center gap-2 text-black cursor-pointer"><input type="radio" value="false" defaultChecked {...register(name)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /> No</label>
        </div>
    </div>
);


export default function AddSchoolPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    setStatusMessage({ type: 'info', text: 'Submitting...' });
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
        if (key === 'image') {
            if (data.image[0]) formData.append('image', data.image[0]);
        } else {
            formData.append(key, data[key]);
        }
    });

    try {
      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Something went wrong on the server.');
      }
      
      setStatusMessage({ type: 'success', text: 'School added successfully! Redirecting...' });
      reset();
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setStatusMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <main className="bg-gray-50 font-sans">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
             <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span className="font-semibold">Back to Finder</span>
            </Link>
        </div>
      </header>
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border">
          <h1 className="text-3xl font-bold text-center text-gray-800">Add a New School</h1>
          <p className="text-center text-gray-500 mt-2 mb-8">Fill in the details below to add a new school to the directory.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <fieldset className="border p-4 rounded-lg">
                <legend className="text-lg font-semibold px-2 text-gray-700">Basic Information</legend>
                <div className="space-y-4 p-2">
                    <div><label className="block text-sm font-medium text-black">School Name</label><input type="text" {...register("name", { required: "School name is required." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" />{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">Address</label><input type="text" {...register("address", { required: "Address is required." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" />{errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">City</label><select {...register("city", { required: "Please select a city." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black cursor-pointer focus:ring-2 focus:ring-indigo-500"><option value="">Select City</option>{cities.map(c => <option key={c} value={c}>{c}</option>)}</select>{errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">State</label><input type="text" {...register("state", { required: "State is required." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" />{errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">Contact</label><input type="text" {...register("contact", { required: "Contact number is required." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" />{errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">Email</label><input type="email" {...register("email", { required: "A valid email is required." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" />{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}</div>
                </div>
            </fieldset>

             <fieldset className="border p-4 rounded-lg">
                <legend className="text-lg font-semibold px-2 text-gray-700">Academic Details</legend>
                <div className="space-y-4 p-2">
                    <div><label className="block text-sm font-medium text-black">Board</label><select {...register("board", { required: "Please select a board." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black cursor-pointer focus:ring-2 focus:ring-indigo-500"><option value="">Select Board</option>{boards.map(b => <option key={b} value={b}>{b}</option>)}</select>{errors.board && <p className="text-red-500 text-xs mt-1">{errors.board.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">School Type</label><select {...register("schoolType", { required: "Please select a type." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black cursor-pointer focus:ring-2 focus:ring-indigo-500"><option value="">Select Type</option>{schoolTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.schoolType && <p className="text-red-500 text-xs mt-1">{errors.schoolType.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">Admission Status</label><input type="text" defaultValue="Open" {...register("admissionStatus")} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-sm font-medium text-black">School Level</label><input type="text" defaultValue="Senior Secondary" {...register("schoolLevel")} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" /></div>
                    <div><label className="block text-sm font-medium text-black">Average Monthly Fees</label><input type="text" defaultValue="N/A" {...register("averageMonthlyFees")} className="w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500" /></div>
                </div>
            </fieldset>

             <fieldset className="border p-4 rounded-lg">
                <legend className="text-lg font-semibold px-2 text-gray-700">Facilities</legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 p-2">
                    <YesNoRadio label="Hostel" name="hostelFacility" register={register} />
                    <YesNoRadio label="Transport" name="transport" register={register} />
                    <YesNoRadio label="A.C. Classes" name="acClasses" register={register} />
                    <YesNoRadio label="Indoor Sports" name="indoorSports" register={register} />
                    <YesNoRadio label="Outdoor Sports" name="outdoorSports" register={register} />
                    <YesNoRadio label="Swimming" name="swimmingPool" register={register} />
                    <YesNoRadio label="Music Room" name="musicRoom" register={register} />
                    <YesNoRadio label="Dance Room" name="danceRoom" register={register} />
                    <YesNoRadio label="Gym Room" name="gymRoom" register={register} />
                    <YesNoRadio label="Health Check" name="healthCheckup" register={register} />
                </div>
            </fieldset>

            <fieldset className="border p-4 rounded-lg">
                <legend className="text-lg font-semibold px-2 text-gray-700">Rating & Image</legend>
                <div className="space-y-4 p-2">
                     <div><label className="block text-sm font-medium text-black">Initial Rating (1-5)</label><select {...register("rating", { required: "Please provide a rating." })} className="w-full px-3 py-2 mt-1 border rounded-md text-black cursor-pointer focus:ring-2 focus:ring-indigo-500"><option value="">Select Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>{errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black">School Image</label><input type="file" {...register("image", { required: "An image is required." })} className="w-full mt-1 text-black p-2 border rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:ring-2 focus:ring-indigo-500" />{errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}</div>
                </div>
            </fieldset>
            
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all transform hover:scale-105">
                {isSubmitting ? 'Submitting...' : 'Add School'}
            </button>
            {statusMessage.text && <p className={`mt-4 text-center text-sm font-semibold ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMessage.text}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}

