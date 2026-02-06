'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push('/student');
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { full_name: fullName, role: 'student' } },
                });
                if (error) throw error;

                if (data.session) {
                    router.push('/student');
                } else {
                    alert('Check your email to confirm your account.');
                    setIsLogin(true);
                }
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative">
                    <Link href="/" className="text-white text-2xl font-bold flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        The Food Forge
                    </Link>
                </div>

                <div className="relative">
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Managing mess has never been this easy.
                    </h2>
                    <p className="text-red-100 text-lg leading-relaxed">
                        Join hundreds of hostels using our platform to automate attendance,
                        billing, and menu management.
                    </p>

                    {/* Features */}
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            QR-based instant attendance
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            Real-time meal tracking
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            Works on any device
                        </div>
                    </div>
                </div>

                <div className="relative text-white/60 text-sm">
                    © 2026 The Food Forge. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile back link */}
                    <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="lg:hidden mb-6">
                            <span className="font-bold text-2xl text-gray-900">The Food <span className="text-red-600">Forge</span></span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome back!' : 'Create your account'}
                        </h1>
                        <p className="text-gray-500">
                            {isLogin ? 'Enter your details to access your dashboard.' : 'Get started with The Food Forge today.'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleAuth} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="input-field pl-12"
                                        placeholder="Rahul Sharma"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-12"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12 pr-12"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-base"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-8 text-center">
                        <span className="text-gray-500">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>

                    {/* Admin link */}
                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
                            Admin Login →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
