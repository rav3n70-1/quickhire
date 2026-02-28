import express from 'express';
import supabase from '../supabase.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true // Auto-confirm email
        });

        if (error) {
            console.error("SignUp Error:", error);
            return res.status(400).json({ success: false, error: error.message });
        }

        res.status(201).json({ success: true, message: 'User created successfully', user: data.user });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Login Error:", error);
            return res.status(401).json({ success: false, error: error.message });
        }

        res.json({
            success: true,
            message: 'Login successful',
            token: data.session.access_token,
            user: data.user
        });
    } catch (error) {
        next(error);
    }
});

export default router;
