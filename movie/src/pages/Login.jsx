import React from 'react';

export function Login() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Login Required</h1>
            <a href="/api/auth/google">
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Log in with Google
                </button>
            </a>
        </div>
    );
}