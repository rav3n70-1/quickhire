import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const AdminPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '', company: '', location: '', category: '', description: ''
    });

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

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                setJobs(jobs.filter(job => job.id !== id));
            }
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setJobs([data.data, ...jobs]);
                setIsAdding(false);
                setFormData({ title: '', company: '', location: '', category: '', description: '' });
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to add job');
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
                <Button onClick={() => setIsAdding(!isAdding)} className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    {isAdding ? 'Cancel' : 'Post New Job'}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
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
                                </select>
                            </div>
                        </div>
                        <Input label="Job Description" type="textarea" rows="6" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit">Publish Job</Button>
                        </div>
                    </form>
                </div>
            )}

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
                                    <td colSpan="5" className="px-6 py-4 text-center text-light">No jobs posted yet.</td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-dark">{job.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-light">{job.company}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-primary-blue">
                                                {job.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="text-red-600 hover:text-red-900 focus:outline-none"
                                                title="Delete Job"
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
            </div>
        </div>
    );
};

export default AdminPage;
