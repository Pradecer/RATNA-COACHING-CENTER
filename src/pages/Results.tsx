import React from 'react';
import { useSiteData } from '../context/DataContext';
import { Trophy, Star, ShieldCheck } from 'lucide-react';

export const Results: React.FC = () => {
  const { data } = useSiteData();

  const statistics = [
    { label: 'Overall Board Pass Rate', value: '100%' },
    { label: 'NEET Biology Qualified Ratio', value: '92%' },
    { label: 'Students Scoring 90%+', value: '42%' },
    { label: 'Biology Individual Score Avg', value: '94/100' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Wall of Honor
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Results & Achievements
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Witness the achievements of our board qualifiers and competitive exam NEET scholars. We celebrate their hard work and consistency.
          </p>
        </div>

        {/* 1. Metric Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {statistics.map((stat, idx) => (
            <div key={idx} className="bg-primary text-white rounded-3xl p-6 shadow-md border-b-4 border-accent text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-white/5 rounded-bl-full"></div>
              <span className="text-3xl sm:text-4xl font-extrabold font-serif text-accent block mb-2">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider block">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 2. Toppers Cards Grid */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8 flex items-center gap-2">
            <Trophy className="text-accent" size={24} />
            Board & Competitive Toppers
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.toppers.map((topper) => (
              <div 
                key={topper.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all"
              >
                <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={topper.image} 
                    alt={topper.name} 
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Floating Score Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10 text-white shadow-md">
                    <span className="text-xs font-extrabold text-accent block leading-none">{topper.score}</span>
                    <span className="text-[9px] font-bold text-slate-300 block mt-1">{topper.classLevel}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-base text-primary">{topper.name}</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Session Year: {topper.year} • {topper.category}
                  </span>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2">
                    {topper.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Success Stories profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {data.successStories.map((story) => (
            <div 
              key={story.id} 
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent"></div>
              
              <div className="flex gap-4 items-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/15 text-primary flex items-center justify-center">
                  <Star size={20} className="fill-accent text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-primary">{story.studentName}</h3>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">{story.achievement}</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                {story.story}
              </p>
            </div>
          ))}
        </div>

        {/* 4. Awards & Institutional Credentials */}
        <div className="bg-primary text-slate-100 rounded-3xl p-8 border-b-2 border-accent text-center max-w-4xl mx-auto">
          <h3 className="font-serif font-bold text-2xl text-accent mb-4">Institutional Recognition</h3>
          <p className="text-xs font-semibold text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Ratna Coaching Centre has been recognized locally for its pioneering individual prep methodologies and micro-classroom format. We prioritize qualitative concept delivery over mass classrooms.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-accent" />
              Certified NCERT Diagram Guides
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-accent" />
              100% CBSE Pass Rate Record
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-accent" />
              Verified Local Business Award
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
