import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ReservationsView() {
    const { settings } = useAppContext();
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            {submitted ? (
                <div className="text-center py-24"><CheckCircle size={80} className="text-accent mx-auto mb-8" style={{ color: settings.colors.accent }} /><h1>Request Sent</h1></div>
            ) : (
                <div className="grid md:grid-cols-2 gap-16">
                    <div><h1 className="text-5xl font-serif mb-6 leading-tight">Book Your <br /> Culinary Journey</h1></div>
                    <form className="bg-white/5 p-10 rounded-3xl border border-surface/5 shadow-2xl" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                        <input required placeholder="Your Name" className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl mb-6 outline-none" />
                        <input type="date" className="w-full bg-black/40 border border-surface/10 p-4 rounded-xl mb-6 outline-none" />
                        <button className="w-full bg-accent text-black py-5 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all" style={{ backgroundColor: settings.colors.accent }}>Request Reservation</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ReservationsView;
