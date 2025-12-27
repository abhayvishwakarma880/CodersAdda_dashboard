import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Trash2, Hash, BookOpen, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

function AddSubscription() {
  const { colors } = useTheme();
  const { subscriptions, addSubscription, updateSubscription, courses, ebooks } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    planType: 'Mobile',
    duration: '1 Month',
    price: '',
    benefits: [''],
    courses: [],
    ebooks: [],
    status: 'Active'
  });

  useEffect(() => {
    if (isEdit) {
      const found = subscriptions.find(s => s.id === id);
      if (found) {
        setFormData({
          ...found,
          courses: found.courses || [],
          ebooks: found.ebooks || []
        });
      } else {
        navigate('/dashboard/subscriptions');
      }
    }
  }, [id, subscriptions, navigate, isEdit]);

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const handleBenefitChange = (index, value) => {
    const updated = [...formData.benefits];
    updated[index] = value;
    setFormData({ ...formData, benefits: updated });
  };

  const handleRemoveBenefit = (index) => {
    if (formData.benefits.length > 1) {
      setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== index) });
    }
  };

  const handleCourseToggle = (courseId) => {
    const updated = formData.courses.includes(courseId)
      ? formData.courses.filter(id => id !== courseId)
      : [...formData.courses, courseId];
    setFormData({ ...formData, courses: updated });
  };

  const handleEbookToggle = (ebookId) => {
    const updated = formData.ebooks.includes(ebookId)
      ? formData.ebooks.filter(id => id !== ebookId)
      : [...formData.ebooks, ebookId];
    setFormData({ ...formData, ebooks: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.price) {
      toast.warning("Please enter a price");
      return;
    }
    
    const cleanBenefits = formData.benefits.filter(b => b.trim() !== '');
    const dataToSave = { ...formData, benefits: cleanBenefits };

    if (isEdit) {
      updateSubscription(id, dataToSave);
      toast.success('Subscription plan updated');
    } else {
      addSubscription(dataToSave);
      toast.success('New subscription plan added');
    }
    navigate('/dashboard/subscriptions');
  };

  const inputStyle = { backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text };
  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.text }}>{isEdit ? 'Edit Plan' : 'Add New Plan'}</h1>
            <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Subscription Management</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Details */}
        <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Basic Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label style={labelStyle}>Plan Type</label>
              <select 
                value={formData.planType}
                onChange={(e) => setFormData({...formData, planType: e.target.value})}
                className="w-full px-4 py-2.5 rounded border outline-none text-sm font-semibold cursor-pointer"
                style={inputStyle}
              >
                <option value="Mobile">Mobile</option>
                <option value="Super">Super</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label style={labelStyle}>Duration</label>
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-2.5 rounded border outline-none text-sm font-semibold cursor-pointer"
                style={inputStyle}
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>

            <div className="space-y-1">
              <label style={labelStyle}>Price (₹)</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="e.g. 299"
                  className="w-full pl-10 pr-4 py-2.5 rounded border outline-none text-sm font-semibold"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label style={labelStyle}>Plan Status</label>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              {['Active', 'Disabled'].map(stat => (
                <button 
                  key={stat}
                  type="button"
                  onClick={() => setFormData({...formData, status: stat})}
                  className="py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  style={{ 
                    backgroundColor: formData.status === stat ? colors.primary : 'transparent',
                    color: formData.status === stat ? colors.background : colors.text,
                    borderColor: formData.status === stat ? colors.primary : colors.accent + '20'
                  }}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-6 rounded border shadow-sm space-y-4" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Plan Benefits</h3>
            <button 
              type="button"
              onClick={handleAddBenefit}
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all hover:opacity-100 opacity-60 cursor-pointer"
              style={{ color: colors.primary }}
            >
              <Plus size={14} /> Add Benefit
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  placeholder="e.g. HD Quality Streaming"
                  className="flex-1 px-4 py-2.5 rounded border outline-none text-sm font-semibold"
                  style={inputStyle}
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveBenefit(index)}
                  className="p-2.5 text-red-500 rounded hover:bg-red-50 transition-all border border-transparent cursor-pointer"
                  style={{ borderColor: colors.accent + '10' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="p-6 rounded border shadow-sm space-y-4" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <div className="flex items-center gap-2">
            <BookOpen size={16} style={{ color: colors.primary }} />
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Included Courses</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {courses.map(course => (
              <label 
                key={course.id}
                className="flex items-center gap-3 p-3 rounded border cursor-pointer transition-all hover:bg-black/5"
                style={{ borderColor: formData.courses.includes(course.id) ? colors.primary : colors.accent + '20' }}
              >
                <input 
                  type="checkbox"
                  checked={formData.courses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: colors.primary }}
                />
                <span className="text-sm font-semibold flex-1" style={{ color: colors.text }}>{course.title}</span>
              </label>
            ))}
            {courses.length === 0 && (
              <p className="text-xs opacity-40 italic col-span-2">No courses available</p>
            )}
          </div>
        </div>

        {/* E-Books */}
        <div className="p-6 rounded border shadow-sm space-y-4" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <div className="flex items-center gap-2">
            <FileText size={16} style={{ color: colors.primary }} />
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Included E-Books</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ebooks.map(ebook => (
              <label 
                key={ebook.id}
                className="flex items-center gap-3 p-3 rounded border cursor-pointer transition-all hover:bg-black/5"
                style={{ borderColor: formData.ebooks.includes(ebook.id) ? colors.primary : colors.accent + '20' }}
              >
                <input 
                  type="checkbox"
                  checked={formData.ebooks.includes(ebook.id)}
                  onChange={() => handleEbookToggle(ebook.id)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: colors.primary }}
                />
                <span className="text-sm font-semibold flex-1" style={{ color: colors.text }}>{ebook.title}</span>
              </label>
            ))}
            {ebooks.length === 0 && (
              <p className="text-xs opacity-40 italic col-span-2">No e-books available</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            type="submit"
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Save size={18} /> {isEdit ? 'Update Plan' : 'Publish Plan'}
          </button>
          <button 
            type="button"
            onClick={() => navigate('/dashboard/subscriptions')}
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest border opacity-60 hover:opacity-100 transition-all flex items-center justify-center gap-3 cursor-pointer"
            style={{ borderColor: colors.accent + '30', color: colors.text }}
          >
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSubscription;
