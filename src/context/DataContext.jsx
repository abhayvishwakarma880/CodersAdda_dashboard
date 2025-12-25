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
      { id: '5', name: 'Anjali Gupta', email: 'anjali@example.com', number: '8800112233', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Instructor' },
      { id: '6', name: 'Anjali Gupta', email: 'anjali@example.com', number: '8800112233', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Instructor' },
      { id: '7', name: 'Anjali Gupta', email: 'anjali@example.com', number: '8800112233', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Instructor' },
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

  const addCategory = (name) => {
    const newCategory = {
      id: Date.now().toString(),
      name: name.trim(),
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, name) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: name.trim() } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Implementation note: We might want to handle what happens to courses in this category
  };

  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
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
      deleteUser
    }}>
      {children}
    </DataContext.Provider>
  );
};
