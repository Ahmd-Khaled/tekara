import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24 bg-gray-100 text-gray-800">
      <Link
        href="/dashboard"
        className="text-3xl font-bold text-blue-400 hover:text-blue-600 transition-colors duration-300 underline"
      >
        Dashboard
      </Link>
      <Link
        href="/login"
        className="text-3xl font-bold text-blue-400 hover:text-blue-600 transition-colors duration-300 underline"
      >
        Login
      </Link>
    </main>
  );
}
