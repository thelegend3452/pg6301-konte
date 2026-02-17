import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { ObjectId } from 'mongodb';

// 1. Define the mock data using vi.hoisted to ensure it exists before imports
const mocks = vi.hoisted(() => {
    const mockCollection = {
        find: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        project: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue([{ title: "Test Event", _id: '123' }]),
        insertOne: vi.fn().mockResolvedValue({ insertedId: 'new_id_123' }),
        deleteOne: vi.fn().mockResolvedValue({ deletedCount: 1 }),
        findOne: vi.fn().mockResolvedValue({ title: "Test Event" })
    };

    return {
        getDB: vi.fn(() => ({
            collection: vi.fn(() => mockCollection)
        })),
        connectDB: vi.fn().mockResolvedValue(true)
    };
});

vi.mock('../database.js', () => {
    return {
        getDB: mocks.getDB,
        connectDB: mocks.connectDB
    };
});
import eventRoutes from '../routes/event.js';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.user = { id: '123', displayName: 'Test User' };
    next();
});

app.use('/api/events', eventRoutes);

describe('Backend API Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('GET /api/events should return events', async () => {
        const res = await request(app).get('/api/events');

        if (res.status !== 200) console.error("GET Error:", res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body[0].title).toBe('Test Event');
    });

    it('POST /api/events should create an event', async () => {
        const newEvent = {
            title: 'New Event',
            date: '2026-05-01',
            location: 'Oslo',
            description: 'Fun time',
            category: 'Concert'
        };

        const res = await request(app).post('/api/events').send(newEvent);
        if (res.status !== 201) console.error("POST Error:", res.body);

        expect(res.statusCode).toBe(201);
    });

    it('DELETE /api/events/:id should delete event', async () => {
        const fakeId = new ObjectId().toString();
        const res = await request(app).delete(`/api/events/${fakeId}`);
        expect(res.statusCode).toBe(200);
    });
});