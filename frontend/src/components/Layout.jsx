import Logo from '../assets/Logo_copy.png';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#F8F8FD' }} className="sticky top-0 z-10 w-full">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Left Group: Logo + Nav */}
                        <div className="flex items-center gap-4 md:gap-10">
                            {/* Logo */}
                            <a href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                                <img src={Logo} alt="QuickHire Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                                <span style={{ fontWeight: '700', fontSize: '20px', color: '#202430' }}>QuickHire</span>
                            </a>

                            {/* Nav */}
                            <nav className="hidden md:flex items-center gap-8">
                                <a href="/" style={{ color: '#515B6F', fontWeight: '500', fontSize: '15px', textDecoration: 'none' }}>Find Jobs</a>
                                {/* TODO: Implement Browse Companies page */}
                                <a href="#" onClick={(e) => e.preventDefault()} aria-disabled="true" style={{ color: '#515B6F', fontWeight: '500', fontSize: '15px', textDecoration: 'none', cursor: 'not-allowed' }}>Browse Companies</a>
                            </nav>
                        </div>

                        {/* Right Group: CTA */}
                        <div className="hidden md:flex items-center gap-4">
                            {localStorage.getItem('token') ? (
                                <>
                                    <a href="/admin" style={{ color: '#4640DE', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>Admin Dashboard</a>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.href = '/login';
                                        }}
                                        style={{ backgroundColor: '#202430', color: '#FFFFFF', padding: '10px 20px', borderRadius: '4px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href="/login" style={{ color: '#4640DE', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>Login</a>
                                    <a href="/signup" style={{ backgroundColor: '#4640DE', color: '#FFFFFF', padding: '10px 20px', borderRadius: '4px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'inline-block' }}>Sign Up</a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#202430', color: '#FFFFFF', paddingTop: '56px', paddingBottom: '56px' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <img src={Logo} alt="QuickHire Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                                <span style={{ fontWeight: '700', fontSize: '20px' }}>QuickHire</span>
                            </div>
                            <p style={{ color: '#9199A3', fontSize: '14px', lineHeight: '1.7', maxWidth: '260px' }}>
                                Great platform for the job seeker that passionate about startups. Find your dream job easier.
                            </p>
                        </div>

                        {/* About */}
                        <div className="lg:col-span-1">
                            <h4 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '20px' }}>About</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                                    <li key={item}><a href="#" style={{ color: '#9199A3', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="lg:col-span-1">
                            <h4 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '20px' }}>Resources</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                                    <li key={item}><a href="#" style={{ color: '#9199A3', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="lg:col-span-2 md:col-span-2">
                            <h4 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>Get job notifications</h4>
                            <p style={{ color: '#9199A3', fontSize: '14px', marginBottom: '20px' }}>The latest job news, articles, sent to your inbox weekly.</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    style={{ flex: 1, backgroundColor: '#FFFFFF', border: '1px solid #D6DDEB', borderRadius: '4px', padding: '12px 16px', fontSize: '14px', color: '#202430' }}
                                />
                                <button style={{ backgroundColor: '#4640DE', color: '#FFFFFF', padding: '12px 20px', borderRadius: '4px', fontWeight: '600', fontSize: '14px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-700 text-center md:text-left gap-4">
                        <p style={{ color: '#9199A3', fontSize: '14px' }}>© {new Date().getFullYear()} QuickHire. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
