const testSignup = async () => {
    try {
        let res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testagent@quickhire.local',
                password: 'password123'
            })
        });
        let result = await res.json();
        console.log('SIGNUP STATUS:', res.status, result);
    } catch (e) {
        console.log('FETCH ERROR:', e);
    }
};

testSignup();
