import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/DataContext';
import { Link, useRouter } from '../components/Router';
import { DynamicIcon } from '../components/DynamicIcon';
import { 
  GraduationCap, Phone, CheckCircle, ChevronRight, Award, Bell, BookOpen, Clock, Users, ArrowRight, Star, Calendar 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { data } = useSiteData();
  const { navigate } = useRouter();

  // Get active notices
  const activeNotices = data.notices.filter(n => n.active);

  // Testimonials sliding index
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    if (data.testimonials.length === 0) return;
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % data.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.testimonials.length]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Scrolling Notice Ticker (PRD: persistent Notice Board widget) */}
      {activeNotices.length > 0 && (
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white py-2.5 px-4 overflow-hidden relative border-b border-accent/20">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="flex items-center gap-1 bg-accent text-primary-dark text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex-shrink-0 animate-pulse">
              <Bell size={10} className="fill-current" />
              Notices:
            </span>
            <div className="relative overflow-hidden w-full h-5">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-semibold select-none text-slate-100">
                {activeNotices.map((n) => (
                  <span key={n.id} className="hover:text-accent cursor-pointer" onClick={() => navigate('/blog')}>
                    • {n.title} ({n.date})
                  </span>
                ))}
                {/* Duplicate for infinite effect */}
                {activeNotices.map((n) => (
                  <span key={`${n.id}-dup`} className="hover:text-accent cursor-pointer" onClick={() => navigate('/blog')}>
                    • {n.title} ({n.date})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-white to-transparent py-16 sm:py-24">
        
        {/* Abstract background blobs */}
        <div className="absolute top-12 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute right-10 bottom-10 -z-10 h-56 w-56 rounded-full bg-primary/5 blur-2xl"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex self-center lg:self-start items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-primary border border-accent/25">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping"></span>
                Admissions Open for Session 2026 - 2027
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-primary leading-tight tracking-tight">
                Unlock Academic Potential <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-medium italic">
                  With Personal Mentorship
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Ratna Coaching Centre offers specialized guidance from Pre-Nursery to Class 12, featuring flagship Biology coaching and NEET foundation classes led by Director Seema Swami.
              </p>

              {/* Action Buttons (Thumb-reachable on mobile) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
                <Link
                  to="/admissions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover px-8 py-4 text-base font-bold text-primary-dark shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Apply Online Now
                  <ChevronRight size={18} />
                </Link>
                
                <a
                  href="tel:+919999999999"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary bg-white px-7 py-3.5 text-sm font-extrabold hover:bg-slate-50 transition-all"
                >
                  <Phone size={16} />
                  Call Counselor
                </a>
              </div>

              {/* Statistics row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8 mt-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="block text-3xl font-extrabold text-primary font-serif">10+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Years Experience</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-primary font-serif">15</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Max Class Size</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-primary font-serif">98%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Board Success</span>
                </div>
              </div>
            </div>

            {/* Right Block: Image card with gold border and badge overlay */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-br from-primary to-accent shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800"
                  alt="Students at Ratna Coaching Centre"
                  className="rounded-2xl h-[360px] sm:h-[420px] w-full object-cover bg-white"
                />
                
                {/* Floating overlays */}
                <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white">
                  <h3 className="font-serif font-bold text-base flex items-center gap-1.5">
                    <Award size={18} className="text-accent" />
                    Individual Biology Specialization
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-normal mt-1">
                    Specialized guidance with hand-made genetics notes & NCERT diagram checklists.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Welcome Intro Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 text-center flex flex-col gap-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Welcome to Ratna</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">Empowering Future Achievers</h2>
          <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-3xl mx-auto">
            Founded with a vision to deliver academic distinction, Ratna Coaching Centre provides tutoring structures that bridge early childhood foundations to competitive boards and NEET readiness. Led by expert educators and Biology mentor Seema Swami, we combine micro-sized classrooms with rigorous assessment models.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/about-us" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors">
              Read Director's Message
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Flagship Courses Snapshot */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Academic Tracks</span>
              <h2 className="text-3xl font-serif font-bold text-primary mt-1">Flagship Study Programs</h2>
            </div>
            <Link to="/courses" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent border-b border-primary/20 pb-0.5 transition-colors">
              Explore All Courses
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.courses.filter(c => c.featured).map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all"
              >
                {/* Flagship accent label */}
                <div className="absolute top-0 right-0 bg-accent text-primary-dark font-extrabold text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl shadow-sm">
                  Flagship Offering
                </div>
                
                <div className="flex flex-col gap-4 mt-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">{course.name}</h3>
                    <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{course.eligibility}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">{course.description}</p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Timing Slot</span>
                    <span className="text-[11px] font-bold text-slate-700 block mt-1">{course.timing.split(' (')[0]}</span>
                  </div>
                  <Link 
                    to={`/admissions?course=${encodeURIComponent(course.name)}`}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-white hover:bg-accent hover:text-primary-dark shadow-sm transition-all"
                    title="Enquire Now"
                  >
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Fallback card for comprehensive schooling */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all">
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-primary">Pre-Nursery to Class 12</h3>
                  <span className="text-[10px] font-bold text-slate-400 block mt-0.5">Comprehensive School Coaching</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Complete batch preparations covering all state and national board subjects, daily homework help, Vedic math drills, and mock evaluation reviews.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Evening Batches</span>
                  <span className="text-[11px] font-bold text-slate-700 block mt-1">3:00 PM – 8:00 PM</span>
                </div>
                <Link 
                  to="/courses"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-white hover:bg-accent hover:text-primary-dark shadow-sm transition-all"
                >
                  <ChevronRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. Why Choose Us (mini version) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Edge</span>
            <h2 className="text-3xl font-serif font-bold text-primary mt-1">Why Choose Ratna Coaching</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Small Batches', text: 'Limited to 15 students to track individual notebooks and writing patterns.', icon: 'Users' },
              { title: 'Proven Results', text: 'Stunning district board records and premium MBBS NEET qualifiers.', icon: 'Award' },
              { title: 'Experienced Faculty', text: 'Syllabus delivered by subject specialists and expert board counselors.', icon: 'UserCheck' },
              { title: 'Doubt Sessions', text: 'Daily 30-minute custom revision slots before and after regular lectures.', icon: 'HelpCircle' },
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-accent hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="h-9 w-9 rounded-xl bg-primary text-accent flex items-center justify-center mb-4">
                  <DynamicIcon name={card.icon} size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 6. Live Timetable Dashboard */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Active Batch Timings</span>
            <h2 className="text-3xl font-serif font-bold text-primary mt-1">Operational Timings & Batch Slots</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Table Header Accent banner */}
            <div className="bg-primary py-4 px-6 text-white text-sm font-bold flex items-center gap-2">
              <Clock size={18} className="text-accent" />
              Academic Class Timetable slots
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              
              {/* Timing 1 */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider border-l-4 border-accent pl-2.5">
                  Morning (Individual Coaching) — Mon–Sat
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-slate-100 text-xs font-semibold">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] border-b border-slate-100">
                        <th className="py-3 px-4 w-1/3">Time Slot</th>
                        <th className="py-3 px-4">Subject & Fees Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-4 px-4 font-bold text-slate-800 align-top">10:00 AM – 12:00 PM</td>
                        <td className="py-4 px-4">
                          <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                            <li>Class 10 Biology</li>
                            <li>Class 12 Biology</li>
                            <li>One-to-One Individual Coaching</li>
                            <li className="font-bold text-primary">Fee: ₹500 per hour</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timing 2 */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider border-l-4 border-accent pl-2.5">
                  Evening Batch — Mon–Sat
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-slate-100 text-xs font-semibold">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] border-b border-slate-100">
                        <th className="py-3 px-4 w-1/3">Time Slot</th>
                        <th className="py-3 px-4">Subject & Batch Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-4 px-4 font-bold text-slate-800 align-top">3:00 PM – 6:00 PM</td>
                        <td className="py-4 px-4">
                          <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                            <li className="font-bold text-slate-800">Pre-Nursery to Class 8</li>
                            <li>All Subjects</li>
                            <li>Small Batch Classes</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-bold text-slate-800 align-top">6:00 PM – 8:00 PM</td>
                        <td className="py-4 px-4">
                          <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                            <li className="font-bold text-slate-800">Classes 9–12</li>
                            <li>Mathematics, Science, Biology, Physics, Chemistry</li>
                            <li>Board Exam Preparation</li>
                            <li>Foundation Courses</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center font-bold text-[10px] text-slate-400 mt-2 border-t border-slate-50 pt-4">
                * Weekly Off: Sunday (Closed). Timing details verified by the management team.
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Toppers Ticker / Grid */}
      {data.toppers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Wall of Fame</span>
                <h2 className="text-3xl font-serif font-bold text-primary mt-1">Toppers & Achievements</h2>
              </div>
              <Link to="/results-achievements" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent border-b border-primary/20 pb-0.5 transition-colors">
                View All Results
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.toppers.slice(0, 4).map((topper) => (
                <div key={topper.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                  <img
                    src={topper.image}
                    alt={topper.name}
                    className="h-24 w-24 object-cover rounded-full bg-slate-100 border border-slate-200 shadow-inner mb-4"
                  />
                  <h3 className="font-bold text-sm text-slate-800">{topper.name}</h3>
                  <span className="text-xs font-extrabold text-accent block mt-0.5">{topper.score}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">{topper.classLevel} • {topper.year}</span>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-3 line-clamp-2">{topper.highlight}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 8. Notice Board Widget Box */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-6">
              <h2 className="text-2xl font-bold font-serif text-primary flex items-center gap-2">
                <Bell size={22} className="text-accent" />
                Latest Announcements
              </h2>
              <Link to="/blog" className="text-xs font-bold text-primary hover:text-accent flex items-center gap-0.5">
                View Notice Board
                <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="flex flex-col gap-6">
              {data.notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="flex gap-4 items-start pb-5 border-b border-slate-100/60 last:border-b-0 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-slate-800">{notice.title}</h3>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        notice.type === 'urgent' ? 'bg-red-50 text-red-700' :
                        notice.type === 'admission' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {notice.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{notice.date}</span>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2.5">{notice.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive Testimonials Carousel */}
      {data.testimonials.length > 0 && (
        <section className="py-20 bg-primary text-white border-b-2 border-accent relative overflow-hidden">
          {/* Subtle star overlay */}
          <div className="absolute top-10 right-10 opacity-5 -z-10 text-white">
            <Star size={200} className="fill-current" />
          </div>
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Parents & Students Reviews</span>
            <h2 className="text-3xl font-serif font-bold mb-10">What People Say About Ratna</h2>

            <div className="min-h-[220px] flex flex-col justify-center items-center max-w-2xl">
              {/* Star rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(data.testimonials[testiIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent stroke-[1]" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl font-medium font-serif italic leading-relaxed text-slate-200">
                "{data.testimonials[testiIndex].text}"
              </blockquote>

              {/* Reviewer Details */}
              <cite className="not-italic block mt-6">
                <span className="block font-bold text-accent text-sm tracking-wider uppercase">
                  {data.testimonials[testiIndex].name}
                </span>
                <span className="block text-slate-400 text-xs font-semibold mt-1">
                  {data.testimonials[testiIndex].classLevel} ({data.testimonials[testiIndex].relation})
                </span>
              </cite>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2.5 mt-8">
              {data.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestiIndex(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    testiIndex === idx ? 'bg-accent scale-125' : 'bg-white/20'
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                ></button>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 10. Blog & Gallery Double Snippet Grid */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Latest Blog */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-1.5">
                  <BookOpen size={20} className="text-accent" />
                  Academic Articles
                </h3>
                <Link to="/blog" className="text-xs font-bold text-primary hover:text-accent">
                  Read All
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {data.blogs.slice(0, 2).map((blog) => (
                  <div key={blog.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="h-16 w-20 object-cover rounded-xl bg-slate-100 flex-shrink-0 border border-slate-100"
                    />
                    <div>
                      <span className="text-[8px] font-extrabold text-accent bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider block w-max">
                        {blog.category}
                      </span>
                      <h4 className="font-bold text-xs text-slate-800 leading-snug mt-1 hover:text-primary cursor-pointer" onClick={() => navigate('/blog')}>
                        {blog.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1">{blog.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Gallery Preview */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-1.5">
                  <Calendar size={20} className="text-accent" />
                  Institute Gallery
                </h3>
                <Link to="/gallery" className="text-xs font-bold text-primary hover:text-accent">
                  View Gallery
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {data.gallery.filter(g => g.type === 'photo').slice(0, 6).map((img) => (
                  <div 
                    key={img.id} 
                    className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                    onClick={() => navigate('/gallery')}
                  >
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Interactive Mini Map & Quick Contact strip */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl">
            
            <div className="md:col-span-8 flex flex-col gap-4">
              <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-1.5">
                <Phone size={18} className="text-accent animate-bounce" />
                Want to visit our campus center?
              </h3>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                2115 Ground Floor, Sector 9, Near Nandan Park, Ballabgarh, Faridabad (121004). Operational daily with direct counselor help. Feel free to call us or drop a WhatsApp note for batch checkouts.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-accent" />
                  Morning Individual: 10AM-12PM
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-accent" />
                  Evening School Prep: 3PM-8PM
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Link 
                to="/contact-us"
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white font-bold text-xs px-6 py-3.5 hover:bg-primary-light transition-all shadow-md"
              >
                Get Directions
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
