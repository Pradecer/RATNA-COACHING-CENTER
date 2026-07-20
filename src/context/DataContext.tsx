import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
import { supabase } from '../lib/supabase';
import type { 
  SiteData, 
  Notice, 
  Course, 
  Topper, 
  GalleryItem, 
  Testimonial, 
  StudyResource, 
  BlogPost, 
  AdmissionEnquiry, 
  ContactMessage 
} from '../data/initialData';

interface DataContextType {
  data: SiteData;
  loading: boolean;
  
  // Notices
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  
  // Courses
  updateCourse: (id: string, course: Partial<Course>) => void;
  
  // Toppers / Results
  addResult: (topper: Omit<Topper, 'id'>) => void;
  deleteResult: (id: string) => void;
  
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Resources
  addResource: (resource: Omit<StudyResource, 'id'>) => void;
  deleteResource: (id: string) => void;
  
  // Blog
  addBlogPost: (post: Omit<BlogPost, 'id' | 'slug' | 'readTime' | 'date'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // Admissions Form Submissions
  submitAdmissionForm: (enquiry: Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: AdmissionEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  
  // Contact Us Messages
  submitContactForm: (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => void;
  markContactMessageRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ratna_coaching_site_data';
const SUPABASE_SITE_DATA_KEY = 'main_site_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  // Load from local storage and Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      // 1. Try local storage first for instant load
      let currentLocal: SiteData = initialData;
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          currentLocal = { ...initialData, ...JSON.parse(stored) };
          if (isMounted) setData(currentLocal);
        }
      } catch (e) {
        console.error('Failed to load site data from localStorage', e);
      }

      // 2. Fetch latest data from Supabase
      try {
        const { data: remoteRow, error } = await supabase
          .from('site_data')
          .select('content')
          .eq('key', SUPABASE_SITE_DATA_KEY)
          .maybeSingle();

        if (!error && remoteRow && remoteRow.content) {
          const mergedRemote = { ...initialData, ...remoteRow.content };
          if (!mergedRemote.admissions) mergedRemote.admissions = [];
          if (!mergedRemote.contactMessages) mergedRemote.contactMessages = [];

          if (isMounted) {
            setData(mergedRemote);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedRemote));
          }
        }
      } catch (e) {
        console.warn('Supabase remote load fallback:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    // 3. Realtime Supabase Subscription for multi-device sync
    const channel = supabase
      .channel('site_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_data',
          filter: `key=eq.${SUPABASE_SITE_DATA_KEY}`,
        },
        (payload: any) => {
          if (payload.new && payload.new.content) {
            const updatedContent = { ...initialData, ...payload.new.content };
            setData(updatedContent);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Save to local storage and sync to Supabase
  const save = async (newData: SiteData) => {
    setData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));

    // Async push to Supabase
    try {
      const { error } = await supabase
        .from('site_data')
        .upsert({
          key: SUPABASE_SITE_DATA_KEY,
          content: newData,
          updated_at: new Date().toISOString(),
        });
      if (error) console.warn('Supabase site_data sync error:', error);
    } catch (err) {
      console.warn('Supabase site_data sync exception:', err);
    }
  };

  // Notices CRUD
  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `n-${Date.now()}`,
    };
    save({
      ...data,
      notices: [newNotice, ...data.notices],
    });
  };

  const updateNotice = (id: string, updatedFields: Partial<Notice>) => {
    save({
      ...data,
      notices: data.notices.map(n => n.id === id ? { ...n, ...updatedFields } : n),
    });
  };

  const deleteNotice = (id: string) => {
    save({
      ...data,
      notices: data.notices.filter(n => n.id !== id),
    });
  };

  // Courses Update
  const updateCourse = (id: string, updatedFields: Partial<Course>) => {
    save({
      ...data,
      courses: data.courses.map(c => c.id === id ? { ...c, ...updatedFields } : c),
    });
  };

  // Results CRUD
  const addResult = (topper: Omit<Topper, 'id'>) => {
    const newTopper: Topper = {
      ...topper,
      id: `t-${Date.now()}`,
    };
    save({
      ...data,
      toppers: [newTopper, ...data.toppers],
    });
  };

  const deleteResult = (id: string) => {
    save({
      ...data,
      toppers: data.toppers.filter(t => t.id !== id),
    });
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `g-${Date.now()}`,
    };
    save({
      ...data,
      gallery: [...data.gallery, newItem],
    });
  };

  const deleteGalleryItem = (id: string) => {
    save({
      ...data,
      gallery: data.gallery.filter(g => g.id !== id),
    });
  };

  // Testimonials CRUD
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `tst-${Date.now()}`,
    };
    save({
      ...data,
      testimonials: [newTestimonial, ...data.testimonials],
    });
  };

  const deleteTestimonial = (id: string) => {
    save({
      ...data,
      testimonials: data.testimonials.filter(t => t.id !== id),
    });
  };

  // Resources CRUD
  const addResource = (resource: Omit<StudyResource, 'id'>) => {
    const newResource: StudyResource = {
      ...resource,
      id: `res-${Date.now()}`,
    };
    save({
      ...data,
      resources: [newResource, ...data.resources],
    });
  };

  const deleteResource = (id: string) => {
    save({
      ...data,
      resources: data.resources.filter(r => r.id !== id),
    });
  };

  // Blog CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'slug' | 'readTime' | 'date'>) => {
    const wordCount = post.content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    const today = new Date().toISOString().split('T')[0];
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPost: BlogPost = {
      ...post,
      id: `b-${Date.now()}`,
      slug,
      date: today,
      readTime,
    };

    save({
      ...data,
      blogs: [newPost, ...data.blogs],
    });
  };

  const updateBlogPost = (id: string, updatedFields: Partial<BlogPost>) => {
    save({
      ...data,
      blogs: data.blogs.map(b => {
        if (b.id === id) {
          const merged = { ...b, ...updatedFields };
          if (updatedFields.title && !updatedFields.slug) {
            merged.slug = updatedFields.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
          }
          if (updatedFields.content) {
            const wordCount = merged.content.trim().split(/\s+/).length;
            merged.readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
          }
          return merged;
        }
        return b;
      }),
    });
  };

  const deleteBlogPost = (id: string) => {
    save({
      ...data,
      blogs: data.blogs.filter(b => b.id !== id),
    });
  };

  // Admission Enquiry Submission
  const submitAdmissionForm = async (enquiry: Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>) => {
    const enquiryId = `enq-${Date.now()}`;
    const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    const newEnquiry: AdmissionEnquiry = {
      ...enquiry,
      id: enquiryId,
      submittedAt,
      status: 'Pending',
    };

    save({
      ...data,
      admissions: [newEnquiry, ...data.admissions],
    });

    // Also write to dedicated Supabase admissions table
    try {
      const { error } = await supabase.from('admissions').insert([{
        id: enquiryId,
        student_name: enquiry.studentName,
        parent_name: enquiry.parentName,
        class_level: enquiry.classLevel,
        school_name: enquiry.schoolName || '',
        mobile_number: enquiry.mobileNumber,
        status: 'Pending',
        submitted_at: submittedAt
      }]);
      if (error) console.warn('Could not sync admission form to Supabase admissions table:', error);
    } catch (err) {
      console.warn('Supabase admission table sync exception:', err);
    }
  };

  const updateEnquiryStatus = async (id: string, status: AdmissionEnquiry['status']) => {
    save({
      ...data,
      admissions: data.admissions.map(e => e.id === id ? { ...e, status } : e),
    });

    // Also update dedicated table
    try {
      await supabase.from('admissions').update({ status }).eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    save({
      ...data,
      admissions: data.admissions.filter(e => e.id !== id),
    });

    // Also delete from dedicated table
    try {
      await supabase.from('admissions').delete().eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  };

  // Contact Form Submission
  const submitContactForm = async (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => {
    const messageId = `msg-${Date.now()}`;
    const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newMessage: ContactMessage = {
      ...message,
      id: messageId,
      submittedAt,
      read: false,
    };

    save({
      ...data,
      contactMessages: [newMessage, ...data.contactMessages],
    });

    // Also write to dedicated Supabase contact_messages table
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        id: messageId,
        name: message.name,
        email_or_phone: message.emailOrPhone,
        subject: message.subject || '',
        message: message.message,
        read: false,
        submitted_at: submittedAt
      }]);
      if (error) console.warn('Could not sync contact message to Supabase table:', error);
    } catch (err) {
      console.warn('Supabase contact_messages table sync exception:', err);
    }
  };

  const markContactMessageRead = async (id: string) => {
    save({
      ...data,
      contactMessages: data.contactMessages.map(m => m.id === id ? { ...m, read: true } : m),
    });

    try {
      await supabase.from('contact_messages').update({ read: true }).eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteContactMessage = async (id: string) => {
    save({
      ...data,
      contactMessages: data.contactMessages.filter(m => m.id !== id),
    });

    try {
      await supabase.from('contact_messages').delete().eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <DataContext.Provider value={{
      data,
      loading,
      addNotice,
      updateNotice,
      deleteNotice,
      updateCourse,
      addResult,
      deleteResult,
      addGalleryItem,
      deleteGalleryItem,
      addTestimonial,
      deleteTestimonial,
      addResource,
      deleteResource,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      submitAdmissionForm,
      updateEnquiryStatus,
      deleteEnquiry,
      submitContactForm,
      markContactMessageRead,
      deleteContactMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a DataProvider');
  }
  return context;
};
