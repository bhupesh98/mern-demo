'use client';
import { useState } from 'react';
import { signIn } from '@/api/user.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signIn(credentials);
      // Optionally store the current user id in localStorage (or Context)
      localStorage.setItem('currentUserId', user.id);
      router.push('/users'); // redirect to user list (or profile)
    } catch (err) {
      setError('Sign in failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
      {/* Signup button */}
      <div className="mt-4">
        <p className="text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
