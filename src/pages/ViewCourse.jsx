import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Play, Lock, ChevronDown, CheckCircle, Monitor, Star, Users, Clock, Plus, Eye, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Toggle from '../components/ui/Toggle';

function ViewCourse() {
  const { colors } = useTheme();
  const { courses, updateCourse } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});

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
      navigate('/dashboard/courses');
    }
  }, [id, courses, navigate]);

  if (!course) return null;

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleAddTopic = () => {
    Swal.fire({
      title: 'Add New Topic',
      input: 'text',
      inputPlaceholder: 'Topic Name (e.g. Getting Started)',
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: colors.primary,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newTopic = {
          id: Date.now().toString(),
          title: result.value,
          lessons: []
        };
        const updatedCurriculum = [...(course.curriculum || []), newTopic];
        updateCourse(course.id, { ...course, curriculum: updatedCurriculum });
        toast.success("Topic added successfully");
        setOpenSections(prev => ({ ...prev, [newTopic.id]: true }));
      }
    });
  };

  const handleDeleteTopic = (sectionId) => {
    Swal.fire({
      title: 'Delete Topic?',
      text: "All lectures under this topic will be removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCurriculum = course.curriculum.filter(s => s.id !== sectionId);
        updateCourse(course.id, { ...course, curriculum: updatedCurriculum });
        toast.success("Topic removed");
      }
    });
  };

  const handleDeleteLecture = (sectionId, lessonId) => {
    Swal.fire({
      title: 'Remove Lecture?',
      text: "This lesson will be permanently removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCurriculum = course.curriculum.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              lessons: section.lessons.filter(l => l.id !== lessonId)
            };
          }
          return section;
        });
        updateCourse(course.id, { ...course, curriculum: updatedCurriculum });
        toast.success("Lecture removed");
      }
    });
  };

  const toggleLectureStatus = (sectionId, lessonId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
    const updatedCurriculum = course.curriculum.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(l => l.id === lessonId ? { ...l, status: newStatus } : l)
        };
      }
      return section;
    });
    updateCourse(course.id, { ...course, curriculum: updatedCurriculum });
    toast.info(`Lecture ${newStatus}`);
  };

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* Top Banner */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10" style={{ backgroundColor: colors.background, borderColor: colors.accent + '20' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/courses')} className="p-2 rounded hover:bg-black/5 transition-all cursor-pointer">
             <ArrowLeft size={18} style={{ color: colors.text }} />
          </button>
          <div>
            <h1 className="text-base font-bold" style={{ color: colors.text }}>{course.title}</h1>
            <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{course.category} • {course.technology}</p>
          </div>
        </div>
        <button 
            onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)}
            className="px-4 cursor-pointer py-2 rounded font-bold text-[10px] uppercase tracking-wider border transition-all active:scale-95"
            style={{ borderColor: colors.accent + '30', color: colors.text }}
        >
            Edit Course
        </button>
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
                         <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-gray-100">{course.duration}</span>
                    </div>
                    <h2 className="text-lg font-bold" style={{ color: colors.text }}>{course.title}</h2>
                    <p className="text-xs font-medium opacity-60 leading-relaxed max-w-2xl">{course.about}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.text }}>Course Curriculum</h3>
                    <button 
                        onClick={handleAddTopic}
                        className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95 text-white"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <Plus size={14} /> Add Topic
                    </button>
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
                                    <button 
                                        onClick={() => navigate(`/dashboard/courses/view/${course.id}/add-lecture?sectionId=${section.id}`)}
                                        className="px-2 cursor-pointer py-1 rounded text-[9px] font-bold bg-primary/10 flex items-center gap-1"
                                        style={{ color: colors.primary }}
                                    >
                                        <Plus size={12} /> Add Lecture
                                    </button>
                                    <button onClick={() => handleDeleteTopic(section.id)} className="p-1 text-red-500 cursor-pointer hover:bg-red-50 rounded">
                                        <Trash2 size={14} />
                                    </button>
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
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <Toggle active={lesson.status === 'Active'} onClick={() => toggleLectureStatus(section.id, lesson.id, lesson.status)} />
                                                    <span className={`text-[8px] font-black uppercase tracking-wider ${lesson.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {lesson.status || 'Active'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <button onClick={() => navigate(`/dashboard/courses/view/${course.id}/lecture/${lesson.id}`)} className="p-1.5 cursor-pointer text-primary transition-all hover:bg-primary/10 rounded">
                                                        <Eye size={14} />
                                                    </button>
                                                    <button onClick={() => navigate(`/dashboard/courses/view/${course.id}/lecture/edit/${lesson.id}`)} className="p-1.5 cursor-pointer text-blue-500 transition-all hover:bg-blue-500/10 rounded">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button onClick={() => handleDeleteLecture(section.id, lesson.id)} className="p-1.5 cursor-pointer text-red-500 transition-all hover:bg-red-500/10 rounded">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
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
                            {course.priceType === 'Free' ? 'FREE' : `₹${course.price}`}
                        </p>
                    </div>
                </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
