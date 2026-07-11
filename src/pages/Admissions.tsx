import React, { useState } from 'react';
import { useSiteData } from '../context/DataContext';
import { CheckCircle2, ChevronRight, FileText, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Admissions: React.FC = () => {
  const { submitAdmissionForm } = useSiteData();
  
  // Form states
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  // Honeypot spam protection
  const [websiteUrl, setWebsiteUrl] = useState(''); 
  
  // Status states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill course from search query parameter if present
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    if (courseParam) {
      setClassLevel(courseParam);
    }
  }, []);

  const validateMobile = (num: string) => {
    // Standard 10 digit mobile regex
    return /^[6-9]\d{9}$/.test(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot trigger detection
    if (websiteUrl) {
      console.log('Spam submission detected.');
      return;
    }

    if (!studentName.trim() || !parentName.trim() || !classLevel || !schoolName.trim() || !mobileNumber) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!validateMobile(mobileNumber)) {
      setErrorMsg('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    setSubmitting(true);

    // Simulate database network lag
    setTimeout(() => {
      submitAdmissionForm({
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        classLevel,
        schoolName: schoolName.trim(),
        mobileNumber,
      });

      setSubmitting(false);
      setIsSubmitted(true);

      // Trigger premium celebration confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0B2C6B', '#D4AF37', '#ffffff']
      });
    }, 800);
  };

  const resetForm = () => {
    setStudentName('');
    setParentName('');
    setClassLevel('');
    setSchoolName('');
    setMobileNumber('');
    setIsSubmitted(false);
  };

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Hello, I have submitted an online admission enquiry for my child ${studentName} for Class ${classLevel} at Ratna Coaching Centre. Please confirm the batch availability.`
    );
    return `https://wa.me/919999999999?text=${text}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Academic Session 2026 - 2027
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            Apply for Admission
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Take the first step towards academic excellence. Complete the simple inquiry form below, and our administration counselor will schedule a mock diagnostic slot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column A: Left side detail highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Steps card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold font-serif text-primary mb-5 flex items-center gap-2">
                <Calendar className="text-accent" size={20} />
                Admission Process Steps
              </h2>
              <div className="flex flex-col gap-6 relative pl-4 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                <div className="flex gap-4 relative">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold mt-0.5 z-10">1</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Submit Online Enquiry</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Fill out the basic details on this page in less than 2 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold mt-0.5 z-10">2</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Counselor Callback</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Our team contacts you within 24 hours to discuss subject slots & timings.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold mt-0.5 z-10">3</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Diagnostic Assessment</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">A lightweight evaluation is conducted to gauge student conceptual gaps.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold mt-0.5 z-10">4</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Enrollment & Batch Start</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Submit documents, pay course fees, and start daily coaching.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold font-serif text-primary mb-4 flex items-center gap-2">
                <FileText className="text-accent" size={20} />
                Required Documents
              </h2>
              <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">
                Parents are requested to bring photocopy sets of the following during diagnostic assessment visits:
              </p>
              <ul className="flex flex-col gap-2.5 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                  Last Academic Year Report Card
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                  Recent Passport Size Photographs (2 sets)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                  Aadhar Card of the Student & Parent
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                  School ID Card (for current school validation)
                </li>
              </ul>
            </div>
            
          </div>

          {/* Column B: Right side interactive form container */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-slate-100 relative overflow-hidden">
              
              {/* Gold header accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-primary mb-1">Enquiry Form</h2>
                    <p className="text-xs font-semibold text-slate-500">Provide accurate details for registration.</p>
                  </div>

                  {errorMsg && (
                    <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-bold">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Protection (Hidden Field) */}
                  <div className="hidden" aria-hidden="true">
                    <label>Do not fill this if you are human: </label>
                    <input 
                      type="text" 
                      value={websiteUrl} 
                      onChange={(e) => setWebsiteUrl(e.target.value)} 
                      tabIndex={-1} 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Student Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Student Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter student's name"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold transition-all"
                      />
                    </div>

                    {/* Parent Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Parent / Guardian Name *</label>
                      <input 
                        type="text" 
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Father/Mother's name"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold transition-all"
                      />
                    </div>
                    
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Target Class Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Class Seeking Admission *</label>
                      <select 
                        required
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-bold text-slate-700 transition-all"
                      >
                        <option value="">Select Target Class</option>
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
                        <option value="NEET Biology Specialized">Biology Specialized (Class 10/12)</option>
                        <option value="NEET Foundation">NEET Foundation (Class 9-12)</option>
                      </select>
                    </div>

                    {/* School Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Current / Previous School Name *</label>
                      <input 
                        type="text" 
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="Enter current school"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold transition-all"
                      />
                    </div>
                    
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Mobile Number (WhatsApp Contact) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-500 font-bold text-sm">+91</span>
                      <input 
                        type="tel" 
                        required
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-14 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-semibold transition-all tracking-wider"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold pl-1">Will be utilized for scheduling classes and assessments.</span>
                  </div>

                  <div className="flex gap-2.5 items-start mt-2">
                    <input 
                      type="checkbox" 
                      required 
                      defaultChecked 
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                      I agree to authorize Ratna Coaching Centre representatives to contact me via Call or WhatsApp regarding admission inquiries and counseling slots.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl text-center shadow-lg hover:bg-primary-light hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Registering Enquiry...' : 'Submit Admission Enquiry'}
                    <ChevronRight size={18} />
                  </button>

                  <div className="flex justify-center items-center gap-1 text-[10px] text-slate-400 font-bold mt-2">
                    <ShieldCheck size={14} className="text-slate-400" />
                    SSL Secure Data Encrypted Connection
                  </div>

                </form>
              ) : (
                /* Success Screen Section */
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-300">
                  <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shadow-inner mb-6">
                    <CheckCircle2 size={44} className="stroke-[1.5]" />
                  </div>
                  
                  <h2 className="text-3xl font-serif font-bold text-primary mb-3">Enquiry Submitted!</h2>
                  <p className="text-slate-600 text-sm font-semibold max-w-md mb-8 leading-relaxed">
                    Thank you, <span className="text-primary font-bold">{parentName}</span>. Your enquiry for <span className="text-primary font-bold">{studentName}</span> has been logged. Our admissions advisor will call you within 24 hours.
                  </p>
                  
                  <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <a 
                      href={getWaLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-6 py-3.5 text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.588 1.97 14.118.945 11.997.945c-5.442 0-9.87 4.372-9.874 9.802-.002 2.016.529 3.987 1.538 5.734l-.993 3.626 3.73-.974.249.148z" />
                      </svg>
                      Instant WhatsApp Confirmation
                    </a>
                    
                    <button 
                      onClick={resetForm}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 px-6 py-3.5 text-sm font-bold text-slate-700"
                    >
                      Fill Another Inquiry
                    </button>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 max-w-md">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1">Staff Note</span>
                    <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                      You can instantly view this entry by navigating to the <span className="text-primary font-bold">Staff Login</span> linked in the website footer under the password <code className="bg-slate-100 px-1 py-0.5 rounded text-primary-dark font-mono text-[10px]">ratna123</code>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
