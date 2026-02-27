import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold text-lg">
                                    Q
                                </div>
                                <span className="font-bold text-xl text-dark">QuickHire</span>
                            </Link>
                        </div>

                        {/* Nav */}
                        <nav className="flex space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/' || location.pathname.startsWith('/jobs')
                                        ? 'border-primary-blue text-primary-blue'
                                        : 'border-transparent text-light hover:text-dark hover:border-gray-300'
                                    }`}
                            >
                                Jobs
                            </Link>
                            <Link
                                to="/admin"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/admin'
                                        ? 'border-primary-blue text-primary-blue'
                                        : 'border-transparent text-light hover:text-dark hover:border-gray-300'
                                    }`}
                            >
                                Admin
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-light text-sm">
                    &copy; {new Date().getFullYear()} QuickHire. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
