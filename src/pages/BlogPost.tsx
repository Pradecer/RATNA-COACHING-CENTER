import React from 'react';
import { useSiteData } from '../context/DataContext';
import { useRouter, Link } from '../components/Router';
import { ArrowLeft, User, Calendar, Clock, Share2, MessageSquare, AlertCircle } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { data } = useSiteData();
  const { navigate } = useRouter();

  // Parse slug from URL pathname (e.g., /blog/some-slug-here)
  const pathname = window.location.pathname;
  const slug = pathname.substring(pathname.lastIndexOf('/') + 1);

  // Look up post
  const post = data.blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm max-w-md w-full text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={44} />
          <h2 className="text-xl font-bold font-serif text-primary">Article Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">
            The requested blog post could not be located. It may have been renamed or deleted by the administration staff.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 mt-6 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light transition-all"
          >
            <ArrowLeft size={14} />
            Back to Notice Board
          </Link>
        </div>
      </div>
    );
  }

  // Parse markdown helper
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // 1. Headings (E.g. ### Title)
      if (line.trim().startsWith('###')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-serif font-bold text-primary mt-6 mb-3">
            {line.replace('###', '').trim()}
          </h3>
        );
      }
      
      // 2. Sub-headings (E.g. # E.g. 1. Title)
      if (line.trim().startsWith('##')) {
        return (
          <h4 key={idx} className="text-base sm:text-lg font-serif font-bold text-primary mt-5 mb-2.5">
            {line.replace('##', '').trim()}
          </h4>
        );
      }

      // 3. Bullet list items (E.g. - item or * item)
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
        const cleanItem = line.trim().substring(1).trim();
        
        // Handle basic bold matching: **text**
        const parts = cleanItem.split('**');
        
        return (
          <ul key={idx} className="list-disc pl-5 my-2 text-xs font-semibold text-slate-600 leading-relaxed">
            <li>
              {parts.map((part, index) => 
                index % 2 === 1 ? <strong key={index} className="text-slate-800">{part}</strong> : part
              )}
            </li>
          </ul>
        );
      }

      // 4. Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-3"></div>;
      }

      // 5. Default paragraphs
      // Handle basic bold matching: **text**
      const parts = line.split('**');
      return (
        <p key={idx} className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed mb-4">
          {parts.map((part, index) => 
            index % 2 === 1 ? <strong key={index} className="text-slate-800">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  // Get 2 related posts
  const relatedPosts = data.blogs
    .filter(b => b.id !== post.id)
    .slice(0, 2);

  const handleShare = (platform: string) => {
    alert(`Mock Share: Sharing article URL to ${platform}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Back Link */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog Listing
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm mb-12">
          
          {/* Cover Hero */}
          <div className="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
            <img 
              src={post.image} 
              alt={post.title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-primary/95 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded shadow">
              {post.category}
            </div>
          </div>

          {/* Title and Metadata */}
          <div className="px-6 py-6 sm:px-10 sm:py-8 border-b border-slate-50 bg-slate-50/20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary leading-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-700">
                <User size={14} className="text-accent" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {renderContent(post.content)}
          </div>

          {/* Social share panel */}
          <div className="px-6 py-5 sm:px-10 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4 bg-slate-50/10">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Share2 size={14} />
              Share this article
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare('WhatsApp')}
                className="h-8 px-3 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 flex items-center gap-1 text-[10px] font-bold transition-all"
              >
                <MessageSquare size={12} />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('Facebook')}
                className="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 flex items-center gap-1.5 text-[10px] font-bold transition-all"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button
                onClick={() => handleShare('Twitter')}
                className="h-8 px-3 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white border border-sky-100 flex items-center gap-1.5 text-[10px] font-bold transition-all"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </button>
            </div>
          </div>

        </article>

        {/* Director Profile Highlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-6 items-center mb-16">
          <div className="sm:col-span-1 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Author Seema Swami" 
              className="h-20 w-20 rounded-full object-cover border border-slate-200"
            />
          </div>
          <div className="sm:col-span-3 text-center sm:text-left">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-0.5">About The Author</span>
            <h4 className="font-serif font-bold text-base text-primary mb-2">Seema Swami (Director)</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Seema Swami is the founder and Biology educator at Ratna Coaching Centre. She hosts pre-medical Biology video lectures on her YouTube channel, <strong className="text-slate-700">BioMaster Seema</strong>.
            </p>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="font-serif font-bold text-xl text-primary mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(rel => (
                <div 
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm p-4 hover:shadow-md cursor-pointer flex gap-4 transition-all"
                >
                  <img 
                    src={rel.image} 
                    alt={rel.title} 
                    className="h-16 w-20 object-cover rounded-xl bg-slate-100 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[8px] font-extrabold text-accent bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-slate-800 leading-snug mt-1 line-clamp-2 hover:text-primary">
                      {rel.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
