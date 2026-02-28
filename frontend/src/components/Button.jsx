export const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    const variants = {
        primary: "border-transparent text-white bg-primary hover:bg-primary-dark focus:ring-primary",
        secondary: "border-gray-300 text-dark bg-white hover:bg-gray-50 focus:ring-primary",
        danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
