import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Play, Info, Clock, Video, Lock, CheckCircle, ChevronRight, FileText } from 'lucide-react';

function ViewLectureInstructor() {
  const { colors } = useTheme();
  const { courses } = useData();
  const { id, lectureId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      let foundLecture = null;
      foundCourse.curriculum?.forEach(section => {
        const l = section.lessons?.find(ls => ls.id === lectureId);
        if (l) foundLecture = l;
      });
      if (foundLecture) {
        setLecture(foundLecture);
      } else {
        navigate(`/instructor-dashboard/my-courses/view/${id}`);
      }
    } else {
      navigate('/instructor-dashboard/my-courses');
    }
  }, [id, lectureId, courses, navigate]);

  if (!course || !lecture) return null;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ backgroundColor: colors.background, borderColor: colors.accent + '20' }}>
         <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 cursor-pointer rounded-lg hover:bg-black/5 transition-all">
                <ArrowLeft size={20} style={{ color: colors.text }} />
            </button>
            <div className="flex flex-col">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span>{course.category}</span>
                  <ChevronRight size={12} />
                  <span>{course.title}</span>
               </div>
               <h1 className="text-xl font-black mt-1" style={{ color: colors.text }}>
                  {lecture.lectureSrNo && <span className="mr-2 opacity-30">#{lecture.lectureSrNo}</span>}
                  {lecture.title}
               </h1>
            </div>
         </div>
         <div className="flex items-center gap-6 pr-4">
            <div className="flex items-center gap-2">
                <Clock size={16} className="opacity-40" />
                <span className="text-xs font-bold opacity-70">{lecture.duration || '00:00'}</span>
            </div>
            {lecture.isLocked ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    <Lock size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Premium</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                    <CheckCircle size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Free</span>
                </div>
            )}
         </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8">
         <div className="max-w-5xl mx-auto">
            {/* Player */}
            <div className="w-full aspect-video rounded-3xl bg-black shadow-2xl overflow-hidden relative group">
                {lecture.videoUrl ? (
                    <video 
                        src={lecture.videoUrl} 
                        controls 
                        className="w-full h-full object-contain"
                        poster={lecture.thumbnailUrl || course.image}
                    ></video>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
                        <Video size={80} className="mb-4 animate-pulse" />
                        <p className="font-bold text-lg">Lecture Video Processing...</p>
                        <p className="text-sm opacity-50 mt-2">File: {lecture.videoFileName || 'Direct Stream'}</p>
                    </div>
                )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[2px] opacity-40 mb-4">Description</h3>
                        <p className="text-sm font-semibold opacity-60 leading-relaxed whitespace-pre-wrap" style={{ color: colors.text }}>
                            {lecture.description || 'No description provided for this lecture.'}
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl border border-dashed text-center md:text-left" style={{ borderColor: colors.accent + '20' }}>
                        <Info size={24} className="mb-4 opacity-20 mx-auto md:mx-0" />
                        <h4 className="text-sm font-bold mb-4" style={{ color: colors.text }}>Instructor Insight</h4>
                        <p className="text-xs font-medium opacity-50 leading-relaxed" style={{ color: colors.text }}>
                            This view allows you to preview how the lecture appears to your students. 
                            Regularly reviewing your content ensures the best learning experience.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {lecture.pdfUrl && (
                        <div className="p-6 rounded-3xl border" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
                            <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-4" style={{ color: colors.text }}>Resources</h3>
                            <a 
                                href={lecture.pdfUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl border hover:bg-black/5 transition-all group"
                                style={{ borderColor: colors.accent + '20' }}
                            >
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                                    <FileText size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold truncate" style={{ color: colors.text }}>{lecture.pdfFileName || 'PDF Notes'}</p>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default ViewLectureInstructor;
