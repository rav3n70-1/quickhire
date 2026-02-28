const testJobs = async () => {
    try {
        let authRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testagent@quickhire.local',
                password: 'password123'
            })
        });
        let authResult = await authRes.json();
        const token = authResult.token;
        console.log('LOGIN TOKEN:', token ? 'Success' : 'Failed', authResult);

        if (token) {
            let res = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: 'Test Job 1',
                    company: 'AgentCorp',
                    location: 'Remote',
                    category: 'Engineering',
                    description: 'Testing the API'
                })
            });

            // To see the 500 error if it is HTML or JSON
            const textResponse = await res.text();
            console.log('JOB POST STATUS:', res.status);
            console.log('JOB POST RESPONSE:', textResponse);
        }
    } catch (e) {
        console.log('FETCH ERROR:', e);
    }
};

testJobs();
