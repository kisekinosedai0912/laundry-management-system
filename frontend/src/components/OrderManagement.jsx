import { useState } from "react";
import { updateBookingStatus } from "@/utils/storage";
import { formatDate } from "@/utils/utils";

export default function OrderManagement({ bookings = [], onUpdate }) {
    const [filter, setFilter] = useState("all");
    const [updatingId, setUpdatingId] = useState(null);

    // Ensure bookings is always an array
    const safeBookings = Array.isArray(bookings) ? bookings : [];
    const filteredBookings = filter === "all" 
        ? safeBookings 
        : safeBookings.filter((b) => b.status === filter);

    const handleStatusChange = async (bookingId, newStatus) => {
        setUpdatingId(bookingId);
        try {
            await updateBookingStatus(bookingId, newStatus);
            await onUpdate(); // Refresh the bookings list
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Failed to update booking status");
        } finally {
            setUpdatingId(null);
        }
    };

    const statuses = ["Pending", "In Progress", "Completed", "Cancelled"];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                <FilterButton label="All" isActive={filter === "all"} onClick={() => setFilter("all")} />
                {statuses.map((status) => (
                    <FilterButton 
                        key={status} 
                        label={status} 
                        isActive={filter === status} 
                        onClick={() => setFilter(status)} 
                    />
                ))}
            </div>

            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No orders found</p>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div 
                            key={booking.id} 
                            className="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Customer</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {booking.customerName || booking.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {booking.contactNumber}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Booking Details</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {booking.weight} • {booking.service} • {booking.location}
                                    </p>
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                                        ₱{booking.price?.toFixed(2) || booking.fee?.toFixed(2) || '0.00'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {formatDate(booking.createdAt || booking.date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(booking.id, status)}
                                        disabled={updatingId === booking.id}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                            booking.status === status
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                        } ${updatingId === booking.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {updatingId === booking.id && booking.status === status ? "Updating..." : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function FilterButton({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
        >
            {label}
        </button>
    );
}