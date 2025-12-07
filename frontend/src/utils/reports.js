export function generateReport(bookings) {
    const report = {
        totalBookings: bookings.length,
        totalRevenue: 0,
        completedBookings: 0,
        pendingBookings: 0,
        serviceBreakdown: {
            wash: 0,
            dry: 0,
            fold: 0,
        },
        paymentBreakdown: {
            cash: 0,
            gcash: 0,
            paypal: 0,
            bank: 0,
        },
        statusBreakdown: {
            Pending: 0,
            Ongoing: 0,
            "For Pickup/Delivery": 0,
            Completed: 0,
        },
    }

    bookings.forEach((booking) => {
        report.totalRevenue += booking.fee || 0

        if (booking.status === "Completed") {
            report.completedBookings++
        }
        if (booking.status === "Pending") {
            report.pendingBookings++
        }

        report.serviceBreakdown[booking.serviceType] = (report.serviceBreakdown[booking.serviceType] || 0) + 1
        report.paymentBreakdown[booking.paymentMethod] = (report.paymentBreakdown[booking.paymentMethod] || 0) + 1
        report.statusBreakdown[booking.status] = (report.statusBreakdown[booking.status] || 0) + 1
    })

    return report
}

export function calculateAverageOrderValue(bookings) {
    if (bookings.length === 0) return 0
    const total = bookings.reduce((sum, b) => sum + (b.fee || 0), 0)
    return Number.parseFloat((total / bookings.length).toFixed(2))
}

export function getRevenueByService(bookings) {
    const revenue = {}
    bookings.forEach((booking) => {
        revenue[booking.serviceType] = (revenue[booking.serviceType] || 0) + (booking.fee || 0)
    })
    return revenue
}