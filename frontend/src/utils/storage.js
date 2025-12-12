// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://laundry-management-system-32ft.onrender.com/api";

export async function initializeStorage() {
    return true;
}

export async function getBookings() {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        const data = await response.json();
        return data.bookings || [];
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }
}

export async function addBooking(booking) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error;
    }
}

export async function updateBookingStatus(bookingId, newStatus) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating booking status:", error);
        throw error;
    }
}

export async function deleteBooking(bookingId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
}

// Get bookings for a specific customer
export async function getCustomerBookings(customerId) {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/record/${customerId}`);
        const data = await response.json();
        return data.bookings || [];
    } catch (error) {
        console.error("Error fetching customer bookings:", error);
        return [];
    }
}