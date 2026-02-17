import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { CreateEvent } from './pages/CreateEvent.jsx';

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checks if user is logged in on refresh (Learning Goal: Persistence)
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/auth/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (e) {
                // Not logged in
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <nav style={{ display: 'flex', gap: '20px', padding: '20px', background: '#eee' }}>
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/create">Create Event</Link>
                        <div style={{ marginLeft: 'auto' }}>
                            <span>{user.displayName}</span>
                            <button onClick={async () => {
                                await fetch('/api/auth/logout', { method: 'POST' });
                                window.location.reload();
                            }}>Logout</button>
                        </div>
                    </>
                ) : (
                    <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<CreateEvent />} />
            </Routes>
        </div>
    );
}