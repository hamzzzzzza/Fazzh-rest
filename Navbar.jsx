import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, LogIn, LogOut, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function Navbar() {
    const { view, setView, cart, settings, isLoggedIn, setIsLoggedIn } = useAppContext();
    const [scrolled, setScrolled] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (targetView) => {
        if (view === 'admin' && targetView === 'home') {
            setIsLoggedIn(false);
        }
        setView(targetView);
        setMobileMenuOpen(false);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div onClick={() => handleNavigation('home')} className="cursor-pointer group flex flex-col items-center">
                    <span className="text-2xl font-bold tracking-widest transition-colors duration-300 group-hover:text-accent" style={{ color: settings.colors.accent }}>
                        {settings.name}
                    </span>
                    <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-300" style={{ backgroundColor: settings.colors.accent }}></div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center font-medium uppercase tracking-widest text-sm">
                    {['home', 'menu', 'orders', 'about', 'contact', 'reviews'].map((v) => (
                        <button
                            key={v}
                            onClick={() => handleNavigation(v)}
                            className={`hover:text-accent transition-colors ${view === v ? 'text-accent border-b border-accent' : ''}`}
                            style={{ color: view === v ? settings.colors.accent : 'inherit', borderColor: settings.colors.accent }}
                        >
                            {v}
                        </button>
                    ))}
                    <button
                        onClick={() => isLoggedIn ? setView('admin') : setView('login')}
                        className={`p-2 rounded-full border transition-all ${isLoggedIn && view === 'admin' ? 'bg-accent text-black border-accent' : 'border-surface/20 hover:border-accent hover:text-accent'}`}
                        style={isLoggedIn && view === 'admin' ? { backgroundColor: settings.colors.accent, borderColor: settings.colors.accent } : {}}
                    >
                        {isLoggedIn ? <Lock size={18} /> : <LogIn size={18} />}
                    </button>
                    {isLoggedIn && (
                        <button
                            onClick={() => { setIsLoggedIn(false); setView('home'); }}
                            className="p-2 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setView('cart')} className="relative p-2 group">
                        <ShoppingBag className="group-hover:text-accent transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full" style={{ backgroundColor: settings.colors.accent }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <LogOut size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-surface/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 shadow-2xl">
                    {['home', 'menu', 'orders', 'about', 'contact', 'reviews'].map((v) => (
                        <button
                            key={v}
                            onClick={() => handleNavigation(v)}
                            className="text-left py-4 px-2 uppercase tracking-widest font-bold border-b border-surface/10 hover:text-accent transition-colors"
                            style={{ color: view === v ? settings.colors.accent : 'inherit' }}
                        >
                            {v}
                        </button>
                    ))}
                    <button
                        onClick={() => { isLoggedIn ? setView('admin') : setView('login'); setMobileMenuOpen(false); }}
                        className="flex items-center gap-3 py-4 px-2 uppercase tracking-widest font-bold border-b border-surface/10 hover:text-accent transition-colors"
                    >
                        {isLoggedIn ? <><Lock size={18} /> Admin Panel</> : <><LogIn size={18} /> Admin Login</>}
                    </button>
                    {isLoggedIn && (
                        <button
                            onClick={() => { setIsLoggedIn(false); setView('home'); setMobileMenuOpen(false); }}
                            className="flex items-center gap-3 py-4 px-2 uppercase tracking-widest font-bold text-red-500 hover:bg-white/5 transition-colors"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
