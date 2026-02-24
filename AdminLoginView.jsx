import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function AdminLoginView() {
    const { setView, setIsLoggedIn, settings } = useAppContext();
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (e.target.password.value === 'admin123') {
            setIsLoggedIn(true);
            setView('admin');
        } else {
            setError('Invalid credentials. Hint: use admin123');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white/5 p-10 rounded-3xl border border-surface/5 backdrop-blur-md shadow-2xl animate-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <Lock className="text-accent mx-auto mb-4" size={40} style={{ color: settings.colors.accent }} />
                    <h1 className="text-3xl font-serif">Staff Access</h1>
                    <p className="text-surface/40 mt-2">Manage your restaurant CMS</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input name="password" type="password" placeholder="Admin Password" required className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl focus:border-accent outline-none text-center tracking-widest" />
                    {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
                    <button className="w-full bg-accent text-black py-5 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all" style={{ backgroundColor: settings.colors.accent }}>Authenticate</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginView;
