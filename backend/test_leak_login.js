import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const testLoginLeak = async () => {
    try {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_KEY;
        const supabase = createClient(url, key);

        // Login using the client
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'testagent@quickhire.local',
            password: 'password123'
        });

        console.log('Login result:', data.user?.id);

        // Now let's try to insert again with the same client
        const { data: d2, error: e2 } = await supabase.from('jobs').insert({
            title: 'Post-Login SR Insert',
            company: 'Test3',
            location: 'Remote',
            category: 'Engineering',
            description: 'test3'
        }).select();

        console.log('Post-Login Insert:', e2 ? e2.message : 'Success');
    } catch (e) {
        console.error(e);
    }
}
testLoginLeak();
