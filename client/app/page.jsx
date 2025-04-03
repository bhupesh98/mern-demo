import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to MERN Stack Todo App
      </h1>
      <p className="mb-8">
        A sample fullstack application using Express (backend) and Next.js
        (frontend).
      </p>
      <div className="space-x-4">
        <Link
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          href="/signup"
        >
          Sign Up
        </Link>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          href="/signin"
        >
          Sign In
        </Link>
        <Image src={'/image.jpg'} width={400} height={200} alt='Display image'/>
      </div>
    </main>
  );
}
