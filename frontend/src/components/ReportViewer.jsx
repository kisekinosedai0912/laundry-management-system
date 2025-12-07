import { generateReport } from "@/utils/reports"

export default function ReportViewer({ bookings }) {
    const report = generateReport(bookings)

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ReportCard title="Total Bookings" value={report.totalBookings} color="blue" />
                <ReportCard title="Total Revenue" value={`₱${report.totalRevenue.toFixed(2)}`} color="green" />
                <ReportCard title="Completed" value={report.completedBookings} color="indigo" />
                <ReportCard title="Pending" value={report.pendingBookings} color="yellow" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Service Distribution</h3>
                    <div className="space-y-3">
                        {Object.entries(report.serviceBreakdown).map(([service, count]) => (
                            <div key={service} className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300 capitalize">{service}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                                            style={{ width: `${(count / report.totalBookings) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">{count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                        {Object.entries(report.paymentBreakdown).map(([method, count]) => (
                            <div key={method} className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300 capitalize">{method}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
                                            style={{ width: `${(count / report.totalBookings) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">{count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Status Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(report.statusBreakdown).map(([status, count]) => (
                        <div key={status} className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{count}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ReportCard({ title, value, color }) {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        indigo: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
        yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    }

    return (
        <div className={`${colorClasses[color]} border rounded-lg p-6`}>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    )
}