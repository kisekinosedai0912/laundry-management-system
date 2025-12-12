// controllers/bookings.controller.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Point to backend/storage/bookings.json
const BOOKINGS_FILE = path.join(__dirname, '..', 'storage', 'bookings.json');

export async function readBookings() {
    try {
        const data = await fs.readFile(BOOKINGS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it with empty array
        await fs.mkdir(path.dirname(BOOKINGS_FILE), { recursive: true });
        await fs.writeFile(BOOKINGS_FILE, JSON.stringify({ bookings: [] }, null, 2));
        return { bookings: [] };
    }
}

async function writeBookings(data) {
    await fs.mkdir(path.dirname(BOOKINGS_FILE), { recursive: true });
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(data, null, 2));
}

// Get all bookings
export async function getAllBookings(req, res) {
    try {
        const data = await readBookings();
        return res.status(200).json({
            success: true,
            bookings: data.bookings || []
        });
    } catch (error) {
        console.error("Error getting bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
}

// Create new booking
export async function createBooking(req, res) {
    try {
        const bookingData = req.body;
        
        // Validate required fields
        if (!bookingData.service || !bookingData.date) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: service, date"
            });
        }

        // Generate unique ID
        const bookingId = `b_${Date.now()}`;
        
        const newBooking = {
            id: bookingId,
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: bookingData.status || "Pending"
        };

        // Read existing bookings
        const data = await readBookings();
        data.bookings.push(newBooking);

        // Write back to file
        await writeBookings(data);

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
}

// Update booking status
export async function updateBookingStatus(req, res) {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const data = await readBookings();
        const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Update status
        data.bookings[bookingIndex].status = status;
        data.bookings[bookingIndex].updatedAt = new Date().toISOString();

        await writeBookings(data);

        return res.status(200).json({
            success: true,
            message: "Booking status updated",
            booking: data.bookings[bookingIndex]
        });
    } catch (error) {
        console.error("Error updating booking status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update booking status",
            error: error.message
        });
    }
}

// Delete booking
export async function deleteBooking(req, res) {
    try {
        const { bookingId } = req.params;

        const data = await readBookings();
        const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Remove booking
        const deletedBooking = data.bookings.splice(bookingIndex, 1)[0];
        await writeBookings(data);

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            booking: deletedBooking
        });
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: error.message
        });
    }
}