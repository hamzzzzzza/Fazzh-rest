import { useState } from 'react';
import { ChevronLeft, User, CreditCard, Check, Wallet, Building2, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function PaymentView() {
    const { setView, setCart, settings, orders, setOrders } = useAppContext();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [processing, setProcessing] = useState(false);

    const cartTotal = parseFloat(sessionStorage.getItem('checkout_total') || '0');

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
        { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
        { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Amazon Pay, Mobikwik' },
        { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks supported' },
        { id: 'cod', name: 'Cash on Delivery', icon: Wallet, description: 'Pay when you receive' },
    ];

    const handlePayment = () => {
        if (!selectedMethod) return;

        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            // Generate order ID
            const orderId = 'FAZZH' + Date.now().toString().slice(-8);
            const orderData = {
                orderId,
                customer: JSON.parse(sessionStorage.getItem('checkout_customer') || '{}'),
                items: JSON.parse(sessionStorage.getItem('checkout_cart') || '[]'),
                total: cartTotal + 250,
                paymentMethod: selectedMethod,
                status: 'confirmed',
                placedAt: new Date().toISOString(),
                estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString() // 45 mins from now
            };

            // Store order data
            sessionStorage.setItem('current_order', JSON.stringify(orderData));

            // Save to order history via context
            setOrders([orderData, ...orders]);

            // Clear cart
            setCart([]);

            setProcessing(false);
            setView('order-confirmation');
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        <Check size={18} />
                    </div>
                    <span className="text-green-500">Details</span>
                </div>
                <div className="w-16 h-px bg-accent" style={{ backgroundColor: settings.colors.accent }}></div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black font-bold" style={{ backgroundColor: settings.colors.accent }}>
                        <CreditCard size={18} />
                    </div>
                    <span className="font-medium text-accent" style={{ color: settings.colors.accent }}>Payment</span>
                </div>
                <div className="w-16 h-px bg-surface/20"></div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-surface/40 font-bold">
                        <Check size={18} />
                    </div>
                    <span className="text-surface/40">Confirm</span>
                </div>
            </div>

            <button onClick={() => setView('checkout')} className="mb-8 flex items-center gap-2 text-surface/60 hover:text-accent transition-colors">
                <ChevronLeft size={20} /> Back to Details
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Payment Methods */}
                <div className="lg:col-span-2 bg-white/5 p-8 rounded-2xl border border-surface/5 backdrop-blur-md">
                    <h2 className="text-3xl font-serif mb-2">Select Payment Method</h2>
                    <p className="text-surface/50 mb-8">Choose how you'd like to pay</p>

                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={`w-full p-5 rounded-xl border transition-all flex items-center gap-4 text-left ${selectedMethod === method.id
                                    ? 'border-accent bg-accent/10'
                                    : 'border-surface/10 hover:border-surface/30 bg-black/20'
                                    }`}
                                style={selectedMethod === method.id ? { borderColor: settings.colors.accent } : {}}
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedMethod === method.id ? 'bg-accent text-black' : 'bg-surface/10'
                                    }`} style={selectedMethod === method.id ? { backgroundColor: settings.colors.accent } : {}}>
                                    <method.icon size={24} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold">{method.name}</h3>
                                    <p className="text-sm text-surface/50">{method.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-accent' : 'border-surface/30'
                                    }`} style={selectedMethod === method.id ? { borderColor: settings.colors.accent } : {}}>
                                    {selectedMethod === method.id && (
                                        <div className="w-3 h-3 rounded-full bg-accent" style={{ backgroundColor: settings.colors.accent }}></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Card Details Form (shown when card is selected) */}
                    {selectedMethod === 'card' && (
                        <div className="mt-8 p-6 bg-black/30 rounded-xl animate-in slide-in-from-top-4">
                            <h4 className="font-bold mb-4">Card Details</h4>
                            <div className="space-y-4">
                                <input placeholder="Card Number" className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="MM/YY" className="bg-black/40 border border-surface/10 p-4 rounded-xl outline-none" />
                                    <input placeholder="CVV" className="bg-black/40 border border-surface/10 p-4 rounded-xl outline-none" />
                                </div>
                                <input placeholder="Cardholder Name" className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none" />
                            </div>
                        </div>
                    )}

                    {/* UPI Form */}
                    {selectedMethod === 'upi' && (
                        <div className="mt-8 p-6 bg-black/30 rounded-xl animate-in slide-in-from-top-4">
                            <h4 className="font-bold mb-4">Enter UPI ID</h4>
                            <input placeholder="yourname@upi" className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none" />
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="bg-white/5 p-6 rounded-2xl border border-surface/5 backdrop-blur-md h-fit">
                    <h3 className="text-xl font-serif mb-6">Order Summary</h3>
                    <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between text-surface/60">
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-surface/60">
                            <span>Service Fee</span>
                            <span>₹250.00</span>
                        </div>
                        <div className="h-px bg-surface/10"></div>
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span className="text-accent" style={{ color: settings.colors.accent }}>₹{(cartTotal + 250).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={!selectedMethod || processing}
                        className={`w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${selectedMethod && !processing
                            ? 'bg-accent text-black hover:bg-white'
                            : 'bg-surface/20 text-surface/40 cursor-not-allowed'
                            }`}
                        style={selectedMethod && !processing ? { backgroundColor: settings.colors.accent } : {}}
                    >
                        {processing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : (
                            <>Pay ₹{(cartTotal + 250).toFixed(2)}</>
                        )}
                    </button>

                    <p className="text-xs text-surface/40 text-center mt-4">
                        🔒 Secure payment powered by industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaymentView;
