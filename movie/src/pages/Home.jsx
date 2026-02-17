import React, { useEffect, useState } from 'react';

export function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Upcoming Events</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {events.map(event => (
                    <div key={event._id} style={{ border: '1px solid #ccc', padding: '20px' }}>
                        <h3>{event.title}</h3>
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}