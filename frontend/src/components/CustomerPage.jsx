import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function CustomerPage({ user, setUser }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Debug: Log the user object and ID
                console.log("Current user object:", user);
                console.log("User ID being used:", user.id);

                const response = await fetch(`https://laundry-management-system-32ft.onrender.com/api/customer/record/${user.id}`);
                const data = await response.json();
                
                // Debug: Log the response
                console.log("API Response:", data);
                console.log("Bookings received:", data.bookings);

                if (data.success) {
                    setBookings(data.bookings || []);
                } else {
                    setError(data.message || "Failed to fetch bookings");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to load bookings");
                setLoading(false);
            }
        };

        if (user && user.id) {
            fetchBookings();
        } else {
            console.error("User or user.id is missing:", user);
            setError("User information is missing");
            setLoading(false);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header with Logout */}
            <nav className="bg-white dark:bg-slate-800 shadow-lg border-b border-gray-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                L
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LaundryPro</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-white bg-red-600 hover:bg-red-700 shadow-lg"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome, {user.name}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Track all your laundry bookings here
                    </p>
                    {/* Debug info - Remove this after fixing */}
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-8">
                        User ID: {user.id || "Not found"}
                    </p>

                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Your Bookings
                    </h2>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading bookings...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 text-gray-800 dark:text-gray-200">
                                        <th className="p-4 text-left font-semibold">Service</th>
                                        <th className="p-4 text-left font-semibold">Date</th>
                                        <th className="p-4 text-left font-semibold">Status</th>
                                        <th className="p-4 text-left font-semibold">Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {bookings.length > 0 ? (
                                        bookings.map(b => (
                                            <tr
                                                key={b.id}
                                                className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <td className="p-4 text-gray-900 dark:text-gray-200">
                                                    {b.service}
                                                </td>
                                                <td className="p-4 text-gray-900 dark:text-gray-200">
                                                    {new Date(b.date).toLocaleDateString()}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        b.status === 'Completed' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : b.status === 'Pending'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    }`}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-900 dark:text-gray-200 font-semibold">
                                                    ₱{b.price || 'N/A'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-8 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    <p className="text-lg font-medium">No bookings yet</p>
                                                    <p className="text-sm">Your booking history will appear here</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}