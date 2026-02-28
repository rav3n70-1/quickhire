import supabase from './supabase.js';

const getPolicies = async () => {
    try {
        const { data, error } = await supabase.rpc('get_policies_for_table', { table_name: 'jobs' });
        if (error) {
            // If RPC doesn't exist, we can't query pg_policies directly via anon/service API easily
            console.error('RPC Error (might not exist):', error);
        } else {
            console.log('Policies:', data);
        }
    } catch (e) {
        console.error('Exception:', e);
    }
};

getPolicies();
