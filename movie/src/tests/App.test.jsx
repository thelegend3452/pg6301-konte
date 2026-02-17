import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Home} from "../pages/Home.jsx";
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { _id: '1', title: 'Mock Event', date: '2026-01-01', location: 'Oslo', category: 'Music' }
        ]),
    })
);

describe('Frontend Tests', () => {
    it('renders Home and fetches events', async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Mock Event')).toBeInTheDocument();
        });
    });
});