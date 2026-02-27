import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';

const ApplyForm = ({ jobId }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', resume_link: '', cover_note: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

        if (!formData.resume_link) newErrors.resume_link = 'Resume link is required';
        else {
            try { new URL(formData.resume_link); }
            catch { newErrors.resume_link = 'Invalid URL'; }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, job_id: jobId })
            });
            const data = await res.json();

            if (data.success) {
                setSuccess(true);
            } else {
                setErrors({ submit: data.error });
            }
        } catch (err) {
            console.error(err);
            setErrors({ submit: 'Failed to submit application' });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 rounded-lg p-8 text-center border border-green-200">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Application Submitted!</h3>
                <p className="text-light">Your application has been successfully sent to the employer.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-dark mb-6">Apply for this position</h3>
            {errors.submit && <div className="text-red-600 bg-red-50 p-3 rounded mb-4">{errors.submit}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
                <Input label="Email Address *" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
                <Input label="Resume Link (URL) *" type="url" placeholder="https://..." value={formData.resume_link} onChange={(e) => setFormData({ ...formData, resume_link: e.target.value })} error={errors.resume_link} />
                <Input label="Cover Note (Optional)" type="textarea" rows="4" value={formData.cover_note} onChange={(e) => setFormData({ ...formData, cover_note: e.target.value })} />
                <Button type="submit" className="w-full py-3" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
            </form>
        </div>
    );
};

const JobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setJob(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setError(err.message || 'Error fetching job');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) {
        return <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-8"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded mt-8"></div>
        </div>;
    }

    if (error || !job) {
        return <div className="text-center py-20 text-red-600">{error || 'Job not found'}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center text-light hover:text-primary-blue mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to jobs
            </button>

            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-dark mb-2">{job.title}</h1>
                        <p className="text-xl text-primary-light font-medium">{job.company}</p>
                    </div>
                    <Button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                        Apply Now
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
                    <Badge variant="primary">{job.category}</Badge>
                    <div className="flex items-center text-light">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" /> {job.location}
                    </div>
                    <div className="flex items-center text-light">
                        <Briefcase className="w-5 h-5 mr-2 text-gray-400" /> Full-time
                    </div>
                    <div className="flex items-center text-light">
                        <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                        Posted on {new Date(job.created_at).toLocaleDateString()}
                    </div>
                </div>

                <div className="prose max-w-none text-dark">
                    <h3 className="text-xl font-bold mb-4">Job Description</h3>
                    <div className="whitespace-pre-wrap text-light leading-relaxed">
                        {job.description}
                    </div>
                </div>
            </div>

            <div id="apply-section">
                <ApplyForm jobId={job.id} />
            </div>
        </div>
    );
};

export default JobDetailsPage;
