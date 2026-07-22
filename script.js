// ========================================================
// RATNA COACHING CENTRE - CORE JAVASCRIPT STATE ENGINE
// ========================================================

// 1. Supabase Initialization
const SUPABASE_URL = 'https://mbvggtozllnysjzktoys.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7ooE_Zx6qLII4APsoh4jFQ_-7cZY16m';

let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} else {
  console.warn('Supabase CDN was not loaded. Reverting to local storage fallbacks.');
}

// Baseline Initial Data
const INITIAL_DATA = {
  notices: [
    {
      id: 'n-1',
      title: 'Admissions Open for Academic Session 2026-2027',
      content: 'Enrollments are now open for all classes from Pre-Nursery to Class 12, as well as our specialized NEET Foundation programs. Limited seats are available per batch to maintain a low student-to-teacher ratio (max 15 students). Contact the administration office or apply online today.',
      date: '2026-07-01',
      type: 'admission',
      active: true,
    },
    {
      id: 'n-2',
      title: 'Specialized NEET Biology Crash Course starting July 15th',
      content: 'A comprehensive biology preparation batch led by Director Seema Swami will begin on July 15th. This course covers high-yield chapters, mock tests, and deep practice of NCERT diagrams. Ideal for NEET aspirants looking to score 340+ in Biology.',
      date: '2026-07-08',
      type: 'urgent',
      active: true,
    },
    {
      id: 'n-3',
      title: 'Parent-Teacher Meeting (PTM) Schedule for Monthly Mock Tests',
      content: 'The review meeting for the June assessment tests is scheduled for Saturday, July 12th. Individual timing slots will be shared on WhatsApp. Parents are requested to attend with their children to discuss performance reports and doubt clearing.',
      date: '2026-07-05',
      type: 'general',
      active: true,
    }
  ],
  courses: [
    {
      id: 'c-1',
      name: 'Pre-Nursery',
      slug: 'pre-nursery',
      description: 'Activity-based development and cognitive foundation for toddlers. Focuses on sensory learning, basic speech, and building fine motor skills in a nurturing environment.',
      category: 'primary',
      eligibility: 'Ages 2.5 – 3.5 Years',
      subjects: ['Early Numeracy', 'Phonics & Literacy', 'Sensory Play', 'Speech Development'],
      batchType: 'Small Batch Classes',
      timing: 'Evening Batch: 3:00 PM – 6:00 PM (Mon–Sat)',
      fee: '',
      syllabus: ['Motor skills exercises', 'Alphabet tracing and sound play', 'Color and shape identification', 'Interactive rhymes'],
      featured: false,
    },
    {
      id: 'c-2',
      name: 'Nursery, LKG & UKG',
      slug: 'nursery-lkg-ukg',
      description: 'Comprehensive early-years learning to establish baseline literacy, grammar phonics, numeracy logic, and social interaction skills.',
      category: 'primary',
      eligibility: 'Ages 3.5 – 6 Years',
      subjects: ['English Phonics & Reading', 'Basic Mathematics', 'Environmental Studies (EVS)', 'General Knowledge'],
      batchType: 'Small Batch Classes',
      timing: 'Evening Batch: 3:00 PM – 6:00 PM (Mon–Sat)',
      fee: '',
      syllabus: ['Sentence reading and spelling lists', 'Double-digit number math logic', 'EVS nature observations', 'Creative art and writing drills'],
      featured: false,
    },
    {
      id: 'c-3',
      name: 'Classes 1–12 (All Subjects)',
      slug: 'classes-1-12-all-subjects',
      description: 'Academics mentor programs for school grades. Focuses on daily homework reviews, conceptual board-exams prep, and subject support maps.',
      category: 'secondary',
      eligibility: 'Classes 1 to 12',
      subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Physics', 'Chemistry', 'Social Science', 'Hindi', 'Computer'],
      batchType: 'Evening Batch classes',
      timing: 'Evening: 3:00 PM – 6:00 PM (Classes 1-8) & 6:00 PM – 8:00 PM (Classes 9-12)',
      fee: '',
      syllabus: ['NCERT textbook coverage', 'Bi-weekly evaluation checkups', 'Structured assignment reviews', 'Chapter exam sheets preparation'],
      featured: false,
    },
    {
      id: 'c-4',
      name: 'Biology (Individual Coaching)',
      slug: 'biology-individual-coaching',
      description: 'Flagship specialized one-to-one mentoring led by Director Seema Swami. Aimed at board exam preparation and pre-medical biology foundations.',
      category: 'specialized',
      eligibility: 'Class 10 and Class 12 Students',
      subjects: ['Class 10 Biology', 'Class 12 Biology'],
      batchType: 'One-to-One Individual Coaching',
      timing: 'Morning Batch: 10:00 AM – 12:00 PM (Mon–Sat)',
      fee: '₹500 / Hour',
      syllabus: ['High-yield genetics checklists', 'Anatomy and plant physiology drawing practice', 'Board answer sheets writing formats', 'Diagnostic concept clearing'],
      featured: true,
    },
    {
      id: 'c-5',
      name: 'NEET Foundation',
      slug: 'neet-foundation',
      description: 'Specialized competitive foundation prep for pre-medical medical streams (Classes 9-12). Accelerates NEET test accuracy, speed, and chapter concepts.',
      category: 'specialized',
      eligibility: 'Classes 9 to 12 Students',
      subjects: ['NEET Biology Syllabus', 'MCQ Timing Hacks', 'OMR Speed Training'],
      batchType: 'Foundation Courses',
      timing: 'Evening Batch: 6:00 PM – 8:00 PM (Mon–Sat)',
      fee: '',
      syllabus: ['Class 11 & 12 Pre-Medical syllabus acceleration', 'Weekly NEET Mock Assessment tests', 'NCERT diagram memory anchors', 'Previous years questions solutions'],
      featured: true,
    }
  ],
  subjects: [
    { id: 's-1', name: 'English', classes: 'Pre-Nursery to Class 10', approach: 'Focusing on phonics for juniors, and rigorous grammar, reading comprehension, and structured writing templates for seniors.', iconName: 'BookOpen' },
    { id: 's-2', name: 'Mathematics', classes: 'LKG to Class 12', approach: 'Eliminating math anxiety through visualization, logical derivation, and regular mental math drill routines.', iconName: 'Calculator' },
    { id: 's-3', name: 'Science', classes: 'Class 6 to 10', approach: 'Relating textbook concepts to real-world phenomena with mini experiments and classroom model demonstrations.', iconName: 'FlaskConical' },
    { id: 's-4', name: 'Biology', classes: 'Class 9 to 12 & NEET', approach: 'Flagship coaching using conceptual flowcharts, interactive biological slides, and diagram drawing tutorials led by Seema Swami.', iconName: 'Dna' },
    { id: 's-5', name: 'Physics', classes: 'Class 9 to 12 & NEET', approach: 'Strengthening mathematical applications of physical formulas, graphical derivations, and unit validations.', iconName: 'Zap' },
    { id: 's-6', name: 'Chemistry', classes: 'Class 9 to 12 & NEET', approach: 'Structured approach to periodic tables, balancing chemical equations, and organic mechanism step-diagrams.', iconName: 'Atom' },
    { id: 's-7', name: 'Social Science', classes: 'Class 6 to 10', approach: 'Utilizing detailed history timelines, geography map-drawing techniques, and civics case discussions.', iconName: 'Globe' },
    { id: 's-8', name: 'Hindi', classes: 'Pre-Nursery to Class 10', approach: 'Refining grammar structure (Vyakaran), vocabulary enrichment, and clean Hindi handwriting practices.', iconName: 'PenTool' },
    { id: 's-9', name: 'Computer (if available)', classes: 'Class 3 to 10', approach: 'Foundational concepts of computing logic, algorithmic steps, coding basics, and digital applications safety.', iconName: 'Monitor' }
  ],
  facilities: [
    {
      id: 'f-1',
      name: 'Small Batch Size',
      description: 'Strict limit of 15 students per batch. This allows the teacher to observe every student\'s notebook and keep track of individual learning speeds.',
      iconName: 'Users',
      image: './assets/gallery-1.jpg'
    },
    {
      id: 'f-2',
      name: 'Individual Attention',
      description: 'Custom learning paces are designed for students who need extra time on fundamental topics. No student is left behind in the curriculum.',
      iconName: 'UserCheck',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'f-3',
      name: 'Regular Assessments',
      description: 'Bi-weekly chapter tests and comprehensive monthly mock tests are administered to evaluate retention and build examination stamina.',
      iconName: 'ClipboardList',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'f-4',
      name: 'Doubt-Clearing Sessions',
      description: 'Dedicated 30-minute intervals before and after every batch. Students can bring school homework or test mistakes to work out with teachers.',
      iconName: 'HelpCircle',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'f-5',
      name: 'Homework Support',
      description: 'Guiding kids through daily school homework tasks, ensuring worksheets are conceptually completed and reinforcing school-based milestones.',
      iconName: 'Home',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'f-6',
      name: 'Parent-Teacher Meetings',
      description: 'Structured academic feedback sessions. We share monthly reports, benchmark graphs, and discuss targeted milestones with parents.',
      iconName: 'Calendar',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600'
    }
  ],
  toppers: [
    { id: 't-1', name: 'Aditya Raj', score: '350/360 Biology', year: '2025', classLevel: 'Class 12 / NEET', category: 'NEET', highlight: 'Scored 99.2 Percentile in NEET Biology under Seema Swami\'s guidance. Secured admission in Government Medical College.', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300' },
    { id: 't-2', name: 'Priya Sharma', score: '98.4%', year: '2025', classLevel: 'Class 12', category: 'CBSE Class 12', highlight: 'District Biology Topper (99/100). Secured overall 98.4% in CBSE Class 12 Science stream.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300' },
    { id: 't-3', name: 'Rohan Mehra', score: '97.8%', year: '2025', classLevel: 'Class 10', category: 'CBSE Class 10', highlight: 'Scored 100/100 in Mathematics and Science. Overall academic topper of Ratna Coaching Centre Class 10 batch.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
    { id: 't-4', name: 'Sneha Verma', score: '342/360 Biology', year: '2024', classLevel: 'Class 12 / NEET', category: 'NEET', highlight: 'Outstanding scores in NEET Biology. Now pursuing MBBS at prestigious Medical Institute.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300' }
  ],
  successStories: [
    {
      id: 'ss-1',
      studentName: 'Aditya Raj',
      achievement: 'NEET score 665/720 - Government Medical College Admission',
      story: 'Aditya joined Ratna Coaching Centre in Class 11 focusing on Biology. Struggling with MCQ speed and diagram recall, he took Director Seema Swami\'s specialized individual biology sessions. Through persistent feedback and over 50 mock evaluations, Aditya mastered the NCERT curriculum, securing a score of 350 out of 360 in NEET Biology.',
    },
    {
      id: 'ss-2',
      studentName: 'Ananya Gupta',
      achievement: 'From 65% in Class 9 to 94.2% in Class 10 Boards',
      story: 'Ananya had severe conceptual gaps in Algebra and Physics when she enrolled. Under the guidance of our math and science faculty, she engaged in doubt-clearing sessions and homework support daily. The personalized pace allowed her to regain academic confidence and score a stunning 95 in Board Math and 94 in Science.',
    }
  ],
  gallery: [
    { id: 'g-1', type: 'photo', url: './assets/gallery-1.jpg', category: 'classroom', title: 'Coaching Class Session' },
    { id: 'g-2', type: 'photo', url: './assets/gallery-2.jpg', category: 'classroom', title: 'Director Seema Swami Directing Students' },
    { id: 'g-3', type: 'photo', url: './assets/gallery-3.jpg', category: 'activity', title: 'Classroom Assessment and Study' },
    { id: 'g-4', type: 'photo', url: './assets/gallery-4.jpg', category: 'activity', title: 'Classroom Layout' },
    { id: 'g-5', type: 'photo', url: './assets/gallery-5.jpg', category: 'classroom', title: 'Daily Practice and Classroom Study' },
    { id: 'g-classroom-1', type: 'photo', url: './assets/classroom/classroom1.jpeg', category: 'classroom', title: 'Interactive Learning Session' },
    { id: 'g-classroom-2', type: 'photo', url: './assets/classroom/classroom2.jpeg', category: 'classroom', title: 'Group Discussion & Study' },
    { id: 'g-classroom-3', type: 'photo', url: './assets/classroom/classroom3.jpeg', category: 'classroom', title: 'Classroom Focused Study' },
    { id: 'g-classroom-4', type: 'photo', url: './assets/classroom/claroom4.jpeg', category: 'classroom', title: 'Director Seema Swami Mentoring Students' },
    { id: 'g-event-1', type: 'photo', url: './assets/event/Diwali1.jpeg', category: 'event', title: 'Diwali Celebration at Center' },
    { id: 'g-event-2', type: 'photo', url: './assets/event/Diwali2.jpeg', category: 'event', title: 'Diwali Decorations & Festivities' },
    { id: 'g-activity-1', type: 'photo', url: './assets/activites/drwaing1.jpeg', category: 'activity', title: 'Drawing Competition - Student Artwork 1' },
    { id: 'g-activity-2', type: 'photo', url: './assets/activites/drawing2.jpeg', category: 'activity', title: 'Drawing Competition - Student Artwork 2' },
    { id: 'g-activity-3', type: 'photo', url: './assets/activites/drawing3.jpeg', category: 'activity', title: 'Drawing Competition - Student Artwork 3' },
    { id: 'g-activity-4', type: 'photo', url: './assets/activites/drawing4.jpeg', category: 'activity', title: 'Drawing Competition - Student Artwork 4' },
    { id: 'g-activity-5', type: 'photo', url: './assets/activites/Food without fire1.jpeg', category: 'activity', title: 'Food Without Fire - Fruit Salads Preparation' },
    { id: 'g-activity-6', type: 'photo', url: './assets/activites/Food without fire2.jpeg', category: 'activity', title: 'Food Without Fire - Creative Food Design' },
    { id: 'g-activity-7', type: 'photo', url: './assets/activites/Food without fire3.jpeg', category: 'activity', title: 'Food Without Fire - Student Presentations' },
    { id: 'g-activity-8', type: 'photo', url: './assets/activites/Food without fire4.jpeg', category: 'activity', title: 'Food Without Fire - Healthy Delicacies' },
    { id: 'g-summercamp-v1', type: 'video', url: './assets/summer camp/dance1.mp4', category: 'summercamp', title: 'Summer Camp Dance Performance - Group A' },
    { id: 'g-summercamp-v2', type: 'video', url: './assets/summer camp/dance2.mp4', category: 'summercamp', title: 'Summer Camp Dance Performance - Group B' },
    { id: 'g-summercamp-v3', type: 'video', url: './assets/summer camp/dance3.mp4', category: 'summercamp', title: 'Summer Camp Dance Performance - Group C' },
    { id: 'g-summercamp-p1', type: 'photo', url: './assets/summer camp/movie_trip1.jpeg', category: 'summercamp', title: 'Summer Camp Movie Outing - Group Photo' },
    { id: 'g-summercamp-p2', type: 'photo', url: './assets/summer camp/movie_trip2.jpeg', category: 'summercamp', title: 'Summer Camp Movie Outing - Theater Hall' },
    { id: 'g-summercamp-p3', type: 'photo', url: './assets/summer camp/teeth1.jpeg', category: 'summercamp', title: 'Summer Camp Dental Health Checkup - 1' },
    { id: 'g-summercamp-p4', type: 'photo', url: './assets/summer camp/teeth2.jpeg', category: 'summercamp', title: 'Summer Camp Dental Health Checkup - 2' },
    { id: 'g-summercamp-p5', type: 'photo', url: './assets/summer camp/teeth3.jpeg', category: 'summercamp', title: 'Summer Camp Dental Health Checkup - 3' }
  ],
  testimonials: [
    {
      id: 'tst-1',
      name: 'Dr. Suresh Raj',
      relation: 'Parent',
      classLevel: 'Father of Aditya Raj (NEET Topper)',
      rating: 5,
      text: 'Ratna Coaching Centre is by far the best academic decision we made for Aditya. The biology teaching under Seema Swami is outstanding. She does not just teach definitions; she instills complete conceptual logic. The individual attention my son received here made all the difference in his NEET score.',
    },
    {
      id: 'tst-2',
      name: 'Rohan Mehra',
      relation: 'Student',
      classLevel: 'Class 10 CBSE 97.8% Student',
      rating: 5,
      text: 'The small batch size at Ratna helped me directly clear my math doubts in every class. The teachers are very friendly and never make you feel bad for asking simple questions. The test series was exactly aligned with the board exam pattern.',
    },
    {
      id: 'tst-3',
      name: 'Meenakshi Verma',
      relation: 'Parent',
      classLevel: 'Mother of Tanya (Class 8 Student)',
      rating: 5,
      text: 'As working parents, we were struggling to support our daughter with her school homework. Ratna Coaching\'s primary coaching has been a blessing. The teachers guide the kids through their worksheets, explain basic concepts, and prepare them for school unit tests.',
    }
  ],
  resources: [
    { id: 'res-1', title: 'Class 12 Biology - Genetics Hand-Written Short Notes', classLevel: 'Class 12', subject: 'Biology', type: 'Notes', fileType: 'PDF', fileSize: '4.2 MB', downloadUrl: '#' },
    { id: 'res-2', title: 'Class 10 Science - Chemical Reactions Balancing Worksheet', classLevel: 'Class 10', subject: 'Chemistry', type: 'Worksheets', fileType: 'PDF', fileSize: '1.8 MB', downloadUrl: '#' },
    { id: 'res-3', title: 'Class 12 Physics - Electromagnetism Chapter Formulas Sheet', classLevel: 'Class 12', subject: 'Physics', type: 'Notes', fileType: 'PDF', fileSize: '1.2 MB', downloadUrl: '#' },
    { id: 'res-4', title: 'Class 9 Math - Surface Areas & Volumes Sample Board Practice Paper', classLevel: 'Class 9', subject: 'Mathematics', type: 'Sample Papers', fileType: 'PDF', fileSize: '2.5 MB', downloadUrl: '#' },
    { id: 'res-5', title: 'Pre-Nursery - Holiday Fun & Alphabet Tracing Workbook', classLevel: 'Pre-Nursery', subject: 'English', type: 'Holiday Homework', fileType: 'PDF', fileSize: '5.1 MB', downloadUrl: '#' },
    { id: 'res-6', title: 'Class 10 Biology - Full Book NCERT Diagram Guide (Board High-Yield)', classLevel: 'Class 10', subject: 'Biology', type: 'NCERT', fileType: 'PDF', fileSize: '3.8 MB', downloadUrl: '#' }
  ],
  blogs: [
    {
      id: 'b-1',
      title: 'How to Study Class 12 Biology to Score 95+ in Board Exams',
      slug: 'score-95-class-12-biology-boards',
      excerpt: 'Struggling with complex biological processes and raw diagrams? Learn the 5 step preparation strategy used by toppers to memorize NCERT details and secure maximum marks in board evaluations.',
      content: `Board exams require not just understanding, but precise representation. Biology is a high-scoring subject, but many students lose marks on explanation accuracy and diagram presentation. Here is a definitive guide to securing 95+ in CBSE Class 12 Biology.\n\n### 1. Master the NCERT Textbook Word-by-Word\nThe CBSE Board exam matches the NCERT syllabus 100%. Highlight key definition terminologies (e.g., "apomixis", "triple fusion", "biodiversity hot-spots"). When answering questions, examiners search for these specific vocabulary keywords in your answer sheets.\n\n### 2. Practice Diagrams Until they are Muscle Memory\nA diagram is worth 10 marks in explanation.\n- Practice drawing clean, labeled sketches of:\n  * Human reproductive systems (Male & Female)\n  * Transcription unit and DNA Replication forks\n  * Reflex arcs and structure of Antibody molecules\n- Always label your diagrams horizontally, pointing to the right side where possible, using a sharp pencil.\n\n### 3. Build Concept Connection Flowcharts\nDon't just read pages. Synthesize information into summary sheets. For example, represent the stages of Spermatogenesis or the Krebs Cycle in an easy-to-follow flow diagram. Flowcharts are easier to retrieve under pressure than paragraphs of text.\n\n### 4. Solve the Last 10 Years Board Papers\nFamiliarize yourself with the questioning style. CBSE frequently rephrases past questions. Practice structured writing: write short, bullet-pointed points with underlined keywords rather than solid paragraphs.\n\nAt Ratna Coaching Centre, we emphasize these strategies in our weekly board-preparation evaluation. Director Seema Swami individually audits answer sheets to ensure board marking criteria are met.`,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800',
      category: 'Biology Focus',
      date: '2026-07-05',
      author: 'Seema Swami (Director)',
      readTime: '5 min read',
      tags: ['Class 12 Boards', 'Biology Prep', 'NCERT', 'Study Strategy']
    },
    {
      id: 'b-2',
      title: 'Cracking NEET Biology: NCERT Memorization Hacks for High Scores',
      slug: 'cracking-neet-biology-ncert-hacks',
      excerpt: 'NEET Biology requires absolute recall of minor text details. Read Seema Swami\'s expert memorization methodologies to answer Biology MCQs with 100% accuracy and beat negative marking.',
      content: `NEET Biology consists of 90 questions, carrying a whopping 360 marks. Scoring 340+ is the baseline requirement to land a seat in a premier Government Medical College. Because the NEET paper is drawn directly from NCERT lines, memorization details are crucial.\n\nHere are the key hacks we use in our NEET Foundation and specialized biology classes at Ratna Coaching Centre:\n\n### 1. The Active Recall Retrieval Method\nNever read your biology textbook passively. Instead:\n- Cover a section of the page with a card.\n- Ask yourself: "What are the examples of Deuteromycetes?" or "What are the examples of Deuteromycetes?"\n- Out loud, retrieve the examples, then check the text. Active recall creates stronger synaptic pathways in the brain than highlight-marking.\n\n### 2. Mnemonic Anchors for Examples\nPlant Kingdom, Animal Kingdom, and Morphology of Flowering Plants contain dozens of examples that are easy to mix up. Create funny sentences where the first letters map to the examples.\n- *Example*: For Ascomycetes (yeast, Penicillium, Aspergillus, Claviceps, Neurospora), memorize: "**A**sk **Y**our **P**arents **A**bout **C**lever **N**eighbors".\n\n### 3. Diagram-Only Reviews\nPhotocopy all NCERT diagrams, white out the labels, and place them in a binder. Every week, write down the labels on a blank sheet. NEET questions frequently show a diagram from the book with labels \'A\', \'B\', \'C\', \'D\' and ask you to identify the correct statement.\n\n### 4. Time-Bound Practice & Negating Marks\nAccuracy is nothing without speed. In NEET, you must answer biology questions in less than 40 seconds each, reserving time for Physics calculations. When solving mock tests at Ratna, we train students with OMR sheets and strict countdown timers. Remember: leaving a doubtful question blank is better than guessing and incurring a -1 penalty.\n\nFor hands-on practice, join our NEET Biology Special Batch. Watch our video sessions on our YouTube Channel: **BioMaster Seema** for conceptual breakdowns.`,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
      category: 'Biology Focus',
      date: '2026-07-09',
      author: 'Seema Swami (Director)',
      readTime: '6 min read',
      tags: ['NEET Biology', 'Pre-Medical Prep', 'Memorization Hacks', 'OMR Practice']
    },
    {
      id: 'b-3',
      title: 'Managing Board Exam Stress: A Guide for Parents and Students',
      slug: 'managing-board-exam-stress-guide',
      excerpt: 'Exam season can be extremely stressful for teenagers and their families. Understand how parents can provide a supportive home atmosphere and how students can optimize focus.',
      content: `Class 10 and 12 Board exams are high-stakes events that create massive stress. While a healthy amount of pressure drives focus, excessive anxiety degrades cognitive recall and sleep cycles, leading to poor scores. \n\nHere is a checklist for students and parents to successfully navigate exam periods with composure.\n\n### For Students:\n1. **The 50-10 Pomodoro Routine**: Study with high concentration for 50 minutes, then take a complete 10-minute break. Walk around, stretch, drink water, but avoid looking at smartphones.\n2. **Prioritize 7+ Hours of Sleep**: Sleeping is when your brain consolidates memory. Cramming overnight before an exam is counterproductive; a tired brain struggles to retrieve formulas and vocabulary.\n3. **Structured Doubt Solving**: Do not get stuck on a difficult topic. Circle the problem, continue studying other chapters, and resolve it with your teacher the next day.\n\n### For Parents:\n1. **Focus on Effort, Not Just Marks**: Reassure your child that their worth is not defined by a single exam sheet. A supportive home environment lowers performance pressure, leading to better focus.\n2. **Ensure Nutritional Balance**: Provide light, fresh, protein-rich snacks during study hours. Avoid heavy, greasy meals that induce drowsiness.\n3. **Open Dialogues**: Talk to your child. Ask how they are feeling, encourage them to take a walk, and maintain a quiet, distraction-free environment in the house.\n\nAt Ratna Coaching Centre, we conduct dedicated doubt sessions and mock tests to prepare students mentally. We guide our students to treat exams as simple evaluations of their preparation, not as sources of dread.`,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      category: 'Study Tips',
      date: '2026-07-03',
      author: 'Academic Counseling Team',
      readTime: '4 min read',
      tags: ['Board Exams', 'Stress Management', 'Parent Guidance', 'Study Routines']
    }
  ],
  admissions: [],
  contactMessages: []
};

const LOCAL_STORAGE_KEY = 'ratna_coaching_site_data';
const SUPABASE_SITE_DATA_KEY = 'main_site_data';
const CURRENT_USER_KEY = 'ratna_current_student';
const USERS_STORAGE_KEY = 'ratna_student_accounts';
const ADMIN_LOGGED_KEY = 'ratna_admin_logged';

// Shared Global App State
let appState = {
  data: { ...INITIAL_DATA },
  student: null,
  isAdmin: false,
  loading: true
};

// 2. Load and Synchronize Data
async function initAppState() {
  appState.loading = true;

  // A. Try loading local session details first
  try {
    const cachedStudent = localStorage.getItem(CURRENT_USER_KEY);
    if (cachedStudent) {
      appState.student = JSON.parse(cachedStudent);
    }
    appState.isAdmin = sessionStorage.getItem(ADMIN_LOGGED_KEY) === 'true';
  } catch (e) {
    console.error('Error fetching cached sessions', e);
  }

  // B. Try loading cached site data instantly
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      appState.data = { ...INITIAL_DATA, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error parsing stored site data', e);
  }

  // C. Fetch Remote Data from Supabase
  if (supabaseClient) {
    try {
      const { data: remoteRow, error } = await supabaseClient
        .from('site_data')
        .select('content')
        .eq('key', SUPABASE_SITE_DATA_KEY)
        .maybeSingle();

      if (!error && remoteRow && remoteRow.content) {
        const mergedRemote = { ...INITIAL_DATA, ...remoteRow.content };
        if (!mergedRemote.admissions) mergedRemote.admissions = [];
        if (!mergedRemote.contactMessages) mergedRemote.contactMessages = [];
        
        // Save to active state and cache
        appState.data = mergedRemote;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedRemote));
      }
    } catch (e) {
      console.warn('Supabase remote load failed. Running locally.', e);
    }
  }

  appState.loading = false;
  
  // Sync Supabase Realtime subscriptions (non-blocking)
  initRealtimeSubscription();

  // Run dynamic page layout insertions
  updateHeaderUI();
  triggerPageScripts();
}

// Save Active Site Data State (updates LocalStorage & Supabase)
async function saveSiteData(newData) {
  appState.data = newData;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));

  if (supabaseClient) {
    try {
      await supabaseClient
        .from('site_data')
        .upsert({
          key: SUPABASE_SITE_DATA_KEY,
          content: newData,
          updated_at: new Date().toISOString(),
        });
    } catch (e) {
      console.warn('Failed to sync changes to Supabase', e);
    }
  }
}

// 3. Realtime Subscription Handler
function initRealtimeSubscription() {
  if (!supabaseClient) return;

  try {
    supabaseClient
      .channel('site_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_data',
          filter: `key=eq.${SUPABASE_SITE_DATA_KEY}`,
        },
        (payload) => {
          if (payload.new && payload.new.content) {
            const updatedContent = { ...INITIAL_DATA, ...payload.new.content };
            appState.data = updatedContent;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
            
            // Re-render UI segments depending on the page
            triggerPageScripts();
          }
        }
      )
      .subscribe();
  } catch (e) {
    console.warn('Supabase Realtime subscription error:', e);
  }
}

// 4. SHA-256 Hashing helper
async function hashString(text) {
  const msgBuffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 5. Auth Action Methods
async function registerStudent(name, email, phone, classLevel, schoolName, passwordField) {
  try {
    const emailLower = email.toLowerCase().trim();
    const hashedPassword = await hashString(passwordField);

    // Fetch local database accounts
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // DB remote check
    if (supabaseClient) {
      const { data: dbCheck } = await supabaseClient
        .from('students')
        .select('email')
        .eq('email', emailLower);
      if (dbCheck && dbCheck.length > 0) {
        return { success: false, error: 'An account with this email already exists in the database.' };
      }
    }

    // Generate credentials
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const rollNumber = `RATNA-2026-${randomId}`;
    const joinedDate = new Date().toISOString().split('T')[0];
    const studentId = `stu-${Date.now()}`;

    const newStudent = {
      id: studentId,
      name: name.trim(),
      email: emailLower,
      phone: phone.trim(),
      classLevel,
      schoolName: schoolName.trim(),
      rollNumber,
      joinedDate,
      score: { correct: 0, attempted: 0 }
    };

    const newUserAccount = {
      ...newStudent,
      password: hashedPassword
    };

    // Insert to Supabase DB
    if (supabaseClient) {
      try {
        await supabaseClient.from('students').insert([{
          student_name: name.trim(),
          email: emailLower,
          mobile_number: phone.trim(),
          target_class: classLevel,
          school_name: schoolName.trim(),
          roll_number: rollNumber,
          password_hash: hashedPassword,
          joined_date: joinedDate,
          score_correct: 0,
          score_attempted: 0
        }]);
      } catch (dbErr) {
        console.warn('Could not sync student to database:', dbErr);
      }
    }

    // Save locally
    users.push(newUserAccount);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Sign in active student session
    appState.student = newStudent;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newStudent));
    
    updateHeaderUI();
    closeLoginModal();
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Registration failed due to a system error.' };
  }
}

async function loginStudent(email, passwordField) {
  try {
    const emailLower = email.toLowerCase().trim();
    const hashedPassword = await hashString(passwordField);

    // 1. Try DB first
    if (supabaseClient) {
      try {
        const { data: dbUsers, error: dbError } = await supabaseClient
          .from('students')
          .select('*')
          .eq('email', emailLower)
          .eq('password_hash', hashedPassword);

        if (!dbError && dbUsers && dbUsers.length > 0) {
          const u = dbUsers[0];
          const studentProfile = {
            id: String(u.id),
            name: u.student_name || u.name || '',
            email: u.email,
            phone: u.mobile_number || u.phone || '',
            classLevel: u.target_class || u.class_level || '',
            schoolName: u.school_name || '',
            rollNumber: u.roll_number || '',
            joinedDate: u.joined_date || '',
            score: {
              correct: u.score_correct || 0,
              attempted: u.score_attempted || 0,
            }
          };

          appState.student = studentProfile;
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(studentProfile));
          updateHeaderUI();
          closeLoginModal();
          return { success: true };
        }
      } catch (e) {
        console.warn('Supabase login failed. Falling back to local storage accounts.', e);
      }
    }

    // 2. Local storage accounts check
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    const matchedAccount = users.find(
      u => u.email.toLowerCase() === emailLower && u.password === hashedPassword
    );

    if (!matchedAccount) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const { password, ...studentProfile } = matchedAccount;
    appState.student = studentProfile;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(studentProfile));
    
    updateHeaderUI();
    closeLoginModal();
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Login failed due to a system error.' };
  }
}

async function loginAdmin(usernameField, passwordField) {
  try {
    const userHash = await hashString(usernameField);
    const passHash = await hashString(passwordField);

    // Hashes matching 'admin' / 'ratna2026'
    if (
      userHash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' &&
      passHash === '5e313469f0389646496f428938ce1c6d0fea2e71ee29b77bb352e0aaef213119'
    ) {
      appState.isAdmin = true;
      sessionStorage.setItem(ADMIN_LOGGED_KEY, 'true');
      updateHeaderUI();
      closeLoginModal();
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials.' };
  } catch (e) {
    return { success: false, error: 'System error during validation.' };
  }
}

function logout() {
  appState.student = null;
  appState.isAdmin = false;
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(ADMIN_LOGGED_KEY);
  updateHeaderUI();
  
  // If we are on portal or admin dashboard, navigate back home
  const pathname = window.location.pathname;
  if (pathname.includes('portal.html') || pathname.includes('admin.html')) {
    window.location.href = './index.html';
  } else {
    openLoginModal();
  }
}

// Update student profile info
async function updateStudentProfile(name, phone, schoolName, classLevel) {
  if (!appState.student) return;

  const updatedStudent = {
    ...appState.student,
    name: name.trim(),
    phone: phone.trim(),
    schoolName: schoolName.trim(),
    classLevel
  };

  appState.student = updatedStudent;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedStudent));

  // Sync in local storage user list
  try {
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const updatedUsers = users.map(u => 
        u.id === updatedStudent.id 
          ? { ...u, name: name.trim(), phone: phone.trim(), schoolName: schoolName.trim(), classLevel } 
          : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  } catch (e) {
    console.error(e);
  }

  // Sync Supabase
  if (supabaseClient) {
    try {
      await supabaseClient.from('students').update({
        student_name: name.trim(),
        mobile_number: phone.trim(),
        school_name: schoolName.trim(),
        target_class: classLevel
      }).eq('email', updatedStudent.email);
    } catch (e) {
      console.warn('Failed to update student in database', e);
    }
  }
}

// Update student score
async function updateStudentScore(correctDelta, attemptedDelta) {
  if (!appState.student) return;

  const currentScore = appState.student.score || { correct: 0, attempted: 0 };
  const updatedScore = {
    correct: currentScore.correct + correctDelta,
    attempted: currentScore.attempted + attemptedDelta
  };

  const updatedStudent = {
    ...appState.student,
    score: updatedScore
  };

  appState.student = updatedStudent;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedStudent));

  // Sync in local list
  try {
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const updatedUsers = users.map(u => 
        u.id === updatedStudent.id 
          ? { ...u, score: updatedScore } 
          : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  } catch (e) {
    console.error(e);
  }

  // Sync Supabase
  if (supabaseClient) {
    try {
      await supabaseClient.from('students').update({
        score_correct: updatedScore.correct,
        score_attempted: updatedScore.attempted
      }).eq('email', updatedStudent.email);
    } catch (e) {
      console.warn('Failed to sync student scores to database', e);
    }
  }
}

// 6. Global Enquiries and Messages submission methods
async function submitAdmissionForm(studentName, parentName, classLevel, schoolName, mobileNumber) {
  const enquiryId = `enq-${Date.now()}`;
  const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const newEnquiry = {
    id: enquiryId,
    studentName,
    parentName,
    classLevel,
    schoolName,
    mobileNumber,
    submittedAt,
    status: 'Pending'
  };

  const updatedAdmissions = [newEnquiry, ...appState.data.admissions];
  await saveSiteData({
    ...appState.data,
    admissions: updatedAdmissions
  });

  // Dedicated DB Table insertion
  if (supabaseClient) {
    try {
      await supabaseClient.from('admissions').insert([{
        id: enquiryId,
        student_name: studentName,
        parent_name: parentName,
        class_level: classLevel,
        school_name: schoolName || '',
        mobile_number: mobileNumber,
        status: 'Pending',
        submitted_at: submittedAt
      }]);
    } catch (dbErr) {
      console.warn('Failed to insert dedicated admission log in database', dbErr);
    }
  }
}

async function submitContactForm(name, emailOrPhone, subject, message) {
  const messageId = `msg-${Date.now()}`;
  const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const newMessage = {
    id: messageId,
    name,
    emailOrPhone,
    subject,
    message,
    submittedAt,
    read: false
  };

  const updatedMessages = [newMessage, ...appState.data.contactMessages];
  await saveSiteData({
    ...appState.data,
    contactMessages: updatedMessages
  });

  // Dedicated DB Table insertion
  if (supabaseClient) {
    try {
      await supabaseClient.from('contact_messages').insert([{
        id: messageId,
        name,
        email_or_phone: emailOrPhone,
        subject: subject || '',
        message: message,
        read: false,
        submitted_at: submittedAt
      }]);
    } catch (dbErr) {
      console.warn('Failed to insert dedicated contact message log in database', dbErr);
    }
  }
}

// 7. Dynamic Global Header Navigation Session Sync
function updateHeaderUI() {
  const headerActionsContainer = document.getElementById('header-actions');
  const mobileActionsContainer = document.getElementById('mobile-actions');
  if (!headerActionsContainer) return;

  let uiContent = '';
  
  if (appState.isAdmin) {
    uiContent = `
      <a href="./admin.html" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-full text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
        <i data-lucide="shield" class="h-3.5 w-3.5"></i>
        Staff Desk
      </a>
      <button onclick="logout()" class="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all cursor-pointer" title="Log Out">
        <i data-lucide="log-out" class="h-4 w-4"></i>
      </button>
    `;
  } else if (appState.student) {
    uiContent = `
      <a href="./portal.html" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B2C6B] font-bold rounded-full text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
        <i data-lucide="user" class="h-3.5 w-3.5"></i>
        Hi, ${appState.student.name.split(' ')[0]}
      </a>
      <button onclick="logout()" class="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all cursor-pointer" title="Log Out">
        <i data-lucide="log-out" class="h-4 w-4"></i>
      </button>
    `;
  } else {
    uiContent = `
      <button onclick="openLoginModal()" class="px-5 py-2.5 bg-primary text-white hover:bg-primary-light font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer">
        Student Login
      </button>
    `;
  }

  headerActionsContainer.innerHTML = uiContent;
  if (mobileActionsContainer) {
    mobileActionsContainer.innerHTML = uiContent;
  }
  
  // Reinitialize Lucide icons dynamically to render the new svg vectors
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Mobile navigation menu toggle trigger
function initNavigationEvents() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }
}

// Password visibility toggler
window.togglePasswordVisibility = (inputId) => {
  const el = document.getElementById(inputId);
  if (el) {
    el.type = el.type === 'password' ? 'text' : 'password';
  }
};

// Dropdown toggle helper
window.toggleMoreDropdown = (event) => {
  event.stopPropagation();
  const dropdown = document.getElementById('more-dropdown-menu');
  const icon = document.getElementById('more-dropdown-icon');
  const btn = document.getElementById('more-dropdown-btn');
  if (dropdown) {
    const isHidden = dropdown.classList.contains('hidden');
    // Close other dropdowns if any
    if (isHidden) {
      dropdown.classList.remove('hidden');
      if (icon) icon.classList.add('rotate-180');
      if (btn) btn.classList.add('border-2', 'border-black'); // matching screenshot 5's active border
    } else {
      dropdown.classList.add('hidden');
      if (icon) icon.classList.remove('rotate-180');
      if (btn) btn.classList.remove('border-2', 'border-black');
    }
  }
};

// Close dropdowns on document click
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('more-dropdown-menu');
  const icon = document.getElementById('more-dropdown-icon');
  const btn = document.getElementById('more-dropdown-btn');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    if (!e.target.closest('.dropdown-container')) {
      dropdown.classList.add('hidden');
      if (icon) icon.classList.remove('rotate-180');
      if (btn) btn.classList.remove('border-2', 'border-black');
    }
  }
});

// 8. Global Login Modal triggers
function openLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    showAuthMode('student-login'); // default to student login
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Clear warnings
    const errBox = document.getElementById('login-error-message');
    if (errBox) errBox.classList.add('hidden');
  }
}

// Show specific auth form mode
window.showAuthMode = (mode) => {
  const studentLoginPane = document.getElementById('student-login-pane');
  const studentRegisterPane = document.getElementById('student-register-pane');
  const adminLoginPane = document.getElementById('admin-login-pane');
  
  const tabLogin = document.getElementById('tab-login-btn');
  const tabAdmin = document.getElementById('tab-admin-btn');
  const errBox = document.getElementById('login-error-message');

  if (errBox) errBox.classList.add('hidden');
  
  if (studentLoginPane && studentRegisterPane && adminLoginPane) {
    studentLoginPane.classList.add('hidden');
    studentRegisterPane.classList.add('hidden');
    adminLoginPane.classList.add('hidden');
    
    // Reset active tab button styles
    if (tabLogin) tabLogin.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 focus:outline-none";
    if (tabAdmin) tabAdmin.className = "flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 focus:outline-none";
    
    if (mode === 'student-login') {
      studentLoginPane.classList.remove('hidden');
      if (tabLogin) tabLogin.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-white text-primary shadow-sm flex items-center justify-center gap-1.5 focus:outline-none";
    } else if (mode === 'student-register') {
      studentRegisterPane.classList.remove('hidden');
      if (tabLogin) tabLogin.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-white text-primary shadow-sm flex items-center justify-center gap-1.5 focus:outline-none";
    } else if (mode === 'admin-login') {
      adminLoginPane.classList.remove('hidden');
      if (tabAdmin) tabAdmin.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-white text-primary shadow-sm flex items-center justify-center gap-1.5 border border-black focus:outline-none";
    }
  }
};

// Fallback compatibility with previous pages
function switchLoginTab(tab) {
  if (tab === 'login') {
    showAuthMode('student-login');
  } else {
    showAuthMode('admin-login');
  }
}

// Handle Student Login submit click
async function handleStudentLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error-message');

  if (errBox) errBox.classList.add('hidden');

  const res = await loginStudent(email, pass);
  if (res.success) {
    const pathname = window.location.pathname;
    if (pathname.includes('portal.html') || pathname.includes('admin.html')) {
      window.location.reload();
    } else {
      updateHeaderUI();
      closeLoginModal();
    }
  } else {
    if (errBox) {
      errBox.textContent = res.error;
      errBox.classList.remove('hidden');
    } else {
      alert(res.error);
    }
  }
}

// Handle Student Register submit click
async function handleStudentRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const classLevel = document.getElementById('reg-class').value;
  const school = document.getElementById('reg-school').value;
  const pass = document.getElementById('reg-password').value;
  const confirmPass = document.getElementById('reg-confirm-password').value;
  const errBox = document.getElementById('login-error-message');

  if (errBox) errBox.classList.add('hidden');

  if (pass !== confirmPass) {
    const errorText = 'Passwords do not match.';
    if (errBox) {
      errBox.textContent = errorText;
      errBox.classList.remove('hidden');
    } else {
      alert(errorText);
    }
    return;
  }

  const res = await registerStudent(name, email, phone, classLevel, school, pass);
  if (res.success) {
    const pathname = window.location.pathname;
    if (pathname.includes('portal.html')) {
      window.location.reload();
    } else {
      updateHeaderUI();
      closeLoginModal();
    }
  } else {
    if (errBox) {
      errBox.textContent = res.error;
      errBox.classList.remove('hidden');
    } else {
      alert(res.error);
    }
  }
}

// Handle Admin Login submit click
async function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const user = document.getElementById('admin-username').value;
  const pass = document.getElementById('admin-password').value;
  const errBox = document.getElementById('login-error-message');

  if (errBox) errBox.classList.add('hidden');

  const res = await loginAdmin(user, pass);
  if (res.success) {
    const pathname = window.location.pathname;
    if (pathname.includes('admin.html')) {
      window.location.reload();
    } else {
      window.location.href = './admin.html';
    }
  } else {
    if (errBox) {
      errBox.textContent = res.error;
      errBox.classList.remove('hidden');
    } else {
      alert(res.error);
    }
  }
}


// Auto load modal if student portal is locked and not authenticated
function checkPortalLocks() {
  const pathname = window.location.pathname;
  if (pathname.includes('portal.html') && !appState.student && !appState.loading) {
    openLoginModal();
  }
  if (pathname.includes('admin.html') && !appState.isAdmin && !appState.loading) {
    // Standard auth block layout in admin dashboard HTML will display the login screen directly
  }
}

// 9. PAGE-SPECIFIC RENDERING ENGINE SCRIPTS
function triggerPageScripts() {
  const pathname = window.location.pathname.toLowerCase();
  
  if (pathname.endsWith('/') || pathname.includes('index.html')) {
    renderHomePage();
  } else if (pathname.includes('about-us.html')) {
    // Mostly static page, header sync is sufficient
  } else if (pathname.includes('courses.html')) {
    renderCoursesPage();
  } else if (pathname.includes('subjects.html')) {
    renderSubjectsPage();
  } else if (pathname.includes('facilities.html')) {
    renderFacilitiesPage();
  } else if (pathname.includes('admissions.html')) {
    renderAdmissionsPage();
  } else if (pathname.includes('results-achievements.html')) {
    renderToppersPage();
  } else if (pathname.includes('gallery.html')) {
    renderGalleryPage();
  } else if (pathname.includes('testimonials.html')) {
    renderTestimonialsPage();
  } else if (pathname.includes('study-resources.html')) {
    renderResourcesPage();
  } else if (pathname.includes('blog.html')) {
    renderBlogPage();
  } else if (pathname.includes('blog-post.html')) {
    renderBlogPostPage();
  } else if (pathname.includes('contact-us.html')) {
    renderContactUsPage();
  } else if (pathname.includes('portal.html')) {
    renderStudentPortalPage();
  } else if (pathname.includes('admin.html')) {
    renderAdminPage();
  }
}

// ==========================================
// HOME PAGE RENDERING ENGINE
// ==========================================
let homeTestimonialIndex = 0;
let homeTestimonialTimer = null;

function renderHomePage() {
  const noticesMarquee = document.getElementById('notices-marquee-ticker');
  const noticesTickerRow = document.getElementById('notices-ticker-row');
  const toppersGrid = document.getElementById('home-toppers-grid');
  const announcementsBox = document.getElementById('home-announcements-box');
  const blogList = document.getElementById('home-blog-list');
  const galleryGrid = document.getElementById('home-gallery-grid');

  // Notices Ticker Load
  const activeNotices = appState.data.notices.filter(n => n.active);
  if (activeNotices.length > 0 && noticesMarquee) {
    if (noticesTickerRow) noticesTickerRow.classList.remove('hidden');
    let marqueeHTML = '';
    
    // Original set
    activeNotices.forEach(n => {
      marqueeHTML += `<span class="hover:text-accent cursor-pointer" onclick="window.location.href='./blog.html'">• ${n.title} (${n.date})</span>`;
    });
    // Duplicate set for loop
    activeNotices.forEach(n => {
      marqueeHTML += `<span class="hover:text-accent cursor-pointer" onclick="window.location.href='./blog.html'">• ${n.title} (${n.date})</span>`;
    });
    
    noticesMarquee.innerHTML = marqueeHTML;
  } else if (noticesTickerRow) {
    noticesTickerRow.classList.add('hidden');
  }

  // Toppers Grid (slice 4)
  if (toppersGrid) {
    toppersGrid.innerHTML = appState.data.toppers.slice(0, 4).map(t => `
      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <img src="${t.image}" alt="${t.name}" class="h-24 w-24 object-cover rounded-full bg-slate-100 border border-slate-200 shadow-inner mb-4">
        <h3 class="font-bold text-sm text-slate-800">${t.name}</h3>
        <span class="text-xs font-extrabold text-accent block mt-0.5">${t.score}</span>
        <span class="text-[10px] text-slate-400 font-bold block">${t.classLevel} • ${t.year}</span>
        <p class="text-[11px] text-slate-500 font-semibold leading-relaxed mt-3 line-clamp-2">${t.highlight}</p>
      </div>
    `).join('');
  }

  // Announcements List (slice 3)
  if (announcementsBox) {
    announcementsBox.innerHTML = appState.data.notices.slice(0, 3).map(n => `
      <div class="flex gap-4 items-start pb-5 border-b border-slate-100/60 last:border-b-0 last:pb-0">
        <div class="h-8 w-8 rounded-full bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-sm text-slate-800">${n.title}</h3>
            <span class="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
              n.type === 'urgent' ? 'bg-red-50 text-red-700' :
              n.type === 'admission' ? 'bg-emerald-50 text-emerald-700' :
              'bg-slate-100 text-slate-600'
            }">${n.type}</span>
          </div>
          <span class="text-[10px] text-slate-400 font-bold block mt-0.5">${n.date}</span>
          <p class="text-xs text-slate-500 font-semibold leading-relaxed mt-2.5">${n.content}</p>
        </div>
      </div>
    `).join('');
  }

  // Testimonials Auto Carousel Loop
  initHomeTestimonialSlider();

  // Blog articles double grid (slice 2)
  if (blogList) {
    blogList.innerHTML = appState.data.blogs.slice(0, 2).map(b => `
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
        <img src="${b.image}" alt="${b.title}" class="h-16 w-20 object-cover rounded-xl bg-slate-100 flex-shrink-0 border border-slate-100">
        <div>
          <span class="text-[8px] font-extrabold text-accent bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider block w-max">${b.category}</span>
          <h4 class="font-bold text-xs text-slate-800 leading-snug mt-1 hover:text-primary cursor-pointer" onclick="window.location.href='./blog-post.html?slug=${b.slug}'">
            ${b.title}
          </h4>
          <span class="text-[9px] text-slate-400 font-bold block mt-1">${b.date}</span>
        </div>
      </div>
    `).join('');
  }

  // Gallery Preview (slice 6 photos)
  if (galleryGrid) {
    const photos = appState.data.gallery.filter(g => g.type === 'photo').slice(0, 6);
    galleryGrid.innerHTML = photos.map(item => `
      <div class="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group" onclick="window.location.href='./gallery.html'">
        <img src="${item.url}" alt="${item.title}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300">
      </div>
    `).join('');
  }
}

function initHomeTestimonialSlider() {
  const testimonials = appState.data.testimonials;
  const contentBox = document.getElementById('home-testimonial-content');
  const dotsBox = document.getElementById('home-testimonial-dots');

  if (!contentBox || testimonials.length === 0) return;

  function renderTestimonialSlide(index) {
    const testi = testimonials[index];
    
    // Build star rating row
    let starsRow = '';
    for (let i = 0; i < testi.rating; i++) {
      starsRow += `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1" class="lucide lucide-star">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    }

    contentBox.innerHTML = `
      <div class="flex gap-1 mb-5 justify-center">${starsRow}</div>
      <blockquote class="text-lg sm:text-xl font-medium font-serif italic leading-relaxed text-slate-200">
        "${testi.text}"
      </blockquote>
      <cite class="not-italic block mt-6">
        <span class="block font-bold text-accent text-sm tracking-wider uppercase">${testi.name}</span>
        <span class="block text-slate-400 text-xs font-semibold mt-1">${testi.classLevel} (${testi.relation})</span>
      </cite>
    `;

    // Render Dots
    if (dotsBox) {
      dotsBox.innerHTML = testimonials.map((_, i) => `
        <button onclick="setHomeTestiIndex(${i})" class="h-2.5 w-2.5 rounded-full transition-all ${
          i === index ? 'bg-accent scale-125' : 'bg-white/20'
        }" aria-label="Go to testimonial slide ${i + 1}"></button>
      `).join('');
    }
  }

  // Set manual index
  window.setHomeTestiIndex = (index) => {
    homeTestimonialIndex = index;
    renderTestimonialSlide(homeTestimonialIndex);
    // Reset interval timer
    clearInterval(homeTestimonialTimer);
    homeTestimonialTimer = setInterval(rotateHomeTestimonial, 5000);
  };

  function rotateHomeTestimonial() {
    homeTestimonialIndex = (homeTestimonialIndex + 1) % testimonials.length;
    renderTestimonialSlide(homeTestimonialIndex);
  }

  renderTestimonialSlide(homeTestimonialIndex);
  clearInterval(homeTestimonialTimer);
  homeTestimonialTimer = setInterval(rotateHomeTestimonial, 5000);
}

// ==========================================
// COURSES PAGE RENDERING ENGINE
// ==========================================
let activeCourseCategory = 'all';
let expandedCourseId = null;

function renderCoursesPage() {
  const container = document.getElementById('courses-list-container');
  if (!container) return;

  const courses = appState.data.courses;

  // Filter based on active category
  const filtered = courses.filter(c => {
    if (activeCourseCategory === 'all') return true;
    return c.category === activeCourseCategory;
  });

  container.innerHTML = filtered.map(course => {
    const isExpanded = expandedCourseId === course.id;
    const isSpecialized = course.category === 'specialized';
    
    // Draw accordion details block if expanded
    let detailsHTML = '';
    if (isExpanded) {
      // Build Key Syllabus Checklists
      const syllabusList = course.syllabus.map(item => `
        <div class="flex gap-2 items-start text-xs font-bold text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2.5" class="flex-shrink-0 mt-0.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${item}</span>
        </div>
      `).join('');

      // Build Subjects Badges
      const subjectBadges = course.subjects.map(sub => `
        <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">${sub}</span>
      `).join('');

      // Fee highlighted label
      const feeRow = course.fee ? `
        <div>
          <span class="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Tuition Fees</span>
          <span class="text-lg font-extrabold text-primary block mt-0.5">${course.fee}</span>
        </div>
      ` : '';

      detailsHTML = `
        <div class="px-6 pb-6 pt-2 border-t border-slate-100">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-4">
            
            <div class="md:col-span-8 flex flex-col gap-6">
              <div>
                <h4 class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Program Overview</h4>
                <p class="text-xs font-semibold text-slate-500 leading-relaxed">${course.description}</p>
              </div>

              <div>
                <h4 class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Key Syllabus Modules</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">${syllabusList}</div>
              </div>

              <div>
                <h4 class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Subjects Covered</h4>
                <div class="flex flex-wrap gap-2">${subjectBadges}</div>
              </div>
            </div>

            <div class="md:col-span-4 bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-4">
              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Batch Setup</span>
                <span class="text-xs font-bold text-slate-700 block mt-1">${course.batchType}</span>
              </div>

              <div>
                <span class="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Timing Schedule</span>
                <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>${course.timing}</span>
                </div>
              </div>

              ${feeRow}

              <button onclick="window.location.href='./admissions.html?course=${encodeURIComponent(course.name)}'" class="w-full py-3.5 bg-primary text-white font-bold rounded-xl text-center text-xs shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-1 cursor-pointer mt-2">
                Enquire Now
              </button>
            </div>

          </div>
        </div>
      `;
    }

    return `
      <div class="bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${
        isExpanded ? 'shadow-md border-primary/20' : 'shadow-sm border-slate-100'
      }">
        <div onclick="toggleCourseExpand('${course.id}')" class="p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 select-none relative ${
          isSpecialized ? 'bg-gradient-to-r from-primary/5 via-white to-white' : ''
        }">
          ${isSpecialized ? '<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"></div>' : ''}
          <div class="flex items-center gap-4">
            <div class="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isSpecialized ? 'bg-accent/15 text-primary' : 'bg-primary/5 text-primary'
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8V15.2c0-.4-.3-.8-.7-.9l-3.2-.8"/><path d="M18 15v5.8a1 1 0 0 1-.6 1-.9.9 0 0 1-1-.2l-2.6-2.6a1 1 0 0 1-.3-.7V15"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-serif font-bold text-lg text-primary">${course.name}</h3>
                ${course.featured ? '<span class="text-[8px] font-extrabold bg-accent text-primary-dark px-2 py-0.5 rounded uppercase tracking-wider">Flagship</span>' : ''}
              </div>
              <span class="text-xs font-bold text-slate-400 block mt-0.5">Eligibility: ${course.eligibility}</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span class="hidden sm:inline-block text-xs font-bold text-slate-400">${isExpanded ? 'Collapse Details' : 'View Details'}</span>
            <div class="text-slate-400 p-1.5 rounded-lg border border-slate-100">
              ${isExpanded ? 
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>' : 
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
              }
            </div>
          </div>
        </div>
        ${detailsHTML}
      </div>
    `;
  }).join('');

  // Setup tab styling updates
  const tabs = ['all', 'primary', 'secondary', 'specialized'];
  tabs.forEach(tab => {
    const el = document.getElementById(`tab-course-${tab}`);
    if (el) {
      if (activeCourseCategory === tab) {
        el.className = "px-4 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap bg-primary text-white shadow-md transition-all";
      } else {
        el.className = "px-4 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap bg-white text-slate-500 hover:text-slate-800 border border-slate-100 hover:border-slate-200 transition-all";
      }
    }
  });
}

// Global category click bindings
window.setCourseCategoryFilter = (cat) => {
  activeCourseCategory = cat;
  renderCoursesPage();
};

window.toggleCourseExpand = (id) => {
  expandedCourseId = expandedCourseId === id ? null : id;
  renderCoursesPage();
};

// ==========================================
// SUBJECTS PAGE RENDERING ENGINE
// ==========================================
function renderSubjectsPage() {
  const container = document.getElementById('subjects-list-container');
  if (!container) return;

  container.innerHTML = appState.data.subjects.map(sub => `
    <div class="bg-white p-6 rounded-2xl border border-slate-100 hover:border-accent hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
      <div>
        <div class="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5">
          ${getSubjectSVGIcon(sub.iconName)}
        </div>
        <h3 class="font-serif font-bold text-lg text-primary">${sub.name}</h3>
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">${sub.classes}</span>
        <p class="text-xs text-slate-500 leading-relaxed font-semibold mt-3">${sub.approach}</p>
      </div>
    </div>
  `).join('');
}

function getSubjectSVGIcon(name) {
  switch (name) {
    case 'BookOpen':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
    case 'Calculator':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`;
    case 'FlaskConical':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><path d="M10 2v7.586a1 1 0 0 1-.293.707l-5.32 5.32A3.218 3.218 0 0 0 6.671 21h10.658a3.218 3.218 0 0 0 2.284-5.387l-5.320-5.32a1 1 0 0 1-.293-.707V2ZM6 14h12"/></svg>`;
    case 'Dna':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><path d="M4.5 10.5C4.5 6 12 3 12 3s7.5 3 7.5 7.5-7.5 7.5-7.5 7.5-7.5-3-7.5-7.5Z"/><path d="M12 3v15"/><path d="M9 12h6"/><path d="M9 9h6"/><path d="M9 15h6"/></svg>`;
    case 'Zap':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    case 'Atom':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.4-2.4 2.4-6.2 0-8.5-2.4-2.4-6.2-2.4-8.5 0-2.4 2.4-2.4 6.2 0 8.5 2.4 2.4 6.2 2.4 8.5 0z"/><path d="M16.3 16.3c1.4-1.4 1.4-3.7 0-5.1-1.4-1.4-3.7-1.4-5.1 0-1.4 1.4-1.4 3.7 0 5.1 1.4 1.4 3.7 1.4 5.1 0z"/><path d="M12.4 12.4c.5-.5.5-1.3 0-1.8-.5-.5-1.3-.5-1.8 0-.5.5-.5 1.3 0 1.8.5.5 1.3.5 1.8 0z"/></svg>`;
    case 'Globe':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    case 'PenTool':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m14 5 .3-.3a2.1 2.1 0 1 1 3 3L17 8"/><path d="m8 14-4 4v3h3l4-4"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><rect width="20" height="15" x="2" y="3" rx="2"/><line x1="6" x2="6" y1="21" y2="18"/><line x1="18" x2="18" y1="21" y2="18"/><line x1="12" x2="12" y1="18" y2="18"/></svg>`;
  }
}

// ==========================================
// FACILITIES PAGE RENDERING ENGINE
// ==========================================
function renderFacilitiesPage() {
  const container = document.getElementById('facilities-list-container');
  if (!container) return;

  container.innerHTML = appState.data.facilities.map(fac => `
    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.01] transition-all">
      <img src="${fac.image}" alt="${fac.name}" class="h-48 w-full object-cover bg-slate-100">
      <div class="p-6">
        <h3 class="font-serif font-bold text-lg text-primary mb-2">${fac.name}</h3>
        <p class="text-xs text-slate-500 font-semibold leading-relaxed">${fac.description}</p>
      </div>
    </div>
  `).join('');
}

// ==========================================
// ADMISSIONS ENQUIRY PAGE RENDERING ENGINE
// ==========================================
function renderAdmissionsPage() {
  const selectEl = document.getElementById('admission-select-course');
  const formEl = document.getElementById('admissions-enquiry-form');
  const successBox = document.getElementById('admission-success-box');
  if (!formEl) return;

  // Pre-fill course list inside options
  if (selectEl) {
    selectEl.innerHTML = `
      <option value="">Select a Program *</option>
      ${appState.data.courses.map(c => `<option value="${c.name}">${c.name} (${c.eligibility})</option>`).join('')}
    `;
  }

  // Handle URL query parameter pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const requestedCourse = urlParams.get('course');
  if (requestedCourse && selectEl) {
    selectEl.value = decodeURIComponent(requestedCourse);
  }

  // Enquiry submit handler
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentName = document.getElementById('ad-student-name').value;
    const parentName = document.getElementById('ad-parent-name').value;
    const classLevel = selectEl ? selectEl.value : document.getElementById('ad-class-level').value;
    const schoolName = document.getElementById('ad-school-name').value;
    const mobileNumber = document.getElementById('ad-mobile-number').value;

    try {
      await submitAdmissionForm(studentName, parentName, classLevel, schoolName, mobileNumber);
      formEl.reset();
      if (successBox) {
        successBox.classList.remove('hidden');
        // Scroll to success banner
        successBox.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Enquiry submitted successfully! Our counseling team will call you back within 24 hours.');
      }
    } catch (err) {
      alert('Error submitting enquiry form. Please try again.');
    }
  });
}

// ==========================================
// RESULTS WALL PAGE RENDERING ENGINE
// ==========================================
function renderToppersPage() {
  const container = document.getElementById('toppers-list-container');
  if (!container) return;

  container.innerHTML = appState.data.toppers.map(t => `
    <div class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <img src="${t.image}" alt="${t.name}" class="h-28 w-28 object-cover rounded-full bg-slate-100 border border-slate-200 shadow-inner mb-4">
      <h3 class="font-serif font-bold text-base text-primary">${t.name}</h3>
      <span class="text-sm font-extrabold text-accent block mt-0.5">${t.score}</span>
      <span class="text-[10px] text-slate-400 font-bold block uppercase">${t.classLevel} • Year ${t.year}</span>
      <div class="h-px w-10 bg-slate-100 my-4"></div>
      <p class="text-xs text-slate-500 font-semibold leading-relaxed">${t.highlight}</p>
    </div>
  `).join('');
}

// ==========================================
// MEDIA GALLERY PAGE RENDERING ENGINE
// ==========================================
let activeGalleryCategory = 'all';

function renderGalleryPage() {
  const grid = document.getElementById('gallery-items-grid');
  if (!grid) return;

  const items = appState.data.gallery;
  const filtered = items.filter(g => {
    if (activeGalleryCategory === 'all') return true;
    return g.category === activeGalleryCategory;
  });

  grid.innerHTML = filtered.map(item => {
    if (item.type === 'video') {
      return `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group flex flex-col justify-between">
          <div class="relative aspect-video bg-black overflow-hidden">
            <video class="h-full w-full object-cover" controls preload="metadata">
              <source src="${item.url}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="absolute top-3 left-3 bg-red-600 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded shadow">Video</div>
          </div>
          <div class="p-4">
            <h4 class="font-bold text-xs text-slate-700 truncate">${item.title}</h4>
            <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">${item.category}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="aspect-square overflow-hidden bg-slate-50 cursor-pointer" onclick="openGalleryLightbox('${item.url}', '${item.title}')">
          <img src="${item.url}" alt="${item.title}" class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300">
        </div>
        <div class="p-4">
          <h4 class="font-bold text-xs text-slate-700 truncate">${item.title}</h4>
          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">${item.category}</span>
        </div>
      </div>
    `;
  }).join('');

  // Update tabs look
  const tabs = ['all', 'classroom', 'event', 'activity', 'summercamp'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-gallery-${tab}`);
    if (btn) {
      if (activeGalleryCategory === tab) {
        btn.className = "px-4 py-2.5 font-bold text-xs rounded-xl bg-primary text-white shadow-md transition-all";
      } else {
        btn.className = "px-4 py-2.5 font-bold text-xs rounded-xl bg-white text-slate-500 hover:text-slate-800 border border-slate-100 hover:border-slate-200 transition-all";
      }
    }
  });
}

window.setGalleryCategoryFilter = (cat) => {
  activeGalleryCategory = cat;
  renderGalleryPage();
};

window.openGalleryLightbox = (url, title) => {
  const lightbox = document.getElementById('gallery-lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');

  if (lightbox && lbImg && lbTitle) {
    lbImg.src = url;
    lbTitle.textContent = title;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  }
};

window.closeGalleryLightbox = () => {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }
};

// ==========================================
// TESTIMONIALS PAGE RENDERING ENGINE
// ==========================================
function renderTestimonialsPage() {
  const container = document.getElementById('testimonials-grid-container');
  if (!container) return;

  container.innerHTML = appState.data.testimonials.map(tst => {
    // Generate star SVGs
    let starHTML = '';
    for (let i = 0; i < tst.rating; i++) {
      starHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    }

    return `
      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div class="flex gap-0.5 mb-4">${starHTML}</div>
          <blockquote class="text-xs font-semibold text-slate-600 leading-relaxed italic mb-6">
            "${tst.text}"
          </blockquote>
        </div>
        <div class="border-t border-slate-100 pt-4 flex items-center gap-3">
          <div class="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
            ${tst.name[0]}
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-800">${tst.name}</h4>
            <span class="text-[9px] text-slate-400 font-bold block uppercase mt-0.5">${tst.classLevel} (${tst.relation})</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// STUDY RESOURCES PAGE RENDERING ENGINE
// ==========================================
let activeResourceFilter = 'all';

function renderResourcesPage() {
  const grid = document.getElementById('resources-list-grid');
  if (!grid) return;

  const resources = appState.data.resources;
  const filtered = resources.filter(r => {
    if (activeResourceFilter === 'all') return true;
    return r.type.toLowerCase() === activeResourceFilter.toLowerCase();
  });

  grid.innerHTML = filtered.map(res => `
    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all">
      <div>
        <div class="flex items-center justify-between gap-2 mb-4">
          <span class="px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[9px] font-extrabold uppercase tracking-wider">
            ${res.type}
          </span>
          <span class="text-[9px] font-bold text-slate-400 font-mono">${res.fileType} • ${res.fileSize}</span>
        </div>
        <h3 class="font-serif font-bold text-base text-primary leading-snug">${res.title}</h3>
        <div class="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-slate-400">
          <span>Class: ${res.classLevel}</span>
          <span>•</span>
          <span>Subject: ${res.subject}</span>
        </div>
      </div>

      <button onclick="handleResourceDownload('${res.title}')" class="w-full mt-6 py-3 bg-slate-50 border border-slate-200/50 hover:bg-primary hover:text-white hover:border-primary font-bold rounded-xl text-center text-xs text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        Download Workbook PDF
      </button>
    </div>
  `).join('');

  // Update tabs UI
  const tabs = ['all', 'notes', 'worksheets', 'holiday homework', 'sample papers', 'ncert'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-res-${tab.replace(' ', '-')}`);
    if (btn) {
      if (activeResourceFilter === tab) {
        btn.className = "px-4 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap bg-primary text-white shadow-md transition-all";
      } else {
        btn.className = "px-4 py-2.5 font-bold text-xs rounded-xl whitespace-nowrap bg-white text-slate-500 hover:text-slate-800 border border-slate-100 hover:border-slate-200 transition-all";
      }
    }
  });
}

window.setResourceFilter = (type) => {
  activeResourceFilter = type;
  renderResourcesPage();
};

window.handleResourceDownload = (title) => {
  alert(`Download Initiated: downloading booklet "${title}" ...`);
};

// ==========================================
// BLOG LIST PAGE RENDERING ENGINE
// ==========================================
function renderBlogPage() {
  const noticesBox = document.getElementById('blog-announcements-list');
  const articlesBox = document.getElementById('blog-articles-grid');

  // notices (announcements) board
  if (noticesBox) {
    noticesBox.innerHTML = appState.data.notices.map(n => `
      <div class="flex gap-4 items-start pb-5 border-b border-slate-100 last:border-b-0 last:pb-0">
        <div class="h-8 w-8 rounded-full bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-sm text-slate-800">${n.title}</h3>
            <span class="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
              n.type === 'urgent' ? 'bg-red-50 text-red-700' :
              n.type === 'admission' ? 'bg-emerald-50 text-emerald-700' :
              'bg-slate-100 text-slate-600'
            }">${n.type}</span>
          </div>
          <span class="text-[10px] text-slate-400 font-bold block mt-0.5">${n.date}</span>
          <p class="text-xs text-slate-500 font-semibold leading-relaxed mt-2.5">${n.content}</p>
        </div>
      </div>
    `).join('');
  }

  // blog articles index grid
  if (articlesBox) {
    articlesBox.innerHTML = appState.data.blogs.map(b => `
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div class="relative aspect-video w-full bg-slate-100 overflow-hidden">
            <img src="${b.image}" alt="${b.title}" class="h-full w-full object-cover">
            <div class="absolute top-4 left-4 bg-primary text-white font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
              ${b.category}
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase mb-2">
              <span>By ${b.author.split(' (')[0]}</span>
              <span>•</span>
              <span>${b.date}</span>
            </div>
            <h3 onclick="window.location.href='./blog-post.html?slug=${b.slug}'" class="font-serif font-bold text-base text-primary leading-snug hover:underline cursor-pointer">
              ${b.title}
            </h3>
            <p class="text-xs text-slate-500 font-semibold leading-relaxed mt-3 line-clamp-3">${b.excerpt}</p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-2 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400">
          <span>Read Duration: ${b.readTime}</span>
          <a href="./blog-post.html?slug=${b.slug}" class="text-xs font-bold text-primary hover:text-accent flex items-center gap-0.5">
            Read Article
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================
// DYNAMIC INDIVIDUAL BLOG POST READER
// ==========================================
function renderBlogPostPage() {
  const container = document.getElementById('blog-post-content-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const post = appState.data.blogs.find(b => b.slug === slug);
  if (!post) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm max-w-md w-full text-center mx-auto my-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" class="mx-auto mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16.01"/></svg>
        <h2 class="text-xl font-bold font-serif text-primary">Article Not Found</h2>
        <p class="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">
          The requested blog post could not be located. It may have been renamed or deleted.
        </p>
        <a href="./blog.html" class="inline-flex items-center gap-1.5 mt-6 px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light transition-all">
          Back to Notice Board
        </a>
      </div>
    `;
    return;
  }

  // Parse custom Markdown syntax helper
  const htmlBody = parseMarkdownToHTML(post.content);

  container.innerHTML = `
    <article class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm mb-12">
      <div class="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
        <img src="${post.image}" alt="${post.title}" class="h-full w-full object-cover">
        <div class="absolute top-6 left-6 bg-primary/95 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded shadow">
          ${post.category}
        </div>
      </div>

      <div class="px-6 py-6 sm:px-10 sm:py-8 border-b border-slate-50 bg-slate-50/20">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary leading-tight mb-4">
          ${post.title}
        </h1>
        <div class="flex flex-wrap items-center gap-5 text-xs font-bold text-slate-400">
          <span class="flex items-center gap-1.5 text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${post.author}
          </span>
          <span>•</span>
          <span class="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
            ${post.date}
          </span>
          <span>•</span>
          <span class="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${post.readTime}
          </span>
        </div>
      </div>

      <div class="px-6 py-8 sm:px-10 sm:py-10">
        ${htmlBody}
      </div>

      <div class="px-6 py-5 sm:px-10 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4 bg-slate-50/10">
        <span class="text-xs font-bold text-slate-400 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          Share this article
        </span>
        <div class="flex gap-2">
          <button onclick="shareMockLink('WhatsApp')" class="h-8 px-3 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 flex items-center gap-1 text-[10px] font-bold transition-all">
            WhatsApp
          </button>
          <button onclick="shareMockLink('Facebook')" class="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 flex items-center gap-1 text-[10px] font-bold transition-all">
            Facebook
          </button>
          <button onclick="shareMockLink('Twitter')" class="h-8 px-3 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white border border-sky-100 flex items-center gap-1 text-[10px] font-bold transition-all">
            X / Twitter
          </button>
        </div>
      </div>
    </article>

    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-6 items-center mb-16">
      <div class="sm:col-span-1 flex justify-center">
        <img src="./assets/director.png" alt="Author Seema Swami" class="h-20 w-20 rounded-full object-cover border border-slate-200">
      </div>
      <div class="sm:col-span-3 text-center sm:text-left">
        <span class="text-[10px] font-bold text-accent uppercase tracking-widest block mb-0.5">About The Author</span>
        <h4 class="font-serif font-bold text-base text-primary mb-2">Seema Swami (Director)</h4>
        <p class="text-xs text-slate-500 leading-relaxed font-semibold">
          Seema Swami is the founder and Biology educator at Ratna Coaching Centre. She hosts pre-medical Biology video lectures on her YouTube channel, <strong>BioMaster Seema</strong>.
        </p>
      </div>
    </div>
  `;

  // Related posts lists
  const relatedContainer = document.getElementById('blog-related-posts');
  if (relatedContainer) {
    const related = appState.data.blogs.filter(b => b.id !== post.id).slice(0, 2);
    relatedContainer.innerHTML = related.map(rel => `
      <div onclick="window.location.href='./blog-post.html?slug=${rel.slug}'" class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm p-4 hover:shadow-md cursor-pointer flex gap-4 transition-all">
        <img src="${rel.image}" alt="${rel.title}" class="h-16 w-20 object-cover rounded-xl bg-slate-100 flex-shrink-0">
        <div>
          <span class="text-[8px] font-extrabold text-accent bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider block w-max">${rel.category}</span>
          <h4 class="font-serif font-bold text-sm text-slate-800 leading-snug mt-1 line-clamp-2 hover:text-primary">${rel.title}</h4>
        </div>
      </div>
    `).join('');
  }
}

function parseMarkdownToHTML(text) {
  const lines = text.split('\n');
  return lines.map(line => {
    // Heading 3
    if (line.trim().startsWith('###')) {
      return `<h3 class="text-lg sm:text-xl font-serif font-bold text-primary mt-6 mb-3">${line.replace('###', '').trim()}</h3>`;
    }
    // Heading 4
    if (line.trim().startsWith('##')) {
      return `<h4 class="text-base sm:text-lg font-serif font-bold text-primary mt-5 mb-2.5">${line.replace('##', '').trim()}</h4>`;
    }
    // Lists
    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
      const clean = line.trim().substring(1).trim();
      const bolded = parseBoldSyntax(clean);
      return `<ul class="list-disc pl-5 my-2 text-xs font-semibold text-slate-600 leading-relaxed"><li>${bolded}</li></ul>`;
    }
    // Empty line
    if (!line.trim()) {
      return `<div class="h-3"></div>`;
    }
    // Paragraph
    return `<p class="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed mb-4">${parseBoldSyntax(line)}</p>`;
  }).join('');
}

function parseBoldSyntax(line) {
  const parts = line.split('**');
  return parts.map((part, index) => 
    index % 2 === 1 ? `<strong class="text-slate-800">${part}</strong>` : part
  ).join('');
}

window.shareMockLink = (platform) => {
  alert(`Mock Share: Sharing article URL to ${platform}`);
};

// ==========================================
// CONTACT US PAGE RENDERING ENGINE
// ==========================================
function renderContactUsPage() {
  const formEl = document.getElementById('contact-feedback-form');
  const successBox = document.getElementById('contact-success-box');
  if (!formEl) return;

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('con-name').value;
    const emailOrPhone = document.getElementById('con-email-phone').value;
    const subject = document.getElementById('con-subject').value;
    const message = document.getElementById('con-message').value;

    try {
      await submitContactForm(name, emailOrPhone, subject, message);
      formEl.reset();
      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Feedback submitted successfully! We will contact you back shortly.');
      }
    } catch (err) {
      alert('Error submitting feedback form. Please try again.');
    }
  });
}

// ==========================================
// STUDENT PORTAL PAGE RENDERING ENGINE
// ==========================================
// Quiz questions
const QUIZ_QUESTIONS = [
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

let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let isQuestionAnswered = false;

// Focus Timer States
let timerMode = 'study';
let timeLeft = 25 * 60;
let timerIsRunning = false;
let timerInterval = null;

function renderStudentPortalPage() {
  const container = document.getElementById('portal-wrapper');
  if (!container) return;

  // Block if not logged in
  if (!appState.student) {
    container.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" class="mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16.01"/></svg>
        <h2 class="text-xl font-bold text-slate-700 mb-1">Student Portal Locked</h2>
        <p class="text-xs text-slate-500 font-semibold max-w-sm leading-relaxed mb-6">
          You must be logged in to view your dashboard, check worksheets, and participate in daily quizzes.
        </p>
        <button onclick="openLoginModal()" class="px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light shadow-md transition-all">
          Open Login Portal
        </button>
      </div>
    `;
    return;
  }

  // Load and render Profile, Bulletins, Tracker and Quiz panels
  const student = appState.student;
  
  // A. admissions tracker enquiry lookups
  const enquiry = appState.data.admissions.find(
    enq => enq.mobileNumber === student.phone || enq.studentName.toLowerCase().trim() === student.name.toLowerCase().trim()
  ) || null;

  // B. notices matching student class
  const classNotices = appState.data.notices.filter(
    n => n.active && 
    (n.title.toLowerCase().includes(student.classLevel.toLowerCase()) ||
     n.content.toLowerCase().includes(student.classLevel.toLowerCase()) ||
     n.type === 'general' || n.type === 'urgent')
  );

  // C. resources matching class
  const classResources = appState.data.resources.filter(res => res.classLevel.toLowerCase().includes(student.classLevel.toLowerCase()));

  // Render Portal Core HTML Structure
  container.innerHTML = `
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <!-- Top banner sync bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <span class="text-[10px] font-bold text-accent tracking-widest uppercase bg-primary/5 px-2.5 py-1 rounded-md">
            Student Workspace
          </span>
          <h1 class="text-3xl font-serif font-extrabold text-primary mt-2">
            Welcome, ${student.name}!
          </h1>
          <p class="text-xs font-semibold text-slate-500 mt-1">
            Class: ${student.classLevel} • Roll Number: <code class="bg-slate-200 px-1 py-0.5 rounded text-primary-light font-mono text-[10px] font-bold">${student.rollNumber}</code>
          </p>
        </div>
        
        <button onclick="logout()" class="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Sign Out
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Portal Sidebar -->
        <div class="flex flex-col gap-8">
          
          <!-- Student Profile Form Card -->
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent"></div>
            
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-slate-800 text-base">My Profile</h3>
              <button onclick="toggleProfileEdit()" class="text-xs font-extrabold text-primary hover:text-accent flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span id="profile-edit-btn-text">Edit</span>
              </button>
            </div>

            <!-- Profile Info Viewer -->
            <div id="profile-info-viewer" class="flex flex-col gap-4 text-xs">
              <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold block uppercase">Full Name</span>
                  <span class="font-bold text-slate-700 text-sm">${student.name}</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold block uppercase">Email Address</span>
                  <span class="font-bold text-slate-700">${student.email}</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold block uppercase">Mobile Number</span>
                  <span class="font-bold text-slate-700">${student.phone}</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-school"><path d="M12 22v-4"/><path d="M12 2v4"/><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M12 16h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/></svg>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold block uppercase">School / Institute</span>
                  <span class="font-bold text-slate-700">${student.schoolName || 'Not specified'}</span>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl">
                <div class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" class="lucide lucide-award"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  <span class="font-bold text-slate-600 text-[11px]">Daily Quiz Score</span>
                </div>
                <span class="font-mono text-sm font-extrabold text-primary" id="portal-score-board">
                  ${student.score?.correct || 0} / ${student.score?.attempted || 0}
                </span>
              </div>
            </div>

            <!-- Profile Edit Form (hidden by default) -->
            <form id="profile-edit-form" class="hidden flex flex-col gap-3.5" onsubmit="saveProfileEdit(event)">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-slate-500 uppercase">Name</label>
                <input type="text" id="pe-name" required value="${student.name}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-slate-500 uppercase">Phone</label>
                <input type="text" id="pe-phone" required value="${student.phone}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-slate-500 uppercase">School</label>
                <input type="text" id="pe-school" value="${student.schoolName || ''}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-slate-500 uppercase">Class Level</label>
                <select id="pe-class" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none">
                  <option value="Class 9" ${student.classLevel === 'Class 9' ? 'selected' : ''}>Class 9</option>
                  <option value="Class 10" ${student.classLevel === 'Class 10' ? 'selected' : ''}>Class 10</option>
                  <option value="Class 11" ${student.classLevel === 'Class 11' ? 'selected' : ''}>Class 11</option>
                  <option value="Class 12" ${student.classLevel === 'Class 12' ? 'selected' : ''}>Class 12</option>
                  <option value="NEET Prep" ${student.classLevel === 'NEET Prep' ? 'selected' : ''}>NEET Biology Specialized</option>
                </select>
              </div>
              <button type="submit" class="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow-md mt-2 transition-all">
                Save Details
              </button>
            </form>
          </div>

          <!-- Pomodoro Timer Box -->
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
            <div class="w-full flex justify-between items-center mb-4">
              <h3 class="font-bold text-slate-800 text-base flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Study Focus Timer
              </h3>
              <span id="timer-mode-badge" class="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Study
              </span>
            </div>

            <div class="my-6">
              <span id="timer-clock-digits" class="text-4xl font-mono font-extrabold text-primary select-none">
                25:00
              </span>
            </div>

            <div class="flex gap-2 mb-6">
              <button onclick="setTimerType('study')" id="btn-timer-study" class="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-primary text-white transition-all">
                Study
              </button>
              <button onclick="setTimerType('break')" id="btn-timer-break" class="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-slate-50 text-slate-500 transition-all">
                Break
              </button>
            </div>

            <div class="flex gap-3 w-full">
              <button onclick="toggleFocusTimer()" id="btn-timer-control" class="flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-primary flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all">
                Start Focus
              </button>
              <button onclick="resetFocusTimer()" class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            </div>
          </div>

        </div>

        <!-- Main Workspace Contents -->
        <div class="lg:col-span-2 flex flex-col gap-8">
          
          <!-- Admission enquiry tracker box -->
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 class="font-bold text-slate-800 text-base mb-5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" class="lucide lucide-book-open-check"><path d="M8 3H2v18h6Z"/><path d="M16 12h6"/><path d="M16 8h6"/><path d="M16 16h6"/><path d="M16 3h6v5h-6Z"/><path d="m11 16-2-2"/><path d="m14 11-5 5"/></svg>
              Admission Application Tracker
            </h3>

            <div id="admission-tracker-workspace">
              ${renderAdmissionTrackerHTML(enquiry)}
            </div>
          </div>

          <!-- Daily Quiz Assessment -->
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div class="flex justify-between items-center mb-5">
              <h3 class="font-bold text-slate-800 text-base flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                Daily Practice Challenge
              </h3>
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                Biology Prep
              </span>
            </div>

            <!-- Question text block -->
            <div class="bg-slate-50/70 p-5 rounded-2xl border border-slate-100/50 mb-6">
              <p class="font-serif text-sm font-bold text-slate-800 leading-relaxed" id="quiz-question-text">
                Question will appear here...
              </p>
            </div>

            <!-- MCQ choices grid -->
            <div class="flex flex-col gap-2 mb-6" id="quiz-options-container">
              <!-- Choices drawn dynamically -->
            </div>

            <!-- feedback logs -->
            <div id="quiz-feedback-box" class="hidden p-4 rounded-2xl border text-xs font-semibold leading-relaxed mb-6"></div>

            <div class="flex justify-end border-t border-slate-100 pt-4" id="quiz-footer-actions">
              <!-- buttons swapped dynamically -->
            </div>
          </div>

          <!-- Bulletins and downloads grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Bulletins announcements board -->
            <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 class="font-bold text-slate-800 text-base mb-4 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light animate-pulse"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                Bulletins for ${student.classLevel}
              </h3>
              
              <div class="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
                ${classNotices.length > 0 ? classNotices.map(n => `
                  <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-bold text-slate-800">${n.title}</span>
                      <span class="text-[8px] text-slate-400 bg-slate-200 px-1 py-0.5 rounded font-mono">${n.date}</span>
                    </div>
                    <p class="text-[11px] text-slate-500 leading-normal font-semibold">${n.content}</p>
                  </div>
                `).join('') : `
                  <div class="py-8 text-center text-slate-400 text-xs font-bold">
                    No active bulletins for your class level.
                  </div>
                `}
              </div>
            </div>

            <!-- Study resource sheets downloads -->
            <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 class="font-bold text-slate-800 text-base mb-4 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary-light"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                Class Worksheets
              </h3>

              <div class="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
                ${classResources.length > 0 ? classResources.map(res => `
                  <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-2 text-xs">
                    <div class="truncate">
                      <span class="font-serif font-bold text-slate-800 text-sm block truncate">${res.title}</span>
                      <span class="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">${res.subject} • ${res.fileSize}</span>
                    </div>
                    
                    <button onclick="handleResourceDownload('${res.title}')" class="h-8 w-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center flex-shrink-0 transition-all" title="Download Worksheet">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </button>
                  </div>
                `).join('') : `
                  <div class="py-8 text-center text-slate-400 text-xs font-bold">
                    No sheets uploaded yet for your class.
                  </div>
                `}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  `;

  // Start Focus clock UI syncs
  updateTimerUI();
  
  // Re-start Daily quiz
  initPortalQuiz();
}

// Draw timeline tracker status
function renderAdmissionTrackerHTML(enquiry) {
  if (!enquiry) {
    return `
      <div class="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" class="mb-2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16.01"/></svg>
        <h4 class="font-bold text-slate-800 text-xs">No active applications</h4>
        <p class="text-[11px] text-slate-500 max-w-sm mt-1 mb-4 leading-relaxed">
          We didn't find any admissions query associated with your mobile number (<code class="font-bold text-primary">${appState.student.phone}</code>).
        </p>
        <button onclick="window.location.href='./admissions.html'" class="px-4 py-2 bg-accent text-primary-dark font-extrabold text-[10px] uppercase tracking-wider rounded-xl hover:brightness-105 transition-all">
          Apply for Admissions
        </button>
      </div>
    `;
  }

  const timelineWidth = 
    enquiry.status === 'Pending' ? '0%' :
    enquiry.status === 'Contacted' ? '50%' :
    enquiry.status === 'Enrolled' ? '100%' : '0%';

  return `
    <div class="flex flex-col gap-6">
      <div class="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span class="text-[10px] text-slate-400 font-bold block uppercase">Applied Name</span>
          <span class="font-bold text-slate-700 text-sm">${enquiry.studentName}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 font-bold block uppercase">Class Requested</span>
          <span class="font-semibold text-slate-700 bg-primary/5 px-2 py-0.5 rounded text-[10px]">${enquiry.classLevel}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 font-bold block uppercase">Status</span>
          <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
            enquiry.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
            enquiry.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
            enquiry.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-700' :
            'bg-slate-100 text-slate-600'
          }">
            ${enquiry.status}
          </span>
        </div>
      </div>

      <!-- Horizontal progress line -->
      <div class="relative flex items-center justify-between w-full pt-4 max-w-xl mx-auto">
        <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        <div class="absolute left-0 top-1/2 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" style="width: ${timelineWidth}"></div>

        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div class="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="text-[9px] font-bold text-emerald-600 uppercase">Received</span>
        </div>

        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div class="h-7 w-7 rounded-full flex items-center justify-center shadow-md transition-colors ${
            enquiry.status !== 'Pending' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'
          }">
            ${enquiry.status !== 'Pending' ? 
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : 
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
            }
          </div>
          <span class="text-[9px] font-bold uppercase ${enquiry.status !== 'Pending' ? 'text-emerald-600' : 'text-amber-500'}">Contacted</span>
        </div>

        <div class="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
          <div class="h-7 w-7 rounded-full flex items-center justify-center shadow-md transition-colors ${
            enquiry.status === 'Enrolled' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
          }">
            ${enquiry.status === 'Enrolled' ? 
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : 
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>'
            }
          </div>
          <span class="text-[9px] font-bold uppercase ${enquiry.status === 'Enrolled' ? 'text-emerald-600' : 'text-slate-400'}">Enrolled</span>
        </div>
      </div>
    </div>
  `;
}

// Student profile edits toggle
window.toggleProfileEdit = () => {
  const viewer = document.getElementById('profile-info-viewer');
  const editor = document.getElementById('profile-edit-form');
  const btnText = document.getElementById('profile-edit-btn-text');

  if (viewer && editor && btnText) {
    const isEditing = viewer.classList.contains('hidden');
    if (isEditing) {
      viewer.classList.remove('hidden');
      editor.classList.add('hidden');
      btnText.textContent = 'Edit';
    } else {
      viewer.classList.add('hidden');
      editor.classList.remove('hidden');
      btnText.textContent = 'Cancel';
    }
  }
};

window.saveProfileEdit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('pe-name').value;
  const phone = document.getElementById('pe-phone').value;
  const school = document.getElementById('pe-school').value;
  const classVal = document.getElementById('pe-class').value;

  try {
    await updateStudentProfile(name, phone, school, classVal);
    alert('Profile details successfully updated!');
    renderStudentPortalPage();
  } catch (err) {
    alert('Failed to update student profile.');
  }
};

// Pomodoro Focus clock mechanics
window.setTimerType = (mode) => {
  timerIsRunning = false;
  clearInterval(timerInterval);
  timerMode = mode;
  timeLeft = mode === 'study' ? 25 * 60 : 5 * 60;
  
  const studyBtn = document.getElementById('btn-timer-study');
  const breakBtn = document.getElementById('btn-timer-break');
  const modeBadge = document.getElementById('timer-mode-badge');

  if (studyBtn && breakBtn && modeBadge) {
    if (mode === 'study') {
      studyBtn.className = "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-primary text-white transition-all";
      breakBtn.className = "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-slate-50 text-slate-500 transition-all";
      modeBadge.textContent = 'Study';
      modeBadge.className = "text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-100 text-amber-800";
    } else {
      breakBtn.className = "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-primary text-white transition-all";
      studyBtn.className = "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-slate-50 text-slate-500 transition-all";
      modeBadge.textContent = 'Break';
      modeBadge.className = "text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-100 text-green-800";
    }
  }
  updateTimerUI();
};

window.toggleFocusTimer = () => {
  const ctrlBtn = document.getElementById('btn-timer-control');
  if (!ctrlBtn) return;

  if (timerIsRunning) {
    timerIsRunning = false;
    clearInterval(timerInterval);
    ctrlBtn.textContent = 'Start Focus';
    ctrlBtn.className = "flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-primary flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all";
  } else {
    timerIsRunning = true;
    ctrlBtn.textContent = 'Pause';
    ctrlBtn.className = "flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-amber-500 flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all";
    
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        timerIsRunning = false;
        clearInterval(timerInterval);
        ctrlBtn.textContent = 'Start Focus';
        ctrlBtn.className = "flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-primary flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all";
        
        // Trigger alert buzzer beep sound
        try {
          const context = new (window.AudioContext || window.webkitAudioContext)();
          const osc = context.createOscillator();
          osc.connect(context.destination);
          osc.start();
          osc.stop(context.currentTime + 0.3);
        } catch(e){}

        if (timerMode === 'study') {
          alert('Study session completed! Go ahead and take a 5-minute break.');
          setTimerType('break');
        } else {
          alert('Break is over! Time to get focused again.');
          setTimerType('study');
        }
      }
      updateTimerUI();
    }, 1000);
  }
};

window.resetFocusTimer = () => {
  timerIsRunning = false;
  clearInterval(timerInterval);
  timeLeft = timerMode === 'study' ? 25 * 60 : 5 * 60;
  
  const ctrlBtn = document.getElementById('btn-timer-control');
  if (ctrlBtn) {
    ctrlBtn.textContent = 'Start Focus';
    ctrlBtn.className = "flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-primary flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all";
  }
  updateTimerUI();
};

function updateTimerUI() {
  const digits = document.getElementById('timer-clock-digits');
  if (!digits) return;

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  digits.textContent = `${m}:${s}`;
}

// Daily Quiz Functionality
function initPortalQuiz() {
  // Select a random question on start
  currentQuestionIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
  selectedOptionIndex = null;
  isQuestionAnswered = false;

  renderQuizUI();
}

function renderQuizUI() {
  const qText = document.getElementById('quiz-question-text');
  const optContainer = document.getElementById('quiz-options-container');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const footerActions = document.getElementById('quiz-footer-actions');

  if (!qText || !optContainer) return;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  qText.textContent = q.question;

  // Render options list
  optContainer.innerHTML = q.options.map((opt, i) => {
    const isSelected = selectedOptionIndex === i;
    const isCorrect = q.correctAnswer === i;
    
    let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-700";
    if (isSelected) btnStyle = "bg-primary text-white border-primary shadow-sm";
    if (isQuestionAnswered) {
      if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-500";
      else if (isSelected) btnStyle = "bg-red-500 text-white border-red-500";
      else btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
    }

    const disabledAttr = isQuestionAnswered ? 'disabled' : '';

    return `
      <button ${disabledAttr} onclick="selectQuizOption(${i})" class="w-full py-3 px-4 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${btnStyle}">
        <span class="flex items-center gap-2">
          <span class="h-5 w-5 rounded-full flex items-center justify-center border text-[9px] uppercase font-mono ${
            isSelected ? 'border-white text-white' : 'border-slate-300 text-slate-500'
          }">
            ${String.fromCharCode(65 + i)}
          </span>
          ${opt}
        </span>
      </button>
    `;
  }).join('');

  // Handle feedback text box
  if (isQuestionAnswered) {
    feedbackBox.classList.remove('hidden');
    const isCorrectAnswer = selectedOptionIndex === q.correctAnswer;
    if (isCorrectAnswer) {
      feedbackBox.className = "p-4 rounded-2xl border text-xs font-semibold leading-relaxed mb-6 bg-emerald-50 border-emerald-100 text-emerald-800";
      feedbackBox.textContent = `Correct! 🎉 ${q.explanation}`;
    } else {
      feedbackBox.className = "p-4 rounded-2xl border text-xs font-semibold leading-relaxed mb-6 bg-red-50 border-red-100 text-red-800";
      feedbackBox.textContent = `Incorrect. ${q.explanation}`;
    }

    footerActions.innerHTML = `
      <button onclick="nextQuizQuestion()" class="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-hover text-primary-dark font-extrabold rounded-xl text-xs hover:scale-[1.01] transition-all flex items-center gap-1">
        Next Question
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;
  } else {
    feedbackBox.classList.add('hidden');
    const submitDisabledAttr = selectedOptionIndex === null ? 'disabled' : '';
    footerActions.innerHTML = `
      <button ${submitDisabledAttr} onclick="submitQuizAnswer()" class="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs disabled:opacity-50 hover:brightness-105 transition-all">
        Submit Answer
      </button>
    `;
  }
}

window.selectQuizOption = (idx) => {
  if (isQuestionAnswered) return;
  selectedOptionIndex = idx;
  renderQuizUI();
};

window.submitQuizAnswer = async () => {
  if (selectedOptionIndex === null || isQuestionAnswered) return;
  isQuestionAnswered = true;
  
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCorrect = selectedOptionIndex === q.correctAnswer;
  
  if (isCorrect) {
    await updateStudentScore(1, 1);
    
    // Trigger confetti if library loaded
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
    }
  } else {
    await updateStudentScore(0, 1);
  }

  // Refresh score on profile card
  const scoreBoard = document.getElementById('portal-score-board');
  if (scoreBoard) {
    scoreBoard.textContent = `${appState.student.score?.correct || 0} / ${appState.student.score?.attempted || 0}`;
  }

  renderQuizUI();
};

window.nextQuizQuestion = () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % QUIZ_QUESTIONS.length;
  selectedOptionIndex = null;
  isQuestionAnswered = false;
  renderQuizUI();
};


// ==========================================
// ADMIN DASHBOARD PAGE RENDERING ENGINE
// ==========================================
let activeAdminTab = 'students';

// Notice edit fields
let cmsEditNoticeId = null;

// Blog edit fields
let cmsEditBlogId = null;

async function fetchRegisteredStudents() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('students')
        .select('*')
        .order('id', { ascending: false });
      if (!error && data) {
        appState.registeredStudents = data;
      }
    } catch(err) {
      console.warn('Failed to fetch students from Supabase:', err);
    }
  } else {
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    appState.registeredStudents = usersStr ? JSON.parse(usersStr) : [];
  }
}

window.exportStudentsCSV = () => {
  const students = appState.registeredStudents || [];
  if (students.length === 0) return alert('No students database to export.');
  
  let csv = 'Roll Number,Name,Email,Phone,Target Class,School,Joined Date\n';
  students.forEach(s => {
    csv += `"${s.roll_number || s.rollNumber || ''}","${s.student_name || s.name || ''}","${s.email}","${s.mobile_number || s.phone || ''}","${s.target_class || s.classLevel || ''}","${s.school_name || s.schoolName || ''}","${s.joined_date || s.joinedDate || ''}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `ratna_students_${new Date().toISOString().split('T')[0]}.csv`);
  a.click();
};

window.deleteRegisteredStudent = async (id) => {
  if (!confirm('Are you sure you want to delete this student account? This will block their portal login.')) return;
  
  if (supabaseClient) {
    try {
      await supabaseClient.from('students').delete().eq('id', id);
    } catch(err) {
      console.warn('Failed to delete student from Supabase:', err);
    }
  }
  
  // also delete locally
  const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
  if (usersStr) {
    const users = JSON.parse(usersStr);
    const filtered = users.filter(u => String(u.id) !== String(id));
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
  }
  
  await fetchRegisteredStudents();
  renderAdminPage();
};

async function renderAdminPage() {
  const container = document.getElementById('admin-dashboard-container');
  if (!container) return;

  // Block dashboard if not authenticated
  if (!appState.isAdmin) {
    container.innerHTML = `
      <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
          
          <div class="text-center mb-8">
            <div class="mx-auto h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 class="text-2xl font-bold font-serif text-primary">CMS Admin Portal</h2>
            <p class="text-xs text-slate-500 font-semibold mt-1">Authorized Ratna Coaching staff access only</p>
          </div>

          <div id="admin-auth-error-box" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-6"></div>

          <form onsubmit="handleAdminLoginSubmit(event)" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Username</label>
              <input type="text" id="admin-username" required placeholder="Enter username" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Password</label>
              <input type="password" id="admin-password" required placeholder="Enter password" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-semibold">
            </div>

            <button type="submit" class="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all mt-2 flex items-center justify-center gap-1.5">
              Sign In to CMS
            </button>
          </form>
        </div>
      </div>
    `;
    return;
  }

  // Load students data dynamically before drawing dashboard
  await fetchRegisteredStudents();

  // Draw full dashboard structure
  container.innerHTML = `
    <!-- Top info bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
      <div>
        <h1 class="text-3xl font-serif font-bold text-primary">Content Management Dashboard</h1>
        <p class="text-xs font-semibold text-slate-500 mt-1">Hello Seema, managing updates and student enquiries.</p>
      </div>
      <button onclick="logout()" class="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Logout
      </button>
    </div>

    <!-- Stat counts cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Students</span>
          <span class="text-2xl font-extrabold text-primary">${(appState.registeredStudents || []).length}</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Enquiries</span>
          <span class="text-2xl font-extrabold text-primary">${appState.data.admissions.length}</span>
        </div>
      </div>
      
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Active Notices</span>
          <span class="text-2xl font-extrabold text-primary">${appState.data.notices.filter(n => n.active).length}</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Unread Mail</span>
          <span class="text-2xl font-extrabold text-primary">${appState.data.contactMessages.filter(m => !m.read).length}</span>
        </div>
      </div>
    </div>

    <!-- Navigation tabs -->
    <div class="flex border-b border-slate-200 overflow-x-auto gap-2 mb-6 scrollbar-hide">
      <button onclick="setAdminTab('students')" id="admin-tab-students" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Registered Students</button>
      <button onclick="setAdminTab('enquiries')" id="admin-tab-enquiries" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Admission Enquiries</button>
      <button onclick="setAdminTab('notices')" id="admin-tab-notices" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Notice Board</button>
      <button onclick="setAdminTab('blogs')" id="admin-tab-blogs" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Blog Posts</button>
      <button onclick="setAdminTab('toppers')" id="admin-tab-toppers" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Toppers & Results</button>
      <button onclick="setAdminTab('resources')" id="admin-tab-resources" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Study Resources</button>
      <button onclick="setAdminTab('messages')" id="admin-tab-messages" class="flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs whitespace-nowrap transition-all">Contact Messages</button>
    </div>

    <div id="admin-tab-content-area"></div>
  `;

  renderAdminTabContent();
}

window.handleAdminLoginSubmit = async (e) => {
  e.preventDefault();
  const user = document.getElementById('admin-username').value;
  const pass = document.getElementById('admin-password').value;
  const errBox = document.getElementById('admin-auth-error-box');

  if (errBox) errBox.classList.add('hidden');

  const res = await loginAdmin(user, pass);
  if (res.success) {
    renderAdminPage();
  } else if (errBox) {
    errBox.textContent = res.error;
    errBox.classList.remove('hidden');
  }
};

window.setAdminTab = (tab) => {
  activeAdminTab = tab;
  renderAdminPage();
};

function renderAdminTabContent() {
  const area = document.getElementById('admin-tab-content-area');
  const tabs = ['students', 'enquiries', 'notices', 'blogs', 'toppers', 'resources', 'messages'];
  
  // Highlight tab buttons
  tabs.forEach(t => {
    const el = document.getElementById(`admin-tab-${t}`);
    if (el) {
      if (activeAdminTab === t) {
        el.className = "flex items-center gap-2 px-4 py-3 border-b-2 border-primary text-primary font-bold text-xs whitespace-nowrap transition-all cursor-pointer";
      } else {
        el.className = "flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-bold text-xs whitespace-nowrap transition-all cursor-pointer";
      }
    }
  });

  if (!area) return;

  if (activeAdminTab === 'students') {
    area.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div class="font-bold text-sm text-slate-700">Registered Student Accounts (Portal Access)</div>
          <button onclick="exportStudentsCSV()" class="inline-flex items-center gap-1.5 rounded-xl bg-accent text-primary-dark font-bold text-xs px-4 py-2.5 hover:brightness-105 shadow-sm transition-all cursor-pointer">
            Export to CSV
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th class="py-4 px-6">Student Name & Roll Number</th>
                <th class="py-4 px-4">Email Address</th>
                <th class="py-4 px-4">Phone Number</th>
                <th class="py-4 px-4">School</th>
                <th class="py-4 px-4">Class Target</th>
                <th class="py-4 px-4">Joined Date</th>
                <th class="py-4 px-6 text-right">Delete Account</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              ${(appState.registeredStudents || []).length > 0 ? appState.registeredStudents.map(stu => `
                <tr class="hover:bg-slate-50/50">
                  <td class="py-4 px-6">
                    <div class="font-bold text-sm text-slate-800">${stu.student_name || stu.name}</div>
                    <div class="text-slate-400 text-[10px] font-bold">Roll: ${stu.roll_number || stu.rollNumber || 'N/A'}</div>
                  </td>
                  <td class="py-4 px-4">${stu.email}</td>
                  <td class="py-4 px-4">${stu.mobile_number || stu.phone || 'N/A'}</td>
                  <td class="py-4 px-4">${stu.school_name || stu.schoolName || 'N/A'}</td>
                  <td class="py-4 px-4">
                    <span class="px-2 py-0.5 rounded bg-primary/5 text-primary text-[10px] font-bold">${stu.target_class || stu.classLevel || 'N/A'}</span>
                  </td>
                  <td class="py-4 px-4 text-slate-400 text-[10px]">${stu.joined_date || stu.joinedDate || 'N/A'}</td>
                  <td class="py-4 px-6 text-right">
                    <button onclick="deleteRegisteredStudent('${stu.id}')" class="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete account">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" class="py-12 text-center text-slate-400 font-bold">No registered student accounts yet.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'enquiries') {
    // ENQUIRIES PANEL
    area.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div class="font-bold text-sm text-slate-700">All Student Registrations & Online Applications</div>
          <button onclick="exportAdmissionsCSV()" class="inline-flex items-center gap-1.5 rounded-xl bg-accent text-primary-dark font-bold text-xs px-4 py-2.5 hover:brightness-105 shadow-sm transition-all">
            Export to CSV
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th class="py-4 px-6">Student & Parent Name</th>
                <th class="py-4 px-4">Class Target</th>
                <th class="py-4 px-4">Phone Number</th>
                <th class="py-4 px-4">Applied Date</th>
                <th class="py-4 px-4">Status Update</th>
                <th class="py-4 px-6 text-right">Delete</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              ${appState.data.admissions.length > 0 ? appState.data.admissions.map(enq => `
                <tr class="hover:bg-slate-50/50">
                  <td class="py-4 px-6">
                    <div class="font-bold text-sm text-slate-800">${enq.studentName}</div>
                    <div class="text-slate-400 text-[10px] font-bold">Parent: ${enq.parentName} • ${enq.schoolName || 'No School'}</div>
                  </td>
                  <td class="py-4 px-4">
                    <span class="px-2 py-0.5 rounded bg-primary/5 text-primary text-[10px] font-bold">${enq.classLevel}</span>
                  </td>
                  <td class="py-4 px-4">
                    <a href="tel:${enq.mobileNumber}" class="font-bold text-slate-700 hover:underline">${enq.mobileNumber}</a>
                  </td>
                  <td class="py-4 px-4 text-slate-400 text-[10px]">${enq.submittedAt}</td>
                  <td class="py-4 px-4">
                    <select onchange="updateCmsEnquiryStatus('${enq.id}', this.value)" class="px-2 py-1 rounded text-[10px] font-bold focus:outline-none ${
                      enq.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      enq.status === 'Contacted' ? 'bg-blue-50 text-blue-700' :
                      enq.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }">
                      <option value="Pending" ${enq.status === 'Pending' ? 'selected' : ''}>Pending</option>
                      <option value="Contacted" ${enq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                      <option value="Enrolled" ${enq.status === 'Enrolled' ? 'selected' : ''}>Enrolled</option>
                      <option value="Closed" ${enq.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    </select>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <button onclick="deleteCmsEnquiry('${enq.id}')" class="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" class="py-12 text-center text-slate-400 font-bold">No enquiries registered yet.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'notices') {
    // NOTICES BOARD PANEL
    area.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="font-bold text-sm text-slate-700">Post dynamic banners or updates to home announcements board</div>
          <button onclick="toggleCmsNoticeForm()" class="bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm flex items-center gap-1">
            Create Notice
          </button>
        </div>

        <form id="cms-notice-form" class="hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300" onsubmit="saveCmsNotice(event)">
          <h3 class="font-bold text-slate-800 text-sm" id="cms-notice-form-title">Add New Notice</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Notice Title</label>
              <input type="text" id="cn-title" required placeholder="Enter notice headline" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>
            
            <div class="flex gap-4">
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Category Tag</label>
                <select id="cn-type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none">
                  <option value="general">General</option>
                  <option value="urgent">Urgent Alert</option>
                  <option value="admission">Admissions Open</option>
                </select>
              </div>
              <div class="flex items-center gap-2 pt-5 pl-2 w-1/2">
                <input type="checkbox" id="cn-active" checked class="h-4 w-4 rounded text-primary">
                <label for="cn-active" class="text-xs font-bold text-slate-700 cursor-pointer">Live Active</label>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Notice Description Content</label>
            <textarea id="cn-content" required rows="4" placeholder="Type notice announcements details..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"></textarea>
          </div>

          <div class="flex gap-2 justify-end mt-2">
            <button type="button" onclick="toggleCmsNoticeForm()" class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm">Save Notice</button>
          </div>
        </form>

        <div class="grid grid-cols-1 gap-4">
          ${appState.data.notices.map(n => `
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
              <div class="flex items-start gap-4">
                <div class="mt-0.5 h-7 w-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-bold text-sm text-slate-800">${n.title}</h4>
                    <span class="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      n.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }">${n.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <span class="text-[10px] text-slate-400 font-bold block mt-0.5">${n.date} • Tag: ${n.type}</span>
                  <p class="text-xs text-slate-500 leading-relaxed font-semibold mt-2.5">${n.content}</p>
                </div>
              </div>

              <div class="flex items-center gap-1.5 self-end sm:self-auto">
                <button onclick="editCmsNotice('${n.id}')" class="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button onclick="deleteCmsNotice('${n.id}')" class="p-2 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'blogs') {
    // BLOGS ARTICLE MANAGEMENT PANEL
    area.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="font-bold text-sm text-slate-700">Write articles to educate parent checklists and promote organic SEO traffic</div>
          <button onclick="toggleCmsBlogForm()" class="bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm flex items-center gap-1">
            Write Article
          </button>
        </div>

        <form id="cms-blog-form" class="hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300" onsubmit="saveCmsBlog(event)">
          <h3 class="font-bold text-slate-800 text-sm" id="cms-blog-form-title">Write New Article</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Article Title</label>
              <input type="text" id="cb-title" required placeholder="How to study..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Category</label>
                <select id="cb-category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none">
                  <option value="Study Tips">Study Tips</option>
                  <option value="Exam Updates">Exam Updates</option>
                  <option value="Educational Articles">Educational Articles</option>
                  <option value="Biology Focus">Biology Focus</option>
                </select>
              </div>
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Tags (Comma-separated)</label>
                <input type="text" id="cb-tags" placeholder="NEET, CBSE, Boards" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Cover Image URL (Optional)</label>
            <input type="text" id="cb-image" placeholder="https://images.unsplash.com/..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Short Summary Excerpt</label>
            <input type="text" id="cb-excerpt" required placeholder="Describe what the reader learns in 2 sentences..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Article Content Details (Supports basic markdown ### headers)</label>
            <textarea id="cb-content" required rows="6" placeholder="Type core article information details..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"></textarea>
          </div>

          <div class="flex gap-2 justify-end mt-2">
            <button type="button" onclick="toggleCmsBlogForm()" class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm">Publish Article</button>
          </div>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${appState.data.blogs.map(b => `
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[8px] font-extrabold text-accent bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">${b.category}</span>
                  <div class="flex items-center gap-1">
                    <button onclick="editCmsBlog('${b.id}')" class="p-1 rounded border border-slate-100 hover:bg-slate-50 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    </button>
                    <button onclick="deleteCmsBlog('${b.id}')" class="p-1 rounded border border-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <h4 class="font-bold text-slate-800 text-sm leading-snug line-clamp-2">${b.title}</h4>
                <p class="text-[11px] text-slate-400 font-semibold mt-1">Published: ${b.date}</p>
                <p class="text-xs text-slate-500 leading-normal mt-3 line-clamp-3">${b.excerpt}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'toppers') {
    // TOPPERS HUB PANEL
    area.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="font-bold text-sm text-slate-700">Display district toppers and NEET high achievers to build enrollment trust</div>
          <button onclick="toggleCmsTopperForm()" class="bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm flex items-center gap-1">
            Add Result
          </button>
        </div>

        <form id="cms-topper-form" class="hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300" onsubmit="saveCmsTopper(event)">
          <h3 class="font-bold text-slate-800 text-sm">Add Topper/Result Milestone</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Student Name</label>
              <input type="text" id="ct-name" required placeholder="Priya Sharma" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Score / Percentage</label>
                <input type="text" id="ct-score" required placeholder="350/360 or 98.4%" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
              </div>
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Session Year</label>
                <input type="text" id="ct-year" required value="2026" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Target Class Level</label>
              <input type="text" id="ct-class" required placeholder="Class 12 / NEET" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Exams Stream Category</label>
              <select id="ct-category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none">
                <option value="NEET">NEET Entrance</option>
                <option value="CBSE Class 12">CBSE Class 12 Boards</option>
                <option value="CBSE Class 10">CBSE Class 10 Boards</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Topper Image URL (Optional)</label>
            <input type="text" id="ct-image" placeholder="https://images.unsplash.com/..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700">Achievement Highlight / Description</label>
            <input type="text" id="ct-highlight" required placeholder="District Topper in Biology (99/100) or govt medical college seat..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
          </div>

          <div class="flex gap-2 justify-end mt-2">
            <button type="button" onclick="toggleCmsTopperForm()" class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm">Add Result</button>
          </div>
        </form>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          ${appState.data.toppers.map(t => `
            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center relative">
              <button onclick="deleteCmsTopper('${t.id}')" class="absolute top-3 right-3 p-1 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
              </button>
              <img src="${t.image}" alt="${t.name}" class="h-20 w-20 object-cover rounded-full bg-slate-100 border mb-3">
              <h4 class="font-bold text-slate-800 text-xs">${t.name}</h4>
              <span class="text-accent text-[11px] font-extrabold block mt-0.5">${t.score}</span>
              <p class="text-[10px] text-slate-400 font-bold block">${t.classLevel} • ${t.year}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'resources') {
    // STUDY MATERIALS PANEL
    area.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="font-bold text-sm text-slate-700">Upload worksheets, handouts, or syllabus files for student portals</div>
          <button onclick="toggleCmsResourceForm()" class="bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm flex items-center gap-1">
            Add Handout
          </button>
        </div>

        <form id="cms-resource-form" class="hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-top duration-300" onsubmit="saveCmsResource(event)">
          <h3 class="font-bold text-slate-800 text-sm">Add Free Downloadable Worksheet</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Document Title</label>
              <input type="text" id="cr-title" required placeholder="Class 10 Biology Genetics revision notes" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Class Level</label>
                <input type="text" id="cr-class" required placeholder="Class 10" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
              </div>
              <div class="flex flex-col gap-1.5 w-1/2">
                <label class="text-xs font-bold text-slate-700">Subject Name</label>
                <input type="text" id="cr-subject" required placeholder="Biology" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">File Type (Extension)</label>
              <select id="cr-type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none">
                <option value="Notes">Notes Handout</option>
                <option value="Worksheets">Worksheet</option>
                <option value="Holiday Homework">Holiday Homework</option>
                <option value="Sample Papers">Sample Papers</option>
                <option value="NCERT">NCERT Drawings</option>
              </select>
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Estimated File Size</label>
              <input type="text" id="cr-size" required value="2.5 MB" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none">
            </div>
          </div>

          <div class="flex gap-2 justify-end mt-2">
            <button type="button" onclick="toggleCmsResourceForm()" class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-500">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm">Save Handout</button>
          </div>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${appState.data.resources.map(res => `
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
              <div class="truncate">
                <h4 class="font-serif font-bold text-slate-800 text-sm truncate">${res.title}</h4>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">${res.subject} • Class: ${res.classLevel} • Size: ${res.fileSize}</p>
                <span class="inline-block mt-2 px-2 py-0.5 rounded bg-primary/5 text-primary text-[8px] font-extrabold uppercase">${res.type}</span>
              </div>
              <button onclick="deleteCmsResource('${res.id}')" class="p-2 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (activeAdminTab === 'messages') {
    // CONTACT MESSAGES LIST PANEL
    area.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-5 border-b border-slate-100 bg-slate-50/50 font-bold text-sm text-slate-700">
          General Counselor Feedback Inbox messages
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th class="py-4 px-6">Sender Details</th>
                <th class="py-4 px-4">Subject</th>
                <th class="py-4 px-4">Message Body Details</th>
                <th class="py-4 px-4">Received At</th>
                <th class="py-4 px-4">State</th>
                <th class="py-4 px-6 text-right">Delete</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              ${appState.data.contactMessages.length > 0 ? appState.data.contactMessages.map(msg => `
                <tr class="hover:bg-slate-50/50 ${!msg.read ? 'bg-amber-50/30' : ''}">
                  <td class="py-4 px-6">
                    <div class="font-bold text-sm text-slate-800">${msg.name}</div>
                    <div class="text-slate-400 text-[10px] font-bold mt-0.5">${msg.emailOrPhone}</div>
                  </td>
                  <td class="py-4 px-4 text-slate-700 font-bold">${msg.subject || 'No Subject'}</td>
                  <td class="py-4 px-4 max-w-xs break-words font-medium text-slate-500">${msg.message}</td>
                  <td class="py-4 px-4 text-slate-400 text-[10px]">${msg.submittedAt}</td>
                  <td class="py-4 px-4">
                    ${!msg.read ? `
                      <button onclick="markCmsMessageRead('${msg.id}')" class="px-2 py-1 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase hover:bg-emerald-500 hover:text-white transition-all">
                        Unread
                      </button>
                    ` : `
                      <span class="px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">Read</span>
                    `}
                  </td>
                  <td class="py-4 px-6 text-right">
                    <button onclick="deleteCmsMessage('${msg.id}')" class="p-1.5 rounded-lg border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" class="py-12 text-center text-slate-400 font-bold">Feedback inbox is currently empty.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// Global actions triggers inside CMS Panel
window.exportAdmissionsCSV = () => {
  if (appState.data.admissions.length === 0) {
    alert('No enquiries available to export.');
    return;
  }

  const headers = ['ID', 'Student Name', 'Parent Name', 'Seeking Class', 'School Name', 'Mobile Number', 'Submitted At', 'Status'];
  const rows = appState.data.admissions.map(e => [
    e.id,
    e.studentName.replace(/"/g, '""'),
    e.parentName.replace(/"/g, '""'),
    e.classLevel.replace(/"/g, '""'),
    e.schoolName.replace(/"/g, '""'),
    `="${e.mobileNumber}"`,
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

window.updateCmsEnquiryStatus = async (id, status) => {
  const updated = appState.data.admissions.map(e => e.id === id ? { ...e, status } : e);
  await saveSiteData({
    ...appState.data,
    admissions: updated
  });

  if (supabaseClient) {
    try {
      await supabaseClient.from('admissions').update({ status }).eq('id', id);
    } catch(err){}
  }
  renderAdminPage();
};

window.deleteCmsEnquiry = async (id) => {
  if (!confirm('Are you sure you want to delete this enquiry log?')) return;

  const filtered = appState.data.admissions.filter(e => e.id !== id);
  await saveSiteData({
    ...appState.data,
    admissions: filtered
  });

  if (supabaseClient) {
    try {
      await supabaseClient.from('admissions').delete().eq('id', id);
    } catch(err){}
  }
  renderAdminPage();
};

// CMS Notice toggles
window.toggleCmsNoticeForm = () => {
  const form = document.getElementById('cms-notice-form');
  if (form) {
    form.classList.toggle('hidden');
    // Clear editing details
    cmsEditNoticeId = null;
    document.getElementById('cms-notice-form-title').textContent = 'Add New Notice';
    document.getElementById('cn-title').value = '';
    document.getElementById('cn-content').value = '';
    document.getElementById('cn-type').value = 'general';
    document.getElementById('cn-active').checked = true;
  }
};

window.saveCmsNotice = async (e) => {
  e.preventDefault();
  const title = document.getElementById('cn-title').value;
  const type = document.getElementById('cn-type').value;
  const active = document.getElementById('cn-active').checked;
  const content = document.getElementById('cn-content').value;

  let updatedNotices = [];
  if (cmsEditNoticeId) {
    updatedNotices = appState.data.notices.map(n => 
      n.id === cmsEditNoticeId ? { ...n, title, type, active, content } : n
    );
    cmsEditNoticeId = null;
  } else {
    const newNotice = {
      id: `n-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      type,
      active
    };
    updatedNotices = [newNotice, ...appState.data.notices];
  }

  await saveSiteData({
    ...appState.data,
    notices: updatedNotices
  });

  document.getElementById('cms-notice-form').classList.add('hidden');
  renderAdminPage();
};

window.editCmsNotice = (id) => {
  const notice = appState.data.notices.find(n => n.id === id);
  if (!notice) return;

  const form = document.getElementById('cms-notice-form');
  if (form) {
    form.classList.remove('hidden');
    cmsEditNoticeId = id;
    document.getElementById('cms-notice-form-title').textContent = 'Edit Notice';
    document.getElementById('cn-title').value = notice.title;
    document.getElementById('cn-content').value = notice.content;
    document.getElementById('cn-type').value = notice.type;
    document.getElementById('cn-active').checked = notice.active;
    
    form.scrollIntoView({ behavior: 'smooth' });
  }
};

window.deleteCmsNotice = async (id) => {
  if (!confirm('Are you sure you want to delete this notice?')) return;
  const filtered = appState.data.notices.filter(n => n.id !== id);
  await saveSiteData({
    ...appState.data,
    notices: filtered
  });
  renderAdminPage();
};

// CMS Blog toggles
window.toggleCmsBlogForm = () => {
  const form = document.getElementById('cms-blog-form');
  if (form) {
    form.classList.toggle('hidden');
    cmsEditBlogId = null;
    document.getElementById('cms-blog-form-title').textContent = 'Write New Article';
    document.getElementById('cb-title').value = '';
    document.getElementById('cb-excerpt').value = '';
    document.getElementById('cb-content').value = '';
    document.getElementById('cb-image').value = '';
    document.getElementById('cb-tags').value = '';
    document.getElementById('cb-category').value = 'Study Tips';
  }
};

window.saveCmsBlog = async (e) => {
  e.preventDefault();
  const title = document.getElementById('cb-title').value;
  const category = document.getElementById('cb-category').value;
  const tagsStr = document.getElementById('cb-tags').value;
  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
  const image = document.getElementById('cb-image').value || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
  const excerpt = document.getElementById('cb-excerpt').value;
  const content = document.getElementById('cb-content').value;

  let updatedBlogs = [];
  if (cmsEditBlogId) {
    updatedBlogs = appState.data.blogs.map(b => {
      if (b.id === cmsEditBlogId) {
        const wordCount = content.trim().split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return { ...b, title, category, tags, image, excerpt, content, readTime, slug };
      }
      return b;
    });
    cmsEditBlogId = null;
  } else {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newBlog = {
      id: `b-${Date.now()}`,
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      date: new Date().toISOString().split('T')[0],
      author: 'Seema Swami (Director)',
      readTime,
      tags
    };
    updatedBlogs = [newBlog, ...appState.data.blogs];
  }

  await saveSiteData({
    ...appState.data,
    blogs: updatedBlogs
  });

  document.getElementById('cms-blog-form').classList.add('hidden');
  renderAdminPage();
};

window.editCmsBlog = (id) => {
  const b = appState.data.blogs.find(blog => blog.id === id);
  if (!b) return;

  const form = document.getElementById('cms-blog-form');
  if (form) {
    form.classList.remove('hidden');
    cmsEditBlogId = id;
    document.getElementById('cms-blog-form-title').textContent = 'Edit Article';
    document.getElementById('cb-title').value = b.title;
    document.getElementById('cb-excerpt').value = b.excerpt;
    document.getElementById('cb-content').value = b.content;
    document.getElementById('cb-image').value = b.image;
    document.getElementById('cb-tags').value = b.tags.join(', ');
    document.getElementById('cb-category').value = b.category;
    
    form.scrollIntoView({ behavior: 'smooth' });
  }
};

window.deleteCmsBlog = async (id) => {
  if (!confirm('Are you sure you want to delete this blog post?')) return;
  const filtered = appState.data.blogs.filter(b => b.id !== id);
  await saveSiteData({
    ...appState.data,
    blogs: filtered
  });
  renderAdminPage();
};

// CMS Toppers triggers
window.toggleCmsTopperForm = () => {
  const form = document.getElementById('cms-topper-form');
  if (form) {
    form.classList.toggle('hidden');
    document.getElementById('ct-name').value = '';
    document.getElementById('ct-score').value = '';
    document.getElementById('ct-class').value = '';
    document.getElementById('ct-highlight').value = '';
    document.getElementById('ct-image').value = '';
    document.getElementById('ct-year').value = '2026';
    document.getElementById('ct-category').value = 'CBSE Class 12';
  }
};

window.saveCmsTopper = async (e) => {
  e.preventDefault();
  const name = document.getElementById('ct-name').value;
  const score = document.getElementById('ct-score').value;
  const year = document.getElementById('ct-year').value;
  const classLevel = document.getElementById('ct-class').value;
  const category = document.getElementById('ct-category').value;
  const image = document.getElementById('ct-image').value || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300';
  const highlight = document.getElementById('ct-highlight').value;

  const newTopper = {
    id: `t-${Date.now()}`,
    name,
    score,
    year,
    classLevel,
    category,
    highlight,
    image
  };

  const updatedToppers = [newTopper, ...appState.data.toppers];
  await saveSiteData({
    ...appState.data,
    toppers: updatedToppers
  });

  document.getElementById('cms-topper-form').classList.add('hidden');
  renderAdminPage();
};

window.deleteCmsTopper = async (id) => {
  if (!confirm('Are you sure you want to delete this result?')) return;
  const filtered = appState.data.toppers.filter(t => t.id !== id);
  await saveSiteData({
    ...appState.data,
    toppers: filtered
  });
  renderAdminPage();
};

// CMS Resources triggers
window.toggleCmsResourceForm = () => {
  const form = document.getElementById('cms-resource-form');
  if (form) {
    form.classList.toggle('hidden');
    document.getElementById('cr-title').value = '';
    document.getElementById('cr-class').value = '';
    document.getElementById('cr-subject').value = '';
    document.getElementById('cr-type').value = 'Notes';
    document.getElementById('cr-size').value = '2.5 MB';
  }
};

window.saveCmsResource = async (e) => {
  e.preventDefault();
  const title = document.getElementById('cr-title').value;
  const classLevel = document.getElementById('cr-class').value;
  const subject = document.getElementById('cr-subject').value;
  const type = document.getElementById('cr-type').value;
  const fileSize = document.getElementById('cr-size').value;

  const newRes = {
    id: `res-${Date.now()}`,
    title,
    classLevel,
    subject,
    type,
    fileType: 'PDF',
    fileSize,
    downloadUrl: '#'
  };

  const updatedResources = [newRes, ...appState.data.resources];
  await saveSiteData({
    ...appState.data,
    resources: updatedResources
  });

  document.getElementById('cms-resource-form').classList.add('hidden');
  renderAdminPage();
};

window.deleteCmsResource = async (id) => {
  if (!confirm('Are you sure you want to delete this study resource?')) return;
  const filtered = appState.data.resources.filter(r => r.id !== id);
  await saveSiteData({
    ...appState.data,
    resources: filtered
  });
  renderAdminPage();
};

// CMS Message triggers
window.markCmsMessageRead = async (id) => {
  const updated = appState.data.contactMessages.map(m => m.id === id ? { ...m, read: true } : m);
  await saveSiteData({
    ...appState.data,
    contactMessages: updated
  });

  if (supabaseClient) {
    try {
      await supabaseClient.from('contact_messages').update({ read: true }).eq('id', id);
    } catch(err){}
  }
  renderAdminPage();
};

window.deleteCmsMessage = async (id) => {
  if (!confirm('Are you sure you want to delete this message?')) return;
  const filtered = appState.data.contactMessages.filter(m => m.id !== id);
  await saveSiteData({
    ...appState.data,
    contactMessages: filtered
  });

  if (supabaseClient) {
    try {
      await supabaseClient.from('contact_messages').delete().eq('id', id);
    } catch(err){}
  }
  renderAdminPage();
};


// ========================================================
// ON DOCUMENT INITIALIZATION triggers
// ========================================================
function injectFloatingCTA() {
  const ctaHtml = `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <!-- Call button (gold background, dark blue phone icon) -->
      <a href="tel:+917011178381" class="h-14 w-14 rounded-full bg-accent text-[#0B2C6B] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer" title="Call Us">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <!-- WhatsApp button (green background, white message bubble icon) -->
      <a href="https://wa.me/917011178381" target="_blank" class="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer" title="WhatsApp Chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
      </a>
    </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = ctaHtml;
  document.body.appendChild(div.firstElementChild);
}

document.addEventListener('DOMContentLoaded', () => {
  // Inject Call & WhatsApp CTAs globally
  injectFloatingCTA();

  // Navigation Menu and header elements Binds
  initNavigationEvents();
  
  // Set up forms on Login modal overlays
  const studentLoginForm = document.getElementById('student-login-form');
  const studentRegisterForm = document.getElementById('student-register-form');
  const adminLoginForm = document.getElementById('admin-login-form');

  if (studentLoginForm) studentLoginForm.addEventListener('submit', handleStudentLoginSubmit);
  if (studentRegisterForm) studentRegisterForm.addEventListener('submit', handleStudentRegisterSubmit);
  if (adminLoginForm) adminLoginForm.addEventListener('submit', handleAdminLoginSubmit);

  // Initialize data cache state
  initAppState();
  
  // Quick locks validations
  checkPortalLocks();
});
