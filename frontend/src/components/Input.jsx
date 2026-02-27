import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-dark mb-1">
                    {label}
                </label>
            )}
            {props.type === 'textarea' ? (
                <textarea
                    ref={ref}
                    className={`block w-full rounded-md border text-dark placeholder-light focus:ring-primary-blue focus:border-primary-blue sm:text-sm p-3
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
                    {...props}
                />
            ) : (
                <input
                    ref={ref}
                    className={`block w-full rounded-md border text-dark placeholder-light focus:ring-primary-blue focus:border-primary-blue sm:text-sm p-3
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
                    {...props}
                />
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
