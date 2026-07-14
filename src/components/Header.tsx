import React, { useState, useEffect } from 'react';
import { useRouter, Link } from './Router';
import { Menu, X, GraduationCap, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { path } = useRouter();
  const { student, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);


  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about-us' },
    { name: 'Courses', to: '/courses' },
    { name: 'Subjects', to: '/subjects' },
    { name: 'Results', to: '/results-achievements' },
    { name: 'Resources', to: '/study-resources' },
    { name: 'Blog', to: '/blog' },
    { name: 'Contact', to: '/contact-us' },
  ];

  const moreLinks = [
    { name: 'Facilities', to: '/facilities' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Testimonials', to: '/testimonials' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return path === '/';
    return path.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Academic Logo Section */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-accent shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-200">
            <GraduationCap size={26} className="stroke-[1.5]" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold tracking-tight text-primary flex items-center gap-1 leading-tight">
              RATNA
              <span className="text-xs font-sans font-semibold text-accent px-1.5 py-0.5 rounded bg-primary/5 tracking-wider">
                CENTRE
              </span>
            </div>
            <p className="text-[10px] tracking-wider text-slate-500 font-semibold uppercase leading-none mt-0.5">
              Coaching & NEET Prep
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                isActive(link.to)
                  ? 'text-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Dropdown for More Links */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                moreLinks.some(l => isActive(l.to))
                  ? 'text-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary hover:bg-slate-50'
              }`}
            >
              More
              <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                {moreLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      isActive(link.to)
                        ? 'text-primary bg-primary/5'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* CTA & Mobile Controls */}
        <div className="flex items-center gap-3">
          {student ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/portal"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-all border border-primary/10"
              >
                <User size={15} />
                Hi, {student.name.split(' ')[0]}
              </Link>
              <button
                onClick={logout}
                className="p-2.5 text-slate-500 hover:text-red-600 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : isAdmin ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-all border border-primary/10"
              >
                <LayoutDashboard size={15} />
                CMS Admin
              </Link>
              <button
                onClick={logout}
                className="p-2.5 text-slate-500 hover:text-red-600 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-accent-hover px-5 py-2.5 text-sm font-bold text-primary-dark shadow-md hover:shadow-lg hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] transition-all"
            >
              Apply Now
            </Link>
          )}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-700 lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-inner animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-1.5">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-base font-bold rounded-xl transition-all ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/5 border-l-4 border-primary pl-3'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-2">
              {student ? (
                <>
                  <Link
                    to="/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-primary/5 py-3 text-base font-bold text-primary"
                  >
                    Hi, {student.name} (Portal)
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center rounded-xl border border-red-200 hover:bg-red-50 text-red-600 py-3 text-sm font-semibold cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-primary/5 py-3 text-base font-bold text-primary"
                  >
                    CMS Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center rounded-xl border border-red-200 hover:bg-red-50 text-red-600 py-3 text-sm font-semibold cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent to-accent-hover py-3.5 text-base font-bold text-primary-dark shadow-md"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
