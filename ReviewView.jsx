import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Star, Quote, Send } from 'lucide-react';

// Sample reviews data
// Sample reviews data removed - now in constants.js

function ReviewView() {
    const { settings, reviews, setReviews } = useAppContext();
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            id: Date.now(),
            ...newReview,
            date: new Date().toISOString().split('T')[0],
            approved: true
        };
        setReviews([review, ...reviews]);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setShowForm(false);
            setNewReview({ name: '', rating: 5, comment: '' });
        }, 2000);
    };

    const visibleReviews = reviews.filter(r => r.approved !== false);
    const averageRating = visibleReviews.length > 0
        ? (visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length).toFixed(1)
        : '0.0';

    const StarRating = ({ rating, interactive = false, onRate }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={interactive ? 28 : 18}
                    className={`${interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''}`}
                    fill={star <= rating ? settings.colors.accent : 'transparent'}
                    stroke={star <= rating ? settings.colors.accent : '#666'}
                    onClick={() => interactive && onRate && onRate(star)}
                />
            ))}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif mb-4">Customer Reviews</h1>
                <p className="text-surface/60 max-w-2xl mx-auto">See what our guests are saying about their dining experience.</p>
            </div>

            {/* Rating Summary */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 bg-white/5 rounded-2xl p-8">
                <div className="text-center">
                    <div className="text-6xl font-bold mb-2" style={{ color: settings.colors.accent }}>{averageRating}</div>
                    <StarRating rating={Math.round(averageRating)} />
                    <p className="text-surface/60 mt-2">{visibleReviews.length} Reviews</p>
                </div>
                <div className="h-px md:h-24 w-full md:w-px bg-surface/20"></div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-black transition-all hover:scale-105"
                    style={{ backgroundColor: settings.colors.accent }}
                >
                    Write a Review
                </button>
            </div>

            {/* Review Form */}
            {showForm && (
                <div className="bg-white/5 rounded-2xl p-8 mb-16 animate-in slide-in-from-top-4 duration-300">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: settings.colors.accent }}>
                                <Send className="text-black" size={32} />
                            </div>
                            <h3 className="text-xl font-serif mb-2">Thank You!</h3>
                            <p className="text-surface/60">Your review has been submitted.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-2xl font-serif mb-4">Share Your Experience</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Your Name</label>
                                    <input
                                        type="text"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        required
                                        className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Rating</label>
                                    <StarRating rating={newReview.rating} interactive onRate={(r) => setNewReview({ ...newReview, rating: r })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm uppercase tracking-wider mb-2 text-surface/60">Your Review</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full bg-black/50 border border-surface/20 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us about your experience..."
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-black transition-all hover:scale-105"
                                    style={{ backgroundColor: settings.colors.accent }}
                                >
                                    Submit Review
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-8 py-3 rounded-lg font-bold uppercase tracking-widest border border-surface/20 hover:border-surface/40 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Reviews List */}
            <div className="grid md:grid-cols-2 gap-8">
                {visibleReviews.map((review) => (
                    <div key={review.id} className="bg-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all group">
                        <div className="flex items-start gap-4 mb-4">
                            <Quote className="text-accent/30 group-hover:text-accent/50 transition-colors" size={32} style={{ color: settings.colors.accent + '50' }} />
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-serif text-lg">{review.name}</h4>
                                    <span className="text-surface/40 text-sm">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                        </div>
                        <p className="text-surface/70 leading-relaxed pl-12">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewView;
