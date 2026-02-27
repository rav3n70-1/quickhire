export const Badge = ({ children, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-blue-50 text-primary-blue border border-primary-light',
        secondary: 'bg-green-50 text-green-700 border border-green-200',
        outline: 'bg-white text-light border border-gray-200'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};
