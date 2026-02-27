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
        <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6DDEB',
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#4640DE';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#D6DDEB';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                {/* Top Row: Logo + "Full Time" badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '8px', backgroundColor: bgColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '18px',
                        flexShrink: 0,
                        border: '1px solid #EEEEEE'
                    }}>
                        {initials}
                    </div>
                    <span style={{
                        border: '1px solid #4640DE', color: '#4640DE',
                        padding: '4px 12px', borderRadius: '4px',
                        fontSize: '13px', fontWeight: '600'
                    }}>
                        Full Time
                    </span>
                </div>

                {/* Job Title + Company */}
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#25324B', marginBottom: '8px', marginTop: 0 }}>{job.title}</h3>
                <p style={{ color: '#515B6F', fontSize: '14px', marginBottom: '16px', marginTop: 0 }}>
                    {job.company} &bull; {job.location}
                </p>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #D6DDEB', marginBottom: '16px' }} />

                {/* Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                        backgroundColor: '#EBFDF3', color: '#22C55E',
                        border: '1px solid #ABEFC6',
                        padding: '4px 12px', borderRadius: '4px',
                        fontSize: '13px', fontWeight: '500'
                    }}>
                        Full-Time
                    </span>
                    <span style={{
                        backgroundColor: catStyle.bg, color: catStyle.text,
                        border: `1px solid ${catStyle.border}`,
                        padding: '4px 12px', borderRadius: '4px',
                        fontSize: '13px', fontWeight: '500'
                    }}>
                        {job.category}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
