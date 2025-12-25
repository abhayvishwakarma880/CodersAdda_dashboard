import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, BookOpen, Clock, Users, Star, Trash2, Edit2, Eye, LayoutGrid, List, User, Lock, CheckCircle, IndianRupee } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

function Courses() {
  const { colors } = useTheme();
  const { courses, categories, deleteCourse } = useData();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleViewChange = (mode) => {
    if (mode === viewMode) return;
    setIsAnimating(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsAnimating(false);
    }, 200);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (course.instructor || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cardStyle = { backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '30' };

  return (
    <div className="p-2 md:p-6 transition-all duration-300" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold truncate" style={{ color: colors.text }}>Course Management</h1>
          <p className="text-xs md:text-sm font-medium opacity-60 truncate" style={{ color: colors.textSecondary }}>Design and organize your learning content.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-opacity-10 rounded-lg p-1 border" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <button 
              onClick={() => handleViewChange('grid')}
              className={`p-2 rounded-md transition-all cursor-pointer duration-200 ${viewMode === 'grid' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              style={{ backgroundColor: viewMode === 'grid' ? colors.accent : 'transparent', color: viewMode === 'grid' ? colors.background : colors.text }}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => handleViewChange('list')}
              className={`p-2 rounded-md transition-all cursor-pointer duration-200 ${viewMode === 'list' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              style={{ backgroundColor: viewMode === 'list' ? colors.accent : 'transparent', color: viewMode === 'list' ? colors.background : colors.text }}
            >
              <List size={18} />
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard/courses/add')}
            className="flex items-center cursor-pointer gap-2 px-4 md:px-6 py-2 rounded-xl font-semibold transition-all shadow-md active:scale-95"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Plus size={18} /> <span className="text-sm md:text-base">Add</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} style={{ color: colors.text }} />
          <input 
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm"
            style={{ 
              backgroundColor: colors.sidebar || colors.background, 
              borderColor: colors.accent + '20',
              color: colors.text
            }}
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border outline-none cursor-pointer text-sm font-semibold sm:min-w-[160px]"
          style={{ 
            backgroundColor: colors.sidebar || colors.background, 
            borderColor: colors.accent + '20',
            color: colors.text
          }}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Grid/List Container */}
      <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md flex flex-col"
                style={cardStyle}
              >
                <div className="relative h-44 overflow-hidden bg-gray-100 group">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10">
                      <BookOpen size={48} style={{ color: colors.text }} />
                    </div>
                  )}
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20" 
                       style={{ backgroundColor: colors.primary + 'CC', color: colors.background }}>
                    {course.category}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3">
                    {course.priceType === 'Free' ? (
                      <span className="px-3 py-1 rounded-md bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">Free</span>
                    ) : (
                      <span className="px-3 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Lock size={10} /> {course.price ? `₹${course.price}` : 'Premium'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-base mb-1 line-clamp-1" style={{ color: colors.text }}>{course.title}</h3>
                  <p className="text-xs font-medium opacity-60 mb-6" style={{ color: colors.textSecondary }}>{course.instructor}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.accent + '15' }}>
                    <div className="flex items-center gap-3 text-[10px] font-semibold opacity-50" style={{ color: colors.textSecondary }}>
                      <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {course.studentsCount}</span>
                    </div>
                    
                    {/* Action Buttons - Always Visible for Clarity */}
                    <div className="flex items-center gap-1">
                       <button onClick={() => navigate(`/dashboard/courses/view/${course.id}`)} className="p-2 cursor-pointer rounded-lg transition-all" style={{ color: colors.primary }} onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '15'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <Eye size={18} />
                       </button>
                       <button onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)} className="p-2 cursor-pointer rounded-lg transition-all" style={{ color: colors.primary }} onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '15'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <Edit2 size={18} />
                       </button>
                       <button onClick={() => deleteCourse(course.id)} className="p-2 cursor-pointer rounded-lg transition-all" style={{ color: '#ef4444' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ef444415'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-sm transition-all duration-200 group"
                style={cardStyle}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img src={course.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.primary }}>{course.category}</span>
                    <span className="opacity-20">•</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${course.priceType === 'Free' ? 'text-green-500' : 'text-amber-500'}`}>
                      {course.priceType === 'Free' ? 'Free' : `Premium ₹${course.price || ''}`}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base truncate" style={{ color: colors.text }}>{course.title}</h3>
                  <p className="text-xs font-medium opacity-60" style={{ color: colors.textSecondary }}>{course.instructor}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold opacity-40 uppercase tracking-widest mr-4" style={{ color: colors.textSecondary }}>
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {course.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={16} /> {course.studentsCount}</span>
                </div>
                <div className="flex items-center gap-1 border-l pl-4" style={{ borderColor: colors.accent + '20' }}>
                  <button onClick={() => navigate(`/dashboard/courses/view/${course.id}`)} className="p-2.5 cursor-pointer rounded-xl text-primary transition-all" style={{ color: colors.primary }} onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '15'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <Eye size={20} />
                  </button>
                  <button onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)} className="p-2.5 cursor-pointerrounded-xl text-primary transition-all" style={{ color: colors.primary }} onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '15'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <Edit2 size={20} />
                  </button>
                  <button onClick={() => deleteCourse(course.id)} className="p-2.5 cursor-pointer rounded-xl text-red-500 transition-all" style={{ color: '#ef4444' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ef444415'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl opacity-30" style={{ borderColor: colors.accent + '30' }}>
            <BookOpen size={48} className="mx-auto mb-4" />
            <p className="text-lg font-semibold">No Courses Found</p>
            <p className="text-sm font-medium">Try search or select another category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
