import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const testServiceRole = async () => {
    try {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_KEY;
        const supabase = createClient(url, key);

        // Let's test if a vanilla service role can insert
        const { data, error } = await supabase.from('jobs').insert({
            title: 'Direct SR Insert',
            company: 'Test',
            location: 'Remote',
            category: 'Engineering',
            description: 'test'
        }).select();

        console.log('Vanilla SR Insert:', error ? error.message : 'Success');

        // Now let's auth as the user and see if it pollutes the client
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'testagent@quickhire.local', password: 'password123' })
        });
        const loginToken = (await loginRes.json()).token;

        if (loginToken) {
            console.log('Got token');
            // This is what the middleware does
            const { data: { user }, error: authErr } = await supabase.auth.getUser(loginToken);
            console.log('GetUser result:', user?.id);

            // Now let's try to insert again with the same client
            const { data: d2, error: e2 } = await supabase.from('jobs').insert({
                title: 'Post-GetUser SR Insert',
                company: 'Test2',
                location: 'Remote',
                category: 'Engineering',
                description: 'test2'
            }).select();

            console.log('Post-GetUser Insert:', e2 ? e2.message : 'Success');
        }
    } catch (e) {
        console.error(e);
    }
}
testServiceRole();
