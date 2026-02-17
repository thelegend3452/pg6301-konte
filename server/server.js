import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { connectDB } from './database.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use(express.static(path.resolve('dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});