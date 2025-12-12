import bcrypt from "bcryptjs";
import { readUsers, writeUsers } from "../utils/fileStorage.js";

export async function getAllUsers(req, res) {
    try {
        const data = readUsers(); 
        const usersWithoutPasswords = data.users.map(({ password, ...user }) => user);
        
        return res.status(200).json({
            success: true,
            users: usersWithoutPasswords
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
}

export async function signup(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
        return res.status(400).json({ message: "All fields required" });

    const allowedRoles = ["customer", "admin", "staff"];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const data = readUsers();

    const exists = data.users.find((u) => u.email === email);
    if (exists)
        return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
        id: "u_" + Date.now(),
        name,
        email,
        password: hashed,
        role, 
        createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    writeUsers(data);

    return res.status(201).json({ message: "User created successfully" });
}

export async function login(req, res) {
    const { email, password } = req.body;

    const data = readUsers();
    const found = data.users.find((u) => u.email === email);

    if (!found)
        return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, found.password);
    if (!valid)
        return res.status(401).json({ message: "Invalid password" });

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role
        }
    });
}

export async function logout(req, res) {
    return res.status(200).json({ message: "Logged out successfully" });
}