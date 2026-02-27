import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import { Badge } from './Badge';

const JobCard = ({ job }) => {
    return (
        <Link to={`/jobs/${job.id}`} className="block">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-dark mb-1">{job.title}</h3>
                        <p className="text-light">{job.company}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="primary">{job.category}</Badge>
                    <div className="flex items-center text-sm text-light bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-sm text-light bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                        <Briefcase className="w-3.5 h-3.5 mr-1" />
                        Full-time
                    </div>
                </div>

                <p className="text-light text-sm line-clamp-2 mb-4">
                    {job.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                        {new Date(job.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                    <span className="text-primary-blue text-sm font-medium hover:underline">
                        View Details &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
