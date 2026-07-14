import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, LogOut, FileText, Bell, BookOpen, Award, Users, Mail, Plus, Trash2, CheckCircle2, Edit, Download, Search 
} from 'lucide-react';
import type { Notice, Topper, StudyResource, BlogPost } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    addNotice,
    updateNotice,
    deleteNotice,
    addResult,
    deleteResult,
    addResource,
    deleteResource,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateEnquiryStatus,
    deleteEnquiry,
    markContactMessageRead,
    deleteContactMessage
  } = useSiteData();

  // Authentication State
  const { isAdmin, loginAdmin, logout: contextLogout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ratna_admin_logged') === 'true' || isAdmin;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAdmin) {
      setIsAuthenticated(true);
    }
  }, [isAdmin]);

  // Tab State
  const [activeTab, setActiveTab] = useState<'enquiries' | 'notices' | 'blogs' | 'toppers' | 'resources' | 'messages'>('enquiries');

  // Modal / Form States
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeType, setNoticeType] = useState<Notice['type']>('general');
  const [noticeActive, setNoticeActive] = useState(true);

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState<BlogPost['category']>('Study Tips');
  const [blogTags, setBlogTags] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const [showTopperForm, setShowTopperForm] = useState(false);
  const [topperName, setTopperName] = useState('');
  const [topperScore, setTopperScore] = useState('');
  const [topperYear, setTopperYear] = useState('2026');
  const [topperClassLevel, setTopperClassLevel] = useState('');
  const [topperCategory, setTopperCategory] = useState<Topper['category']>('CBSE Class 12');
  const [topperHighlight, setTopperHighlight] = useState('');
  const [topperImage, setTopperImage] = useState('');

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resTitle, setResTitle] = useState('');
  const [resClass, setResClass] = useState('');
  const [resSubject, setResSubject] = useState('');
  const [resType, setResType] = useState<StudyResource['type']>('Notes');
  const [resSize, setResSize] = useState('2.0 MB');

  // Filtering states for enquiries
  const [enqSearch, setEnqSearch] = useState('');
  const [enqClassFilter, setEnqClassFilter] = useState('');
  const [enqStatusFilter, setEnqStatusFilter] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await loginAdmin(username, password);
    if (res.success) {
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ratna_admin_logged');
    contextLogout();
  };

  // CSV Export for Enquiries
  const exportEnquiriesToCSV = () => {
    if (data.admissions.length === 0) {
      alert('No enquiries available to export.');
      return;
    }

    const headers = ['ID', 'Student Name', 'Parent Name', 'Seeking Class', 'School Name', 'Mobile Number', 'Submitted At', 'Status'];
    const rows = data.admissions.map(e => [
      e.id,
      e.studentName.replace(/"/g, '""'),
      e.parentName.replace(/"/g, '""'),
      e.classLevel.replace(/"/g, '""'),
      e.schoolName.replace(/"/g, '""'),
      `="${e.mobileNumber}"`, // prevents Excel cutting off leading zeros
      e.submittedAt,
      e.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ratna_admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Notices Submissions
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNoticeId) {
      updateNotice(editingNoticeId, {
        title: noticeTitle,
        content: noticeContent,
        type: noticeType,
        active: noticeActive
      });
      setEditingNoticeId(null);
    } else {
      addNotice({
        title: noticeTitle,
        content: noticeContent,
        date: new Date().toISOString().split('T')[0],
        type: noticeType,
        active: noticeActive
      });
    }
    setNoticeTitle('');
    setNoticeContent('');
    setShowNoticeForm(false);
  };

  const startEditNotice = (n: Notice) => {
    setEditingNoticeId(n.id);
    setNoticeTitle(n.title);
    setNoticeContent(n.content);
    setNoticeType(n.type);
    setNoticeActive(n.active);
    setShowNoticeForm(true);
  };

  // Blog Submissions
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = blogTags.split(',').map(t => t.trim()).filter(Boolean);
    const defaultImage = blogImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';

    if (editingBlogId) {
      updateBlogPost(editingBlogId, {
        title: blogTitle,
        category: blogCategory,
        tags: tagsArray,
        image: defaultImage,
        excerpt: blogExcerpt,
        content: blogContent
      });
      setEditingBlogId(null);
    } else {
      addBlogPost({
        title: blogTitle,
        category: blogCategory,
        tags: tagsArray,
        image: defaultImage,
        excerpt: blogExcerpt,
        content: blogContent,
        author: 'Seema Swami (Director)'
      });
    }
    setBlogTitle('');
    setBlogImage('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogTags('');
    setShowBlogForm(false);
  };

  const startEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogTitle(b.title);
    setBlogCategory(b.category);
    setBlogTags(b.tags.join(', '));
    setBlogImage(b.image);
    setBlogExcerpt(b.excerpt);
    setBlogContent(b.content);
    setShowBlogForm(true);
  };

  // Topper Submissions
  const handleTopperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultImage = topperImage || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300';
    addResult({
      name: topperName,
      score: topperScore,
      year: topperYear,
      classLevel: topperClassLevel,
      category: topperCategory,
      highlight: topperHighlight,
      image: defaultImage
    });
    setTopperName('');
    setTopperScore('');
    setTopperClassLevel('');
    setTopperHighlight('');
    setTopperImage('');
    setShowTopperForm(false);
  };

  // Resource Submissions
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addResource({
      title: resTitle,
      classLevel: resClass,
      subject: resSubject,
      type: resType,
      fileType: 'PDF',
      fileSize: resSize,
      downloadUrl: '#'
    });
    setResTitle('');
    setResClass('');
    setResSubject('');
    setShowResourceForm(false);
  };

  // Filter Enquiries
  const filteredEnquiries = data.admissions.filter(e => {
    const matchesSearch = 
      e.studentName.toLowerCase().includes(enqSearch.toLowerCase()) ||
      e.parentName.toLowerCase().includes(enqSearch.toLowerCase()) ||
      e.schoolName.toLowerCase().includes(enqSearch.toLowerCase()) ||
      e.mobileNumber.includes(enqSearch);
      
    const matchesClass = enqClassFilter ? e.classLevel === enqClassFilter : true;
    const matchesStatus = enqStatusFilter ? e.status === enqStatusFilter : true;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
          
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4">
              <Lock size={24} className="stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-primary">CMS Admin Portal</h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">Authorized Ratna Coaching staff access only</p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-6">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all mt-2 flex items-center justify-center gap-1.5"
            >
              Sign In to CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Content Management Dashboard</h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">Hello Seema, managing updates and student enquiries.</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Dynamic Metric Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Enquiries</span>
              <span className="text-2xl font-extrabold text-primary">{data.admissions.length}</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Active Notices</span>
              <span className="text-2xl font-extrabold text-primary">{data.notices.filter(n => n.active).length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Articles</span>
              <span className="text-2xl font-extrabold text-primary">{data.blogs.length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Unread Mail</span>
              <span className="text-2xl font-extrabold text-primary">{data.contactMessages.filter(m => !m.read).length}</span>
            </div>
          </div>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 mb-6 scrollbar-hide">
          {[
            { id: 'enquiries', label: 'Admission Enquiries', icon: Users },
            { id: 'notices', label: 'Notice Board', icon: Bell },
            { id: 'blogs', label: 'Blog Posts', icon: FileText },
            { id: 'toppers', label: 'Toppers & Results', icon: Award },
            { id: 'resources', label: 'Study Resources', icon: BookOpen },
            { id: 'messages', label: 'Contact Messages', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB WORKSPACES */}

        {/* TAB 1: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Action Bar */}
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Search Bar */}
                <div className="relative w-64">
                  <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={enqSearch}
                    onChange={(e) => setEnqSearch(e.target.value)}
                    placeholder="Search name, school, phone..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary font-semibold"
                  />
                </div>

                {/* Class Filter */}
                <select
                  value={enqClassFilter}
                  onChange={(e) => setEnqClassFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none"
                >
                  <option value="">All Classes</option>
                  <option value="Pre-Nursery">Pre-Nursery</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1-5">Class 1 – 5</option>
                  <option value="Class 6-8">Class 6 – 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="NEET Biology Specialized">Biology Specialized</option>
                  <option value="NEET Foundation">NEET Foundation</option>
                </select>

                {/* Status Filter */}
                <select
                  value={enqStatusFilter}
                  onChange={(e) => setEnqStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Closed">Closed</option>
                </select>
                
              </div>

              {/* Export Button */}
              <button
                onClick={exportEnquiriesToCSV}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent text-primary-dark font-bold text-xs px-4 py-2.5 hover:brightness-105 shadow-sm transition-all"
              >
                <Download size={14} />
                Export to CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Student & Parent</th>
                    <th className="py-4 px-4">Course Details</th>
                    <th className="py-4 px-4">Contact Info</th>
                    <th className="py-4 px-4">Enquiry Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6">
                          <div className="font-bold text-sm text-slate-800">{enq.studentName}</div>
                          <div className="text-slate-400 text-[10px] font-bold">Parent: {enq.parentName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2.5 py-1 rounded bg-primary/5 text-primary text-[10px] font-bold">
                            {enq.classLevel}
                          </span>
                          <div className="text-slate-400 text-[10px] font-medium mt-1">School: {enq.schoolName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <a href={`tel:${enq.mobileNumber}`} className="font-bold hover:underline block text-slate-700">{enq.mobileNumber}</a>
                          <a 
                            href={`https://wa.me/91${enq.mobileNumber}`} 
                            target="_blank" 
                            className="text-[9px] text-emerald-500 font-extrabold flex items-center gap-0.5 mt-0.5"
                          >
                            Open WhatsApp
                          </a>
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-[10px]">{enq.submittedAt}</td>
                        <td className="py-4 px-4">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded border-0 text-[10px] font-bold focus:outline-none ${
                              enq.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                              enq.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
                              enq.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-700' :
                              'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              if (confirm('Delete this enquiry?')) deleteEnquiry(enq.id);
                            }}
                            className="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-bold">
                        No enquiries matching current search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: NOTICES */}
        {activeTab === 'notices' && (
          <div className="flex flex-col gap-6">
            
            {/* Headline and trigger */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-primary">Notices & Bulletins</h2>
              <button
                onClick={() => {
                  setEditingNoticeId(null);
                  setNoticeTitle('');
                  setNoticeContent('');
                  setNoticeType('general');
                  setNoticeActive(true);
                  setShowNoticeForm(!showNoticeForm);
                }}
                className="inline-flex items-center gap-1 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm"
              >
                <Plus size={14} />
                Create Notice
              </button>
            </div>

            {/* Notice creation/edit form */}
            {showNoticeForm && (
              <form onSubmit={handleNoticeSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                <h3 className="font-bold text-slate-800 text-sm">
                  {editingNoticeId ? 'Edit Notice' : 'Add New Notice'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Notice Title</label>
                    <input
                      type="text"
                      required
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="Enter notice title"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 w-1/2">
                      <label className="text-xs font-bold text-slate-700">Notice Type</label>
                      <select
                        value={noticeType}
                        onChange={(e) => setNoticeType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="general">General</option>
                        <option value="urgent">Urgent Alert</option>
                        <option value="admission">Admissions Open</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 w-1/2 justify-center pt-5 pl-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={noticeActive}
                          onChange={(e) => setNoticeActive(e.target.checked)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary"
                        />
                        Display Active
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Notice Content Details</label>
                  <textarea
                    required
                    rows={4}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="Enter full notice description..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowNoticeForm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                  >
                    {editingNoticeId ? 'Save Updates' : 'Publish Notice'}
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
              {data.notices.map((n) => (
                <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === 'urgent' ? 'bg-red-50 text-red-600' :
                      n.type === 'admission' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <Bell size={14} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-slate-800">{n.title}</h4>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          n.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {n.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{n.date} • Category: {n.type}</span>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-2.5">{n.content}</p>
                    </div>
                  </div>

                  <div className="flex items-start sm:items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => startEditNotice(n)}
                      className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Edit Notice"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this notice?')) deleteNotice(n.id);
                      }}
                      className="p-2 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete Notice"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}

        {/* TAB 3: BLOGS */}
        {activeTab === 'blogs' && (
          <div className="flex flex-col gap-6">
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-primary">Blog & SEO Hub</h2>
              <button
                onClick={() => {
                  setEditingBlogId(null);
                  setBlogTitle('');
                  setBlogImage('');
                  setBlogExcerpt('');
                  setBlogContent('');
                  setBlogTags('');
                  setBlogCategory('Study Tips');
                  setShowBlogForm(!showBlogForm);
                }}
                className="inline-flex items-center gap-1 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm"
              >
                <Plus size={14} />
                Write Article
              </button>
            </div>

            {/* Blog Form */}
            {showBlogForm && (
              <form onSubmit={handleBlogSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                <h3 className="font-bold text-slate-800 text-sm">
                  {editingBlogId ? 'Edit Article' : 'Write New Article'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="How to solve NCERT drawings..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 w-1/2">
                      <label className="text-xs font-bold text-slate-700">Category</label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Study Tips">Study Tips</option>
                        <option value="Exam Updates">Exam Updates</option>
                        <option value="Educational Articles">Educational Articles</option>
                        <option value="Biology Focus">Biology Focus</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 w-1/2">
                      <label className="text-xs font-bold text-slate-700">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={blogTags}
                        onChange={(e) => setBlogTags(e.target.value)}
                        placeholder="NEET, CBSE, Prep"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Cover Image URL (Optional)</label>
                  <input
                    type="text"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Excerpt / Short Description</label>
                  <input
                    type="text"
                    required
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence description for listing feed card previews..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Content Body (Rich Text Markdown Supported)</label>
                  <textarea
                    required
                    rows={8}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Provide full article markdown here. Supports ### headings, bulleted lists, and basic formatting..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none font-mono"
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowBlogForm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                  >
                    {editingBlogId ? 'Save Changes' : 'Publish Post'}
                  </button>
                </div>
              </form>
            )}

            {/* Blogs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.blogs.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                    <img 
                      src={b.image} 
                      alt={b.title} 
                      className="h-16 w-16 object-cover rounded-xl flex-shrink-0 bg-slate-100 border border-slate-100"
                    />
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-accent font-extrabold text-[8px] uppercase tracking-wider">
                        {b.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-800 mt-1 leading-tight">{b.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{b.date} • {b.readTime}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed font-semibold">{b.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3 mt-2">
                    <button
                      onClick={() => startEditBlog(b)}
                      className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-600 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Edit size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this article?')) deleteBlogPost(b.id);
                      }}
                      className="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: TOPPERS */}
        {activeTab === 'toppers' && (
          <div className="flex flex-col gap-6">
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-primary">Results & Toppers Board</h2>
              <button
                onClick={() => setShowTopperForm(!showTopperForm)}
                className="inline-flex items-center gap-1 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm"
              >
                <Plus size={14} />
                Add Topper
              </button>
            </div>

            {showTopperForm && (
              <form onSubmit={handleTopperSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                <h3 className="font-bold text-slate-800 text-sm">Add Student Topper Entry</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Student Name</label>
                    <input
                      type="text"
                      required
                      value={topperName}
                      onChange={(e) => setTopperName(e.target.value)}
                      placeholder="E.g. Priya Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Score Achieved</label>
                    <input
                      type="text"
                      required
                      value={topperScore}
                      onChange={(e) => setTopperScore(e.target.value)}
                      placeholder="E.g. 98.4% or 350/360 Biology"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Academic Year</label>
                    <select
                      value={topperYear}
                      onChange={(e) => setTopperYear(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Class / Stream</label>
                    <input
                      type="text"
                      required
                      value={topperClassLevel}
                      onChange={(e) => setTopperClassLevel(e.target.value)}
                      placeholder="E.g. Class 12 Boards / NEET"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Category Classification</label>
                    <select
                      value={topperCategory}
                      onChange={(e) => setTopperCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="NEET">NEET</option>
                      <option value="CBSE Class 12">CBSE Class 12</option>
                      <option value="CBSE Class 10">CBSE Class 10</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Score Highlights Summary</label>
                  <input
                    type="text"
                    required
                    value={topperHighlight}
                    onChange={(e) => setTopperHighlight(e.target.value)}
                    placeholder="District Topper in Biology, GMC Seat enrollment secured..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Photo URL (Optional)</label>
                  <input
                    type="text"
                    value={topperImage}
                    onChange={(e) => setTopperImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowTopperForm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                  >
                    Publish Topper
                  </button>
                </div>
              </form>
            )}

            {/* List Toppers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.toppers.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div className="p-4 flex gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-16 w-16 object-cover rounded-xl bg-slate-100 border border-slate-100"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{t.name}</h4>
                      <span className="text-[10px] font-extrabold text-accent block">{t.score} ({t.year})</span>
                      <span className="text-[9px] font-bold text-slate-400 block mt-0.5">{t.classLevel} • {t.category}</span>
                      <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-2 line-clamp-2">{t.highlight}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm('Delete this topper?')) deleteResult(t.id);
                      }}
                      className="p-1 rounded bg-white text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all text-[10px]"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete Entry
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="flex flex-col gap-6">
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-primary">Resource Library Files</h2>
              <button
                onClick={() => setShowResourceForm(!showResourceForm)}
                className="inline-flex items-center gap-1 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm"
              >
                <Plus size={14} />
                Upload Resource
              </button>
            </div>

            {showResourceForm && (
              <form onSubmit={handleResourceSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                <h3 className="font-bold text-slate-800 text-sm">Add Mock Study Resource File</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Document Title</label>
                    <input
                      type="text"
                      required
                      value={resTitle}
                      onChange={(e) => setResTitle(e.target.value)}
                      placeholder="Class 10 Biology NCERT Chapter 2 Notes"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Target Class</label>
                      <input
                        type="text"
                        required
                        value={resClass}
                        onChange={(e) => setResClass(e.target.value)}
                        placeholder="E.g. Class 10"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Subject</label>
                      <input
                        type="text"
                        required
                        value={resSubject}
                        onChange={(e) => setResSubject(e.target.value)}
                        placeholder="E.g. Biology"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Resource Category Type</label>
                    <select
                      value={resType}
                      onChange={(e) => setResType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Notes">Notes</option>
                      <option value="Worksheets">Worksheets</option>
                      <option value="Sample Papers">Sample Papers</option>
                      <option value="Holiday Homework">Holiday Homework</option>
                      <option value="NCERT">NCERT Solutions</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Estimated File Size (Indicator)</label>
                    <input
                      type="text"
                      value={resSize}
                      onChange={(e) => setResSize(e.target.value)}
                      placeholder="E.g. 2.1 MB"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowResourceForm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            )}

            {/* Resources List table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Document Info</th>
                    <th className="py-4 px-4">Subject Tags</th>
                    <th className="py-4 px-4">Size & Type</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {data.resources.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6 font-bold text-slate-800">{res.title}</td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-primary/5 text-primary text-[10px] font-bold mr-1.5">
                          {res.classLevel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">{res.subject}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-accent font-extrabold text-[9px] uppercase tracking-wider mr-1.5">
                          {res.type}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{res.fileSize}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            if (confirm('Delete this resource?')) deleteResource(res.id);
                          }}
                          className="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 6: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold font-serif text-primary">Contact Messages Inbox</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {data.contactMessages.length > 0 ? (
                data.contactMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between gap-4 transition-all ${
                      !msg.read ? 'border-primary-light/40 ring-1 ring-primary-light/10' : 'border-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{msg.subject}</h4>
                          <p className="text-[10px] font-bold text-slate-400 block mt-0.5">
                            Sender: {msg.name} ({msg.emailOrPhone}) • Received: {msg.submittedAt}
                          </p>
                        </div>
                        
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[8px] font-extrabold uppercase tracking-wider">
                            New Message
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3.5 mt-3 font-semibold leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                      {!msg.read && (
                        <button
                          onClick={() => markContactMessageRead(msg.id)}
                          className="p-1.5 rounded-lg border border-slate-100 bg-primary/5 hover:bg-primary hover:text-white hover:border-primary text-primary text-[10px] font-bold flex items-center gap-1"
                        >
                          <CheckCircle2 size={12} />
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('Delete this message?')) deleteContactMessage(msg.id);
                        }}
                        className="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-slate-500 text-[10px] font-bold flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        Delete Message
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 font-bold">
                  No contact messages received.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
