import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    // Generate a color for the company logo placeholder
    const colors = ['#4640DE', '#26A4FF', '#FF6B6B', '#FFB700', '#22C55E', '#8B5CF6'];
    const colorIndex = job.title ? job.title.charCodeAt(0) % colors.length : 0;
    const bgColor = colors[colorIndex];

    const initials = (job.company || 'Q').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const categoryColors = {
        'Engineering': { bg: '#EBFDF3', text: '#22C55E', border: '#ABEFC6' },
        'Design': { bg: '#EFF1FF', text: '#4640DE', border: '#B5B8FF' },
        'Marketing': { bg: '#FFF4E5', text: '#FFB700', border: '#FFD977' },
        'Sales': { bg: '#FFF0ED', text: '#FF6B6B', border: '#FFC0B4' },
        'Finance': { bg: '#F0F8FF', text: '#26A4FF', border: '#93D5FF' },
    };
    const catStyle = categoryColors[job.category] || { bg: '#EFF1FF', text: '#4640DE', border: '#B5B8FF' };

    return (
        <Link to={`/jobs/${job.id}`} className="block no-underline">
            <div
                className="bg-white border border-[#D6DDEB] rounded-lg p-6 transition-all duration-200 ease-in-out cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-[#4640DE] hover:-translate-y-[2px]"
            >
                {/* Top Row: Logo + "Full Time" badge */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 border border-[#EEEEEE]"
                        style={{ backgroundColor: bgColor }}
                    >
                        {initials}
                    </div>
                    <span className="border border-[#4640DE] text-[#4640DE] px-3 py-1 rounded text-[13px] font-semibold">
                        Full Time
                    </span>
                </div>

                {/* Job Title + Company */}
                <h3 className="text-lg font-bold text-[#25324B] mb-2 mt-0">{job.title}</h3>
                <p className="text-[#515B6F] text-sm mb-4 mt-0">
                    {job.company} &bull; {job.location}
                </p>

                {/* Divider */}
                <div className="border-t border-[#D6DDEB] mb-4" />

                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
                    <span className="bg-[#EBFDF3] text-[#22C55E] border border-[#ABEFC6] px-3 py-1 rounded text-[13px] font-medium">
                        Full-Time
                    </span>
                    <span
                        className="px-3 py-1 rounded text-[13px] font-medium"
                        style={{
                            backgroundColor: catStyle.bg, color: catStyle.text, border: `1px solid ${catStyle.border}`
                        }}
                    >
                        {job.category}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
