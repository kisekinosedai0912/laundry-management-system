import express from "express";
import {
    getAllBookings,
    createBooking,
    updateBookingStatus,
    deleteBooking
} from "../controllers/bookings.controller.js";

const router = express.Router();

router.get("/", getAllBookings);
router.post("/", createBooking);
router.patch("/:bookingId/status", updateBookingStatus);
router.delete("/:bookingId", deleteBooking);

export default router;