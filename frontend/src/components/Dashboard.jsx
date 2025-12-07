import { useState, useEffect } from "react"
import { getBookings } from "@/utils/storage"
import BookingList from "./BookingList"

export default function Dashboard({ onCreateBooking }) {
    const [bookings, setBookings] = useState([])
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, revenue: 0 })

    useEffect(() => {
        const allBookings = getBookings()
        setBookings(allBookings)

        const statsData = {
            total: allBookings.length,
            pending: allBookings.filter((b) => b.status === "Pending").length,
            completed: allBookings.filter((b) => b.status === "Completed").length,
            revenue: allBookings.reduce((sum, b) => sum + (b.fee || 0), 0),
        }
        setStats(statsData)
    }, [])

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Bookings" value={stats.total} color="blue" />
                <StatCard title="Pending" value={stats.pending} color="yellow" />
                <StatCard title="Completed" value={stats.completed} color="green" />
                <StatCard title="Revenue" value={`₱${stats.revenue.toFixed(2)}`} color="indigo" />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Bookings</h2>
                    <button
                        onClick={onCreateBooking}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Create Booking
                    </button>
                </div>
                {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No bookings yet. Create one to get started!</p>
                        </div>
                    ) : (
                        <BookingList bookings={bookings} />
                    )
                }
            </div>
        </div>
    )
}

function StatCard({ title, value, color }) {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
        green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        indigo: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
    }

    return (
        <div className={`${colorClasses[color]} border rounded-lg p-6`}>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    )
}