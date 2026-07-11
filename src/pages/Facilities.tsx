import React from 'react';
import { useSiteData } from '../context/DataContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { ShieldCheck } from 'lucide-react';

export const Facilities: React.FC = () => {
  const { data } = useSiteData();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Learning Environment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Our Learning Facilities
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            We provide a modern, supportive, and distraction-free workspace designed to optimize student focus and enable interactive faculty-student dialogue.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.facilities.map((fac) => (
            <div 
              key={fac.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              
              {/* Image Section */}
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <img 
                  src={fac.image} 
                  alt={fac.name} 
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                
                {/* Floating Icon badge */}
                <div className="absolute bottom-4 left-4 h-9 w-9 rounded-xl bg-primary text-accent flex items-center justify-center shadow-md">
                  <DynamicIcon name={fac.iconName} size={18} />
                </div>
              </div>

              {/* Text details */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-serif font-bold text-lg text-primary">{fac.name}</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {fac.description}
                </p>
              </div>

              {/* Verification status strip */}
              <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100/60 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                <ShieldCheck size={14} className="text-accent" />
                Active Operational Standard
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
