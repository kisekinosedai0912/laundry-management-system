import { getStatusColor, formatDate } from "@/utils/utils"

export default function BookingList({ bookings }) {
    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div
                    key={booking.id}
                    className="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Name</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{booking.name}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Contact</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{booking.contactNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Fee</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">₱{booking.fee.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}
                            >
                                {booking.status}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>Weight: {booking.weight} kg</p>
                        <p>Service: {booking.serviceType}</p>
                        <p>Location: {booking.location}</p>
                        <p>Payment: {booking.paymentMethod}</p>
                        <p>Created: {formatDate(booking.createdAt)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}