import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Users, Clock, Play, Lock, ChevronDown, BookOpen, Edit, Monitor, Award, CheckCircle, IndianRupee } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

function ViewCourse() {
  const { colors } = useTheme();
  const { courses } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const found = courses.find(c => c.id === id);
    if (found) {
      setCourse({
        ...found,
        priceType: found.priceType || 'Free',
        price: found.price || ''
      });
      if (found.curriculum?.length > 0) {
        setOpenSections({ [found.curriculum[0].id]: true });
      }
    } else {
      navigate('/dashboard/courses');
    }
  }, [id, courses, navigate]);

  if (!course) return null;

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const headerStyle = { color: colors.text, borderBottom: `1px solid ${colors.accent}20` };
  const cardStyle = { backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' };

  return (
    <div className="max-w-6xl mx-auto pb-20 p-2 md:p-6 transition-all duration-300">
      {/* Simple Professional Header */}
      <div className="flex items-center justify-between mb-8 pb-4" style={headerStyle}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/courses')}
            className="p-2 rounded-lg transition-all cursor-pointer"
            style={{ color: colors.textSecondary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.accent + '15'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold" style={{ color: colors.text }}>Course Preview</h2>
            <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>Checking: {course.title}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 shadow-sm"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Edit size={16} /> Edit Content
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Info Card */}
          <div className="rounded-2xl border overflow-hidden shadow-sm" style={cardStyle}>
             <div className="h-64 sm:h-80 relative bg-gray-100">
                {course.image ? (
                  <img src={course.image} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-10">
                    <Monitor size={80} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                   <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {course.category}
                      </span>
                      {course.priceType === 'Free' ? (
                        <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500 text-white flex items-center gap-1 shadow-sm">
                           <CheckCircle size={12} /> Free
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white flex items-center gap-1 shadow-sm">
                           <Lock size={12} /> {course.price ? `₹${course.price}` : 'Premium'}
                        </span>
                      )}
                   </div>
                   <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
                   <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-xs">
                      <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-current" /> <span>{course.rating}</span></div>
                      <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> <span>{course.studentsCount} Students</span></div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> <span>{course.duration}</span></div>
                   </div>
                </div>
             </div>
             
             <div className="p-6 md:p-8 space-y-8">
                <section>
                   <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>About this course</h3>
                   <p className="text-sm leading-relaxed font-medium opacity-70" style={{ color: colors.textSecondary }}>{course.about}</p>
                </section>

                <section>
                   <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>What you'll learn</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn?.map((item, i) => (
                         <div key={i} className="flex gap-3 p-4 rounded-xl border transition-all" style={{ borderColor: colors.accent + '15' }}>
                            <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: colors.primary }} />
                            <span className="text-xs font-medium opacity-70" style={{ color: colors.text }}>{item}</span>
                         </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          {/* Curriculum */}
          <section>
             <h3 className="text-lg font-semibold mb-4 px-2" style={{ color: colors.text }}>Course Curriculum</h3>
             <div className="space-y-3">
                {course.curriculum?.map((section, idx) => {
                   const isOpen = openSections[section.id];
                   return (
                      <div key={section.id} className="rounded-xl border overflow-hidden transition-all duration-200" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                         <button 
                            onClick={() => toggleSection(section.id)}
                            className="w-full p-4 flex items-center justify-between transition-all"
                            style={{ backgroundColor: colors.accent + '05' }}
                         >
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-bold shrink-0" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                                 {idx + 1}
                               </div>
                               <div className="text-left min-w-0">
                                  <h4 className="font-semibold text-xs md:text-sm truncate pr-2" style={{ color: colors.text }}>{section.title}</h4>
                                  <span style={{ color: colors.text }} className="text-[9px] md:text-[10px] font-medium opacity-50 uppercase tracking-wider">{section.lessons.length} Units</span>
                               </div>
                            </div>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: colors.primary }} />
                         </button>
                         
                         <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-2 border-t" style={{ borderColor: colors.accent + '10' }}>
                               {section.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-opacity-5 transition-all" 
                                       style={{ backgroundColor: colors.background }}
                                       onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accent + '05'}
                                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.background}>
                                     <div className="flex items-center gap-4">
                                         <div className={`p-2 rounded-lg shrink-0 ${lesson.isLocked ? 'opacity-30' : 'bg-opacity-10'}`} style={{ backgroundColor: !lesson.isLocked ? colors.primary + '15' : 'transparent', color: !lesson.isLocked ? colors.primary : colors.textSecondary }}>
                                            {lesson.isLocked ? <Lock size={12} /> : <Play size={12} />}
                                         </div>
                                         <div className="min-w-0">
                                            <span className="font-medium text-[11px] md:text-xs block truncate pr-2" style={{ color: colors.text }}>{lesson.title}</span>
                                            <span style={{ color: colors.text }} className="text-[9px] md:text-[10px] font-medium opacity-40">{lesson.duration || '00:00'}</span>
                                         </div>
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   );
                })}
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
           <div className="p-6 rounded-2xl border sticky top-24 shadow-sm" style={cardStyle}>
              <h3 className="text-sm font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
                <Monitor size={16} /> Course Preview
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <span style={{ color: colors.text }} className="text-[10px] font-bold uppercase opacity-40 tracking-wider block mb-1">Pricing</span>
                    <div className="flex items-baseline gap-1">
                       {course.priceType === 'Free' ? (
                          <span className="text-3xl font-bold text-green-500">Free</span>
                       ) : (
                          <>
                             <IndianRupee size={24} style={{ color: colors.text }} />
                             <span className="text-3xl font-bold" style={{ color: colors.text }}>{course.price || '0'}</span>
                          </>
                       )}
                    </div>
                 </div>

                 <div className="pt-6 border-t space-y-3" style={{ borderColor: colors.accent + '10' }}>
                    <div className="flex justify-between items-center text-xs">
                       <span style={{ color: colors.primary }} className="font-medium opacity-40">Technology</span>
                       <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>{course.technology}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span style={{ color: colors.primary }} className="font-medium opacity-40">Access</span>
                       <span className="font-semibold" style={{ color: colors.text }}>Lifetime</span>
                    </div>
                 </div>

                 {/* <button className="w-full py-4 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95" 
                         style={{ backgroundColor: colors.primary, color: colors.background }}>
                    Enrol Now
                 </button> */}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
