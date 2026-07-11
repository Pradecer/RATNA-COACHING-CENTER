import React from 'react';
import { useSiteData } from '../context/DataContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { Link } from '../components/Router';

export const Subjects: React.FC = () => {
  const { data } = useSiteData();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Our Curriculum
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Subjects Covered
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            We deliver highly structured prep content across primary school topics, board examinations, and pre-medical entry disciplines. Discover our customized pedagogical approaches.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.subjects.map((sub) => (
            <div 
              key={sub.id} 
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all group"
            >
              <div className="flex flex-col gap-4">
                
                {/* Icon Container */}
                <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-colors duration-300">
                  <DynamicIcon name={sub.iconName} size={22} className="stroke-[2]" />
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-primary">{sub.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-amber-50 text-accent font-bold text-[9px] uppercase tracking-wider mt-1">
                    {sub.classes}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {sub.approach}
                </p>

              </div>
              
              <div className="border-t border-slate-50 pt-4 mt-6 text-right">
                <Link 
                  to="/courses"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-primary transition-colors"
                >
                  View Related Batches
                  <DynamicIcon name="ChevronRight" size={12} className="stroke-[2.5]" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
