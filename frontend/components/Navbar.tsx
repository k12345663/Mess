import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
            <Link href="/" className="font-bold text-xl text-gray-900">
                Mess<span className="text-emerald-600">Apply</span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/student" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
                <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</Link>
                <Link
                    href="/login"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
