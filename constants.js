// --- Constants & Defaults ---
import velvetChocolateDomeImg from '../assets/velvet-chocolate-dome.png';

export const SITE_STORAGE_KEY = 'fazzh_site_settings_v3'; // Bump version to force refresh
export const MENU_STORAGE_KEY = 'fazzh_menu_items_v3';
export const REVIEWS_STORAGE_KEY = 'fazzh_reviews_v1';
export const ORDERS_STORAGE_KEY = 'fazzh_order_history';

export const INITIAL_SETTINGS = {
    name: 'FAZZH',
    tagline: 'Culinary Artistry in Every Bite',
    heroImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    about: 'Founded on the principles of classic technique and modern innovation, FAZZH offers a fine-dining experience that transcends the ordinary. Our chefs source only the finest seasonal ingredients to create a symphony of flavors.',
    address: 'Level 10, Luxury Heights, MG Road, Bangalore',
    phone: '+91 80 4567 8900',
    email: 'reservations@fazzh.in',
    hours: {
        weekday: '12:00 PM - 11:30 PM',
        weekend: '11:00 AM - 12:30 AM'
    },
    colors: {
        primary: '#1A1A1A',
        accent: '#D4AF37',
        surface: '#F5F5DC',
        secondary: '#556B2F'
    }
};

export const INITIAL_REVIEWS = [
    { id: 1, name: 'Priya Sharma', rating: 5, comment: 'Absolutely phenomenal dining experience! The Truffle Risotto was divine and the ambiance was perfect for our anniversary dinner.', date: '2026-01-15', approved: true },
    { id: 2, name: 'Rahul Menon', rating: 5, comment: 'Best fine dining in Bangalore. The attention to detail in every dish is remarkable. Will definitely be coming back!', date: '2026-01-10', approved: true },
    { id: 3, name: 'Ananya Kapoor', rating: 4, comment: 'Loved the Velvet Chocolate Dome dessert! Service was impeccable and the staff made us feel very welcome.', date: '2026-01-05', approved: true },
    { id: 4, name: 'Vikram Patel', rating: 5, comment: 'The Seared Scallops were perfection. Chef knows exactly how to balance flavors. A must-visit for food lovers.', date: '2025-12-28', approved: true },
    { id: 5, name: 'Meera Iyer', rating: 4, comment: 'Elegant setting and delicious food. The wine pairing recommendations were excellent!', date: '2025-12-20', approved: true },
];

export const INITIAL_MENU = [
    // Starters
    { id: 1, name: 'Seared Scallops', category: 'Starters', price: 950, description: 'Hand-dived scallops with pea purée and crispy pancetta shards.', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 2, name: 'Lobster Bisque', category: 'Starters', price: 850, description: 'Creamy French-style soup with chunks of fresh lobster and a hint of cognac.', image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 3, name: 'Caesar Salad', category: 'Starters', price: 550, description: 'Crisp romaine lettuce with house-made dressing, anchovies, and shaved Parmesan.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 13, name: 'Burrata & Heirloom Tomato', category: 'Starters', price: 750, description: 'Fresh creamy burrata with basil pesto, pine nuts, and balsamic glaze.', image: 'https://images.unsplash.com/photo-1596792661852-c322b28c039b?q=80&w=800&auto=format&fit=crop', available: true },

    // Main Course
    { id: 4, name: 'Truffle Infused Risotto', category: 'Main Course', price: 1450, description: 'Arborio rice slow-cooked with black truffles and 24-month aged Parmesan.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 5, name: 'Grilled Lamb Chops', category: 'Main Course', price: 1850, description: 'New Zealand lamb chops with rosemary jus, roasted vegetables, and mint pesto.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 6, name: 'Pan-Seared Salmon', category: 'Main Course', price: 1350, description: 'Atlantic salmon with lemon butter sauce, asparagus, and saffron rice.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 7, name: 'Beef Wellington', category: 'Main Course', price: 2200, description: 'Prime beef tenderloin wrapped in mushroom duxelles and golden puff pastry.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 14, name: 'Wagyu Beef Burger', category: 'Main Course', price: 1100, description: 'Premium Wagyu patty with truffle mayo, caramelized onions, and brie cheese.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', available: true },

    // Desserts
    { id: 8, name: 'Velvet Chocolate Dome', category: 'Desserts', price: 650, description: 'Dark Belgian chocolate with a liquid salted caramel heart.', image: velvetChocolateDomeImg, available: true },
    { id: 9, name: 'Classic Tiramisu', category: 'Desserts', price: 550, description: 'Layers of espresso-soaked ladyfingers with mascarpone cream and cocoa.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 10, name: 'Crème Brûlée', category: 'Desserts', price: 500, description: 'Vanilla bean custard with a caramelized sugar crust and fresh berries.', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 15, name: 'Lemon Basil Tart', category: 'Desserts', price: 450, description: 'Zesty lemon curd tart topped with Italian meringue and basil sugar.', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop', available: true },

    // Beverages
    { id: 11, name: 'Vintage Chardonnay', category: 'Beverages', price: 4500, description: 'Complex citrus notes with a buttery finish from the heart of Burgundy.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 12, name: 'Espresso Martini', category: 'Beverages', price: 750, description: 'Freshly brewed espresso with premium vodka and coffee liqueur.', image: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?q=80&w=800&auto=format&fit=crop', available: true },
    { id: 16, name: 'Artisan Pour-Over Coffee', category: 'Beverages', price: 350, description: 'Single-origin Arabica beans hand-brewed for a smooth, aromatic finish.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop', available: true },
];
