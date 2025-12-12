import express from "express";
import cors from "cors";
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from './routes/customer.routes.js';
import bookingRoutes from './routes/booking.routes.js';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'https://laundry-management-system-32ft.onrender.com', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({ 
//         status: 'OK', 
//         message: 'LaundryPro API is running',
//         endpoints: {
//             health: '/health',
//             auth: '/api/auth',
//             bookings: '/api/bookings',
//             customerRecords: '/api/customer/record/:userId'
//         }
//     });
// });

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use("/api/auth", authRoutes);
app.use("/api/customer/record", customerRoutes);
app.use("/api/bookings", bookingRoutes);

// app.use((req, res) => {
//     res.status(404).json({ message: 'Route not found' });
// });

/*
** configuration for production
*/
const __dirname = path.resolve();

if (process.env?.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}
/** end of production configuration **/

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});