import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F5F9] text-[#000080] p-6 text-center">
      <h1 className="text-6xl font-bold mb-4 font-display">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#000080] text-white font-medium hover:bg-[#000066] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

