import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import exteriorImg from '../assets/restaurant-exterior.png';

function ContactView() {
    const { settings } = useAppContext();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif mb-4">Contact Us</h1>
                <p className="text-surface/60 max-w-2xl mx-auto">We'd love to hear from you. Reach out to us for inquiries, feedback, or reservations.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div className="bg-white/5 rounded-2xl p-8">
                    <h2 className="text-2xl font-serif mb-8">Send us a Message</h2>
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: settings.colors.accent }}>
                                <Send className="text-black" size={32} />
                            </div>
                            <h3 className="text-xl font-serif mb-2">Message Sent!</h3>
                            <p className="text-surface/60">We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                                        placeholder="+91 99999 99999"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg font-bold uppercase tracking-widest text-black transition-all hover:scale-105"
                                style={{ backgroundColor: settings.colors.accent }}
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-white/5 rounded-2xl p-8">
                        <h2 className="text-2xl font-serif mb-8">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: settings.colors.accent + '20' }}>
                                    <MapPin style={{ color: settings.colors.accent }} size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Address</h4>
                                    <p className="text-surface/60">{settings.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: settings.colors.accent + '20' }}>
                                    <Phone style={{ color: settings.colors.accent }} size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Phone</h4>
                                    <p className="text-surface/60">{settings.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: settings.colors.accent + '20' }}>
                                    <Mail style={{ color: settings.colors.accent }} size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Email</h4>
                                    <p className="text-surface/60">{settings.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: settings.colors.accent + '20' }}>
                                    <Clock style={{ color: settings.colors.accent }} size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Hours</h4>
                                    <p className="text-surface/60">Weekdays: {settings.hours.weekday}</p>
                                    <p className="text-surface/60">Weekends: {settings.hours.weekend}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Restaurant Exterior */}
                    <div className="rounded-2xl overflow-hidden h-64">
                        <img src={exteriorImg} className="w-full h-full object-cover" alt="Restaurant Exterior" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactView;
