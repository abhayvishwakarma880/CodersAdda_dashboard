import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Play, Lock, Info, Layout, Award, User, Plus, DollarSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

function EditCourse() {
  const { colors } = useTheme();
  const { categories, courses, updateCourse } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const course = courses.find(c => c.id === id);
    if (course) {
      // Ensure existing courses have pricing fields if they were created before
      setFormData({
        ...course,
        priceType: course.priceType || 'Free',
        price: course.price || ''
      });
    } else {
      navigate('/dashboard/courses');
    }
  }, [id, courses, navigate]);

  if (!formData) return null;

  const handleAddWhatYoullLearn = () => {
    setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, ''] });
  };

  const handleRemoveWhatYoullLearn = (index) => {
    const newList = formData.whatYouWillLearn.filter((_, i) => i !== index);
    setFormData({ ...formData, whatYouWillLearn: newList });
  };

  const handleWhatYoullLearnChange = (index, value) => {
    const newList = [...formData.whatYouWillLearn];
    newList[index] = value;
    setFormData({ ...formData, whatYouWillLearn: newList });
  };

  const handleAddSection = () => {
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        {
          id: Date.now().toString(),
          title: '',
          lessons: [{ id: Date.now().toString() + '-1', title: '', duration: '', isLocked: false }]
        }
      ]
    });
  };

  const handleRemoveSection = (sectionId) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.filter(s => s.id !== sectionId)
    });
  };

  const handleSectionTitleChange = (sectionId, value) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.map(s => s.id === sectionId ? { ...s, title: value } : s)
    });
  };

  const handleAddLesson = (sectionId) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.map(s => 
        s.id === sectionId 
          ? { ...s, lessons: [...s.lessons, { id: Date.now().toString(), title: '', duration: '', isLocked: false }] }
          : s
      )
    });
  };

  const handleRemoveLesson = (sectionId, lessonId) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.map(s => 
        s.id === sectionId ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) } : s
      )
    });
  };

  const handleLessonChange = (sectionId, lessonId, field, value) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.map(s => 
        s.id === sectionId 
          ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l) }
          : s
      )
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(id, formData);
    navigate('/dashboard/courses');
  };

  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '500' };

  return (
    <div className="max-w-4xl mx-auto pb-16 px-4">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/dashboard/courses')}
          className="p-2 rounded-lg transition-all cursor-pointer"
          style={{ color: colors.text }}
          onMouseEnter={(e) => e.target.style.backgroundColor = colors.accent + '20'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold" style={{ color: colors.text }}>Edit Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Settings */}
        <div className="p-6 rounded-xl border space-y-4 shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.primary }}>
            <Info size={18} /> General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label style={labelStyle}>Course Title</label>
              <input 
                type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium transition-all"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Instructor</label>
              <input 
                type="text" required value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium transition-all"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Category</label>
              <select 
                required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none cursor-pointer font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              >
                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Technology</label>
              <input 
                type="text" value={formData.technology} onChange={(e) => setFormData({...formData, technology: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
             <div className="space-y-1">
              <label style={labelStyle}>Duration</label>
              <input 
                type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Total Lessons</label>
              <input 
                type="number" value={formData.lessonsCount} onChange={(e) => setFormData({...formData, lessonsCount: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Rating</label>
              <input 
                type="text" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium transition-all"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Students Enrolled</label>
              <input 
                type="text" value={formData.studentsCount} onChange={(e) => setFormData({...formData, studentsCount: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium transition-all"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
             <div className="space-y-1">
              <label style={labelStyle}>Course Price Type</label>
              <div className="flex gap-2 p-1 rounded-lg border" style={{ borderColor: colors.accent + '20' }}>
                <button 
                  type="button" onClick={() => setFormData({...formData, priceType: 'Free', price: ''})}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${formData.priceType === 'Free' ? 'shadow-sm' : 'opacity-40'}`}
                  style={{ backgroundColor: formData.priceType === 'Free' ? colors.primary : 'transparent', color: formData.priceType === 'Free' ? colors.background : colors.text }}
                >
                  Free
                </button>
                <button 
                  type="button" onClick={() => setFormData({...formData, priceType: 'Paid'})}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${formData.priceType === 'Paid' ? 'shadow-sm' : 'opacity-40'}`}
                  style={{ backgroundColor: formData.priceType === 'Paid' ? colors.primary : 'transparent', color: formData.priceType === 'Paid' ? colors.background : colors.text }}
                >
                  Paid
                </button>
              </div>
            </div>
            {formData.priceType === 'Paid' && (
              <div className="space-y-1">
                <label style={labelStyle}>Price (₹)</label>
                <div className="relative">
                   <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-30" size={14} style={{ color: colors.text }} />
                   <input 
                    type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border outline-none font-bold"
                    style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                  />
                </div>
              </div>
            )}
            <div className="space-y-1 md:col-span-2">
              <label style={labelStyle}>Course Image URL</label>
              <input 
                type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              />
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 rounded-xl border space-y-4 shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.primary }}>
            <Layout size={18} /> Experience Logic
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <label style={labelStyle}>Detailed Description</label>
              <textarea 
                rows="4" value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border outline-none text-sm resize-none font-medium"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label style={labelStyle}>Learning Targets</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.whatYouWillLearn.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" value={point} onChange={(e) => handleWhatYoullLearnChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border outline-none text-sm font-medium"
                      style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                    />
                    <button type="button" onClick={() => handleRemoveWhatYoullLearn(index)} className="p-2 text-red-500 rounded-lg cursor-pointer transition-all" onMouseEnter={(e) => e.target.style.backgroundColor = '#ef444410'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddWhatYoullLearn} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer uppercase tracking-wider" style={{ color: colors.primary }}>
                <Plus size={14} /> Add Target
              </button>
            </div>
          </div>
        </div>

        {/* Curriculum Hierarchy */}
        <div className="p-6 rounded-xl border space-y-6 shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.primary }}>
              <Award size={18} /> Structure
            </h2>
            <button type="button" onClick={handleAddSection} className="text-[10px] font-semibold px-4 py-1.5 cursor-pointer rounded-lg border uppercase tracking-wider transition-all" style={{ color: colors.primary, borderColor: colors.primary + '40' }} onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '10'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              New Module
            </button>
          </div>

          <div className="space-y-6">
            {formData.curriculum.map((section, sIdx) => (
              <div key={section.id} className="p-4 rounded-xl border space-y-4" style={{ backgroundColor: colors.background, borderColor: colors.accent + '15' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                    {sIdx + 1}
                  </div>
                  <input 
                    type="text" value={section.title} onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                    className="flex-1 px-3 py-2 bg-transparent border-b outline-none font-semibold text-sm"
                    style={{ borderColor: colors.accent + '20', color: colors.text }}
                  />
                  <button type="button" onClick={() => handleRemoveSection(section.id)} className="p-2 cursor-pointer text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="pl-4 md:pl-10 space-y-2 border-l-2" style={{ borderColor: colors.accent + '10' }}>
                  {section.lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-2 md:gap-3 p-2 rounded-lg group transition-all" style={{ backgroundColor: colors.accent + '05' }}>
                      <div className="p-1.5 rounded-md hidden sm:block" style={{ backgroundColor: colors.accent + '10', color: colors.textSecondary }}>
                         <Play size={12} />
                      </div>
                      <input 
                        type="text" value={lesson.title} onChange={(e) => handleLessonChange(section.id, lesson.id, 'title', e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm font-medium min-w-0"
                        style={{ color: colors.text }}
                      />
                      <input 
                        type="text" value={lesson.duration} onChange={(e) => handleLessonChange(section.id, lesson.id, 'duration', e.target.value)}
                        placeholder="00:00"
                        className="w-12 md:w-16 bg-transparent border-none outline-none text-[10px] text-center opacity-50 font-bold"
                        style={{ color: colors.text }}
                      />
                       <button 
                        type="button" onClick={(e) => { e.preventDefault(); handleLessonChange(section.id, lesson.id, 'isLocked', !lesson.isLocked); }}
                        className={`p-1.5 rounded-md transition-all cursor-pointer ${lesson.isLocked ? 'opacity-100' : 'opacity-40'}`}
                        style={{ color: lesson.isLocked ? colors.text : colors.primary }}
                      >
                        {lesson.isLocked ? <Lock size={14} /> : <Play size={14} />}
                      </button>
                      <button type="button" onClick={() => handleRemoveLesson(section.id, lesson.id)} className="p-1.5 cursor-pointer text-red-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddLesson(section.id)} className="text-[10px] font-bold py-2 px-3 cursor-pointer rounded-lg flex items-center gap-1 transition-all" style={{ color: colors.primary }}>
                    <Plus size={12} /> Unit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex gap-4 pt-4 border-t" style={{ borderColor: colors.accent + '20' }}>
          <button 
            type="submit"
            className="flex-1 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center cursor-pointer justify-center gap-2 text-sm uppercase tracking-widest active:scale-[0.98]"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Save size={18} /> Update Content
          </button>
          <button 
            type="button" onClick={() => navigate('/dashboard/courses')}
            className="px-8 py-3.5 rounded-xl font-bold transition-all border cursor-pointer text-sm uppercase tracking-widest"
            style={{ color: colors.textSecondary, borderColor: colors.accent + '30' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.accent + '10'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Exit Editor
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
