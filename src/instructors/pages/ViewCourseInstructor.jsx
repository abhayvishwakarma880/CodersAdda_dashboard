import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Lock, ChevronDown, CheckCircle, Monitor, Star, Users, Clock, Eye, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

function ViewCourseInstructor() {
  const { colors } = useTheme();
  const { courses, courseEnrollments } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [activeTab, setActiveTab] = useState('Curriculum');

  const enrolledStudents = courseEnrollments.filter(ce => ce.courseName === course?.title);

  useEffect(() => {
    const found = courses.find(c => c.id === id);
    if (found) {
      setCourse(found);
      if (found.curriculum?.length > 0) {
        const initialOpen = {};
        found.curriculum.forEach(s => initialOpen[s.id] = true);
        setOpenSections(initialOpen);
      }
    } else {
      navigate('/instructor-dashboard/my-courses');
    }
  }, [id, courses, navigate]);

  if (!course) return null;

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* Top Banner */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10" style={{ backgroundColor: colors.background, borderColor: colors.accent + '20' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/instructor-dashboard/my-courses')} className="p-2 rounded hover:bg-black/5 transition-all cursor-pointer">
             <ArrowLeft size={18} style={{ color: colors.text }} />
          </button>
          <div>
            <h1 className="text-base font-bold" style={{ color: colors.text }}>{course.title}</h1>
            <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{course.category} • {course.technology}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          
          <div className="lg:col-span-8 p-4 md:p-6 space-y-8 border-r" style={{ borderColor: colors.accent + '10' }}>
            
            <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b" style={{ borderColor: colors.accent + '05' }}>
                <div className="w-48 h-32 rounded overflow-hidden border flex-shrink-0" style={{ borderColor: colors.accent + '15' }}>
                    {course.image ? (
                        <img src={course.image} className="w-full h-full object-cover" alt="" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                            <Monitor size={32} />
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                         <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-primary/10" style={{ color: colors.primary }}>{course.priceType}</span>
                         {course.badge && course.badge !== 'Normal' && (
                             <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500 text-white">{course.badge}</span>
                         )}
                         <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-gray-100">{course.duration}</span>
                    </div>
                    <h2 className="text-lg font-bold" style={{ color: colors.text }}>{course.title}</h2>
                    <p style={{color:colors.text}} className="text-xs font-medium opacity-60 leading-relaxed max-w-2xl">{course.about}</p>
                </div>
            </div>

            <div className="flex border-b" style={{ borderColor: colors.accent + '10' }}>
                {['Curriculum', 'Enrolled Students'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? '' : 'opacity-40 hover:opacity-100'}`}
                        style={{ color: colors.text }}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: colors.primary }}></div>
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'Curriculum' ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.text }}>Course Curriculum</h3>
                    </div>

                    <div className="space-y-3">
                        {course.curriculum?.map((section, sIdx) => (
                            <div key={section.id} className="rounded border" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
                                <div className="p-3 flex items-center justify-between border-b" style={{ backgroundColor: colors.accent + '05', borderColor: colors.accent + '05' }}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black opacity-30">#{sIdx + 1}</span>
                                        <span className="font-bold text-xs" style={{ color: colors.text }}>{section.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => toggleSection(section.id)} className="p-1 cursor-pointer opacity-40">
                                            <ChevronDown size={16} className={`transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                {openSections[section.id] && (
                                    <div className="divide-y" style={{ borderColor: colors.accent + '05' }}>
                                        {section.lessons.length > 0 ? section.lessons.map((lesson) => (
                                            <div key={lesson.id} className="flex items-center justify-between p-3 transition-all hover:bg-black/[0.01]">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-6 h-6 rounded flex items-center justify-center bg-black/[0.03] border shadow-sm shrink-0" style={{ borderColor: colors.accent + '10' }}>
                                                        {lesson.lectureSrNo ? (
                                                            <span className="text-[10px] font-black" style={{ color: colors.primary }}>{lesson.lectureSrNo}</span>
                                                        ) : (
                                                            <div className="opacity-30">
                                                                {lesson.isLocked ? <Lock size={12} /> : <Play size={12} />}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h5 className="text-[11px] font-extrabold truncate" style={{ color: colors.text }}>{lesson.title}</h5>
                                                        <div className="flex items-center gap-2 opacity-40">
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={8} />
                                                                <span className="text-[9px] font-bold">{lesson.duration || '--:--'}</span>
                                                            </div>
                                                            {lesson.pdfUrl && (
                                                                <div className="flex items-center gap-1 text-red-500">
                                                                    <FileText size={8} />
                                                                    <span className="text-[8px] font-black uppercase">PDF</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                    <button onClick={() => navigate(`/instructor-dashboard/my-courses/view/${course.id}/lecture/${lesson.id}`)} className="p-1.5 cursor-pointer text-primary transition-all hover:bg-primary/10 rounded">
                                                        <Eye size={14} />
                                                    </button>
                                            </div>
                                        )) : (
                                            <div className="p-4 text-center opacity-20 text-[9px] font-bold italic uppercase tracking-wider">Empty Topic</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="rounded border overflow-hidden" style={{ borderColor: colors.accent + '10' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-[10px] font-black uppercase tracking-widest opacity-40" style={{ borderColor: colors.accent + '10', color: colors.text }}>
                                    <th className="p-4">Student Name</th>
                                    <th className="p-4">Enroll Date</th>
                                    <th className="p-4">Amount Paid</th>
                                    <th className="p-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ borderColor: colors.accent + '05' }}>
                                {enrolledStudents.length > 0 ? enrolledStudents.map((student, i) => (
                                    <tr key={i} className="text-sm transition-colors hover:bg-black/[0.02]" style={{ color: colors.text }}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs" style={{ color: colors.primary }}>
                                                    {student.userName?.charAt(0) || 'N/A'}
                                                </div>
                                                <span className="font-bold">{student.userName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 opacity-60 text-xs font-medium">{student.date || '31/12/2023'}</td>
                                        <td className="p-4 font-black">₹{student.price || 0}</td>
                                        <td className="p-4 text-right">
                                            <span className="px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center opacity-30 italic text-xs uppercase tracking-widest font-bold">No students enrolled yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
          </div>

          <div className="lg:col-span-4 p-8 space-y-8 bg-black/[0.01]">
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[2px] opacity-40">Learning Outcomes</h3>
                    <div className="space-y-3">
                        {course.whatYouWillLearn?.map((item, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded border bg-white dark:bg-black/20" style={{ borderColor: colors.accent + '10' }}>
                                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                                <span className="text-xs font-semibold opacity-70" style={{ color: colors.text }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded border space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Enrollment Fee</p>
                        <p className="text-3xl font-black" style={{ color: colors.text }}>
                            {course.priceType === 'Free' ? 'FREE' : `₹${course.Cprice}`}
                        </p>
                    </div>
                </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewCourseInstructor;
