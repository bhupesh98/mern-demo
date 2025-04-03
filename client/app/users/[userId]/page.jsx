'use client';
import { useState, useEffect } from 'react';
import { getUserById, deleteUser } from '@/api/user.service';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserProfilePage() {
  const { userId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Assume current user id is stored in localStorage after sign in
  const currentUserId =
    typeof window !== 'undefined' && localStorage.getItem('currentUserId');

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await getUserById(userId);
      if (data) setUser(data);
      else {
        setError(error);
        router.replace('/');
      }
    }
    fetchUser();
  }, [userId]);

  console.log(userId, currentUserId);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      try {
        await deleteUser(userId);
        // Optionally remove current user info and redirect to home.
        localStorage.removeItem('currentUserId');
        router.push('/');
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (error) return <p className="text-red-600 p-6">{error}</p>;
  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* Other user info can be added here */}
      {currentUserId === userId && (
        <div className="mt-4 space-x-4">
          <Link
            className="bg-blue-500 text-white px-3 py-1 rounded"
            href={`/users/${userId}/edit`}
          >
            Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete Profile
          </button>
        </div>
      )}
    </main>
  );
}
