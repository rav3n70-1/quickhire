import express from 'express';
import supabase from '../supabase.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

// GET /api/applications (Protected - Admin only)
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select(`
                id,
                name,
                email,
                resume_link,
                cover_note,
                created_at,
                job_id,
                jobs (
                    title,
                    company
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Fetch Applications Error:", error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        res.json({ success: true, count: data.length, data });
    } catch (error) {
        next(error);
    }
});

// POST /api/applications
router.post('/', async (req, res, next) => {
    try {
        const { job_id, name, email, resume_link, cover_note } = req.body;

        if (!job_id || !name || !email || !resume_link) {
            return res.status(400).json({ success: false, error: 'Job ID, name, email, and resume link are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email format' });
        }

        if (!isValidUrl(resume_link)) {
            return res.status(400).json({ success: false, error: 'Invalid resume URL format' });
        }

        const { data, error } = await supabase.from('applications').insert([
            { job_id, name, email, resume_link, cover_note }
        ]).select().single();

        if (error) {
            // Check for Supabase foreign key constraint violation (invalid job_id)
            if (error.code === '23503') {
                return res.status(400).json({ success: false, error: 'Invalid Job ID: Job does not exist.' });
            }
            throw error;
        }

        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

export default router;
