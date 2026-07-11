import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { useRouter } from '../components/Router';
import { GraduationCap, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Courses: React.FC = () => {
  const { data } = useSiteData();
  const { navigate } = useRouter();

  // Accordion expanded state by course ID
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Category filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'primary' | 'secondary' | 'specialized'>('all');

  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  const filteredCourses = data.courses.filter(course => {
    if (activeCategory === 'all') return true;
    return course.category === activeCategory;
  });

  const handleEnquire = (courseName: string) => {
    navigate(`/admissions?course=${encodeURIComponent(courseName)}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Program Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Our Academic Programs
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            From early childhood foundations to advanced medical entrance biology coaching, explore our structural classes. Click on any card to view timing details and syllabus plans.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-slate-200 gap-2 mb-10 overflow-x-auto pb-1.5 scrollbar-hide">
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'primary', label: 'Pre-Nursery & Kindergarten' },
            { id: 'secondary', label: 'School Classes 1–10' },
            { id: 'specialized', label: 'Biology & NEET Prep' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-100 hover:border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Listing */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;
            const isSpecialized = course.category === 'specialized';
            
            return (
              <div 
                key={course.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${
                  isExpanded ? 'shadow-md border-primary/20' : 'shadow-sm border-slate-100'
                }`}
              >
                
                {/* Header Container */}
                <div 
                  onClick={() => toggleExpand(course.id)}
                  className={`p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 select-none relative ${
                    isSpecialized ? 'bg-gradient-to-r from-primary/5 via-white to-white' : ''
                  }`}
                >
                  {/* Specialized Accent strip */}
                  {isSpecialized && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"></div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSpecialized ? 'bg-accent/15 text-primary' : 'bg-primary/5 text-primary'
                    }`}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-lg text-primary">{course.name}</h3>
                        {course.featured && (
                          <span className="text-[8px] font-extrabold bg-accent text-primary-dark px-2 py-0.5 rounded uppercase tracking-wider">
                            Flagship
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-400 block mt-0.5">Eligibility: {course.eligibility}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-bold text-slate-400">
                      {isExpanded ? 'Collapse Details' : 'View Details'}
                    </span>
                    <div className="text-slate-400 p-1.5 rounded-lg border border-slate-100">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-4">
                      
                      {/* Left: Detail Lists */}
                      <div className="md:col-span-8 flex flex-col gap-6">
                        
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Program Overview</h4>
                          <p className="text-xs font-semibold text-slate-500 leading-relaxed">{course.description}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Key Syllabus Modules</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {course.syllabus.map((item, idx) => (
                              <div key={idx} className="flex gap-2 items-start text-xs font-bold text-slate-700">
                                <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Subjects Covered</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.subjects.map((sub, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right: Box highlight timings and CTAs */}
                      <div className="md:col-span-4 bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-4">
                        
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Batch Setup</span>
                          <span className="text-xs font-bold text-slate-700 block mt-1">{course.batchType}</span>
                        </div>

                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Timing Schedule</span>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mt-1">
                            <Clock size={14} className="text-slate-400 flex-shrink-0" />
                            <span>{course.timing}</span>
                          </div>
                        </div>

                        {course.fee && (
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Tuition Fees</span>
                            <span className="text-lg font-extrabold text-primary block mt-0.5">{course.fee}</span>
                          </div>
                        )}

                        <button
                          onClick={() => handleEnquire(course.name)}
                          className="w-full py-3.5 bg-primary text-white font-bold rounded-xl text-center text-xs shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-1 cursor-pointer mt-2"
                        >
                          Enquire Now
                        </button>
                        
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Bottom banner block */}
        <div className="bg-primary text-slate-100 rounded-3xl p-6 sm:p-10 shadow-md border-b-2 border-accent mt-16 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-full -z-10"></div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-serif font-bold text-xl">Not sure which track is best?</h3>
            <p className="text-xs font-semibold text-slate-300 max-w-md">
              Schedule a free diagnostic evaluation session with Director Seema Swami to map student conceptual levels and customize batch slot timings.
            </p>
          </div>
          <button 
            onClick={() => navigate('/contact-us')}
            className="rounded-xl bg-accent text-primary-dark font-bold text-xs px-6 py-3.5 hover:brightness-105 shadow-md flex-shrink-0"
          >
            Talk to Counselor
          </button>
        </div>

      </div>
    </div>
  );
};
