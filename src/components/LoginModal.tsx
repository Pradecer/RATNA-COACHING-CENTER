import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from './Router';
import { 
  Lock, Users, Mail, User, Phone, School, 
  Eye, EyeOff, ShieldAlert, CheckCircle2
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    registerStudent, 
    loginStudent, 
    loginAdmin 
  } = useAuth();
  
  const { navigate } = useRouter();

  // Authentication UI State
  const [authTab, setAuthTab] = useState<'student' | 'admin'>('student');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regClass, setRegClass] = useState('Class 12');
  const [regSchool, setRegSchool] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  
  // Alert/Feedback states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setFormSubmitting(true);

    if (authTab === 'admin') {
      const res = await loginAdmin(adminUser, adminPass);
      if (res.success) {
        setSuccessMsg('Admin credentials verified! Entering CMS...');
        setTimeout(() => {
          setFormSubmitting(false);
          closeLoginModal();
          navigate('/admin');
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
        setFormSubmitting(false);
      }
    } else {
      if (isRegistering) {
        // Sign Up validation
        if (regPass !== regConfirmPass) {
          setErrorMsg('Passwords do not match.');
          setFormSubmitting(false);
          return;
        }
        if (regPhone.length < 10) {
          setErrorMsg('Please enter a valid 10-digit mobile number.');
          setFormSubmitting(false);
          return;
        }

        const res = await registerStudent(regName, regEmail, regPhone, regClass, regSchool, regPass);
        if (res.success) {
          setSuccessMsg('Account created successfully! Welcome.');
          setTimeout(() => {
            setFormSubmitting(false);
            setIsRegistering(false);
            closeLoginModal();
            navigate('/');
          }, 1200);
        } else {
          setErrorMsg(res.error || 'Registration failed.');
          setFormSubmitting(false);
        }
      } else {
        // Login
        const res = await loginStudent(email, password);
        if (res.success) {
          setSuccessMsg('Login successful!');
          setTimeout(() => {
            setFormSubmitting(false);
            closeLoginModal();
            navigate('/');
          }, 800);
        } else {
          setErrorMsg(res.error || 'Invalid email or password.');
          setFormSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>

      {/* Modal dialog box */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Floating gradient accent top line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light"></div>

        {/* Modal Header */}
        <div className="text-center mb-6 mt-2">
          <h2 className="text-2xl font-bold font-serif text-primary">Ratna Coaching Center</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Please log in to access classes and worksheets</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
          <button
            onClick={() => {
              setAuthTab('student');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'student'
                ? 'bg-white text-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users size={14} />
            Student Login
          </button>
          <button
            onClick={() => {
              setAuthTab('admin');
              setIsRegistering(false);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'admin'
                ? 'bg-white text-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Lock size={14} />
            Admin CMS
          </button>
        </div>

        {/* Feedbacks */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
            <ShieldAlert size={14} className="flex-shrink-0" />
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-600" />
            {successMsg}
          </div>
        )}

        {/* FORM FIELDS */}
        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
          {authTab === 'admin' ? (
            /* ADMIN LOGIN CARD */
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Username</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-1.5 mt-2 text-xs"
              >
                {formSubmitting ? 'Authenticating...' : 'Sign In to CMS Portal'}
              </button>
            </>
          ) : (
            /* STUDENT LOGIN OR REGISTER CARD */
            <>
              {isRegistering ? (
                /* REGISTRATION FORM */
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Student Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Mobile Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Target Class</label>
                      <select
                        value={regClass}
                        onChange={(e) => setRegClass(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="NEET Prep">NEET Biology Specialized</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">School Name</label>
                      <div className="relative">
                        <School size={14} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={regSchool}
                          onChange={(e) => setRegSchool(e.target.value)}
                          placeholder="School name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Password</label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={regPass}
                          onChange={(e) => setRegPass(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Confirm Password</label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={regConfirmPass}
                          onChange={(e) => setRegConfirmPass(e.target.value)}
                          placeholder="Retype password"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-1.5 mt-2 text-xs"
                  >
                    {formSubmitting ? 'Registering Account...' : 'Register Student Account'}
                  </button>
                </>
              ) : (
                /* LOGIN FORM */
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-1.5 mt-2 text-xs"
                  >
                    {formSubmitting ? 'Verifying Account...' : 'Sign In to Student Portal'}
                  </button>
                </>
              )}

              {/* Bottom Toggles */}
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 text-center text-xs font-bold">
                <div>
                  {isRegistering ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering(false);
                          setErrorMsg('');
                        }}
                        className="text-primary-light hover:underline"
                      >
                        Login here
                      </button>
                    </>
                  ) : (
                    <>
                      New student?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering(true);
                          setErrorMsg('');
                        }}
                        className="text-primary-light hover:underline"
                      >
                        Register details
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
