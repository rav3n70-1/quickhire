import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            console.error(err);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#202430' }}>Create Admin Account</h2>

            {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-sm text-center font-medium">
                    Account created successfully! Redirecting to login...
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={success}
                />
                <Input
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={success}
                />

                <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={loading || success}>
                        {loading ? 'Creating...' : 'Sign Up'}
                    </Button>
                </div>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: '#515B6F' }}>
                Already have an account? <a href="/login" style={{ color: '#4640DE', fontWeight: '500' }}>Login here</a>
            </p>
        </div>
    );
};

export default SignupPage;
