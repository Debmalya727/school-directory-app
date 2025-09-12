import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VerifyPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Get the email from the URL query when the component mounts
  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Verifying OTP...');

    if (!email) {
        setMessage('Email not found. Please try logging in again.');
        return;
    }

    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    if (response.ok) {
      setMessage('Login successful! Redirecting...');
      // Redirect to the main schools page on success
      router.push('/showSchools');
    } else {
      const data = await response.json();
      setMessage(data.message || 'Invalid or expired OTP.');
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Verify Your Email</h1>
        <p className="text-center text-gray-400 mb-6">
          An OTP has been sent to <strong>{email}</strong>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
              6-Digit OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength="6"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify and Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
      </div>
    </main>
  );
}