import express from 'express';
import { ObjectId } from 'mongodb';
import {getDB} from "../database.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const db = getDB();
    const events = await db.collection('events').find().toArray();
    res.json(events);
});

router.post('/', async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const db = getDB();
    const { title, date, location, description, category } = req.body;

    if (!title || !date || !location || !category) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const newEvent = {
        title, date, location, description, category,
        organizer: req.user.displayName,
        organizerId: req.user.id
    };

    const result = await db.collection('events').insertOne(newEvent);
    res.status(201).json({ ...newEvent, _id: result.insertedId });
});

router.delete('/:id', async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    const db = getDB();
    const result = await db.collection('events').deleteOne({
        _id: new ObjectId(req.params.id),
        organizerId: req.user.id
    });

    if (result.deletedCount === 0) return res.sendStatus(403);
    res.sendStatus(200);
});

export default router;