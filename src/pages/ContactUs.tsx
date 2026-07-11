import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { submitContactForm } = useSiteData();

  // Form states
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState(''); // honeypot spam protection

  // Status states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot spam check
    if (websiteUrl) {
      console.log('Spam message blocked.');
      return;
    }

    if (!name.trim() || !emailOrPhone.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please fill in all form fields.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      submitContactForm({
        name: name.trim(),
        emailOrPhone: emailOrPhone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setName('');
    setEmailOrPhone('');
    setSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Contact Our Center
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Have questions regarding batch timings, fee structures, or specific Biology slots? Message us directly or visit our office location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Column A: Contact Info Card column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info lists */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
              <h2 className="text-xl font-bold font-serif text-primary border-b border-slate-50 pb-3">Contact Information</h2>
              
              <ul className="flex flex-col gap-5 text-sm font-semibold text-slate-600">
                <li className="flex gap-3 items-start">
                  <div className="h-9 w-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Office Address</span>
                    <span className="text-xs font-semibold text-slate-700 block mt-1 leading-relaxed">
                      2115 Ground Floor, Sector 9, Near Nandan Park, Ballabgarh, Faridabad (121004)
                    </span>
                  </div>
                </li>

                <li className="flex gap-3 items-center">
                  <div className="h-9 w-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Call Office</span>
                    <a href="tel:+919999999999" className="text-xs font-bold text-slate-700 hover:text-primary mt-1 block">
                      +91 99999 99999
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 items-center">
                  <div className="h-9 w-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Email Address</span>
                    <a href="mailto:info@ratnacoachingcentre.in" className="text-xs font-bold text-slate-700 hover:text-primary mt-1 block">
                      info@ratnacoachingcentre.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="h-9 w-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Operating Hours</span>
                    <div className="text-xs text-slate-700 mt-1">
                      <span className="block font-bold">Monday – Saturday: 10:00 AM – 8:00 PM</span>
                      <span className="block text-slate-400 font-bold mt-0.5">Sunday: Closed (Weekly Off)</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick WhatsApp block */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
              <h3 className="font-serif font-bold text-base text-primary flex items-center gap-1.5">
                WhatsApp Quick Chat
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Connect with our administrative desk immediately via chat. Tap the button to load a pre-filled enquiry template on your phone.
              </p>
              <a 
                href="https://wa.me/919999999999?text=Hello%20Ratna%20Coaching%20Centre,%20I%20have%20an%20enquiry%20regarding%20subject%20batches."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-center text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                Start WhatsApp Chat
              </a>
            </div>

          </div>

          {/* Column B: Contact Form container */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent"></div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-primary mb-1">Send Message</h2>
                    <p className="text-xs font-semibold text-slate-500">Submit a query or request updates.</p>
                  </div>

                  {errorMsg && (
                    <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot hidden input */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      value={websiteUrl} 
                      onChange={(e) => setWebsiteUrl(e.target.value)} 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address / Phone *</label>
                      <input 
                        type="text" 
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="Enter email or mobile"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Message Subject *</label>
                    <input 
                      type="text" 
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Batch availability, Biology individual fee slots..."
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Detailed Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type details of your request here..."
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl text-center shadow hover:bg-primary-light active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1 mt-2 disabled:opacity-75"
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex justify-center items-center gap-1 text-[10px] text-slate-400 font-bold mt-2">
                    <ShieldCheck size={14} />
                    Strict Data Privacy Guarded
                  </div>
                </form>
              ) : (
                /* Confirmation view */
                <div className="text-center py-12 animate-in zoom-in-95 duration-300">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-primary mb-2">Message Dispatched!</h3>
                  <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you, <strong className="text-slate-700">{name}</strong>. Your inquiry has been forwarded to Seema Swami's administration desk. We will respond shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="rounded-xl border border-slate-200 hover:bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* EFFICIENT MAP COMPONENT */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2.5">
          {/* PRD: Embedded Google Map (interactive, matching business location) */}
          <div className="w-full aspect-[21/9] bg-slate-100 relative rounded-2xl overflow-hidden border border-slate-200">
            {/* Visual map iframe placeholder that uses google maps embed free tier */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14878.694665476313!2d72.863363!3d21.1852024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDExJzA2LjciTiA3MsKwNTEnNDguMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ratna Coaching Centre Location Map"
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};
