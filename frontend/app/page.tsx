'use client';
import Link from 'next/link';
import { ArrowRight, Utensils, QrCode, ClipboardList, ShieldCheck, Smartphone, Zap, Star } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl text-gray-900 flex items-center gap-2">
                        <span className="bg-red-600 text-white p-1 rounded-lg">FF</span>
                        <span>The Food <span className="text-red-600">Forge</span></span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm">
                        <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
                        <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</Link>
                        <Link href="/login" className="btn-primary text-sm py-2.5 px-5">
                            Get Started
                        </Link>
                    </div>
                    <Link href="/login" className="md:hidden btn-primary text-sm py-2 px-4">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 -z-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="animate-fadeIn">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-6">
                                <Zap className="w-4 h-4" />
                                Trusted by 50+ hostels
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                The Food Forge <br />
                                <span className="bg-gradient-to-tr from-red-600 to-orange-500 bg-clip-text text-transparent">The Taste Buds</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                                Replace paper coupons and Excel chaos with a modern system.
                                QR attendance, digital menus, and real-time tracking — all in one app.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/login" className="btn-primary inline-flex items-center gap-2">
                                    Start Free Trial <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/admin" className="btn-secondary inline-flex items-center gap-2">
                                    View Demo
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">10K+</div>
                                    <div className="text-sm text-gray-500">Daily meals</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">98%</div>
                                    <div className="text-sm text-gray-500">Accuracy</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                                    <div className="text-sm text-gray-500 ml-1">Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Dashboard Preview */}
                        <div className="hidden lg:block animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl -z-10" />
                                <div className="card p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-sm text-gray-500">Today's Attendance</div>
                                            <div className="text-3xl font-bold text-gray-900">482 / 520</div>
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-xl">
                                            <QrCode className="w-6 h-6 text-red-600" />
                                        </div>
                                    </div>
                                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                                        <div className="h-full w-[92%] bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <div className="text-xl font-bold text-gray-900">158</div>
                                            <div className="text-xs text-gray-500">Breakfast</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <div className="text-xl font-bold text-gray-900">189</div>
                                            <div className="text-xs text-gray-500">Lunch</div>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                            <div className="text-xl font-bold text-red-700">135</div>
                                            <div className="text-xs text-red-600">Dinner (Live)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Everything you need</h2>
                        <p className="section-subtitle max-w-xl mx-auto">Built for Indian hostels. Designed for simplicity.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                        <FeatureCard
                            icon={<QrCode className="w-6 h-6" />}
                            title="QR Attendance"
                            description="Students scan, staff verifies. No more proxy meals or manual registers."
                        />
                        <FeatureCard
                            icon={<Utensils className="w-6 h-6" />}
                            title="Digital Menu"
                            description="Publish daily menus with allergen info. Accessible on any device."
                        />
                        <FeatureCard
                            icon={<ClipboardList className="w-6 h-6" />}
                            title="Automated Billing"
                            description="Monthly statements generated automatically with opt-out adjustments."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="w-6 h-6" />}
                            title="Role-based Access"
                            description="Separate views for students, wardens, accountants, and kitchen staff."
                        />
                    </div>
                </div>
            </section>

            {/* Mobile App Preview */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-6">
                                <Smartphone className="w-4 h-4" />
                                Mobile First
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Works beautifully on every device
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Students can check menus, view their attendance history, and show their QR code
                                for verification — all from their phones.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    Real-time attendance updates
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    Instant QR code generation
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    No app download required
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative">
                                {/* Phone mockup */}
                                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                    <div className="w-full h-full bg-gray-50 rounded-[2.25rem] overflow-hidden">
                                        {/* Screen content */}
                                        <div className="h-full bg-white p-4">
                                            <div className="flex items-center justify-between mb-6 pt-8">
                                                <div>
                                                    <p className="text-lg font-bold text-gray-900">Hello, Rahul 👋</p>
                                                    <p className="text-xs text-gray-500">Friday, 6 Feb</p>
                                                </div>
                                                <div className="w-10 h-10 bg-red-500 rounded-full" />
                                            </div>
                                            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white mb-4">
                                                <p className="text-xs opacity-80">Current Meal</p>
                                                <p className="text-xl font-bold">Lunch</p>
                                                <div className="flex gap-2 mt-3">
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">☕ ✓</span>
                                                    <span className="text-xs bg-white/30 px-2 py-1 rounded-full">🍽️</span>
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">🌙</span>
                                                </div>
                                            </div>
                                            <div className="text-center py-4">
                                                <div className="inline-block p-3 bg-gray-100 rounded-xl">
                                                    <QrCode className="w-24 h-24 text-gray-800" />
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2">Show at counter</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-red-500 to-red-600">
                <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to modernize your mess?</h2>
                    <p className="text-red-100 text-lg mb-8">Start with a free trial. No credit card required.</p>
                    <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors shadow-lg">
                        Create Free Account <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <span className="font-bold text-xl text-white">The Food <span className="text-red-500">Forge</span></span>
                            <p className="text-sm mt-1">© 2026 The Food Forge. All rights reserved.</p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="card p-6 hover:border-red-200 transition-colors">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
}
