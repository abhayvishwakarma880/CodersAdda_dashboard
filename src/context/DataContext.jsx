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
    { id: '1', name: 'Abhay Vishwakarma', email: 'vabhay9651@gmail.com', number: '9651429000', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', role: 'Admin' },
    { id: '2', name: 'Alok Singh', email: 'alok@example.com', number: '8877665544', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', role: 'Student' },
    { id: '3', name: 'Priya Sharma', email: 'priya@example.com', number: '9911223344', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'Instructor' },
    { id: '4', name: 'Rahul Kumar', email: 'rahul@example.com', number: '7766554433', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', role: 'Student' },
    { id: '5', name: 'Anjali Gupta', email: 'anjali@example.com', number: '8800112233', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Instructor' }
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
    { id: '1', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop', title: 'Welcome to CodersAdda' },
    { id: '2', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop', title: 'Learn & Grow Together' },
    { id: '3', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=400&fit=crop', title: 'Build Your Future' }
  ]);

  const [shorts, setShorts] = useState([
    { 
      id: '1', 
      instructor: 'Abhay Vishwakarma', 
      description: 'Learn React Hooks in 60 Seconds! 🚀 #ReactJS #Coding', 
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
      likes: 1250, 
      shares: 45,
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
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id, userData) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...userData } : user));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
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

  const [quizzes, setQuizzes] = useState([
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Test your basic knowledge of React concepts.',
      duration: '15',
      points: 5,
      totalQuestions: 5,
      level: 'Beginner',
      questions: [
        {
          id: 'q1',
          question: 'What is the Virtual DOM?',
          options: ['A direct copy of the DOM', 'A lightweight copy', 'A heavy XML', 'None'],
          correctOption: 1
        }
      ]
    }
  ]);

  const addQuiz = (quizData) => {
    const newQuiz = { ...quizData, id: Date.now().toString() };
    setQuizzes([...quizzes, newQuiz]);
  };

  const updateQuiz = (id, quizData) => {
    setQuizzes(quizzes.map(q => q.id === id ? { ...q, ...quizData } : q));
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
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
      deleteQuiz
    }}>
      {children}
    </DataContext.Provider>
  );
};
