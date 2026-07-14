import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Camera, X, Maximize2, Play, Video } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { data } = useSiteData();

  // Filter state for media
  const [mediaFilter, setMediaFilter] = useState<'all' | 'classroom' | 'event' | 'activity' | 'summercamp'>('all');

  // Lightbox modal state
  const [activeLightboxItem, setActiveLightboxItem] = useState<{ url: string; title: string; type: 'photo' | 'video' } | null>(null);

  const filteredItems = data.gallery.filter(item => {
    if (mediaFilter === 'all') return true;
    return item.category === mediaFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Media Library
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Our Gallery & Classroom Glimpses
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Browse snapshots of daily classes, assessments, awards ceremonies, interactive pre-medical biology learning sessions, and exciting activities like our Summer Camp.
          </p>
        </div>

        {/* MEDIA SECTION */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-5 mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
              <Camera className="text-accent" size={24} />
              Classroom, Event & Activity Gallery
            </h2>
            
            {/* Gallery Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Photos & Videos' },
                { id: 'classroom', label: 'Classrooms' },
                { id: 'event', label: 'Events & Awards' },
                { id: 'activity', label: 'Activities' },
                { id: 'summercamp', label: 'Summer Camp' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMediaFilter(tab.id as any)}
                  className={`px-3 py-1.5 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    mediaFilter === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isVideo = item.type === 'video';
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveLightboxItem({ url: item.url, title: item.title, type: item.type })}
                  className="group relative aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
                >
                  {isVideo ? (
                    <div className="relative h-full w-full">
                      <video 
                        src={item.url + "#t=0.1"} 
                        preload="metadata" 
                        muted 
                        playsInline 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play size={22} className="fill-primary text-primary ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {/* Hover overlay details */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest">
                      {item.category === 'summercamp' ? 'Summer Camp' : item.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm leading-tight mt-1 flex items-center justify-between gap-2">
                      {item.title}
                      {isVideo ? <Video size={16} className="text-white/80" /> : <Maximize2 size={16} className="text-white/80" />}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            
            <div className="max-w-4xl w-full flex flex-col gap-4">
              {activeLightboxItem.type === 'video' ? (
                <video 
                  src={activeLightboxItem.url} 
                  controls 
                  autoPlay 
                  className="max-h-[75vh] w-auto mx-auto rounded-lg shadow-2xl"
                />
              ) : (
                <img 
                  src={activeLightboxItem.url} 
                  alt={activeLightboxItem.title} 
                  className="max-h-[75vh] w-auto mx-auto object-contain rounded-lg shadow-2xl"
                />
              )}
              <p className="text-center font-serif font-bold text-white text-base">
                {activeLightboxItem.title}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
