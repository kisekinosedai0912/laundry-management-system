import { useState } from "react"
import { updateBookingStatus } from "@/utils/storage"
import { formatDate } from "@/utils/utils"

export default function OrderManagement({ bookings, onUpdate }) {
    const [filter, setFilter] = useState("all")
    const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter)

    const handleStatusChange = (bookingId, newStatus) => {
        updateBookingStatus(bookingId, newStatus)
        onUpdate()
    }

    const statuses = ["Pending", "Ongoing", "For Pickup/Delivery", "Completed"]

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                <FilterButton label="All" isActive={filter === "all"} onClick={() => setFilter("all")} />
                {statuses.map((status) => (
                <FilterButton key={status} label={status} isActive={filter === status} onClick={() => setFilter(status)} />
                ))}
            </div>

            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <p className="text-center py-12 text-gray-500 dark:text-gray-400">No orders found</p>
                ) : (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Customer</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{booking.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{booking.contactNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Booking Details</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {booking.weight}kg • {booking.serviceType} • {booking.location} • ₱{booking.fee.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(booking.createdAt)}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(booking.id, status)}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                        booking.status === status
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
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
    )
}