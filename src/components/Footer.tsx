import React from 'react';
import { Link } from './Router';
import { GraduationCap, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();


  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter! We will keep you updated with the latest educational notices.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="bg-primary text-slate-100 border-t-2 border-accent">
      {/* Top Banner section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary shadow-md">
                <GraduationCap size={24} className="stroke-[2]" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight block">RATNA COACHING</span>
                <span className="text-[10px] tracking-widest text-accent font-sans font-semibold uppercase leading-none">
                  Centre of Excellence
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Providing premium academic mentoring from Pre-Nursery to Class 12, specialized Class 10 & 12 Biology coaching, and NEET Foundation programs.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-2">
              <a 
                href="https://youtube.com/@BioMasterSeema" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all text-slate-300"
                title="Subscribe on YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.048 0 12 0 12s0 3.951.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.951 24 12 24 12s0-3.952-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/919999999999?text=Hello%20Ratna%20Coaching%20Centre,%20I%20want%20to%20enquire%20about%20admissions." 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all text-slate-300"
                title="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.588 1.97 14.118.945 11.997.945c-5.442 0-9.87 4.372-9.874 9.802-.002 2.016.529 3.987 1.538 5.734l-.993 3.626 3.73-.974.249.148z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all text-slate-300"
                title="Follow on Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all text-slate-300"
                title="Follow on Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4 md:pl-4">
            <h3 className="font-serif text-base font-semibold text-accent tracking-wider uppercase">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-300">
              <li><Link to="/about-us" className="hover:text-accent transition-colors">Our Story & Mission</Link></li>
              <li><Link to="/courses" className="hover:text-accent transition-colors">All Courses Offered</Link></li>
              <li><Link to="/subjects" className="hover:text-accent transition-colors">Subject Overviews</Link></li>
              <li><Link to="/facilities" className="hover:text-accent transition-colors">Our Learning Facilities</Link></li>
              <li><Link to="/results-achievements" className="hover:text-accent transition-colors">Toppers & Results</Link></li>
              <li><Link to="/gallery" className="hover:text-accent transition-colors">Photo & Video Gallery</Link></li>
              <li><Link to="/testimonials" className="hover:text-accent transition-colors">Student Testimonials</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold text-accent tracking-wider uppercase">Contact Details</h3>
            <ul className="flex flex-col gap-3.5 text-sm font-semibold text-slate-300">
              <li className="flex gap-2.5 items-start">
                <MapPin className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <span>
                  2115 Ground Floor, Sector 9, Near Nandan Park, Ballabgarh, Faridabad (121004)
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="text-accent flex-shrink-0" size={18} />
                <a href="tel:+919999999999" className="hover:text-accent transition-colors">+91 99999 99999</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="text-accent flex-shrink-0" size={18} />
                <a href="mailto:info@ratnacoachingcentre.in" className="hover:text-accent transition-colors">info@ratnacoachingcentre.in</a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Clock className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <div className="text-xs">
                  <span className="block font-bold text-slate-200">Mon – Sat: 10:00 AM – 8:00 PM</span>
                  <span className="block text-slate-400 font-medium">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold text-accent tracking-wider uppercase">Newsletter</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Subscribe to receive updates on admissions schedules, exam dates, study checklists, and mock test timetables.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-semibold transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-accent text-primary flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-semibold text-slate-400">
          <p>© {currentYear} Ratna Coaching Centre. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-slate-300 transition-colors">CMS Staff Login</Link>
            <span>|</span>
            <span className="flex items-center gap-1">
              Developed with 
              <span className="text-red-500 font-bold text-sm">♥</span> 
              for Premium Quality
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
