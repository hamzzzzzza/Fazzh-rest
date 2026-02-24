import { useAppContext } from '../context/AppContext';
import interiorImage from '../assets/restaurant-interior.png';

function HomeView() {
    const { settings, setView, menu, setActiveProduct } = useAppContext();
    const featuredItems = menu.slice(0, 3);

    return (
        <div className="animate-in fade-in duration-700">
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${settings.heroImage}')` }}>
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h2 className="text-accent uppercase tracking-[0.3em] mb-4 text-lg" style={{ color: settings.colors.accent }}>{settings.tagline}</h2>
                    <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">{settings.name}</h1>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button onClick={() => setView('menu')} className="bg-accent text-black px-10 py-4 font-bold tracking-widest uppercase hover:bg-white transition-colors" style={{ backgroundColor: settings.colors.accent }}>Discover Menu</button>
                        <button onClick={() => setView('contact')} className="border border-white px-10 py-4 font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">Contact Us</button>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-serif mb-6 border-l-4 border-accent pl-6" style={{ borderColor: settings.colors.accent }}>Our Story</h2>
                    <p className="text-surface/80 leading-relaxed text-lg mb-8">{settings.about}</p>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img src={interiorImage} className="w-full h-full object-cover" alt="Restaurant Interior" />
                </div>
            </section>

            <section className="py-24 bg-black/40">
                <h2 className="text-4xl font-serif mb-12 text-center">Chef's Recommendations</h2>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                    {featuredItems.map(item => (
                        <div key={item.id} className="group cursor-pointer" onClick={() => { setActiveProduct(item); setView('product-detail'); }}>
                            <div className="aspect-square overflow-hidden rounded-xl mb-6 shadow-xl">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                            <p className="text-accent font-bold" style={{ color: settings.colors.accent }}>₹{item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomeView;
