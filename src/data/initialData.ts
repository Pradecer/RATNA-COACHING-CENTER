export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'urgent' | 'general' | 'admission';
  active: boolean;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'primary' | 'secondary' | 'senior' | 'specialized';
  eligibility: string;
  subjects: string[];
  batchType: string;
  timing: string;
  fee: string;
  syllabus: string[];
  featured: boolean;
}

export interface Subject {
  id: string;
  name: string;
  classes: string;
  approach: string;
  iconName: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Topper {
  id: string;
  name: string;
  score: string;
  year: string;
  classLevel: string;
  category: 'NEET' | 'CBSE Class 12' | 'CBSE Class 10';
  highlight: string;
  image: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  achievement: string;
  story: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  category: 'classroom' | 'event' | 'activity' | 'youtube';
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  relation: 'Parent' | 'Student';
  classLevel: string;
  rating: number;
  text: string;
  image?: string;
}

export interface StudyResource {
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  type: 'Notes' | 'Worksheets' | 'Holiday Homework' | 'Sample Papers' | 'NCERT';
  fileType: string;
  fileSize: string;
  downloadUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'Study Tips' | 'Exam Updates' | 'Educational Articles' | 'Biology Focus';
  date: string;
  author: string;
  readTime: string;
  tags: string[];
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  parentName: string;
  classLevel: string;
  schoolName: string;
  mobileNumber: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Enrolled' | 'Closed';
}

export interface ContactMessage {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export interface SiteData {
  notices: Notice[];
  courses: Course[];
  subjects: Subject[];
  facilities: Facility[];
  toppers: Topper[];
  successStories: SuccessStory[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  resources: StudyResource[];
  blogs: BlogPost[];
  admissions: AdmissionEnquiry[];
  contactMessages: ContactMessage[];
}

export const initialData: SiteData = {
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
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600'
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
    { id: 'g-1', type: 'photo', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800', category: 'classroom', title: 'Senior Board Batch Study Session' },
    { id: 'g-2', type: 'photo', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800', category: 'classroom', title: 'Individual Biology Diagram Practice under Seema Mam' },
    { id: 'g-3', type: 'photo', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', category: 'activity', title: 'Weekly Mock Test Room Layout' },
    { id: 'g-4', type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', category: 'classroom', title: 'Primary Junior Scholars Writing Workshop' },
    { id: 'g-5', type: 'photo', url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', category: 'event', title: 'Annual Topper felicitation and Awards Ceremony' },
    { id: 'g-6', type: 'photo', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', category: 'activity', title: 'Interactive Science Group Discussion' },
    { id: 'g-7', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'youtube', title: 'Mastering Plant Genetics - BioMaster Seema' },
    { id: 'g-8', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', category: 'youtube', title: 'NEET Biology Prep Strategy & Blueprint' }
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
      content: `Board exams require not just understanding, but precise representation. Biology is a high-scoring subject, but many students lose marks on explanation accuracy and diagram presentation. Here is a definitive guide to securing 95+ in CBSE Class 12 Biology.

### 1. Master the NCERT Textbook Word-by-Word
The CBSE Board exam matches the NCERT syllabus 100%. Highlight key definition terminologies (e.g., "apomixis", "triple fusion", "biodiversity hot-spots"). When answering questions, examiners search for these specific vocabulary keywords in your answer sheets.

### 2. Practice Diagrams Until they are Muscle Memory
A diagram is worth 10 marks in explanation.
- Practice drawing clean, labeled sketches of:
  * Human reproductive systems (Male & Female)
  * Transcription unit and DNA Replication forks
  * Reflex arcs and structure of Antibody molecules
- Always label your diagrams horizontally, pointing to the right side where possible, using a sharp pencil.

### 3. Build Concept Connection Flowcharts
Don't just read pages. Synthesize information into summary sheets. For example, represent the stages of Spermatogenesis or the Krebs Cycle in an easy-to-follow flow diagram. Flowcharts are easier to retrieve under pressure than paragraphs of text.

### 4. Solve the Last 10 Years Board Papers
Familiarize yourself with the questioning style. CBSE frequently rephrases past questions. Practice structured writing: write short, bullet-pointed points with underlined keywords rather than solid paragraphs.

At Ratna Coaching Centre, we emphasize these strategies in our weekly board-preparation evaluation. Director Seema Swami individually audits answer sheets to ensure board marking criteria are met.`,
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
      content: `NEET Biology consists of 90 questions, carrying a whopping 360 marks. Scoring 340+ is the baseline requirement to land a seat in a premier Government Medical College. Because the NEET paper is drawn directly from NCERT lines, memorization details are crucial.

Here are the key hacks we use in our NEET Foundation and specialized biology classes at Ratna Coaching Centre:

### 1. The Active Recall Retrieval Method
Never read your biology textbook passively. Instead:
- Cover a section of the page with a card.
- Ask yourself: "What are the examples of Deuteromycetes?" or "What are the rules of binomial nomenclature?"
- Out loud, retrieve the examples, then check the text. Active recall creates stronger synaptic pathways in the brain than highlight-marking.

### 2. Mnemonic Anchors for Examples
Plant Kingdom, Animal Kingdom, and Morphology of Flowering Plants contain dozens of examples that are easy to mix up. Create funny sentences where the first letters map to the examples.
- *Example*: For Ascomycetes (yeast, Penicillium, Aspergillus, Claviceps, Neurospora), memorize: "**A**sk **Y**our **P**arents **A**bout **C**lever **N**eighbors".

### 3. Diagram-Only Reviews
Photocopy all NCERT diagrams, white out the labels, and place them in a binder. Every week, write down the labels on a blank sheet. NEET questions frequently show a diagram from the book with labels 'A', 'B', 'C', 'D' and ask you to identify the correct statement.

### 4. Time-Bound Practice & Negating Marks
Accuracy is nothing without speed. In NEET, you must answer biology questions in less than 40 seconds each, reserving time for Physics calculations. When solving mock tests at Ratna, we train students with OMR sheets and strict countdown timers. Remember: leaving a doubtful question blank is better than guessing and incurring a -1 penalty.

For hands-on practice, join our NEET Biology Special Batch. Watch our video sessions on our YouTube Channel: **BioMaster Seema** for conceptual breakdowns.`,
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
      content: `Class 10 and 12 Board exams are high-stakes events that create massive stress. While a healthy amount of pressure drives focus, excessive anxiety degrades cognitive recall and sleep cycles, leading to poor scores. 

Here is a checklist for students and parents to successfully navigate exam periods with composure.

### For Students:
1. **The 50-10 Pomodoro Routine**: Study with high concentration for 50 minutes, then take a complete 10-minute break. Walk around, stretch, drink water, but avoid looking at smartphones.
2. **Prioritize 7+ Hours of Sleep**: Sleeping is when your brain consolidates memory. Cramming overnight before an exam is counterproductive; a tired brain struggles to retrieve formulas and vocabulary.
3. **Structured Doubt Solving**: Do not get stuck on a difficult topic. Circle the problem, continue studying other chapters, and resolve it with your teacher the next day.

### For Parents:
1. **Focus on Effort, Not Just Marks**: Reassure your child that their worth is not defined by a single exam sheet. A supportive home environment lowers performance pressure, leading to better focus.
2. **Ensure Nutritional Balance**: Provide light, fresh, protein-rich snacks during study hours. Avoid heavy, greasy meals that induce drowsiness.
3. **Open Dialogues**: Talk to your child. Ask how they are feeling, encourage them to take a walk, and maintain a quiet, distraction-free environment in the house.

At Ratna Coaching Centre, we conduct dedicated doubt sessions and mock tests to prepare students mentally. We guide our students to treat exams as simple evaluations of their preparation, not as sources of dread.`,
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
