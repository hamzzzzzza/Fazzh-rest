import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function MenuView() {
    const { menu, setView, setActiveProduct, settings } = useAppContext();
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(menu.map(i => i.category))];
    const filteredMenu = filter === 'All' ? menu : menu.filter(i => i.category === filter);

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif mb-4">Our Menu</h1>
                <p className="text-surface/60 max-w-2xl mx-auto">Savor the symphony of flavors crafted by our award-winning culinary team.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-2 rounded-full border transition-all uppercase tracking-widest text-xs font-bold ${filter === cat ? 'bg-accent text-black border-accent' : 'border-surface/20 hover:border-accent hover:text-accent'}`} style={filter === cat ? { backgroundColor: settings.colors.accent, borderColor: settings.colors.accent } : {}}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredMenu.map(item => (
                    <div key={item.id} className="group flex gap-6 items-center hover:bg-white/5 p-4 rounded-xl transition-all cursor-pointer" onClick={() => { setActiveProduct(item); setView('product-detail'); }}>
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-surface/10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-serif text-lg">{item.name}</h3>
                                <span className="text-accent font-bold" style={{ color: settings.colors.accent }}>₹{item.price}</span>
                            </div>
                            <p className="text-surface/50 text-sm line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuView;
