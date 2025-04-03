'use client';
import { useState, useEffect } from 'react';
import { getUserById, updateUser } from '@/api/user.service';
import { useParams, useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const { userId } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserById(userId);
        setForm({ name: data.name, email: data.email });
      } catch (err) {
        setError('Failed to load user details');
      }
    }
    fetchUser();
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, form);
      router.push(`/users/${userId}`);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
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
        <label className="block mb-4">
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}
