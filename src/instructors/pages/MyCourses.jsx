import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { Search, Eye, BookOpen, Users, Clock, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MyCourses() {
  const { colors } = useTheme();
  const { courses, instructors, courseEnrollments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const instructorEmail = localStorage.getItem('instructorEmail') || 'abhay@codersadda.com';
  const instructor = instructors.find(ins => ins.email === instructorEmail) || instructors[0];
  
  const myCourses = courses.filter(c => c.instructor === instructor?.name).filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(course => {
    const enrollments = courseEnrollments.filter(ce => ce.courseName === course.title);
    return {
      ...course,
      studentCount: enrollments.length
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: colors.text }}>My Courses</h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Manage and monitor your course performance</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
           <input 
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded border outline-none text-xs"
              style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '30', color: colors.text }}
           />
        </div>
      </div>

      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[10px] font-black uppercase tracking-wider opacity-40" style={{ borderColor: colors.accent + '10', color: colors.text }}>
                <th className="p-4">Course Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Students</th>
                <th className="p-4">Lessons</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.length > 0 ? myCourses.map((course) => (
                <tr key={course.id} className="border-b transition-colors hover:bg-black/5" style={{ borderColor: colors.accent + '05', color: colors.text }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden border shrink-0 bg-black/5" style={{ borderColor: colors.accent + '10' }}>
                        {course.image ? (
                          <img src={course.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Monitor size={20} className="m-auto opacity-20" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs truncate leading-tight mb-1">{course.title}</p>
                        <div className="flex items-center gap-2">
                           <span className="px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase bg-primary/10" style={{ color: colors.primary }}>{course.badge}</span>
                           <span className="text-[9px] opacity-40 flex items-center gap-1 font-medium"><Clock size={10} /> {course.duration || '20h'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-black/5" style={{ color: colors.text }}>{course.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="opacity-30" />
                      <span className="text-sm font-black">{course.studentCount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <BookOpen size={14} className="opacity-30" />
                      {course.lessonsCount || 0}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-black text-xs">₹{course.Cprice || 'Free'}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => navigate(`/instructor-dashboard/my-courses/view/${course.id}`)}
                        className="p-2 rounded hover:bg-black/5 text-primary opacity-60 hover:opacity-100 transition-all cursor-pointer border"
                        style={{ borderColor: colors.accent + '10' }}
                        title="View Course"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <p className="font-bold opacity-30 uppercase tracking-widest text-xs">No courses found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
