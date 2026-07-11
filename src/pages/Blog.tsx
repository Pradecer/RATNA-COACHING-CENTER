import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { useRouter } from '../components/Router';
import { Search, ArrowRight, User, Calendar } from 'lucide-react';
import type { BlogPost } from '../data/initialData';

export const Blog: React.FC = () => {
  const { data } = useSiteData();
  const { navigate } = useRouter();

  // Search/Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogPost['category']>('all');

  const handleCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const filteredBlogs = data.blogs.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' ? true : post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Academic Blog & Notices
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Stay up to date with exam blueprints, biology study checklists, stress management routines, and official coaching bulletins authored by Director Seema Swami.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, keywords, tags..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-primary font-semibold"
            />
          </div>

          <div className="flex overflow-x-auto gap-1.5 scrollbar-hide py-0.5">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'Biology Focus', label: 'Biology Special' },
              { id: 'Study Tips', label: 'Study Tips' },
              { id: 'Exam Updates', label: 'Exam Alerts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3 py-2.5 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Blog Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post) => (
              <article 
                key={post.id}
                onClick={() => handleCardClick(post.slug)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between cursor-pointer group"
              >
                
                {/* Image & Category banner */}
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary/95 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    {post.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-primary leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2.5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer strip details */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-slate-400">
                    <User size={12} />
                    By Seema
                  </span>
                  
                  <span className="inline-flex items-center gap-0.5 text-primary hover:text-accent">
                    Read Article
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-100">
              No articles found matching criteria.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
