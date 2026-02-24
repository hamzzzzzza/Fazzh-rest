import { Instagram, Facebook, Youtube, MapPin, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function Footer() {
    const { settings, setView } = useAppContext();

    return (
        <footer className="bg-black pt-24 pb-12 px-6 border-t border-surface/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-serif mb-6 text-accent" style={{ color: settings.colors.accent }}>{settings.name}</h2>
                    <p className="text-surface/50 max-w-sm mb-8">Experience the zenith of fine dining. Our passion for perfection is served on every plate.</p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Youtube].map((Icon, i) => <a key={i} href="#" className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-black"><Icon size={18} /></a>)}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-8 opacity-50">Explore</h4>
                    <ul className="space-y-4 text-surface/60">
                        <li><button onClick={() => setView('menu')} className="hover:text-accent">Our Menu</button></li>
                        <li><button onClick={() => setView('reservations')} className="hover:text-accent">Reservations</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-8 opacity-50">Contact</h4>
                    <ul className="space-y-4 text-surface/60 text-sm">
                        <li className="flex items-center gap-2"><MapPin size={14} /> {settings.address}</li>
                        <li className="flex items-center gap-2"><Phone size={14} /> {settings.phone}</li>
                    </ul>
                </div>
            </div>
            <p className="text-center text-xs text-surface/20 border-t border-surface/5 pt-8 uppercase tracking-widest">© 2024 {settings.name}. Culinary Excellence in Bangalore.</p>
        </footer>
    );
}

export default Footer;
