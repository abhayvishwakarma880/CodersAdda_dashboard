import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Web Development', status: 'Active' },
    { id: '2', name: 'Mobile App Development', status: 'Active' },
    { id: '3', name: 'Data Science', status: 'Active' },
    { id: '4', name: 'UI/UX Design', status: 'Active' },
    { id: '5', name: 'Cloud Computing', status: 'Active' }
  ]);

  const [courses, setCourses] = useState([
    { 
      id: '1', 
      title: 'Full Stack Web Development', 
      category: 'Web Development', 
      instructor: 'Abhay Vishwakarma',
      duration: '6 Months',
      studentsCount: '1.2k+',
      priceType: 'Paid',
      price: '4999',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      status: 'Active',
      technology: 'MERN Stack',
      about: 'Comprehensive course covering frontend and backend technologies...',
      whatYouWillLearn: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      curriculum: [
        {
          id: 's1',
          title: 'Introduction',
          lessons: [
            { id: 'l1', title: 'Course Overview', duration: '05:00', status: 'Active', lectureSrNo: '1' },
            { id: 'l2', title: 'Environment Setup', duration: '12:30', status: 'Active', lectureSrNo: '2' }
          ]
        }
      ]
    },
    { 
      id: '2', 
      title: 'Mastering Flutter & Dart', 
      category: 'Mobile App Development', 
      instructor: 'Alok Singh',
      duration: '4 Months',
      studentsCount: '800+',
      priceType: 'Paid',
      price: '3499',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      status: 'Active',
      technology: 'Flutter',
      about: 'Learn to build cross-platform mobile apps for iOS and Android...',
      whatYouWillLearn: ['Dart Basics', 'Flutter UI', 'State Management', 'API Integration'],
      curriculum: []
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Abhay Vishwakarma',
      email: 'abhay@codersadda.com',
      phone: '+91 9651429000',
      profilePhoto: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=60&w=200',
      status: 'Active',
      college: 'VIT Vellore',
      course: 'M.Tech CSE',
      semester: '4th',
      technology: ['MERN Stack', 'Next.js', 'Typescript'],
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
      about: 'Passionate full-stack developer with a love for clean code and modern web technologies. Enjoys mentoring and contributing to open source.',
      studentDetails: {
          completedCourses: 12,
          ongoingCourses: 1,
          learningHours: 450,
          createdAt: '2023-01-10',
          progress: 92
      },
      social: {
        github: 'https://github.com/abhayvishwakarma',
        linkedin: 'https://linkedin.com/in/abhayvishwakarma',
        portfolio: 'https://abhay.dev'
      },
      referralData: { referralCount: 45, isReferred: false, referredByCode: null, myReferralCode: 'ABHAY2024' },
      achievements: [
        { title: 'Tech Lead', description: 'Led the university coding club for 2 consecutive years.' },
        { title: 'Hackathon Winner', description: '1st Place in National Level Coding Hackathon 2023.' },
        { title: 'Open Source Contributor', description: 'Merged 50+ PRs to major React libraries.' }
      ],
      purchases: [
        { id: 'p1', title: 'Full Stack Masterclass', type: 'Course', date: '2023-02-10', price: 2999 },
        { id: 'p2', title: 'System Design Interview Guide', type: 'E-Book', date: '2023-05-15', price: 999 }
      ],
      subscription: { plan: 'Lifetime Pro', status: 'Active', expiryDate: 'Unlimited', benefits: ['All Access', '1-on-1 Mentorship', 'Priority Support'] },
      wallet: { balance: 8500, earnings: 25000, withdrawn: 16500, transactions: [{ id: 't1', type: 'Credit', amount: 1000, description: 'Hackathon Prize', date: '2023-11-20' }, { id: 't2', type: 'Debit', amount: 2999, description: 'Course Purchase', date: '2023-02-10' }] }
    },
    {
      id: '2',
      name: 'Riya Singh',
      email: 'riya.singh@example.com',
      phone: '+91 8765432109',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=200',
      status: 'Active',
      college: 'LPU Jalandhar',
      course: 'BCA',
      semester: '2nd',
      technology: ['Flutter', 'Dart', 'Firebase'],
      skills: ['Mobile Dev', 'UI Animation', 'Riverpod'],
      about: 'Aspiring mobile app developer focusing on creating beautiful and performant Flutter applications. Loves experimenting with animations.',
      studentDetails: {
          completedCourses: 3,
          ongoingCourses: 2,
          learningHours: 120,
          createdAt: '2023-08-15',
          progress: 45
      },
      social: {
        github: 'https://github.com/riyasingh',
        linkedin: 'https://linkedin.com/in/riyasingh',
        portfolio: 'https://riya.design'
      },
      referralData: { referralCount: 5, isReferred: true, referredByCode: 'ABHAY99' },
      achievements: [
        { title: 'UI Wizard', description: 'Created the best mobile UI in the monthly challenge.' }
      ],
      purchases: [
        { id: 'p1', title: 'Flutter Zero to Hero', type: 'Course', date: '2023-08-16', price: 1999 }
      ],
      subscription: { plan: 'Monthly Starter', status: 'Active', expiryDate: '2024-02-28', benefits: ['Mobile Access', 'HD Video'] },
      wallet: { balance: 200, earnings: 500, withdrawn: 300, transactions: [{ id: 't1', type: 'Credit', amount: 500, description: 'Referral Bonus', date: '2023-09-01' }] }
    },
    {
      id: '3',
      name: 'Rahul Sharma',
      email: 'rahul.ai@example.com',
      phone: '+91 9988776655',
      profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=200',
      status: 'Disabled',
      college: 'IIT Delhi',
      course: 'B.Tech AI & DS',
      semester: '6th',
      technology: ['Python', 'TensorFlow', 'PyTorch'],
      skills: ['Machine Learning', 'Data Analysis', 'Computer Vision'],
      about: 'AI enthusiast exploring the depths of deep learning and computer vision. Working on autonomous drone navigation project.',
      studentDetails: {
          completedCourses: 15,
          ongoingCourses: 0,
          learningHours: 600,
          createdAt: '2022-07-20',
          progress: 100
      },
      social: {
        github: 'https://github.com/rahul-ai',
        linkedin: 'https://linkedin.com/in/rahulsharma',
        portfolio: ''
      },
      referralData: { referralCount: 0, isReferred: false, referredByCode: null },
      achievements: [
        { title: 'Research Fellow', description: 'Published a paper on GANs in a reputed journal.' },
        { title: 'Course Completer', description: 'Finished 15 advanced AI courses.' }
      ],
      purchases: [
        { id: 'p1', title: 'Deep Learning Specialization', type: 'Course', date: '2022-07-22', price: 4999 },
        { id: 'p2', title: 'Mathematics for ML', type: 'E-Book', date: '2022-08-10', price: 599 }
      ],
      subscription: null,
      wallet: { balance: 0, earnings: 0, withdrawn: 0, transactions: [] }
    },
    {
      id: '4',
      name: 'Sneha Patel',
      email: 'sneha.design@example.com',
      phone: '+91 7766554433',
      profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=200',
      status: 'Active',
      college: 'NIFT Mumbai',
      course: 'B.Des',
      semester: '5th',
      technology: ['Figma', 'Adobe XD', 'Sketch'],
      skills: ['User Research', 'Prototyping', 'Wireframing', 'HTML/CSS'],
      about: 'Creative designer transitioning into UI/UX development. I believe in accessible and inclusive design for everyone.',
      studentDetails: {
          completedCourses: 6,
          ongoingCourses: 3,
          learningHours: 210,
          createdAt: '2023-03-12',
          progress: 60
      },
      social: {
        github: '',
        linkedin: 'https://linkedin.com/in/snehadesign',
        portfolio: 'https://dribbble.com/sneha'
      },
      referralData: { referralCount: 10, isReferred: true, referredByCode: 'DESIGN101' },
      achievements: [
        { title: 'Design Star', description: 'Won Best Design Award 2023.' }
      ],
      purchases: [
        { id: 'p1', title: 'Advanced UX Strategy', type: 'Course', date: '2023-04-05', price: 2499 }
      ],
      subscription: { plan: 'Yearly Creative', status: 'Active', expiryDate: '2024-03-12', benefits: ['Design Resources Access', 'Community Access'] },
      wallet: { balance: 1500, earnings: 3000, withdrawn: 1500, transactions: [{ id: 't1', type: 'Credit', amount: 1000, description: 'Design Contest Prize', date: '2023-06-20' }] }
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      email: 'vikram.java@example.com',
      phone: '+91 8899001122',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=200',
      status: 'Active',
      college: 'Bits Pilani',
      course: 'B.E. CS',
      semester: '8th',
      technology: ['Java', 'Spring Boot', 'Microservices'],
      skills: ['Backend Dev', 'SQL', 'System Design'],
      about: 'Backend engineer getting ready for placements. Focused on scalability and performance optimization.',
      studentDetails: {
          completedCourses: 10,
          ongoingCourses: 0,
          learningHours: 400,
          createdAt: '2022-05-01',
          progress: 98
      },
      social: {
        github: 'https://github.com/vikram-java',
        linkedin: 'https://linkedin.com/in/vikrammalhotra',
        portfolio: ''
      },
      referralData: { referralCount: 2, isReferred: false, referredByCode: null },
      achievements: [
        { title: 'Problem Solver', description: 'Solved 1000+ problems on LeetCode.' },
        { title: 'Placement Ready', description: 'Secured an internship at Amazon.' }
      ],
      purchases: [
        { id: 'p1', title: 'Complete Backend with Java', type: 'Course', date: '2022-06-15', price: 3999 }
      ],
      subscription: { plan: 'Quarterly Pro', status: 'Expired', expiryDate: '2023-08-01', benefits: [] },
      wallet: { balance: 100, earnings: 100, withdrawn: 0, transactions: [] }
    }
  ]);

  const [ebookCategories, setEbookCategories] = useState([
    { id: 'ec1', name: 'Programming', status: 'Active' },
    { id: 'ec2', name: 'Design', status: 'Active' },
    { id: 'ec3', name: 'Science', status: 'Active' }
  ]);

  const [ebooks, setEbooks] = useState([
    { id: 'eb1', title: 'Flutter Complete Guide', author: 'Dr. Angela Yu', category: 'Programming', priceType: 'Free', price: '', fileSize: '2.4 MB', downloadUrl: 'https://example.com/flutter.pdf', status: 'Active' },
    { id: 'eb2', title: 'JavaScript Basics', author: 'Kyle Simpson', category: 'Programming', priceType: 'Free', price: '', fileSize: '1.8 MB', downloadUrl: 'https://example.com/js.pdf', status: 'Active' },
    { id: 'eb3', title: 'UI/UX Design Principles', author: 'Steve Krug', category: 'Design', priceType: 'Paid', price: '499', fileSize: '3.2 MB', downloadUrl: 'https://example.com/design.pdf', status: 'Active' }
  ]);

  const [jobs, setJobs] = useState([
    { 
      id: '1', 
      title: 'Senior Flutter Developer', 
      category: 'Senior Developer', 
      location: 'Lucknow', 
      workType: 'Work From Home', 
      experience: '3-5 Years', 
      salary: '12-18 LPA', 
      openings: '5', 
      skills: 'Flutter, Dart, Firebase, REST API', 
      companyName: 'TechVeda Solutions', 
      companyEmail: 'hr@techveda.com', 
      companyMobile: '+91 9651429000', 
      companyWebsite: 'https://techveda.com', 
      description: 'We are looking for an expert Flutter developer...',
      createdAt: new Date().toISOString(),
      status: 'Active'
    }
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: '1', planType: 'Mobile', duration: '1 Month', price: '299', benefits: ['Ad-free experience', '1 Device access', '720p resolution'], status: 'Active' },
    { id: '2', planType: 'Super', duration: '1 Year', price: '1499', benefits: ['Ad-free experience', '2 Devices access', '1080p resolution', 'New releases included'], status: 'Active' },
    { id: '3', planType: 'Premium', duration: '1 Year', price: '1999', benefits: ['Ad-free experience', '4 Devices access', '4K resolution', 'New releases included', 'Offline downloads'], status: 'Active' }
  ]);

  const [sliders, setSliders] = useState([
    { id: '1', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop', title: 'Welcome to CodersAdda', status: 'Active' },
    { id: '2', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop', title: 'Learn & Grow Together', status: 'Active' },
    { id: '3', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=400&fit=crop', title: 'Build Your Future', status: 'Disabled' }
  ]);

  const [shorts, setShorts] = useState([
    { 
      id: '1', 
      instructor: 'Abhay Vishwakarma', 
      description: 'Learn React Hooks in 60 Seconds! 🚀 #ReactJS #Coding', 
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
      likes: 1250, 
      shares: 45,
      status: 'Active',
      comments: [
        { id: 'c1', user: 'Rahul Kumar', text: 'Great explanation sir!', time: '2h ago', replies: [] },
        { id: 'c2', user: 'Sneha Singh', text: 'Can you make one on useEffect?', time: '5h ago', replies: [] }
      ]
    },
    { 
      id: '2', 
      instructor: 'John Doe', 
      description: 'CSS Grid vs Flexbox - Quick Guide 🎨 #CSS #WebDev', 
      videoUrl: 'https://www.w3schools.com/html/movie.mp4', 
      likes: 890, 
      shares: 20,
      status: 'Disabled',
      comments: [
        { id: 'c1', user: 'Dev Guru', text: 'Flexbox is awesome!', time: '1d ago', replies: [] }
      ]
    }
  ]);

  // CRUD Functions
  const addCategory = (name) => {
    const newCategory = {
      id: Date.now().toString(),
      name: name.trim(),
      status: 'Active'
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, data) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...(typeof data === 'string' ? { name: data.trim() } : data) } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: courseData.status || 'Active'
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, courseData) => {
    setCourses(prev => prev.map(course => course.id === id ? { ...course, ...courseData } : course));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const addUser = (userData) => {
    setUsers([...users, { ...userData, id: Date.now().toString() }]);
  };

  const updateUser = (id, userData) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...userData } : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addEbookCategory = (name) => {
    const catData = typeof name === 'string' ? { name: name.trim(), status: 'Active' } : name;
    const newCategory = {
      id: Date.now().toString(),
      name: catData.name.trim(),
      status: catData.status || 'Active'
    };
    setEbookCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateEbookCategory = (id, data) => {
    setEbookCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...(typeof data === 'string' ? { name: data.trim() } : data) } : cat));
  };

  const deleteEbookCategory = (id) => {
    setEbookCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addEbook = (ebookData) => {
    const newEbook = {
      ...ebookData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: ebookData.status || 'Active'
    };
    setEbooks(prev => [...prev, newEbook]);
    return newEbook;
  };

  const updateEbook = (id, ebookData) => {
    setEbooks(prev => prev.map(ebook => ebook.id === id ? { ...ebook, ...ebookData } : ebook));
  };

  const deleteEbook = (id) => {
    setEbooks(prev => prev.filter(ebook => ebook.id !== id));
  };

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: jobData.status || 'Active'
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  };

  const updateJob = (id, jobData) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, ...jobData } : job));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const addSubscription = (subData) => {
    const newSub = {
      ...subData,
      id: Date.now().toString(),
      status: subData.status || 'Active'
    };
    setSubscriptions(prev => [...prev, newSub]);
    return newSub;
  };

  const updateSubscription = (id, subData) => {
    setSubscriptions(prev => prev.map(sub => sub.id === id ? { ...sub, ...subData } : sub));
  };

  const deleteSubscription = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const addSlider = (sliderData) => {
    const newSlider = {
      ...sliderData,
      id: Date.now().toString()
    };
    setSliders(prev => [...prev, newSlider]);
    return newSlider;
  };

  const updateSlider = (id, sliderData) => {
    setSliders(prev => prev.map(slider => slider.id === id ? { ...slider, ...sliderData } : slider));
  };

  const deleteSlider = (id) => {
    setSliders(prev => prev.filter(slider => slider.id !== id));
  };

  // Shorts CRUD
  const addShort = (shortData) => {
    const newShort = {
      ...shortData,
      id: Date.now().toString(),
      likes: 0,
      shares: 0,
      comments: []
    };
    setShorts(prev => [...prev, newShort]);
    return newShort;
  };

  const updateShort = (id, shortData) => {
    setShorts(prev => prev.map(short => short.id === id ? { ...short, ...shortData } : short));
  };

  const deleteShort = (id) => {
    setShorts(prev => prev.filter(short => short.id !== id));
  };

  const replyToComment = (shortId, commentId, replyText) => {
    setShorts(prev => prev.map(short => {
      if (short.id === shortId) {
        return {
          ...short,
          comments: short.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), { 
                  id: Date.now().toString(), 
                  user: 'Admin', 
                  text: replyText, 
                  time: 'Just now' 
                }]
              };
            }
            return comment;
          })
        };
      }
      return short;
    }));
  };

  // --- Quizzes Logic ---
  const [quizzes, setQuizzes] = useState([
    {
       id: '1',
       title: 'React.js Mastery: Hooks & Components',
       quizCode: 'REACT-ADV-001',
       description: 'Deep dive into React core concepts including Hooks, Context API, Redux patterns, and Performance optimization techniques.',
       duration: '45',
       points: '5',
       totalQuestions: 20,
       level: 'Advanced',
       status: 'Active',
       questions: [
           { id: 'q1', question: 'Which hook should be used for data fetching?', options: ['useEffect', 'useMemo', 'useState', 'useRef'], correctOption: 0 },
           { id: 'q2', question: 'What is the Virtual DOM?', options: ['Direct DOM manipulation', 'A lightweight copy of the DOM', 'A brower plugin', 'None of the above'], correctOption: 1 },
           { id: 'q3', question: 'How do you prevent re-renders in functional components?', options: ['React.memo', 'shouldComponentUpdate', 'PureComponent', 'All of the above'], correctOption: 0 },
           { id: 'q4', question: 'What is the purpose of useReducer?', options: ['Managing string state', 'Complex state logic', 'Routing', 'API calls'], correctOption: 1 },
           { id: 'q5', question: 'Prop drilling can be solved by?', options: ['Context API', 'Redux', 'Zustand', 'All of the above'], correctOption: 3 },
           { id: 'q6', question: 'What does useRef return?', options: ['A mutable object', 'A function', 'A boolean', 'Undefined'], correctOption: 0 },
           { id: 'q7', question: 'Key props in lists help React to?', options: ['Style elements', 'Identify changed items', 'Count items', 'None'], correctOption: 1 },
           { id: 'q8', question: 'useEffect with empty dependency array runs?', options: ['Every render', 'Once on mount', 'On unmount', 'Never'], correctOption: 1 },
           { id: 'q9', question: 'What is JSX?', options: ['Java XML', 'JavaScript XML', 'JSON XML', 'Java Syntax Extension'], correctOption: 1 },
           { id: 'q10', question: 'Lazy loading in React is done using?', options: ['React.lazy', 'React.load', 'React.defer', 'React.async'], correctOption: 0 },
           { id: 'q11', question: 'Higher Order Components are?', options: ['Functions returning components', 'Components returning functions', 'API calls', 'State managers'], correctOption: 0 },
           { id: 'q12', question: 'Controlled components use?', options: ['State', 'Refs', 'DOM', 'Globals'], correctOption: 0 },
           { id: 'q13', question: 'Which lifecycle method is replaced by useEffect?', options: ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'All of the above'], correctOption: 3 },
           { id: 'q14', question: 'What is a Portal in React?', options: ['A way to render children outside parent DOM', 'A data tunnel', 'A routing tool', 'A state tool'], correctOption: 0 },
           { id: 'q15', question: 'Error Boundaries catch errors in?', options: ['Rendering', 'Event handlers', 'Async code', 'Server side'], correctOption: 0 },
           { id: 'q16', question: 'Does React use one-way or two-way data binding?', options: ['One-way', 'Two-way', 'Both', 'None'], correctOption: 0 },
           { id: 'q17', question: 'What is the strict mode?', options: ['Checks for potential problems', 'Minifies code', 'Enforces types', 'Runs faster'], correctOption: 0 },
           { id: 'q18', question: 'What is hydration?', options: ['Attaching listeners to server HTML', 'Drinking water', 'Loading CSS', 'Fetching data'], correctOption: 0 },
           { id: 'q19', question: 'useCallback returns?', options: ['Memoized value', 'Memoized function', 'State', 'Ref'], correctOption: 1 },
           { id: 'q20', question: 'What package is used for routing?', options: ['react-router-dom', 'react-route', 'router-js', 'react-nav'], correctOption: 0 }
       ],
       attempts: [
          { studentId: '2', studentName: 'Riya Singh', date: '2023-12-01', marks: 95, totalMarks: 100, status: 'Pass', answers: [] },
          { studentId: '3', studentName: 'Rahul Sharma', date: '2023-12-02', marks: 40, totalMarks: 100, status: 'Fail', answers: [] },
          { studentId: '4', studentName: 'Sneha Patel', date: '2023-12-05', marks: 85, totalMarks: 100, status: 'Pass', answers: [] },
          { studentId: '5', studentName: 'Vikram Mehta', date: '2023-12-06', marks: 30, totalMarks: 100, status: 'Fail', answers: [] },
          { studentId: '6', studentName: 'Anjali Gupta', date: '2023-12-07', marks: 100, totalMarks: 100, status: 'Pass', answers: [] }
      ]
    },
    {
       id: '2',
       title: 'Python for Data Science Basics',
       quizCode: 'PY-DS-101',
       description: 'Test your understanding of Python lists, dictionaries, pandas basics and numpy arrays.',
       duration: '30',
       points: '5',
       totalQuestions: 10,
       level: 'Intermediate',
       status: 'Active',
       questions: [
           { id: 'q1', question: 'Which library is used for data manipulation?', options: ['Pandas', 'Numpy', 'Matplotlib', 'Seaborn'], correctOption: 0 },
           { id: 'q2', question: 'Mutable data type in Python?', options: ['List', 'Tuple', 'String', 'Int'], correctOption: 0 },
           { id: 'q3', question: 'Keyword to define a function?', options: ['func', 'def', 'function', 'lambda'], correctOption: 1 },
           { id: 'q4', question: 'Output of 2 ** 3?', options: ['6', '8', '9', '5'], correctOption: 1 },
           { id: 'q5', question: 'How to install packages?', options: ['pip install', 'npm install', 'apt-get', 'brew'], correctOption: 0 },
           { id: 'q6', question: 'Comment character in Python?', options: ['//', '#', '/*', '<!--'], correctOption: 1 },
           { id: 'q7', question: 'Boolean values are?', options: ['True/False', 'true/false', '1/0', 'Yes/No'], correctOption: 0 },
           { id: 'q8', question: 'Data structure for unique items?', options: ['List', 'Set', 'Dict', 'Tuple'], correctOption: 1 },
           { id: 'q9', question: 'String slicing [::-1] does?', options: ['Reverses string', 'Copies string', 'Deletes string', 'Nothing'], correctOption: 0 },
           { id: 'q10', question: 'File mode "w" stands for?', options: ['Write', 'Read', 'Watch', 'Wait'], correctOption: 0 }
       ],
       attempts: [
           { studentId: '3', studentName: 'Rahul Sharma', date: '2023-12-10', marks: 45, totalMarks: 50, status: 'Pass', answers: [] }
       ]
    },
    {
        id: '3',
        title: 'UI/UX Design Principles',
        quizCode: 'DES-101',
        description: 'Covers color theory, typography, spacing, and user research basics.',
        duration: '20',
        points: '5',
        totalQuestions: 8,
        level: 'Beginner',
        status: 'Active',
        questions: Array.from({length: 8}, (_, i) => ({ id: `q${i}`, question: `Design Question ${i+1}`, options: ['A','B','C','D'], correctOption: 0 })),
        attempts: []
    },
    {
        id: '4',
        title: 'Data Structures & Algorithms',
        quizCode: 'DSA-HARD-001',
        description: 'Linked Lists, Trees, Graphs, Sorting and Search algorithms.',
        duration: '60',
        points: '10',
        totalQuestions: 15,
        level: 'Hard',
        status: 'Active',
        questions: Array.from({length: 15}, (_, i) => ({ id: `q${i}`, question: `DSA Question ${i+1}`, options: ['A','B','C','D'], correctOption: 0 })),
        attempts: [
             { studentId: '6', studentName: 'Anjali Gupta', date: '2023-12-15', marks: 140, totalMarks: 150, status: 'Pass', answers: [] }
        ]
    },
    {
        id: '5',
        title: 'Node.js & Express Backend',
        quizCode: 'NODE-BE-202',
        description: 'Server side programming with Node.js, middleware, routing and database integration.',
        duration: '40',
        points: '5',
        totalQuestions: 12,
        level: 'Intermediate',
        status: 'Disabled',
        questions: Array.from({length: 12}, (_, i) => ({ id: `q${i}`, question: `Node Question ${i+1}`, options: ['A','B','C','D'], correctOption: 0 })),
        attempts: []
    }
  ]);

  const addQuiz = (quiz) => {
    setQuizzes([...quizzes, { ...quiz, id: Date.now().toString() }]);
  };

  const updateQuiz = (id, updatedQuiz) => {
    setQuizzes(quizzes.map(q => q.id === id ? { ...q, ...updatedQuiz } : q));
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  // --- Referrals Logic ---
  const [referrals, setReferrals] = useState([
    {
      id: '1',
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
      college: 'IIT Bombay',
      course: 'B.Tech CSE',
      referralCode: 'DCT89289838829'
    },
    {
      id: '2',
      fullName: 'Priya Verma',
      email: 'priya.verma@example.com',
      phone: '8765432109',
      college: 'NIT Trichy',
      course: 'MCA',
      referralCode: 'DCT89289838830'
    }
  ]);

  const updateReferral = (id, updatedData) => {
    setReferrals(prev => prev.map(ref => ref.id === id ? { ...ref, ...updatedData } : ref));
  };

  const deleteReferral = (id) => {
    setReferrals(prev => prev.filter(ref => ref.id !== id));
  };

  return (
    <DataContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      users,
      addUser,
      updateUser,
      deleteUser,
      ebookCategories,
      addEbookCategory,
      updateEbookCategory,
      deleteEbookCategory,
      ebooks,
      addEbook,
      updateEbook,
      deleteEbook,
      jobs,
      addJob,
      updateJob,
      deleteJob,
      subscriptions,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      sliders,
      addSlider,
      updateSlider,
      deleteSlider,
      shorts,
      addShort,
      updateShort,
      deleteShort,
      replyToComment,
      quizzes,
      addQuiz,
      updateQuiz,
      deleteQuiz,
      referrals,
      updateReferral,
      deleteReferral
    }}>
      {children}
    </DataContext.Provider>
  );
};
