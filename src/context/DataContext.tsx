import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure structure is correct and merge with any new structures
        const mergedData = { ...initialData, ...parsed };
        
        // Safety checks to ensure dynamic lists are present
        if (!mergedData.admissions) mergedData.admissions = [];
        if (!mergedData.contactMessages) mergedData.contactMessages = [];
        
        setData(mergedData);
      }
    } catch (e) {
      console.error('Failed to load site data from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to local storage whenever data changes
  const save = (newData: SiteData) => {
    setData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
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
  const submitAdmissionForm = (enquiry: Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newEnquiry: AdmissionEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Pending',
    };
    save({
      ...data,
      admissions: [newEnquiry, ...data.admissions],
    });
  };

  const updateEnquiryStatus = (id: string, status: AdmissionEnquiry['status']) => {
    save({
      ...data,
      admissions: data.admissions.map(e => e.id === id ? { ...e, status } : e),
    });
  };

  const deleteEnquiry = (id: string) => {
    save({
      ...data,
      admissions: data.admissions.filter(e => e.id !== id),
    });
  };

  // Contact Form Submission
  const submitContactForm = (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      read: false,
    };
    save({
      ...data,
      contactMessages: [newMessage, ...data.contactMessages],
    });
  };

  const markContactMessageRead = (id: string) => {
    save({
      ...data,
      contactMessages: data.contactMessages.map(m => m.id === id ? { ...m, read: true } : m),
    });
  };

  const deleteContactMessage = (id: string) => {
    save({
      ...data,
      contactMessages: data.contactMessages.filter(m => m.id !== id),
    });
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
