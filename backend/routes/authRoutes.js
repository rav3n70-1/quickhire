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

        // Create an ephemeral client just for login to prevent global state leaks
        const supabaseUrl = process.env.SUPABASE_URL || 'https://krycxtwsbannylojsrdo.supabase.co';
        const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Using env key securely server side

        // Make a direct REST call to get the token without mutating any client state
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok || !data.access_token) {
            console.error("Login Error:", data);
            return res.status(401).json({ success: false, error: data.error_description || data.msg || 'Login failed' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            token: data.access_token,
            user: data.user
        });
    } catch (error) {
        next(error);
    }
});

export default router;
