import React from 'react';
import { Award, Target, BookOpen, Compass, ShieldCheck, Heart, User } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const pillars = [
    { title: 'Experienced Faculty', text: 'Our subject experts have over a decade of experience guiding board exam formats and competitive entry syllabuses.', icon: User },
    { title: 'Small Batch Size', text: 'We strictly maintain a limit of 15 students per batch to ensure each notebook is individually reviewed.', icon: Target },
    { title: 'Proven Results', text: 'Year after year, our students set district toppers benchmarks and secure medical seats in premium government colleges.', icon: Award },
    { title: 'Individual Attention', text: 'Custom study outlines and pacing are provided to help slower learners recover conceptual confidence.', icon: Heart },
    { title: 'Modern Teaching Methods', text: 'We translate complex biological concepts into flowcharts, visual checklists, and physical models.', icon: Compass },
    { title: 'Parent Communication', text: 'Regular mock results graphs, performance statistics, and counseling slots are held to sync progress.', icon: ShieldCheck }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full bg-primary/10 inline-block mb-3">
            Since 2016
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4 leading-tight">
            About Ratna Coaching Centre
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Learn about our founders, our educational values, and the pedagogical principles that drive academic excellence.
          </p>
        </div>

        {/* 1. Our Story & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Journey</h2>
            <div className="flex flex-col gap-6 text-sm text-slate-600 font-semibold leading-relaxed">
              <p>
                Established in 2016, Ratna Coaching Centre began as a specialized home-coaching setup for board students. Recognizing a local lack of conceptual clarity in mathematics and science education, we structured a curriculum focused on small groupings, standard evaluation checkups, and robust homework supports.
              </p>
              <p>
                In 2019, our flagship individual coaching in Biology and NEET Foundation tracks was introduced. Designed by Seema Swami, this curriculum focuses on NCERT diagram drawing mastery, short-hand genetics notes, and memory hooks to conquer exam pressure.
              </p>
              <p>
                Today, the centre supports over 200 students annually from Pre-Nursery to Class 12, serving as a trusted brand for local parents demanding academic rigor combined with a supportive mentoring atmosphere.
              </p>
            </div>
          </div>
          
          <div className="relative rounded-3xl p-2.5 bg-gradient-to-br from-primary to-accent shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="Coaching classroom timeline" 
              className="rounded-2xl h-[320px] w-full object-cover bg-white"
            />
          </div>
        </div>

        {/* 2. Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent"></div>
            <div className="h-10 w-10 rounded-xl bg-accent/15 text-primary flex items-center justify-center mb-5">
              <Target size={22} className="text-primary-light" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-primary mb-4">Our Mission</h3>
            <p className="text-sm text-slate-600 font-semibold leading-relaxed">
              To eliminate academic stress through structured conceptual teaching, building robust foundations for board success and medical careers in a customized, micro-classroom environment.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <BookOpen size={22} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-primary mb-4">Our Vision</h3>
            <p className="text-sm text-slate-600 font-semibold leading-relaxed">
              To emerge as the premier regional center for pre-medical biology preparation while maintaining our warm, familial support for early childhood foundations and school support metrics.
            </p>
          </div>

        </div>

        {/* 3. Director's Message (Seema Swami) */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 h-40 w-40 bg-accent/5 rounded-bl-full -z-10"></div>
          
          {/* Image */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative p-1.5 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                alt="Director Seema Swami" 
                className="h-[280px] w-[240px] object-cover rounded-xl bg-white"
              />
            </div>
            <h4 className="font-serif font-bold text-lg text-primary mt-4 mb-0.5">Seema Swami</h4>
            <span className="text-xs font-bold text-accent">Director & Biology Head</span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-1">BioMaster Seema (YouTube)</span>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Director's Message</span>
            <h3 className="text-3xl font-serif font-bold text-primary leading-tight">
              "Focusing on logical diagrams over dry textbook memorization."
            </h3>
            <div className="flex flex-col gap-4 text-xs font-semibold text-slate-600 leading-relaxed">
              <p>
                In biology preparation, students often make the mistake of reading textbooks passively. When facing boards or NEET exams, they struggle with diagrammatic labels and keyword precision. My teaching methodology bridges this gap.
              </p>
              <p>
                Through hand-drawn genetics flowcharts, interactive memory matrices, and a library of 100+ high-yield CBSE biology diagrams, we train students to approach exams logically. Our mock series uses negative-marking OMR countdowns to simulate true medical entry speeds.
              </p>
              <p>
                For our junior school scholars, we implement conceptual vocabulary games, Vedic maths shortcuts, and daily worksheet guides. We ensure their homework is finished with absolute clarity, eliminating parental anxiety.
              </p>
              <p className="italic font-bold text-primary text-sm mt-2">
                "I invite you to schedule a visit to our center, attend a sample assessment session, and see how our small batch design alters learning trajectories."
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://youtube.com/@BioMasterSeema" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 text-white px-5 py-2.5 text-xs font-bold shadow-md hover:bg-red-700 transition-colors"
              >
                Watch BioMaster YouTube Lectures
              </a>
            </div>
          </div>
        </div>

        {/* 4. Why Choose Us (Expanded Version: 6 points) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Academic Philosophy</span>
            <h2 className="text-3xl font-serif font-bold text-primary mt-1">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-accent hover:shadow-sm transition-all duration-300">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary-light" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{pillar.text}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
