import fs from "fs";
import path from "path";

const dataPath = path.resolve("backend/storage/users.json");

export function readUsers() {
    try {
        const raw = fs.readFileSync(dataPath, "utf-8");
        return JSON.parse(raw);
    } catch (error) {
        console.error("Error reading users.json:", error);
        return { users: [] };
    }
}

export function writeUsers(data) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing users.json:", error);
    }
}