import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This is a temporary component that will redirect the user to the main school dashboard.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to the showSchools page as soon as the component mounts.
    router.replace('/showSchools');
  }, [router]);

  // Render a simple loading message while the redirect is happening.
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading School Dashboard...</p>
    </div>
  );
}

