import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateEvent() {
    const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '', category: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '20px auto', gap: '10px' }}>
            <h1>Create New Event</h1>
            <input placeholder="Title" required onChange={e => setFormData({...formData, title: e.target.value})} />
            <input type="datetime-local" required onChange={e => setFormData({...formData, date: e.target.value})} />
            <input placeholder="Location" required onChange={e => setFormData({...formData, location: e.target.value})} />
            <select required onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Select Category</option>
                <option value="Concert">Concert</option>
                <option value="Theater">Theater</option>
                <option value="Sports">Sports</option>
            </select>
            <textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
            <button type="submit">Publish Event</button>
        </form>
    );
}