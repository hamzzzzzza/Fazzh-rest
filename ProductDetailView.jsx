import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ProductDetailView() {
    const { activeProduct, setView, addToCart, settings } = useAppContext();
    const [qty, setQty] = useState(1);

    if (!activeProduct) { setView('menu'); return null; }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-500">
            <button onClick={() => setView('menu')} className="mb-12 flex items-center gap-2 text-surface/60 hover:text-accent transition-colors">
                <ChevronLeft size={20} /> Back to Menu
            </button>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <span className="text-accent uppercase tracking-[0.2em] text-sm font-bold mb-4 block" style={{ color: settings.colors.accent }}>{activeProduct.category}</span>
                    <h1 className="text-5xl font-serif mb-6">{activeProduct.name}</h1>
                    <p className="text-accent text-3xl font-bold mb-8" style={{ color: settings.colors.accent }}>₹{activeProduct.price.toFixed(2)}</p>
                    <div className="h-px bg-surface/10 mb-8"></div>
                    <p className="text-surface/70 text-lg leading-relaxed mb-12">{activeProduct.description}</p>

                    <div className="flex items-center gap-8 mb-10">
                        <div className="flex items-center border border-surface/20 rounded-lg">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-6 py-4 hover:bg-white/5">-</button>
                            <span className="px-6 font-bold">{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="px-6 py-4 hover:bg-white/5">+</button>
                        </div>
                        <button onClick={() => { addToCart(activeProduct, qty); setView('cart'); }} className="flex-grow bg-accent text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors" style={{ backgroundColor: settings.colors.accent }}>Add to Bag</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailView;
