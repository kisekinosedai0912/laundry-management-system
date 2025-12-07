const STORAGE_KEY = "laundry_bookings"
const ENCRYPTION_KEY = "laundry-secure-2024"

function encrypt(data) {
    return btoa(JSON.stringify(data))
}

function decrypt(encrypted) {
    try {
        return JSON.parse(atob(encrypted))
    } catch {
        return null
    }
}

export function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, encrypt([]))
    }
}

export function getBookings() {
    initializeStorage()
    const encrypted = localStorage.getItem(STORAGE_KEY)
    const bookings = decrypt(encrypted)
    return bookings || []
}

export function addBooking(booking) {
    const bookings = getBookings()
    bookings.push(booking)
    localStorage.setItem(STORAGE_KEY, encrypt(bookings))
}

export function updateBookingStatus(bookingId, newStatus) {
    const bookings = getBookings()
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
        booking.status = newStatus
        localStorage.setItem(STORAGE_KEY, encrypt(bookings))
    }
}

export function deleteBooking(bookingId) {
    const bookings = getBookings()
    const filtered = bookings.filter((b) => b.id !== bookingId)
    localStorage.setItem(STORAGE_KEY, encrypt(filtered))
}