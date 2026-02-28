import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import PersonImg from '../assets/person.png';
import PatternImg from '../assets/Pattern.png';
import UnderlineImg from '../assets/underline.png';
import VodafoneLogo from '../assets/vodafone.png';
import IntelLogo from '../assets/intel.png';
import TeslaLogo from '../assets/tesla.png';
import AmdLogo from '../assets/amd.png';
import TalkitLogo from '../assets/talkit.png';



const CATEGORIES = [
    { name: 'Design', icon: '🎨', count: '235 jobs available' },
    { name: 'Sales', icon: '📈', count: '756 jobs available' },
    { name: 'Marketing', icon: '📣', count: '140 jobs available' },
    { name: 'Finance', icon: '💰', count: '325 jobs available' },
    { name: 'Technology', icon: '💻', count: '436 jobs available' },
    { name: 'Engineering', icon: '</>', count: '542 jobs available' },
    { name: 'Business', icon: '💼', count: '211 jobs available' },
    { name: 'Human Resource', icon: '👥', count: '346 jobs available' },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const fetchJobs = async (customCategory = category) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (location) params.append('location', location);
            if (customCategory) params.append('category', customCategory);

            const url = `${API_BASE_URL}/jobs${params.toString() ? `?${params.toString()}` : ''}`;
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
        <div>
            {/* Hero Section */}
            <div style={{
                backgroundColor: '#F8F8FD',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '20px',
                paddingBottom: '80px'
            }}>
                {/* Geometric decorations */}
                <div style={{
                    position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
                    background: 'linear-gradient(135deg, transparent 30%, #E9E8FF 100%)',
                    zIndex: 0
                }} />
                <div style={{
                    position: 'absolute', top: '20px', right: '20px', width: '400px', height: '400px',
                    border: '2px solid #CCCCF5', borderRadius: '4px',
                    opacity: 0.5, transform: 'rotate(-15deg)',
                    zIndex: 0
                }} />

                <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left text */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#202430] leading-tight mb-5 mt-4 lg:mt-0">
                                Discover more than{' '}
                                <span style={{ color: '#26A4FF', position: 'relative', display: 'inline-block', zIndex: 1 }}>
                                    5000+ Jobs
                                    <img src={UnderlineImg} alt="" style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: 'auto' }} />
                                </span>
                            </h1>
                            <p className="text-base text-[#515B6F] mb-8 leading-relaxed max-w-[420px] mx-auto lg:mx-0">
                                Great platform for the job seeker that passionate about startups. Find your dream job easier.
                            </p>

                            {/* Stats Row */}
                            <div className="flex justify-center lg:justify-start gap-6 lg:gap-10">
                                {[{ n: '1.8K+', label: 'Live Job' }, { n: '800K+', label: 'Companies' }, { n: '2.8M', label: 'Candidates' }].map(stat => (
                                    <div key={stat.n}>
                                        <div className="text-2xl lg:text-3xl font-bold text-[#202430]">{stat.n}</div>
                                        <div className="text-sm text-[#515B6F]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right image placeholder */}
                        <div className="justify-center relative h-full items-end pt-10 hidden lg:flex">
                            {/* Vectors behind person */}
                            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={PatternImg} alt="Background abstract pattern" style={{ width: '96%', height: '96%', objectFit: 'contain', opacity: 0.8 }} />
                            </div>
                            <img src={PersonImg} alt="Person pointing to jobs" style={{ width: '104%', maxWidth: 'none', height: 'auto', minHeight: '416px', objectFit: 'contain', zIndex: 1, position: 'relative', transform: 'translateX(5%)' }} />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-8 lg:-mt-[110px] relative z-10 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row items-center p-4 lg:p-3 gap-4 lg:gap-0 max-w-full lg:max-w-[90%] mx-auto lg:mx-0 lg:ml-0">
                        <div className="flex-1 w-full flex items-center lg:px-4 gap-3 border-b lg:border-b-0 lg:border-r border-[#D6DDEB] pb-4 lg:pb-0">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#7C8493" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                className="flex-1 border-none outline-none text-[15px] text-[#25324B] bg-transparent w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 w-full flex items-center lg:px-4 gap-3 border-b lg:border-b-0 lg:border-r border-[#D6DDEB] pb-4 lg:pb-0">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#7C8493" strokeWidth="2">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                            </svg>
                            <select
                                className="flex-1 border-none outline-none text-[15px] text-[#25324B] bg-transparent cursor-pointer w-full"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Any Location</option>
                                <option value="Remote">Remote</option>
                                <option value="New York">New York</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="London">London</option>
                                <option value="Berlin">Berlin</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full flex items-center lg:px-4 gap-3 pb-4 lg:pb-0">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#7C8493" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                            </svg>
                            <select
                                className="flex-1 border-none outline-none text-[15px] text-[#25324B] bg-transparent cursor-pointer w-full"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Any Category</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#4640DE] text-white px-7 py-3 rounded-lg font-bold text-[15px] border-none cursor-pointer whitespace-nowrap lg:ml-3 w-full lg:w-auto text-center"
                        >
                            Search my job
                        </button>
                    </form>
                </div>
            </div>

            {/* Companies Section */}
            <div className="bg-white py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <p className="text-[#515B6F] text-base mb-8 text-center lg:text-left">
                        Companies we helped grow
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between items-center justify-items-center gap-8 lg:gap-0">
                        <img src={VodafoneLogo} alt="Vodafone" className="h-6 lg:h-7 object-contain opacity-80" />
                        <img src={IntelLogo} alt="Intel" className="h-6 lg:h-7 object-contain opacity-80" />
                        <img src={TeslaLogo} alt="Tesla" className="h-6 lg:h-7 object-contain opacity-80" />
                        <img src={AmdLogo} alt="AMD" className="h-7 lg:h-8 object-contain opacity-80" />
                        <img src={TalkitLogo} alt="Talkit" className="h-6 lg:h-7 object-contain opacity-80 col-span-2 md:col-span-1 lg:col-span-auto" />
                    </div>
                </div>
            </div>

            {/* Explore by Category */}
            <div style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <a href="#jobs" style={{ textDecoration: 'none' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#202430', margin: 0, cursor: 'pointer' }}>
                                Explore by{' '}
                                <span style={{ color: '#4640DE' }}>category</span>
                            </h2>
                        </a>
                        <a href="#jobs" style={{ color: '#4640DE', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Show all jobs <span>→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CATEGORIES.map((cat) => {
                            const isActive = category === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => { setCategory(cat.name); fetchJobs(cat.name); }}
                                    style={{
                                        backgroundColor: isActive ? '#4640DE' : '#FFFFFF',
                                        border: '1px solid #D6DDEB',
                                        borderRadius: '8px',
                                        padding: '28px 24px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '28px', marginBottom: '20px',
                                        color: isActive ? '#FFFFFF' : '#4640DE'
                                    }}>
                                        {cat.icon}
                                    </div>
                                    <div style={{
                                        fontWeight: '700', fontSize: '16px', marginBottom: '8px',
                                        color: isActive ? '#FFFFFF' : '#25324B'
                                    }}>
                                        {cat.name}
                                    </div>
                                    <div style={{
                                        fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
                                        color: isActive ? '#CCCCF5' : '#515B6F'
                                    }}>
                                        {cat.count} <span>→</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Featured Jobs */}
            <div id="jobs" style={{ padding: '80px 0', backgroundColor: '#F8F8FD' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#202430', margin: 0 }}>
                            Featured{' '}
                            <span style={{ color: '#4640DE' }}>jobs</span>
                        </h2>
                        <a href="#" style={{ color: '#4640DE', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Show all jobs <span>→</span>
                        </a>
                    </div>

                    {error && (
                        <div style={{ backgroundColor: '#FFF0F0', color: '#D32F2F', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} style={{ backgroundColor: '#FFF', border: '1px solid #D6DDEB', borderRadius: '8px', padding: '24px' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', backgroundColor: '#E8E8E8', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
                                    <div style={{ height: '20px', width: '60%', backgroundColor: '#E8E8E8', borderRadius: '4px', marginBottom: '8px' }} />
                                    <div style={{ height: '14px', width: '40%', backgroundColor: '#E8E8E8', borderRadius: '4px' }} />
                                </div>
                            ))}
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #D6DDEB' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#25324B', marginBottom: '8px' }}>No jobs found</h3>
                            <p style={{ color: '#515B6F', marginBottom: '24px' }}>Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => { setSearch(''); setLocation(''); setCategory(''); fetchJobs(); }}
                                style={{
                                    border: '2px solid #4640DE', color: '#4640DE',
                                    backgroundColor: 'transparent', padding: '10px 24px',
                                    borderRadius: '4px', fontWeight: '600', cursor: 'pointer'
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {jobs.length > 0 && (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <span style={{ color: '#515B6F', fontSize: '15px' }}>
                                Showing{' '}
                                <strong style={{ color: '#25324B' }}>{jobs.length} jobs</strong>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Banner */}
            <div className="pb-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#4640DE] rounded-[8px] p-10 lg:p-16 flex flex-col md:flex-row justify-between items-center relative overflow-hidden gap-8 text-center md:text-left">
                        {/* Geometric decoration */}
                        <div className="absolute -bottom-5 -left-5 w-[200px] h-[200px] bg-[#3730C9] rounded-[32px] opacity-60 flex-shrink-0" />
                        <div className="relative z-10">
                            <h2 className="text-white text-3xl md:text-[40px] font-extrabold mb-3 mt-0 leading-tight">
                                Start posting<br />jobs today
                            </h2>
                            <p className="text-[#CCCCF5] text-base m-0">Start posting jobs for only $10.</p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/signup'}
                            className="bg-white text-[#4640DE] px-8 py-4 rounded font-bold text-base border-none cursor-pointer relative z-10 shrink-0"
                        >
                            Sign Up For Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
