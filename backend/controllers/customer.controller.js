// controllers/customer.controller.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BOOKINGS_FILE = path.join(__dirname, '..', 'storage', 'bookings.json');

async function readBookings() {
    try {
        const data = await fs.readFile(BOOKINGS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return { bookings: [] };
    }
}

export async function getBookingRecord(req, res) {
    try {
        const { userId } = req.params;

        console.log("=== Customer Booking Request ===");
        console.log("Requested userId:", userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // Read all bookings
        const data = await readBookings();
        const allBookings = data.bookings || [];

        console.log("Total bookings in database:", allBookings.length);
        console.log("All bookings:", JSON.stringify(allBookings, null, 2));

        // Filter bookings for this specific user
        const userBookings = allBookings.filter(booking => {
            const matches = booking.customerId === userId || booking.userId === userId;
            console.log(`Booking ${booking.id}: customerId="${booking.customerId}", userId="${booking.userId}", matches=${matches}`);
            return matches;
        });

        console.log("Filtered bookings for user:", userBookings.length);
        console.log("User bookings:", JSON.stringify(userBookings, null, 2));

        return res.status(200).json({
            success: true,
            bookings: userBookings,
            total: userBookings.length
        });

    } catch (error) {
        console.error("Error fetching booking records:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch booking records",
            error: error.message
        });
    }
}