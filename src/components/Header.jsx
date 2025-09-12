import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';

export default function Header() {
  const { user, mutate } = useUser();
  const router = useRouter();

  // This function is called when the logout button is clicked
  const handleLogout = async () => {
    // 1. Call the logout API endpoint using POST to prevent caching.
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    // 2. IMPORTANT: Tell SWR to re-fetch the user data.
    // SWR will call '/api/auth/me', see the cookie is gone,
    // and update the 'user' variable to null, which updates the UI.
    mutate();
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/showSchools" className="flex items-center gap-2">
          <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 S0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" /></svg>
          <h1 className="text-2xl font-bold text-gray-900">School Finder</h1>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            // If the user is logged in:
            <>
              <span className="text-gray-600">Welcome, {user.email}</span>
              <Link href="/addSchool" className="font-semibold text-indigo-600 hover:text-indigo-800">
                + Add School
              </Link>
              {/* This button correctly calls the handleLogout function */}
              <button onClick={handleLogout} className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            // If the user is not logged in:
            <Link href="/login" className="inline-block bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700">
              Login to Add School
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

