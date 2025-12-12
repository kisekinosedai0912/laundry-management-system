import express from "express";
import { getBookingRecord } from "../controllers/customer.controller.js";

const router = express.Router();

router.get('/:userId', getBookingRecord);

export default router;