import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Star, Quote, MessageSquare } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data, addTestimonial } = useSiteData();

  // Filter reviewers state
  const [roleFilter, setRoleFilter] = useState<'all' | 'Parent' | 'Student'>('all');

  // Feedback Form State
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackRelation, setFeedbackRelation] = useState<'Parent' | 'Student'>('Parent');
  const [feedbackClass, setFeedbackClass] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName || !feedbackClass || !feedbackText) return;
    
    addTestimonial({
      name: feedbackName,
      relation: feedbackRelation,
      classLevel: `${feedbackClass} ${feedbackRelation}`,
      rating: feedbackRating,
      text: feedbackText
    });
    
    setFeedbackName('');
    setFeedbackClass('');
    setFeedbackText('');
    setFeedbackRating(5);
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 5000);
  };

  const filteredTestimonials = data.testimonials.filter((item) => {
    if (roleFilter === 'all') return true;
    return item.relation === roleFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Academic Reviews
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Parent & Student Testimonials
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Read direct feedback from families enrolled at Ratna Coaching Centre. We are grateful for their feedback and advocacy.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-slate-200 gap-2 mb-12 overflow-x-auto pb-1.5 scrollbar-hide">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'Parent', label: 'Parent Perspectives' },
            { id: 'Student', label: 'Student Perspectives' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                roleFilter === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all relative group"
            >
              {/* Quote bubble absolute decoration */}
              <Quote className="absolute top-6 right-6 text-slate-100 h-10 w-10 -z-0 group-hover:text-accent/10 transition-colors" />

              <div className="flex flex-col gap-4 relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent stroke-[1.5]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="border-t border-slate-50 pt-5 mt-6 flex items-center gap-3 relative z-10">
                <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 leading-tight">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                    {t.classLevel} • <span className="text-accent">{t.relation}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Share your feedback section */}
        <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-8 max-w-2xl mx-auto shadow-md relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
          
          <div className="text-center mb-6">
            <MessageSquare className="text-accent mx-auto mb-2" size={24} />
            <h3 className="font-serif font-bold text-xl text-primary">Share Your Feedback</h3>
            <p className="text-xs font-semibold text-slate-500 max-w-md mx-auto mt-1">
              We value your opinions! Enrolled parents and students are welcome to submit their review directly.
            </p>
          </div>

          {feedbackSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
              <span className="text-sm font-bold block mb-1">Feedback Submitted Successfully!</span>
              <span className="text-xs font-semibold text-emerald-600">Thank you for your valuable feedback. It has been added to our reviews above.</span>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="E.g. Rajesh Kumar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Class/Grade</label>
                  <input
                    type="text"
                    required
                    value={feedbackClass}
                    onChange={(e) => setFeedbackClass(e.target.value)}
                    placeholder="E.g. Class 10 or Nursery"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">I am a...</label>
                  <select
                    value={feedbackRelation}
                    onChange={(e) => setFeedbackRelation(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center gap-1.5 h-[38px]">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFeedbackRating(num)}
                        className="text-accent focus:outline-none transition-transform active:scale-95"
                      >
                        <Star
                          size={20}
                          className={num <= feedbackRating ? 'fill-accent text-accent' : 'text-slate-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your experience with Ratna Coaching Centre..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-xs shadow-md transition-all mt-2 cursor-pointer"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
