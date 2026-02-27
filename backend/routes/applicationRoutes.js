import express from 'express';
import supabase from '../supabase.js';

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

        if (error) throw error;

        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

export default router;
