import { ShoppingBag, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function CartView() {
    const { cart, removeFromCart, updateCartQty, cartTotal, setView, settings } = useAppContext();

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                <ShoppingBag size={80} className="mx-auto mb-8 text-surface/20" />
                <h1 className="text-4xl font-serif mb-6">Your bag is empty.</h1>
                <button onClick={() => setView('menu')} className="bg-accent text-black px-12 py-4 font-bold uppercase tracking-widest hover:bg-white" style={{ backgroundColor: settings.colors.accent }}>Explore Menu</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>
            <div className="grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-8">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-6 items-center pb-8 border-b border-surface/10">
                            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg border border-surface/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-serif">{item.name}</h3>
                                    <button onClick={() => removeFromCart(item.id)} className="text-surface/30 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>
                                <p className="text-accent font-bold mb-4" style={{ color: settings.colors.accent }}>₹{item.price}</p>
                                <div className="flex items-center border border-surface/20 rounded-md w-fit">
                                    <button onClick={() => updateCartQty(item.id, -1)} className="px-3 py-1 hover:bg-white/5">-</button>
                                    <span className="px-4 text-sm font-bold">{item.quantity}</span>
                                    <button onClick={() => updateCartQty(item.id, 1)} className="px-3 py-1 hover:bg-white/5">+</button>
                                </div>
                            </div>
                            <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 p-8 rounded-2xl h-fit border border-surface/5 backdrop-blur-md shadow-2xl">
                    <h2 className="text-2xl font-serif mb-8">Summary</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-surface/60"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-surface/60"><span>Service Fee</span><span>₹250.00</span></div>
                        <div className="h-px bg-surface/10"></div>
                        <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-accent" style={{ color: settings.colors.accent }}>₹{(cartTotal + 250).toFixed(2)}</span></div>
                    </div>
                    <button onClick={() => setView('checkout')} className="w-full bg-accent text-black py-4 font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors" style={{ backgroundColor: settings.colors.accent }}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CartView;
