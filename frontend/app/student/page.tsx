'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import {
    CreditCard, UtensilsCrossed, Moon, Sun, Coffee,
    Loader2, LogOut, RefreshCw, CheckCircle2, Clock,
    Home, QrCode, User, Calendar
} from 'lucide-react';

interface Attendance {
    id: string;
    meal: string;
    scan_time: string;
    scan_date: string;
}

export default function StudentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [menu, setMenu] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<'home' | 'qr' | 'history'>('home');

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            // Fetch profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
            }

            // Fetch today's attendance
            await fetchAttendance(user.id);

            // Subscribe to real-time attendance updates
            const channel = supabase
                .channel('my-attendance')
                .on('postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'meal_scans',
                        filter: `user_id=eq.${user.id}`
                    },
                    (payload) => {
                        setAttendance(prev => [payload.new as Attendance, ...prev]);
                    }
                )
                .subscribe();

            setLoading(false);

            return () => {
                supabase.removeChannel(channel);
            };
        };
        fetchData();
    }, [router]);

    const fetchAttendance = async (userId: string) => {
        setRefreshing(true);
        try {
            const { data, error } = await supabase
                .from('meal_scans')
                .select('*')
                .eq('user_id', userId)
                .order('scan_time', { ascending: false })
                .limit(30);

            if (!error && data) {
                setAttendance(data);
            }
        } catch (err) {
            console.error('Error fetching attendance:', err);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="animate-spin text-red-600 mx-auto" size={40} />
                    <p className="mt-4 text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const userName = profile?.full_name || user?.user_metadata?.full_name || 'Student';
    const userInitial = userName.charAt(0).toUpperCase();

    // Get today's attendance
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.scan_date === today);
    const hasBreakfast = todayAttendance.some(a => a.meal === 'breakfast');
    const hasLunch = todayAttendance.some(a => a.meal === 'lunch');
    const hasDinner = todayAttendance.some(a => a.meal === 'dinner');

    // Get current meal based on time
    const hour = new Date().getHours();
    let currentMeal = 'dinner';
    let currentMealTime = '7:30 - 9:30 PM';
    if (hour >= 6 && hour < 10) {
        currentMeal = 'breakfast';
        currentMealTime = '7:30 - 9:30 AM';
    } else if (hour >= 11 && hour < 15) {
        currentMeal = 'lunch';
        currentMealTime = '12:30 - 2:30 PM';
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Hello, {userName.split(' ')[0]} 👋</h1>
                        <p className="text-sm text-gray-500">
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => fetchAttendance(user.id)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <RefreshCw className={`w-5 h-5 text-gray-500 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userInitial}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Today's Status Card */}
                <div className="card-accent p-6 animate-fadeIn">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-red-100 text-sm font-medium">Current Meal</p>
                            <h2 className="text-2xl font-bold capitalize">{currentMeal}</h2>
                            <p className="text-red-100 text-sm mt-1">{currentMealTime}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${(currentMeal === 'breakfast' && hasBreakfast) ||
                                (currentMeal === 'lunch' && hasLunch) ||
                                (currentMeal === 'dinner' && hasDinner)
                                ? 'bg-white/20'
                                : 'bg-white text-red-600'
                            }`}>
                            {(currentMeal === 'breakfast' && hasBreakfast) ||
                                (currentMeal === 'lunch' && hasLunch) ||
                                (currentMeal === 'dinner' && hasDinner) ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <Clock className="w-6 h-6" />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className={`badge ${hasBreakfast ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'}`}>
                            ☕ Breakfast {hasBreakfast && '✓'}
                        </span>
                        <span className={`badge ${hasLunch ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'}`}>
                            🍽️ Lunch {hasLunch && '✓'}
                        </span>
                        <span className={`badge ${hasDinner ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'}`}>
                            🌙 Dinner {hasDinner && '✓'}
                        </span>
                    </div>
                </div>

                {/* QR Token - Desktop Only */}
                <div className="hidden md:block">
                    <div className="card p-6 text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        <div className="text-sm font-medium text-gray-500 mb-4">Your Digital Token</div>
                        <div className="inline-block p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                            <QRCodeSVG
                                value={JSON.stringify({ uid: user.id, t: Date.now() })}
                                size={180}
                                bgColor="transparent"
                                fgColor="#1C1C1C"
                                level="M"
                            />
                        </div>
                        <p className="text-sm text-gray-400 mt-4">Show this at the counter for meal verification</p>
                    </div>
                </div>

                {/* Today's Menu */}
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Today's Menu</h2>
                    </div>

                    <div className="grid gap-3 stagger-children">
                        <MealCard
                            icon={<Coffee className="w-5 h-5" />}
                            title="Breakfast"
                            time="7:30 - 9:30 AM"
                            items="Idli, Sambar, Chutney, Coffee"
                            status={hour >= 10 ? 'done' : hour >= 6 ? 'active' : 'upcoming'}
                            marked={hasBreakfast}
                        />
                        <MealCard
                            icon={<UtensilsCrossed className="w-5 h-5" />}
                            title="Lunch"
                            time="12:30 - 2:30 PM"
                            items="Rice, Dal, Sabzi, Curd, Salad"
                            status={hour >= 15 ? 'done' : hour >= 11 ? 'active' : 'upcoming'}
                            marked={hasLunch}
                        />
                        <MealCard
                            icon={<Moon className="w-5 h-5" />}
                            title="Dinner"
                            time="7:30 - 9:30 PM"
                            items="Roti, Paneer, Rice, Dessert"
                            status={hour >= 22 ? 'done' : hour >= 19 ? 'active' : 'upcoming'}
                            marked={hasDinner}
                        />
                    </div>
                </div>

                {/* Recent Attendance History */}
                <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                        <Link href="#" className="text-sm text-red-600 font-medium">View all</Link>
                    </div>

                    <div className="card overflow-hidden">
                        {attendance.slice(0, 5).map((record, i) => (
                            <div
                                key={record.id}
                                className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.meal === 'breakfast' ? 'bg-amber-50 text-amber-600' :
                                            record.meal === 'lunch' ? 'bg-green-50 text-green-600' :
                                                'bg-indigo-50 text-indigo-600'
                                        }`}>
                                        {record.meal === 'breakfast' ? <Coffee className="w-5 h-5" /> :
                                            record.meal === 'lunch' ? <UtensilsCrossed className="w-5 h-5" /> :
                                                <Moon className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 capitalize">{record.meal}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(record.scan_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="badge badge-success">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Marked
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(record.scan_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {attendance.length === 0 && (
                            <div className="p-8 text-center text-gray-400">
                                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="font-medium">No attendance yet</p>
                                <p className="text-sm mt-1">Visit the mess to get your meals marked</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-nav safe-bottom">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-xs">Home</span>
                </button>
                <button
                    onClick={() => setActiveTab('qr')}
                    className="flex flex-col items-center -mt-6"
                >
                    <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg text-white">
                        <QrCode className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">QR Code</span>
                </button>
                <button
                    onClick={handleLogout}
                    className={`mobile-nav-item`}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs">Logout</span>
                </button>
            </nav>

            {/* Mobile QR Modal */}
            {activeTab === 'qr' && (
                <div
                    className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setActiveTab('home')}
                >
                    <div
                        className="bg-white rounded-3xl p-8 w-full max-w-sm text-center animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Your QR Code</h3>
                        <p className="text-sm text-gray-500 mb-6">Show this to the mess staff</p>

                        <div className="inline-block p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
                            <QRCodeSVG
                                value={JSON.stringify({ uid: user.id, t: Date.now() })}
                                size={200}
                                bgColor="transparent"
                                fgColor="#1C1C1C"
                                level="M"
                            />
                        </div>

                        <p className="text-xs text-gray-400 mt-6">{userName}</p>

                        <button
                            onClick={() => setActiveTab('home')}
                            className="w-full btn-secondary mt-6"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function MealCard({
    icon, title, time, items, status, marked
}: {
    icon: React.ReactNode;
    title: string;
    time: string;
    items: string;
    status: 'done' | 'active' | 'upcoming';
    marked: boolean;
}) {
    const statusStyles = {
        done: 'opacity-60',
        active: 'border-2 border-red-200 bg-red-50/30',
        upcoming: ''
    };

    return (
        <div className={`card p-4 ${statusStyles[status]}`}>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${status === 'active' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        {marked ? (
                            <span className="badge badge-success">
                                <CheckCircle2 className="w-3 h-3" />
                                Marked
                            </span>
                        ) : status === 'active' ? (
                            <span className="badge badge-live">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                Now Serving
                            </span>
                        ) : status === 'done' ? (
                            <span className="badge bg-gray-100 text-gray-500">Ended</span>
                        ) : (
                            <span className="text-xs text-gray-400">{time}</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{items}</p>
                </div>
            </div>
        </div>
    );
}
