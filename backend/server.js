import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from './routes/customer.routes.js';
import bookingRoutes from './routes/booking.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customer/record", customerRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});