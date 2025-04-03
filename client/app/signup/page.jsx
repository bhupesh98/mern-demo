'use client';
import { useState } from 'react';
import { signUp } from '@/api/user.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signUp(form);
      if (error) setError(error);
      // After sign-up, redirect to sign-in
      else router.push('/signin');
    } catch (err) {
      setError('Sign-up failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
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
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
      {/* Signin page button */}
      <p className="mt-4">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
