import { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, MapPin, Clock, Phone, ChefHat, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function OrderConfirmationView() {
    const { setView, settings } = useAppContext();
    const [order, setOrder] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const orderData = sessionStorage.getItem('current_order');
        if (orderData) {
            setOrder(JSON.parse(orderData));
        }
    }, []);

    // Simulate order progress
    useEffect(() => {
        if (order) {
            const intervals = [3000, 8000, 15000, 25000]; // Timing for each step
            intervals.forEach((time, index) => {
                setTimeout(() => {
                    if (index < 4) setCurrentStep(index + 1);
                }, time);
            });
        }
    }, [order]);

    const orderSteps = [
        { id: 0, label: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received' },
        { id: 1, label: 'Preparing', icon: ChefHat, description: 'Chef is preparing your food' },
        { id: 2, label: 'Ready', icon: Package, description: 'Order is ready for pickup' },
        { id: 3, label: 'On the Way', icon: Truck, description: 'Your order is being delivered' },
        { id: 4, label: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
    ];

    const getPaymentMethodName = (method) => {
        const methods = {
            card: 'Credit/Debit Card',
            upi: 'UPI Payment',
            wallet: 'Digital Wallet',
            netbanking: 'Net Banking',
            cod: 'Cash on Delivery'
        };
        return methods[method] || method;
    };

    if (!order) {
        return (
            <div className="max-w-lg mx-auto py-32 px-6 text-center">
                <Package size={80} className="mx-auto mb-8 text-surface/20" />
                <h1 className="text-3xl font-serif mb-4">No Active Order</h1>
                <button onClick={() => setView('menu')} className="bg-accent text-black px-8 py-3 rounded-lg font-bold" style={{ backgroundColor: settings.colors.accent }}>
                    Browse Menu
                </button>
            </div>
        );
    }

    const estimatedTime = new Date(order.estimatedDelivery);

    return (
        <div className="max-w-5xl mx-auto px-6 py-24 animate-in zoom-in">
            {/* Success Header */}
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle size={40} className="text-white" />
                </div>
                <h1 className="text-4xl font-serif mb-2">Order Confirmed!</h1>
                <p className="text-surface/60">Thank you for your order. Here are your order details.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Order Tracking */}
                <div className="lg:col-span-2 bg-white/5 p-8 rounded-2xl border border-surface/5 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-serif">Track Your Order</h2>
                            <p className="text-surface/50 text-sm">Order ID: <span className="text-accent font-mono" style={{ color: settings.colors.accent }}>{order.orderId}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-surface/40 uppercase">Estimated Delivery</p>
                            <p className="text-lg font-bold text-accent" style={{ color: settings.colors.accent }}>
                                {estimatedTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="relative mb-10">
                        {/* Progress Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-surface/10"></div>
                        <div
                            className="absolute left-6 top-0 w-px bg-green-500 transition-all duration-1000"
                            style={{ height: `${(currentStep / 4) * 100}%` }}
                        ></div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {orderSteps.map((step, index) => (
                                <div key={step.id} className="relative flex items-start gap-6 pl-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${index <= currentStep
                                            ? 'bg-green-500 text-white scale-110'
                                            : 'bg-surface/10 text-surface/40'
                                        }`}>
                                        <step.icon size={18} />
                                    </div>
                                    <div className={`transition-opacity duration-500 ${index <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                                        <h3 className="font-bold">{step.label}</h3>
                                        <p className="text-sm text-surface/60">{step.description}</p>
                                        {index === currentStep && index < 4 && (
                                            <div className="flex items-center gap-2 mt-2 text-accent text-sm" style={{ color: settings.colors.accent }}>
                                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ backgroundColor: settings.colors.accent }}></div>
                                                In Progress...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-surface/10 pt-8">
                        <h3 className="font-bold mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-grow">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-surface/50">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="space-y-6">
                    {/* Delivery Details */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-surface/5 backdrop-blur-md">
                        <h3 className="text-lg font-serif mb-4">Delivery Details</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-accent mt-0.5" style={{ color: settings.colors.accent }} />
                                <div>
                                    <p className="font-medium">{order.customer.fullName}</p>
                                    <p className="text-surface/50">{order.customer.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-accent" style={{ color: settings.colors.accent }} />
                                <p>{order.customer.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={18} className="text-accent" style={{ color: settings.colors.accent }} />
                                <p>Est. {estimatedTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-surface/5 backdrop-blur-md">
                        <h3 className="text-lg font-serif mb-4">Payment Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-surface/60">
                                <span>Subtotal</span>
                                <span>₹{(order.total - 250).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-surface/60">
                                <span>Service Fee</span>
                                <span>₹250.00</span>
                            </div>
                            <div className="h-px bg-surface/10"></div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Paid</span>
                                <span className="text-accent" style={{ color: settings.colors.accent }}>₹{order.total.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 text-surface/50">
                                <p>Payment via {getPaymentMethodName(order.paymentMethod)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={() => setView('home')}
                            className="w-full bg-accent text-black py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all"
                            style={{ backgroundColor: settings.colors.accent }}
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => setView('menu')}
                            className="w-full border border-surface/20 py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all"
                        >
                            Order More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmationView;
