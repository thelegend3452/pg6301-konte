import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/user', (req, res) => {
    res.json(req.user || null);
});

router.post('/logout', (req, res) => {
    req.logout(() => {
        res.sendStatus(200);
    });
});

export default router;