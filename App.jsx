import { useState, useEffect, useMemo } from 'react';
import { AppContext } from './context/AppContext';
import { SITE_STORAGE_KEY, MENU_STORAGE_KEY, REVIEWS_STORAGE_KEY, ORDERS_STORAGE_KEY, INITIAL_SETTINGS, INITIAL_MENU, INITIAL_REVIEWS } from './context/constants';
import { Navbar, Footer } from './components';
import { HomeView, MenuView, ProductDetailView, CartView, CheckoutView, PaymentView, OrderConfirmationView, OrderHistoryView, ReservationsView, AboutView, ContactView, ReviewView } from './pages';
import { AdminLoginView, AdminPanelView } from './admin';

export default function App() {
    const [view, setView] = useState('home');
    const [activeProduct, setActiveProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // CMS State Initialization
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem(SITE_STORAGE_KEY);
            return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
        } catch {
            return INITIAL_SETTINGS;
        }
    });

    const [menu, setMenu] = useState(() => {
        try {
            const saved = localStorage.getItem(MENU_STORAGE_KEY);
            return saved ? JSON.parse(saved) : INITIAL_MENU;
        } catch {
            return INITIAL_MENU;
        }
    });

    const [reviews, setReviews] = useState(() => {
        try {
            const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
        } catch {
            return INITIAL_REVIEWS;
        }
    });

    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Effect-based persistence
    useEffect(() => {
        localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
    }, [menu]);

    useEffect(() => {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    }, [reviews]);

    useEffect(() => {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product, qty = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
            }
            return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

    const updateCartQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

    const value = {
        view, setView,
        settings, setSettings,
        menu, setMenu,
        reviews, setReviews,
        orders, setOrders,
        cart, addToCart, removeFromCart, updateCartQty, cartTotal, setCart,
        activeProduct, setActiveProduct,
        isLoggedIn, setIsLoggedIn
    };

    return (
        <AppContext.Provider value={value}>
            <div className="min-h-screen font-sans selection:bg-gold selection:text-black transition-colors duration-300"
                style={{ backgroundColor: settings.colors.primary, color: settings.colors.surface }}>

                <Navbar />

                <main className="pt-20">
                    {view === 'home' && <HomeView />}
                    {view === 'menu' && <MenuView />}
                    {view === 'product-detail' && <ProductDetailView />}
                    {view === 'cart' && <CartView />}
                    {view === 'checkout' && <CheckoutView />}
                    {view === 'payment' && <PaymentView />}
                    {view === 'order-confirmation' && <OrderConfirmationView />}
                    {view === 'orders' && <OrderHistoryView />}
                    {view === 'admin' && <AdminPanelView />}
                    {view === 'login' && <AdminLoginView />}
                    {view === 'reservations' && <ReservationsView />}
                    {view === 'about' && <AboutView />}
                    {view === 'contact' && <ContactView />}
                    {view === 'reviews' && <ReviewView />}
                </main>

                <Footer />
            </div>
        </AppContext.Provider>
    );
}
