const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            {/* Header */}
            <header style={{ borderBottom: '1px solid #D6DDEB', backgroundColor: '#FFFFFF' }} className="sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2">
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4640DE, #26A4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
                                Q
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '20px', color: '#202430' }}>QuickHire</span>
                        </a>

                        {/* Nav */}
                        <nav className="flex items-center gap-8">
                            <a href="/" style={{ color: '#515B6F', fontWeight: '500', fontSize: '15px', textDecoration: 'none' }}>Find Jobs</a>
                            <a href="/admin" style={{ color: '#515B6F', fontWeight: '500', fontSize: '15px', textDecoration: 'none' }}>Post a Job</a>
                        </nav>

                        {/* CTA */}
                        <div className="flex items-center gap-4">
                            <a href="/admin" style={{ color: '#4640DE', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>Login</a>
                            <a href="/admin" style={{ backgroundColor: '#4640DE', color: '#FFFFFF', padding: '10px 20px', borderRadius: '4px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'inline-block' }}>Sign Up</a>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: '48px' }}>
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4640DE, #26A4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
                                    Q
                                </div>
                                <span style={{ fontWeight: '700', fontSize: '20px' }}>QuickHire</span>
                            </div>
                            <p style={{ color: '#9199A3', fontSize: '14px', lineHeight: '1.7', maxWidth: '260px' }}>
                                Great platform for the job seeker that passionate about startups. Find your dream job easier.
                            </p>
                        </div>

                        {/* About */}
                        <div>
                            <h4 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '20px' }}>About</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                                    <li key={item}><a href="#" style={{ color: '#9199A3', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '20px' }}>Resources</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                                    <li key={item}><a href="#" style={{ color: '#9199A3', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
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

                    <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #343A47', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: '#9199A3', fontSize: '14px' }}>© {new Date().getFullYear()} QuickHire. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
