import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Camera, Video, X, Maximize2, ExternalLink } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { data } = useSiteData();

  // Filter state for photos
  const [photoFilter, setPhotoFilter] = useState<'all' | 'classroom' | 'event' | 'activity'>('all');

  // Lightbox modal state
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; title: string } | null>(null);

  const photos = data.gallery.filter(item => item.type === 'photo');
  const videos = data.gallery.filter(item => item.type === 'video');

  const filteredPhotos = photos.filter(img => {
    if (photoFilter === 'all') return true;
    return img.category === photoFilter;
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
            Our Gallery & Video Lectures
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Browse snapshots of daily classes, assessments, awards ceremonies, and watch pre-medical biology lecture sessions led by Director Seema Swami.
          </p>
        </div>

        {/* 1. PHOTOGRAPH SECTION */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-5 mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
              <Camera className="text-accent" size={24} />
              Classroom & Event Photos
            </h2>
            
            {/* Gallery Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'classroom', label: 'Classrooms' },
                { id: 'event', label: 'Events & Awards' },
                { id: 'activity', label: 'Activities' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPhotoFilter(tab.id as any)}
                  className={`px-3 py-1.5 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                    photoFilter === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.map((img) => (
              <div 
                key={img.id}
                onClick={() => setActiveLightboxImg({ url: img.url, title: img.title })}
                className="group relative aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest">{img.category}</span>
                  <h3 className="font-serif font-bold text-sm leading-tight mt-1 flex items-center justify-between gap-2">
                    {img.title}
                    <Maximize2 size={16} className="text-white/80" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. VIDEO LECTURE SECTION (BioMaster Seema YouTube embeds) */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-5 mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                <Video className="text-accent" size={24} />
                Video Lectures & Tutorials
              </h2>
              <span className="text-xs text-slate-400 font-bold block mt-1">Sourced from YouTube Channel: "BioMaster Seema"</span>
            </div>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent border-b border-primary/20 pb-0.5"
            >
              Subscribe on YouTube
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div 
                key={vid.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                {/* Responsive Iframe container */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe 
                    src={vid.url} 
                    title={vid.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  ></iframe>
                </div>
                
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-700 font-extrabold text-[8px] uppercase tracking-wider">
                    Biology Tutorial
                  </span>
                  <h3 className="font-serif font-bold text-base text-primary mt-1">{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeLightboxImg && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            
            <div className="max-w-4xl w-full flex flex-col gap-4">
              <img 
                src={activeLightboxImg.url} 
                alt={activeLightboxImg.title} 
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-lg shadow-2xl"
              />
              <p className="text-center font-serif font-bold text-white text-base">
                {activeLightboxImg.title}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
