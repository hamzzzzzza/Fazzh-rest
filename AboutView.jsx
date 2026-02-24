import { useAppContext } from '../context/AppContext';
import ourStoryImg from '../assets/our-story.png';
import chefImg from '../assets/chef-kitchen.png';

function AboutView() {
    const { settings } = useAppContext();

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif mb-4">About Us</h1>
                <p className="text-surface/60 max-w-2xl mx-auto">Discover the story behind our culinary journey.</p>
            </div>

            {/* Our Story Section */}
            <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-serif mb-6 border-l-4 pl-6" style={{ borderColor: settings.colors.accent }}>Our Story</h2>
                    <p className="text-surface/80 leading-relaxed text-lg mb-6">{settings.about}</p>
                    <p className="text-surface/80 leading-relaxed text-lg">
                        At {settings.name}, we believe that every meal should be an experience to remember. Our passionate team of culinary artists works tirelessly to bring you dishes that not only satisfy your palate but also tell a story of tradition, innovation, and love for food.
                    </p>
                </div>
                <div className="order-1 md:order-2 aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img src={ourStoryImg} className="w-full h-full object-cover" alt="Restaurant Interior" />
                </div>
            </section>

            {/* Our Philosophy Section */}
            <section className="mb-24">
                <h2 className="text-3xl font-serif mb-12 text-center">Our Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.colors.accent + '20' }}>
                            <span className="text-2xl">🌿</span>
                        </div>
                        <h3 className="text-xl font-serif mb-4">Fresh Ingredients</h3>
                        <p className="text-surface/60">We source only the finest seasonal ingredients from local farmers and trusted suppliers.</p>
                    </div>
                    <div className="text-center p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.colors.accent + '20' }}>
                            <span className="text-2xl">👨‍🍳</span>
                        </div>
                        <h3 className="text-xl font-serif mb-4">Master Chefs</h3>
                        <p className="text-surface/60">Our award-winning chefs bring decades of experience and passion to every dish.</p>
                    </div>
                    <div className="text-center p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.colors.accent + '20' }}>
                            <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="text-xl font-serif mb-4">Fine Experience</h3>
                        <p className="text-surface/60">Experience luxury dining in an atmosphere crafted for memorable moments.</p>
                    </div>
                </div>
            </section>

            {/* Meet Our Chef Section */}
            <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img src={chefImg} className="w-full h-full object-cover" alt="Our Chef" />
                </div>
                <div>
                    <h2 className="text-3xl font-serif mb-6 border-l-4 pl-6" style={{ borderColor: settings.colors.accent }}>Meet Our Chef</h2>
                    <p className="text-surface/80 leading-relaxed text-lg mb-6">
                        Our Executive Chef brings over two decades of culinary excellence to {settings.name}. Trained in the finest kitchens across Europe and Asia, she combines classical techniques with innovative approaches to create unforgettable dining experiences.
                    </p>
                    <p className="text-surface/80 leading-relaxed text-lg">
                        Every dish that leaves our kitchen is a testament to her dedication to perfection, from the careful selection of ingredients to the artful presentation that makes each plate a masterpiece.
                    </p>
                </div>
            </section>

            {/* Visit Us Section */}
            <section className="bg-white/5 rounded-2xl p-12 text-center">
                <h2 className="text-3xl font-serif mb-8">Visit Us</h2>
                <div className="grid md:grid-cols-3 gap-8 text-surface/80">
                    <div>
                        <h4 className="font-bold mb-2" style={{ color: settings.colors.accent }}>Address</h4>
                        <p>{settings.address}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2" style={{ color: settings.colors.accent }}>Hours</h4>
                        <p>Weekdays: {settings.hours.weekday}</p>
                        <p>Weekends: {settings.hours.weekend}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2" style={{ color: settings.colors.accent }}>Contact</h4>
                        <p>{settings.phone}</p>
                        <p>{settings.email}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutView;
