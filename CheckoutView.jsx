import { useState } from 'react';
import { ChevronLeft, User, CreditCard, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function CheckoutView() {
    const { cartTotal, cart, setView, settings } = useAppContext();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContinue = (e) => {
        e.preventDefault();
        // Store form data in sessionStorage for later use
        sessionStorage.setItem('checkout_customer', JSON.stringify(formData));
        sessionStorage.setItem('checkout_cart', JSON.stringify(cart));
        sessionStorage.setItem('checkout_total', cartTotal.toString());
        setView('payment');
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black font-bold" style={{ backgroundColor: settings.colors.accent }}>
                        <User size={18} />
                    </div>
                    <span className="font-medium text-accent" style={{ color: settings.colors.accent }}>Details</span>
                </div>
                <div className="w-16 h-px bg-surface/20"></div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-surface/40 font-bold">
                        <CreditCard size={18} />
                    </div>
                    <span className="text-surface/40">Payment</span>
                </div>
                <div className="w-16 h-px bg-surface/20"></div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-surface/40 font-bold">
                        <Check size={18} />
                    </div>
                    <span className="text-surface/40">Confirm</span>
                </div>
            </div>

            <button onClick={() => setView('cart')} className="mb-8 flex items-center gap-2 text-surface/60 hover:text-accent transition-colors">
                <ChevronLeft size={20} /> Back to Cart
            </button>

            <div className="bg-white/5 p-10 rounded-2xl border border-surface/5 backdrop-blur-md shadow-2xl">
                <h2 className="text-3xl font-serif mb-2">Personal Details</h2>
                <p className="text-surface/50 mb-8">Please fill in your information for delivery</p>

                <form onSubmit={handleContinue} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Full Name *</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Phone Number *</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                required
                                className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Email Address *</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Delivery Address *</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your full delivery address"
                            required
                            className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent transition-colors h-24 resize-none"
                        />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-black/30 p-6 rounded-xl mt-8">
                        <h3 className="font-bold mb-4">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-surface/60">
                                <span>Subtotal ({cart.length} items)</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-surface/60">
                                <span>Service Fee</span>
                                <span>₹250.00</span>
                            </div>
                            <div className="h-px bg-surface/10 my-2"></div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-accent" style={{ color: settings.colors.accent }}>₹{(cartTotal + 250).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent text-black py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: settings.colors.accent }}
                    >
                        Continue to Payment <CreditCard size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutView;
