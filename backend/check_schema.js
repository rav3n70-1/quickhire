import supabase from './supabase.js';

const getColumns = async () => {
    try {
        // Query the first job to see its fields
        const { data, error } = await supabase.from('jobs').select('*').limit(1);
        if (error) console.error('Error fetching:', error);
        console.log('Columns in jobs table:', data ? Object.keys(data[0]) : 'no data');
    } catch (e) {
        console.error('Exception:', e);
    }
};

getColumns();
