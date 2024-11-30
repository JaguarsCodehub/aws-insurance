import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Car Insurance Application</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Login
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md">
            Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}
