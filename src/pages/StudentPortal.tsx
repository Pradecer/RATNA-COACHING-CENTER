import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/DataContext';
import { useRouter } from '../components/Router';
import confetti from 'canvas-confetti';
import { 
  User, Mail, Phone, School, Award, Clock, Play, Pause, RotateCcw,
  BookOpenCheck, Check, ShieldAlert, ChevronRight, Bell, BookOpen, 
  Download, LogOut
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which organelle is known as the powerhouse of the cell and has its own DNA?",
    options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi Apparatus"],
    correctAnswer: 1,
    explanation: "Mitochondria are the site of cellular respiration and ATP generation. They contain their own DNA and ribosomes."
  },
  {
    id: 2,
    question: "Who is recognized as the Father of Genetics for his pioneering work on pea plants?",
    options: ["Charles Darwin", "Gregor Mendel", "Jean-Baptiste Lamarck", "Hugo de Vries"],
    correctAnswer: 1,
    explanation: "Gregor Mendel discovered the basic principles of heredity through breeding experiments with garden pea plants."
  },
  {
    id: 3,
    question: "Which plant hormone is primarily responsible for the ripening of fruits?",
    options: ["Auxin", "Gibberellin", "Cytokinin", "Ethylene"],
    correctAnswer: 3,
    explanation: "Ethylene is a gaseous plant hormone that regulates fruit ripening, leaf senescence, and wilting."
  },
  {
    id: 4,
    question: "Which of the following is a water-soluble vitamin that acts as a powerful antioxidant?",
    options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"],
    correctAnswer: 2,
    explanation: "Vitamin C (ascorbic acid) is water-soluble, boosts immune health, and aids collagen synthesis."
  },
  {
    id: 5,
    question: "The double-helical model of DNA was first proposed by Watson and Crick in which year?",
    options: ["1953", "1962", "1948", "1971"],
    correctAnswer: 0,
    explanation: "James Watson and Francis Crick published the DNA double-helix molecular structure in 1953."
  }
];

export const StudentPortal: React.FC = () => {
  const { student, loading, openLoginModal, updateStudentProfile, updateStudentScore, logout } = useAuth();
  const { data } = useSiteData();
  const { navigate } = useRouter();

  // Profile Edit States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editSchool, setEditSchool] = useState('');
  const [editClass, setEditClass] = useState('');

  // Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');

  // Pomodoro States
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const timerIntervalRef = useRef<any>(null);

  // Sync edits
  useEffect(() => {
    if (student) {
      setEditName(student.name);
      setEditPhone(student.phone);
      setEditSchool(student.schoolName);
      setEditClass(student.classLevel);
      setCurrentQuestionIndex(Math.floor(Math.random() * QUIZ_QUESTIONS.length));
    } else if (!loading) {
      // Auto open modal if they browse directly here without session
      openLoginModal();
    }
  }, [student, loading]);

  // Timer Effect
  useEffect(() => {
    if (timerIsRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerIsRunning(false);
            try {
              const context = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = context.createOscillator();
              osc.connect(context.destination);
              osc.start();
              osc.stop(context.currentTime + 0.3);
            } catch(e){}
            if (timerMode === 'study') {
              alert('Study timer finished! Take a break.');
              setTimerMode('break');
              return 5 * 60;
            } else {
              alert('Break is over! Ready to focus again?');
              setTimerMode('study');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerIsRunning, timerMode]);

  const toggleTimer = () => setTimerIsRunning(!timerIsRunning);
  const resetTimer = () => {
    setTimerIsRunning(false);
    setTimeLeft(timerMode === 'study' ? 25 * 60 : 5 * 60);
  };
  const switchTimerMode = (mode: 'study' | 'break') => {
    setTimerIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Actions
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile(editName, editPhone, editSchool, editClass);
    setIsEditingProfile(false);
    alert('Profile updated!');
  };

  const handleQuizAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    if (selectedOption === q.correctAnswer) {
      setQuizFeedback("Correct! 🎉 " + q.explanation);
      updateStudentScore(1, 1);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
    } else {
      setQuizFeedback("Incorrect. " + q.explanation);
      updateStudentScore(0, 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFeedback('');
    setCurrentQuestionIndex((currentQuestionIndex + 1) % QUIZ_QUESTIONS.length);
  };

  // Fetch admission data matching student contact
  const getAdmissionsEnquiry = () => {
    if (!student) return null;
    return data.admissions.find(
      enq => enq.mobileNumber === student.phone || enq.studentName.toLowerCase().trim() === student.name.toLowerCase().trim()
    ) || null;
  };

  const getFilteredNotices = () => {
    if (!student) return [];
    return data.notices.filter(
      n => n.active && 
      (n.title.toLowerCase().includes(student.classLevel.toLowerCase()) ||
       n.content.toLowerCase().includes(student.classLevel.toLowerCase()) ||
       n.type === 'general' || n.type === 'urgent')
    );
  };

  const getFilteredResources = () => {
    if (!student) return [];
    return data.resources.filter(res => res.classLevel === student.classLevel);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShieldAlert size={48} className="text-amber-500 mb-4 stroke-[1.5]" />
        <h2 className="text-xl font-bold text-slate-700 mb-1">Student Portal Locked</h2>
        <p className="text-xs text-slate-500 font-semibold max-w-sm leading-relaxed mb-6">
          You must be logged in to view your dashboard, check worksheets, and participate in daily quizzes.
        </p>
        <button 
          onClick={openLoginModal}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light shadow-md transition-all"
        >
          Open Login Portal
        </button>
      </div>
    );
  }

  const admissionEnquiry = getAdmissionsEnquiry();
  const classNotices = getFilteredNotices();
  const classResources = getFilteredResources();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-bold text-accent tracking-widest uppercase bg-primary/5 px-2.5 py-1 rounded-md">
              Student Workspace
            </span>
            <h1 className="text-3xl font-serif font-extrabold text-primary mt-2">
              Welcome, {student.name}!
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Class: {student.classLevel} • Roll Number: <code className="bg-slate-200 px-1 py-0.5 rounded text-primary-light font-mono text-[10px] font-bold">{student.rollNumber}</code>
            </p>
          </div>
          
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            
            {/* Profile Info */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent"></div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-slate-800 text-base">My Profile</h3>
                <button 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-xs font-extrabold text-primary hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <Edit size={14} />
                  {isEditingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {!isEditingProfile ? (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <User size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Full Name</span>
                      <span className="font-bold text-slate-700 text-sm">{student.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Email</span>
                      <span className="font-bold text-slate-700">{student.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Phone</span>
                      <span className="font-bold text-slate-700">{student.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <School size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">School</span>
                      <span className="font-bold text-slate-700">{student.schoolName || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl">
                    <div className="flex items-center gap-1.5">
                      <Award size={16} className="text-accent" />
                      <span className="font-bold text-slate-600 text-[11px]">Quiz Score</span>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-primary">
                      {student.score?.correct || 0} / {student.score?.attempted || 0}
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileSave} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Name</label>
                    <input 
                      type="text" 
                      required 
                      value={editName} 
                      onChange={e => setEditName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Phone</label>
                    <input 
                      type="text" 
                      required 
                      value={editPhone} 
                      onChange={e => setEditPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">School</label>
                    <input 
                      type="text" 
                      value={editSchool} 
                      onChange={e => setEditSchool(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Class Level</label>
                    <select 
                      value={editClass} 
                      onChange={e => setEditClass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="NEET Prep">NEET Biology Specialized</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow-md mt-2 transition-all"
                  >
                    Save Details
                  </button>
                </form>
              )}
            </div>

            {/* Focus Timer */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                  <Clock size={18} className="text-primary-light" />
                  Study Focus Timer
                </h3>
                <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  timerMode === 'study' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                }`}>
                  {timerMode === 'study' ? 'Study' : 'Break'}
                </span>
              </div>

              <div className="my-6">
                <span className="text-4xl font-mono font-extrabold text-primary select-none">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => switchTimerMode('study')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    timerMode === 'study' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  Study
                </button>
                <button 
                  onClick={() => switchTimerMode('break')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    timerMode === 'break' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  Break
                </button>
              </div>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={toggleTimer}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all ${
                    timerIsRunning ? 'bg-amber-500' : 'bg-primary'
                  }`}
                >
                  {timerIsRunning ? <Pause size={14} /> : <Play size={14} />}
                  {timerIsRunning ? 'Pause' : 'Start Focus'}
                </button>
                <button 
                  onClick={resetTimer}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all flex items-center justify-center"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Main Workspace content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Admissions application status */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 text-base mb-5 flex items-center gap-1.5">
                <BookOpenCheck size={18} className="text-emerald-500" />
                Admission Application Tracker
              </h3>

              {admissionEnquiry ? (
                <div className="flex flex-col gap-6">
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Applied Name</span>
                      <span className="font-bold text-slate-700 text-sm">{admissionEnquiry.studentName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Class Requested</span>
                      <span className="font-semibold text-slate-700 bg-primary/5 px-2 py-0.5 rounded text-[10px]">{admissionEnquiry.classLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Status</span>
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                        admissionEnquiry.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        admissionEnquiry.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
                        admissionEnquiry.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {admissionEnquiry.status}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal timeline tracker */}
                  <div className="relative flex items-center justify-between w-full pt-4 max-w-xl mx-auto">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
                    <div 
                      className="absolute left-0 top-1/2 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        width: 
                          admissionEnquiry.status === 'Pending' ? '0%' :
                          admissionEnquiry.status === 'Contacted' ? '50%' :
                          admissionEnquiry.status === 'Enrolled' ? '100%' : '0%'
                      }}
                    ></div>

                    <div className="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
                      <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase">Received</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        admissionEnquiry.status !== 'Pending' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'
                      }`}>
                        {admissionEnquiry.status !== 'Pending' ? <Check size={14} className="stroke-[3]" /> : <Clock size={14} />}
                      </div>
                      <span className={`text-[9px] font-bold uppercase ${
                        admissionEnquiry.status !== 'Pending' ? 'text-emerald-600' : 'text-amber-500'
                      }`}>Contacted</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        admissionEnquiry.status === 'Enrolled' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {admissionEnquiry.status === 'Enrolled' ? <Check size={14} className="stroke-[3]" /> : <Award size={14} />}
                      </div>
                      <span className={`text-[9px] font-bold uppercase ${
                        admissionEnquiry.status === 'Enrolled' ? 'text-emerald-600' : 'text-slate-400'
                      }`}>Enrolled</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl flex flex-col items-center text-center">
                  <ShieldAlert size={24} className="text-amber-500 mb-2" />
                  <h4 className="font-bold text-slate-800 text-xs">No active applications</h4>
                  <p className="text-[11px] text-slate-500 max-w-sm mt-1 mb-4 leading-relaxed">
                    We didn't find any admissions query associated with your mobile number (<code className="font-bold text-primary">{student.phone}</code>).
                  </p>
                  <button 
                    onClick={() => navigate('/admissions')}
                    className="px-4 py-2 bg-accent text-primary-dark font-extrabold text-[10px] uppercase tracking-wider rounded-xl hover:brightness-105 transition-all"
                  >
                    Apply for Admissions
                  </button>
                </div>
              )}
            </div>

            {/* Daily Quiz */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                  <Award size={18} className="text-accent" />
                  Daily Practice Challenge
                </h3>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                  Biology Prep
                </span>
              </div>

              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100/50 mb-6">
                <p className="font-serif text-sm font-bold text-slate-800 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2 mb-6">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer === i;
                  
                  let optStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-700";
                  if (isSelected) optStyle = "bg-primary text-white border-primary shadow-sm";
                  if (isAnswered) {
                    if (isCorrect) optStyle = "bg-emerald-500 text-white border-emerald-500";
                    else if (isSelected) optStyle = "bg-red-500 text-white border-red-500";
                    else optStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full py-3 px-4 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`h-5 w-5 rounded-full flex items-center justify-center border text-[9px] uppercase font-mono ${
                          isSelected ? 'border-white text-white' : 'border-slate-300 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz feedback */}
              {isAnswered && (
                <div className={`p-4 rounded-2xl border text-xs font-semibold leading-relaxed mb-6 ${
                  selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                    : 'bg-red-50 border-red-100 text-red-800'
                }`}>
                  {quizFeedback}
                </div>
              )}

              <div className="flex justify-end border-t border-slate-100 pt-4">
                {!isAnswered ? (
                  <button
                    onClick={handleQuizAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs disabled:opacity-50 hover:brightness-105 transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-hover text-primary-dark font-extrabold rounded-xl text-xs hover:scale-[1.01] transition-all flex items-center gap-1"
                  >
                    Next Question
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Bulletins and Downloads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Announcements */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-1.5">
                  <Bell size={18} className="text-primary-light animate-bounce" />
                  Bulletins for {student.classLevel}
                </h3>
                
                <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
                  {classNotices.length > 0 ? (
                    classNotices.map((n) => (
                      <div key={n.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{n.title}</span>
                          <span className="text-[8px] text-slate-400 bg-slate-200 px-1 py-0.5 rounded font-mono">{n.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal font-semibold">{n.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-400 text-xs font-bold">
                      No active bulletins for your class level.
                    </div>
                  )}
                </div>
              </div>

              {/* Study Materials */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-1.5">
                  <BookOpen size={18} className="text-primary-light" />
                  Class Worksheets
                </h3>

                <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
                  {classResources.length > 0 ? (
                    classResources.map((res) => (
                      <div key={res.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-2 text-xs">
                        <div className="truncate">
                          <span className="font-serif font-bold text-slate-800 text-sm block truncate">{res.title}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">{res.subject} • {res.fileSize}</span>
                        </div>
                        
                        <button
                          onClick={() => alert(`Downloading "${res.title}" ...`)}
                          className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center flex-shrink-0 transition-all"
                          title="Download Worksheet"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-400 text-xs font-bold">
                      No sheets uploaded yet for your class.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

// Edit icon mock helper since it's not imported
const Edit: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);
