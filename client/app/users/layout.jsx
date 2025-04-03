'use client';
import React from 'react';
import { redirect } from 'next/navigation';
import { signOut } from '@/api';

const Navbar = ({ children }) => {
  const handleSignOut = async () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem('currentUserId');
    await signOut();
    // Redirect to login page
    redirect('/signin');
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">MyApp</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </nav>
      <main className="p-4">{children}</main>
    </>
  );
};

export default Navbar;
