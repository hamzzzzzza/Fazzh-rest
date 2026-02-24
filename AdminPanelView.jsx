import { useState } from 'react';
import { Lock, Utensils, Save, PieChart, Plus, Edit2, Trash2, Users, ShoppingBag, Star, Home, Info, Phone, MessageSquare, Check, X, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function AdminPanelView() {
    const { menu, setMenu, settings, setSettings, reviews, setReviews, orders, setOrders, isLoggedIn, setView } = useAppContext();
    const [adminTab, setAdminTab] = useState('menu');
    const [editingItem, setEditingItem] = useState(null);

    if (!isLoggedIn) {
        return (
            <div className="max-w-md mx-auto py-32 px-6 text-center">
                <Lock size={64} className="mx-auto mb-8 text-surface/20" />
                <h1 className="text-3xl font-serif mb-4">Access Restricted</h1>
                <button onClick={() => setView('login')} className="bg-accent text-black px-8 py-3 rounded-lg font-bold" style={{ backgroundColor: settings.colors.accent }}>Go to Login</button>
            </div>
        );
    }

    const handleUpdateItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const isNew = editingItem.id === null;

        const itemData = {
            id: isNew ? Date.now() : editingItem.id,
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            description: formData.get('description'),
            image: formData.get('image') || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
            available: true
        };

        if (isNew) {
            setMenu(prev => [...prev, itemData]);
        } else {
            setMenu(prev => prev.map(i => i.id === editingItem.id ? itemData : i));
        }

        setEditingItem(null);
        e.target.reset();
    };

    const deleteItem = (id) => {
        if (confirm("Permanently delete this item from the CMS?")) {
            setMenu(prev => prev.filter(i => i.id !== id));
        }
    };

    const updateSetting = (key, value) => {
        const keys = key.split('.');
        setSettings(prev => {
            if (keys.length > 1) {
                return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
            }
            return { ...prev, [key]: value };
        });
    };

    const toggleReview = (id) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
    };

    const deleteReview = (id) => {
        if (confirm("Delete this review?")) {
            setReviews(prev => prev.filter(r => r.id !== id));
        }
    };

    const updateOrderStatus = (id, newStatus) => {
        setOrders(prev => prev.map(o => o.orderId === id ? { ...o, status: newStatus } : o));
    };

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setAdminTab(id)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${adminTab === id ? 'bg-accent text-black font-bold' : 'hover:bg-white/5'}`}
            style={adminTab === id ? { backgroundColor: settings.colors.accent } : {}}
        >
            <Icon size={20} /> {label}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-64 space-y-2 shrink-0">
                    <TabButton id="stats" icon={PieChart} label="Dashboard" />
                    <TabButton id="orders" icon={ShoppingBag} label="Orders" />
                    <TabButton id="menu" icon={Utensils} label="Menu CMS" />
                    <TabButton id="home" icon={Home} label="Home CMS" />
                    <TabButton id="about" icon={Info} label="About CMS" />
                    <TabButton id="contact" icon={Phone} label="Contact CMS" />
                    <TabButton id="reviews" icon={MessageSquare} label="Reviews CMS" />
                    <TabButton id="settings" icon={Save} label="Global Settings" />
                </div>

                <div className="flex-grow bg-white/5 rounded-3xl border border-surface/5 p-8 backdrop-blur-md min-h-[600px]">
                    {adminTab === 'orders' && (
                        <div className="animate-in fade-in space-y-8">
                            <h2 className="text-3xl font-serif">Order Management</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-surface/10 text-surface/40 uppercase text-xs font-bold">
                                        <tr><th className="py-4">Order ID</th><th className="py-4">Customer</th><th className="py-4">Items</th><th className="py-4">Total</th><th className="py-4">Status</th></tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.orderId} className="border-b border-surface/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 font-mono text-accent" style={{ color: settings.colors.accent }}>{order.orderId}</td>
                                                <td className="py-4 text-sm">
                                                    <span className="font-bold block">{order.customer?.fullName}</span>
                                                    <span className="opacity-50">{order.customer?.phone}</span>
                                                </td>
                                                <td className="py-4 text-sm opacity-70">
                                                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                                </td>
                                                <td className="py-4 font-bold">₹{order.total.toFixed(2)}</td>
                                                <td className="py-4">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                                        className="bg-black border border-surface/20 rounded px-2 py-1 text-xs uppercase font-bold outline-none focus:border-accent"
                                                    >
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="preparing">Preparing</option>
                                                        <option value="ready">Ready</option>
                                                        <option value="on-the-way">On the Way</option>
                                                        <option value="delivered">Delivered</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {orders.length === 0 && <div className="text-center py-12 text-surface/40">No orders found.</div>}
                            </div>
                        </div>
                    )}

                    {adminTab === 'menu' && (
                        <div className="animate-in fade-in">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-serif">Menu Management</h2>
                                <button onClick={() => setEditingItem({ id: null, name: '', price: 0, category: 'Main Course', description: '', image: '' })} className="bg-accent text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2" style={{ backgroundColor: settings.colors.accent }}><Plus size={18} /> Add Item</button>
                            </div>

                            {editingItem && (
                                <form onSubmit={handleUpdateItem} className="mb-12 p-8 bg-black/40 rounded-2xl border border-accent/20 animate-in slide-in-from-top-4">
                                    <h3 className="text-xl mb-6 font-bold">{editingItem.id ? 'Edit Item' : 'New Menu Item'}</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <input name="name" defaultValue={editingItem.name} placeholder="Item Name" required className="bg-black border border-surface/10 p-4 rounded-lg outline-none focus:border-accent" />
                                        <input name="price" type="number" step="1" defaultValue={editingItem.price} placeholder="Price (INR)" required className="bg-black border border-surface/10 p-4 rounded-lg outline-none focus:border-accent" />
                                        <select name="category" defaultValue={editingItem.category} className="bg-black border border-surface/10 p-4 rounded-lg outline-none focus:border-accent appearance-none">
                                            <option>Starters</option><option>Main Course</option><option>Desserts</option><option>Beverages</option>
                                        </select>
                                        <input name="image" defaultValue={editingItem.image} placeholder="Image URL" className="bg-black border border-surface/10 p-4 rounded-lg outline-none focus:border-accent" />
                                        <textarea name="description" defaultValue={editingItem.description} placeholder="Description" required className="bg-black border border-surface/10 p-4 rounded-lg outline-none focus:border-accent md:col-span-2 h-24"></textarea>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" className="bg-accent text-black px-8 py-3 rounded-lg font-bold" style={{ backgroundColor: settings.colors.accent }}>Save Item</button>
                                        <button type="button" onClick={() => setEditingItem(null)} className="text-surface/50 hover:text-white transition-colors">Cancel</button>
                                    </div>
                                </form>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-surface/10 text-surface/40 uppercase text-xs font-bold">
                                        <tr><th className="py-4">Item</th><th className="py-4">Category</th><th className="py-4">Price</th><th className="py-4 text-right">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {menu.map(item => (
                                            <tr key={item.id} className="border-b border-surface/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 flex items-center gap-4"><img src={item.image} className="w-10 h-10 rounded object-cover" alt="" /><span className="font-medium">{item.name}</span></td>
                                                <td className="py-4 opacity-70">{item.category}</td>
                                                <td className="py-4 font-bold text-accent" style={{ color: settings.colors.accent }}>₹{item.price}</td>
                                                <td className="py-4 text-right">
                                                    <button onClick={() => setEditingItem(item)} className="p-2 text-surface/30 hover:text-accent"><Edit2 size={16} /></button>
                                                    <button onClick={() => deleteItem(item.id)} className="p-2 text-surface/30 hover:text-red-500"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {adminTab === 'home' && (
                        <div className="animate-in fade-in space-y-8">
                            <h2 className="text-3xl font-serif">Home Page Content</h2>
                            <div className="space-y-4">
                                <label className="text-xs uppercase font-bold text-surface/40">Tagline (Welcome Text)</label>
                                <input value={settings.tagline} onChange={(e) => updateSetting('tagline', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs uppercase font-bold text-surface/40">Hero Background Image URL</label>
                                <div className="flex gap-4">
                                    <input value={settings.heroImage} onChange={(e) => updateSetting('heroImage', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                                    <div className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 border border-surface/10" style={{ backgroundImage: `url('${settings.heroImage}')` }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'about' && (
                        <div className="animate-in fade-in space-y-8">
                            <h2 className="text-3xl font-serif">About Page Content</h2>
                            <div className="space-y-4">
                                <label className="text-xs uppercase font-bold text-surface/40">Our Story</label>
                                <textarea value={settings.about} onChange={(e) => updateSetting('about', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent h-64" />
                            </div>
                        </div>
                    )}

                    {adminTab === 'contact' && (
                        <div className="animate-in fade-in space-y-8">
                            <h2 className="text-3xl font-serif">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs uppercase font-bold text-surface/40">Physical Address</label>
                                    <textarea value={settings.address} onChange={(e) => updateSetting('address', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent h-32" />
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-surface/40">Phone Number</label>
                                        <input value={settings.phone} onChange={(e) => updateSetting('phone', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-surface/40">Email Address</label>
                                        <input value={settings.email} onChange={(e) => updateSetting('email', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold pt-4 border-t border-surface/10">Opening Hours</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-surface/40">Weekdays (Mon-Fri)</label>
                                    <input value={settings.hours.weekday} onChange={(e) => updateSetting('hours.weekday', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-surface/40">Weekends (Sat-Sun)</label>
                                    <input value={settings.hours.weekend} onChange={(e) => updateSetting('hours.weekend', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'reviews' && (
                        <div className="animate-in fade-in space-y-8">
                            <h2 className="text-3xl font-serif">Review Management</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-surface/10 text-surface/40 uppercase text-xs font-bold">
                                        <tr><th className="py-4">Guest</th><th className="py-4">Rating</th><th className="py-4">Comment</th><th className="py-4">Status</th><th className="py-4 text-right">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map(review => (
                                            <tr key={review.id} className="border-b border-surface/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 font-medium">{review.name}<br /><span className="text-xs text-surface/40">{new Date(review.date).toLocaleDateString()}</span></td>
                                                <td className="py-4"><div className="flex gap-1"><Star size={14} fill={settings.colors.accent} stroke="none" /> {review.rating}</div></td>
                                                <td className="py-4 max-w-xs truncate opacity-70" title={review.comment}>{review.comment}</td>
                                                <td className="py-4">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${review.approved ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                        {review.approved ? 'Live' : 'Hidden'}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right flex justify-end gap-2">
                                                    <button onClick={() => toggleReview(review.id)} className={`p-2 rounded hover:bg-white/10 ${review.approved ? 'text-yellow-500' : 'text-green-500'}`} title={review.approved ? "Hide Review" : "Approve Review"}>
                                                        {review.approved ? <X size={16} /> : <Check size={16} />}
                                                    </button>
                                                    <button onClick={() => deleteReview(review.id)} className="p-2 text-surface/30 hover:text-red-500 rounded hover:bg-white/10"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {reviews.length === 0 && <div className="text-center py-12 text-surface/40">No reviews found.</div>}
                            </div>
                        </div>
                    )}

                    {adminTab === 'settings' && (
                        <div className="animate-in fade-in max-w-2xl space-y-8">
                            <h2 className="text-3xl font-serif">Global Settings</h2>
                            <div className="space-y-4">
                                <label className="text-xs uppercase font-bold text-surface/40">Restaurant Name</label>
                                <input value={settings.name} onChange={(e) => updateSetting('name', e.target.value)} className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl outline-none focus:border-accent" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Background Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={settings.colors.primary} onChange={(e) => updateSetting('colors.primary', e.target.value)} className="h-10 w-10 bg-transparent border-0 rounded cursor-pointer" />
                                        <span className="text-sm font-mono opacity-50">{settings.colors.primary}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-surface/40 mb-2 block">Accent Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={settings.colors.accent} onChange={(e) => updateSetting('colors.accent', e.target.value)} className="h-10 w-10 bg-transparent border-0 rounded cursor-pointer" />
                                        <span className="text-sm font-mono opacity-50">{settings.colors.accent}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-right-4">
                            <div className="p-8 bg-black/20 rounded-2xl border border-surface/5 text-center"><Users className="mx-auto mb-4" /><p className="text-4xl font-serif">4,284</p><p className="text-xs uppercase text-surface/40">Visitors</p></div>
                            <div className="p-8 bg-black/20 rounded-2xl border border-surface/5 text-center"><ShoppingBag className="mx-auto mb-4" /><p className="text-4xl font-serif">142</p><p className="text-xs uppercase text-surface/40">Orders</p></div>
                            <div className="p-8 bg-black/20 rounded-2xl border border-surface/5 text-center"><Star className="mx-auto mb-4" /><p className="text-4xl font-serif">4.9</p><p className="text-xs uppercase text-surface/40">Rating</p></div>
                            <div className="md:col-span-3 p-8 bg-black/20 rounded-2xl border border-surface/5 text-center mt-6">
                                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setAdminTab('menu')} className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg transition-colors">Manage Menu</button>
                                    <button onClick={() => setAdminTab('reviews')} className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg transition-colors">Check Reviews</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanelView;
