import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Search, Download, FileText } from 'lucide-react';
import type { StudyResource } from '../data/initialData';

export const StudyResources: React.FC = () => {
  const { data } = useSiteData();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'all' | StudyResource['type']>('all');
  const [classFilter, setClassFilter] = useState('');

  const handleDownload = (title: string) => {
    alert(`Downloading "${title}" ... (In production, this triggers a direct PDF payload stream)`);
  };

  const filteredResources = data.resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = activeType === 'all' ? true : res.type === activeType;
    const matchesClass = classFilter ? res.classLevel === classFilter : true;
    
    return matchesSearch && matchesType && matchesClass;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Academic Vault
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Study Resources & Worksheets
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Access our library of notes, practice sheets, holiday homework packs, and mock board papers. Search by title or subject tags.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, worksheets, biology..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-primary font-semibold"
              />
            </div>

            {/* Target Class Selector */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-xs font-bold text-slate-600 focus:outline-none"
            >
              <option value="">All Classes</option>
              <option value="Pre-Nursery">Pre-Nursery</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>

          {/* Type Tab Filter buttons */}
          <div className="flex overflow-x-auto gap-1.5 scrollbar-hide py-0.5">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'Notes', label: 'Notes' },
              { id: 'Worksheets', label: 'Worksheets' },
              { id: 'Sample Papers', label: 'Sample Papers' },
              { id: 'Holiday Homework', label: 'Holiday Homework' },
              { id: 'NCERT', label: 'NCERT' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id as any)}
                className={`px-3 py-2 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                  activeType === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Resources Table Listing */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {filteredResources.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4.5 px-6">Document Title</th>
                    <th className="py-4.5 px-4">Subject Tag</th>
                    <th className="py-4.5 px-4">File Details</th>
                    <th className="py-4.5 px-6 text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {filteredResources.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/30">
                      
                      {/* Title Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center flex-shrink-0">
                            <FileText size={16} />
                          </div>
                          <span className="font-serif font-bold text-slate-800 text-sm">{res.title}</span>
                        </div>
                      </td>

                      {/* Subject Class tags */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-bold mr-2">
                          {res.classLevel}
                        </span>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{res.subject}</span>
                      </td>

                      {/* Type Size */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-amber-50 text-accent font-extrabold text-[9px] uppercase tracking-wider mr-2">
                          {res.type}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px] font-medium">{res.fileSize}</span>
                      </td>

                      {/* Download trigger */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDownload(res.title)}
                          className="h-8 w-8 rounded-lg border border-slate-100 text-slate-500 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center ml-auto transition-all"
                          title="Download PDF"
                        >
                          <Download size={14} className="stroke-[2.5]" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 font-bold">
              No files match your filter selections or query.
            </div>
          )}
        </div>

        {/* Administrative message strip */}
        <div className="mt-8 text-center text-[10px] text-slate-400 font-bold">
          * Administrative staff can add notes and upload files by signing in to the CMS dashboard link in the footer.
        </div>

      </div>
    </div>
  );
};
