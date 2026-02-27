import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { Button } from '../components/Button';

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (location) params.append('location', location);
            if (category) params.append('category', category);

            const url = `${import.meta.env.VITE_API_URL}/jobs${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setJobs(result.data);
            } else {
                throw new Error(result.error || 'Failed to fetch jobs');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-dark mb-4">
                    Find your <span className="text-primary-blue">dream job</span> today
                </h1>
                <p className="text-light max-w-2xl mx-auto mb-8 text-lg">
                    Discover thousands of job opportunities with all the information you need. Its your future. Come find it.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-2 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Job title or keyword"
                            className="w-full focus:outline-none py-2 text-dark bg-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="hidden md:block w-px bg-gray-200 my-2"></div>
                    <div className="flex-1 flex items-center px-4">
                        <MapPin className="text-gray-400 w-5 h-5 mr-3" />
                        <select
                            className="w-full focus:outline-none py-2 text-dark bg-transparent"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Any Location</option>
                            <option value="Remote">Remote</option>
                            <option value="New York">New York</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="London">London</option>
                        </select>
                    </div>
                    <div className="hidden md:block w-px bg-gray-200 my-2"></div>
                    <div className="flex-1 flex items-center px-4">
                        <Briefcase className="text-gray-400 w-5 h-5 mr-3" />
                        <select
                            className="w-full focus:outline-none py-2 text-dark bg-transparent"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Any Category</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <Button type="submit" className="md:ml-2 py-3 px-8">
                        Search Jobs
                    </Button>
                </form>
            </div>

            {/* Main Content */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark">
                        Latest <span className="text-primary-blue">Jobs</span>
                    </h2>
                    <span className="text-light">{jobs.length} jobs found</span>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                                <div className="flex gap-2 mb-4">
                                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                                </div>
                                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mt-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-dark mb-2">No jobs found</h3>
                        <p className="text-light mb-4">Try adjusting your filters or search terms.</p>
                        <Button variant="secondary" onClick={() => {
                            setSearch(''); setLocation(''); setCategory(''); fetchJobs();
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
