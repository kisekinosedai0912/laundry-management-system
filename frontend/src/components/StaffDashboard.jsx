import { useState, useEffect } from "react";
import { getBookings } from "@/utils/storage";
import OrderManagement from "./OrderManagement";
import ReportViewer from "./ReportViewer";

export default function StaffDashboard() {
    const [activeTab, setActiveTab] = useState("orders");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        setLoading(true);
        try {
            const data = await getBookings(); // Now properly awaited
            setBookings(data);
        } catch (error) {
            console.error("Error loading bookings:", error);
            setBookings([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const refreshBookings = async () => {
        await loadBookings(); // Refresh by reloading
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Dashboard</h1>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading bookings...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Dashboard</h1>

            <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-6 py-3 font-semibold transition-all duration-200 ${
                        activeTab === "orders"
                            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                    Order Management
                </button>
                <button
                    onClick={() => setActiveTab("reports")}
                    className={`px-6 py-3 font-semibold transition-all duration-200 ${
                        activeTab === "reports"
                            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                    Reports
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                {activeTab === "orders" ? (
                    <OrderManagement bookings={bookings} onUpdate={refreshBookings} />
                ) : (
                    <ReportViewer bookings={bookings} />
                )}
            </div>
        </div>
    );
}