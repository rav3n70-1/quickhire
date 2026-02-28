import supabase from '../supabase.js';

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid token' });
        }

        const token = authHeader.split(' ')[1];

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error("Auth Middleware Error:", error?.message);
            return res.status(401).json({ success: false, error: 'Unauthorized: Token is expired or invalid' });
        }

        // Attach user to request for further use if needed
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Exception:", error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
