import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('dashboard_categories');
    return saved ? JSON.parse(saved) : [];
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('dashboard_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('dashboard_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Abhay Vishwakarma', email: 'vabhay9651@gmail.com', number: '9651429000', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', role: 'Admin' },
      { id: '2', name: 'Alok Singh', email: 'alok@example.com', number: '8877665544', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', role: 'Student' },
      { id: '3', name: 'Priya Sharma', email: 'priya@example.com', number: '9911223344', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'Instructor' },
      { id: '4', name: 'Rahul Kumar', email: 'rahul@example.com', number: '7766554433', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', role: 'Student' },
      { id: '5', name: 'Anjali Gupta', email: 'anjali@example.com', number: '8800112233', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Instructor' }
    ];
  });

  const [ebookCategories, setEbookCategories] = useState(() => {
    const saved = localStorage.getItem('dashboard_ebook_categories');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'ec1', name: 'Programming', status: 'Active' },
      { id: 'ec2', name: 'Design', status: 'Active' },
      { id: 'ec3', name: 'Science', status: 'Active' }
    ];
  });

  const [ebooks, setEbooks] = useState(() => {
    const saved = localStorage.getItem('dashboard_ebooks');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'eb1', title: 'Flutter Complete Guide', author: 'Dr. Angela Yu', category: 'Programming', priceType: 'Free', price: '', fileSize: '2.4 MB', downloadUrl: 'https://example.com/flutter.pdf', status: 'Active' },
      { id: 'eb2', title: 'JavaScript Basics', author: 'Kyle Simpson', category: 'Programming', priceType: 'Free', price: '', fileSize: '1.8 MB', downloadUrl: 'https://example.com/js.pdf', status: 'Active' },
      { id: 'eb3', title: 'UI/UX Design Principles', author: 'Steve Krug', category: 'Design', priceType: 'Paid', price: '499', fileSize: '3.2 MB', downloadUrl: 'https://example.com/design.pdf', status: 'Active' }
    ];
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('dashboard_jobs');
    if (saved) return JSON.parse(saved);
    return [
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
    ];
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('dashboard_subscriptions');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', planType: 'Mobile', duration: '1 Month', price: '299', benefits: ['Ad-free experience', '1 Device access', '720p resolution'], status: 'Active' },
      { id: '2', planType: 'Super', duration: '1 Year', price: '1499', benefits: ['Ad-free experience', '2 Devices access', '1080p resolution', 'New releases included'], status: 'Active' },
      { id: '3', planType: 'Premium', duration: '1 Year', price: '1999', benefits: ['Ad-free experience', '4 Devices access', '4K resolution', 'New releases included', 'Offline downloads'], status: 'Active' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dashboard_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('dashboard_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('dashboard_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('dashboard_ebook_categories', JSON.stringify(ebookCategories));
  }, [ebookCategories]);

  useEffect(() => {
    localStorage.setItem('dashboard_ebooks', JSON.stringify(ebooks));
  }, [ebooks]);

  useEffect(() => {
    localStorage.setItem('dashboard_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('dashboard_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

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
      deleteSubscription
    }}>
      {children}
    </DataContext.Provider>
  );
};
