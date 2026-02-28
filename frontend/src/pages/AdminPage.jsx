import { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

// --- Toast Notification Component ---
const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: { bg: '#ECFDF5', border: '#6EE7B7', text: '#065F46', Icon: CheckCircle, iconColor: '#10B981' },
        error: { bg: '#FFF1F2', border: '#FCA5A5', text: '#991B1B', Icon: XCircle, iconColor: '#EF4444' },
    };
    const { bg, border, text, Icon, iconColor } = styles[type];

    return (
        <div style={{
            position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
            display: 'flex', alignItems: 'center', gap: '12px',
            backgroundColor: bg, border: `1px solid ${border}`, color: text,
            borderRadius: '8px', padding: '14px 18px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            minWidth: '300px', maxWidth: '420px',
            animation: 'slideIn 0.3s ease',
        }}>
            <Icon style={{ color: iconColor, flexShrink: 0 }} size={20} />
            <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{message}</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: text, opacity: 0.6, padding: '2px' }}>
                <X size={16} />
            </button>
        </div>
    );
};

const AdminPage = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appsLoading, setAppsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
    const [formData, setFormData] = useState({
        title: '', company: '', location: '', category: '', description: ''
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
            const data = await res.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            const data = await res.json();
            if (data.success) {
                setApplications(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setAppsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        if (deletingId) return;
        if (!window.confirm('Are you sure you want to delete this job listing?')) return;

        setDeletingId(id);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }
            const data = await res.json();
            if (data.success) {
                setJobs(jobs.filter(job => job.id !== id));
                showToast('Job listing deleted successfully.');
            } else {
                showToast(data.error || 'Failed to delete job.', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Network error. Failed to delete job.', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }
            const data = await res.json();

            if (data.success) {
                setJobs([data.data, ...jobs]);
                setIsAdding(false);
                setFormData({ title: '', company: '', location: '', category: '', description: '' });
                showToast('New job listing published successfully!');
            } else {
                showToast(data.error || 'Failed to post job.', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Network error. Failed to post job.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: '#202430' }}>Admin Dashboard</h1>
                    <p style={{ color: '#515B6F', marginTop: '4px', fontSize: '15px' }}>
                        Manage your job listings and applications
                    </p>
                </div>
                {activeTab === 'jobs' && (
                    <Button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        {isAdding ? 'Cancel' : 'Post New Job'}
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`pb-4 px-6 text-sm font-medium transition-colors ${activeTab === 'jobs'
                            ? 'border-b-2 border-primary-blue text-primary-blue'
                            : 'text-light hover:text-dark border-b-2 border-transparent'
                        }`}
                >
                    Job Listings
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`pb-4 px-6 text-sm font-medium transition-colors ${activeTab === 'applications'
                            ? 'border-b-2 border-primary-blue text-primary-blue'
                            : 'text-light hover:text-dark border-b-2 border-transparent'
                        }`}
                >
                    Applications
                </button>
            </div>

            {isAdding && activeTab === 'jobs' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#25324B' }}>Post a New Job</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Job Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            <Input label="Company Name" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                            <Input label="Location" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-dark mb-1">Category</label>
                                <select
                                    className="block w-full rounded-md border border-gray-300 text-dark focus:ring-primary-blue focus:border-primary-blue sm:text-sm p-3"
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Business">Business</option>
                                    <option value="Human Resource">Human Resource</option>
                                    <option value="Technology">Technology</option>
                                </select>
                            </div>
                        </div>
                        <Input label="Job Description" type="textarea" rows="6" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Publishing...' : 'Publish Job'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'jobs' ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Job Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Company</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Date Posted</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-light uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-light">Loading jobs...</td>
                                    </tr>
                                ) : jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center">
                                            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
                                            <p style={{ color: '#515B6F', fontWeight: '500' }}>No jobs posted yet.</p>
                                            <p style={{ color: '#7C8493', fontSize: '14px', marginTop: '4px' }}>Click &quot;Post New Job&quot; to add your first listing.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50" style={{ transition: 'background 0.15s' }}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium" style={{ color: '#25324B' }}>{job.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm" style={{ color: '#515B6F' }}>{job.company}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-primary-blue">
                                                    {job.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#515B6F' }}>
                                                {new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    disabled={deletingId === job.id}
                                                    className="text-red-500 hover:text-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    title="Delete Job"
                                                    aria-label={`Delete job: ${job.title}`}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {jobs.length > 0 && (
                        <div style={{ padding: '12px 24px', borderTop: '1px solid #F3F4F6', backgroundColor: '#F9FAFB' }}>
                            <p style={{ fontSize: '13px', color: '#7C8493' }}>
                                {jobs.length} {jobs.length === 1 ? 'listing' : 'listings'} total
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Candidate</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Job Applied For</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">Applied Date</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-light uppercase tracking-wider">Resume</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {appsLoading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-light">Loading applications...</td>
                                    </tr>
                                ) : applications.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center">
                                            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
                                            <p style={{ color: '#515B6F', fontWeight: '500' }}>No applications received yet.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50" style={{ transition: 'background 0.15s' }}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium" style={{ color: '#25324B' }}>{app.name}</div>
                                                {app.cover_note && (
                                                    <div className="text-xs text-light mt-1 max-w-xs truncate" title={app.cover_note}>
                                                        {app.cover_note}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium" style={{ color: '#202430' }}>{app.jobs?.title || 'Unknown Job'}</div>
                                                <div className="text-xs text-light">{app.jobs?.company || ''}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href={`mailto:${app.email}`} className="text-sm text-primary-blue hover:underline">
                                                    {app.email}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#515B6F' }}>
                                                {new Date(app.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a
                                                    href={app.resume_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-primary-blue hover:text-primary-dark transition-colors"
                                                >
                                                    View Resume
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {applications.length > 0 && (
                        <div style={{ padding: '12px 24px', borderTop: '1px solid #F3F4F6', backgroundColor: '#F9FAFB' }}>
                            <p style={{ fontSize: '13px', color: '#7C8493' }}>
                                {applications.length} {applications.length === 1 ? 'application' : 'applications'} total
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
