import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        db = client.db();
        return db;
    } catch (error) {
        process.exit(1);
    }
}

export function getDB() {
    return db;
}