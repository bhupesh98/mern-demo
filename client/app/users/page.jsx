'use client';
import { useState, useEffect } from 'react';
import { getUsers } from '@/api/user.service';
import Link from 'next/link';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="divide-y divide-gray-300">
        {users.map(user => (
          <li key={user._id} className="py-2">
            <Link href={`/users/${user._id}`} className="text-blue-500 hover:underline">
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
