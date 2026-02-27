import express from 'express';
import supabase from '../supabase.js';

const router = express.Router();

// GET /api/jobs
router.get('/', async (req, res, next) => {
    try {
        const { location, category, search } = req.query;

        let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }
        if (location) {
            query = query.ilike('location', `%${location}%`);
        }
        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error("GET /api/jobs error: ", error);
        next(error);
    }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, error: 'Job not found' });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

// POST /api/jobs
router.post('/', async (req, res, next) => {
    try {
        const { title, company, location, category, description } = req.body;

        if (!title || !company || !location || !category || !description) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const { data, error } = await supabase.from('jobs').insert([
            { title, company, location, category, description }
        ]).select().single();

        if (error) throw error;

        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/jobs/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('jobs').delete().eq('id', id);

        if (error) throw error;

        res.json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;
