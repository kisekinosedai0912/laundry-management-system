import express from "express";
import { signup, login, logout, getAllUsers } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;