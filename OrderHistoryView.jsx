import { useState, useEffect } from 'react';
import { Package, Clock, MapPin, ChevronRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function OrderHistoryView() {
    const { setView, settings, orders, setOrders } = useAppContext();
    const [selectedOrder, setSelectedOrder] = useState(null);

    // useEffect removed - orders are now managed globally

    const clearHistory = () => {
        if (confirm('Are you sure you want to clear all order history?')) {
            setOrders([]);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'bg-blue-500',
            preparing: 'bg-yellow-500',
            ready: 'bg-orange-500',
            'on-the-way': 'bg-purple-500',
            delivered: 'bg-green-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const getStatusLabel = (status) => {
        const labels = {
            confirmed: 'Confirmed',
            preparing: 'Preparing',
            ready: 'Ready',
            'on-the-way': 'On the Way',
            delivered: 'Delivered'
        };
        return labels[status] || status;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center animate-in fade-in">
                <Package size={80} className="mx-auto mb-8 text-surface/20" />
                <h1 className="text-4xl font-serif mb-4">No Orders Yet</h1>
                <p className="text-surface/50 mb-8">Your order history will appear here once you place an order.</p>
                <button
                    onClick={() => setView('menu')}
                    className="bg-accent text-black px-12 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all"
                    style={{ backgroundColor: settings.colors.accent }}
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-serif mb-2">Order History</h1>
                    <p className="text-surface/50">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
                </div>
                <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                >
                    <Trash2 size={18} /> Clear History
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="lg:col-span-2 space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            onClick={() => setSelectedOrder(order)}
                            className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedOrder?.orderId === order.orderId
                                ? 'bg-accent/10 border-accent'
                                : 'bg-white/5 border-surface/5 hover:border-surface/20'
                                }`}
                            style={selectedOrder?.orderId === order.orderId ? { borderColor: settings.colors.accent } : {}}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-xs text-surface/40 uppercase">Order ID</p>
                                    <p className="font-mono text-accent font-bold" style={{ color: settings.colors.accent }}>{order.orderId}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex -space-x-2">
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <img
                                            key={i}
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-black"
                                        />
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="w-10 h-10 rounded-full bg-surface/20 border-2 border-black flex items-center justify-center text-xs font-bold">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                                    <p className="text-surface/50 text-sm">{order.items.map(i => i.name).join(', ').slice(0, 40)}...</p>
                                </div>
                                <ChevronRight size={20} className="text-surface/30" />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-surface/50">
                                    <Clock size={14} />
                                    {formatDate(order.placedAt)}
                                </div>
                                <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Details Sidebar */}
                <div className="bg-white/5 p-6 rounded-2xl border border-surface/5 backdrop-blur-md h-fit sticky top-28">
                    {selectedOrder ? (
                        <div className="animate-in fade-in">
                            <h3 className="text-xl font-serif mb-6">Order Details</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-xs text-surface/40 uppercase">Order ID</p>
                                    <p className="font-mono text-accent" style={{ color: settings.colors.accent }}>{selectedOrder.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-surface/40 uppercase">Placed On</p>
                                    <p>{formatDate(selectedOrder.placedAt)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-surface/40 uppercase">Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mt-1 ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusLabel(selectedOrder.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-surface/10 pt-4 mb-4">
                                <p className="text-xs text-surface/40 uppercase mb-3">Items</p>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                            <div className="flex-grow">
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-surface/50">x{item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-surface/10 pt-4 mb-6">
                                <p className="text-xs text-surface/40 uppercase mb-3">Delivery</p>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin size={16} className="text-accent mt-0.5" style={{ color: settings.colors.accent }} />
                                    <div>
                                        <p className="font-medium">{selectedOrder.customer.fullName}</p>
                                        <p className="text-surface/50">{selectedOrder.customer.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-surface/10 pt-4">
                                <div className="flex justify-between text-surface/60 text-sm mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{(selectedOrder.total - 250).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-surface/60 text-sm mb-2">
                                    <span>Service Fee</span>
                                    <span>₹250.00</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-3">
                                    <span>Total</span>
                                    <span className="text-accent" style={{ color: settings.colors.accent }}>₹{selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-surface/40">
                            <ShoppingBag size={40} className="mx-auto mb-4" />
                            <p>Select an order to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderHistoryView;
