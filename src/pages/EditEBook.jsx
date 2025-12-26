import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ChevronLeft, FileText, Upload, Check } from 'lucide-react';

import { toast } from 'react-toastify';

function EditEBook() {
  const { id } = useParams();
  const { colors } = useTheme();
  const { ebookCategories, ebooks, updateEbook } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    priceType: 'Free',
    price: '',
    fileSize: '',
    downloadUrl: '',
    description: '',
    fileName: ''
  });

  useEffect(() => {
    const ebook = ebooks.find(b => b.id === id);
    if (ebook) {
      setFormData(ebook);
    } else {
      navigate('/dashboard/ebooks');
    }
  }, [id, ebooks, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        downloadUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.category) {
      updateEbook(id, formData);
      toast.success('E-Book updated successfully!');
      navigate('/dashboard/ebooks');
    } else {
      toast.error('Please fill required fields');
    }
  };

  const labelStyle = { color: colors.textSecondary, fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' };
  const inputStyle = { backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="flex-shrink-0 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/ebooks')}
            className="p-2 rounded-xl transition-all hover:bg-black/5 cursor-pointer"
            style={{ color: colors.text }}
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Edit E-Book</h1>
            <p className="text-xs opacity-50" style={{ color: colors.textSecondary }}>Modify digital resource details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto bg-white/5 rounded-2xl border p-8" style={{ borderColor: colors.accent + '15', backgroundColor: colors.sidebar || colors.background }}>
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label style={labelStyle}>E-Book Title</label>
                <input 
                  type="text" required
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Flutter Complete Guide"
                  className="w-full px-4 py-3 rounded border outline-none font-semibold text-sm transition-all focus:border-primary"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label style={labelStyle}>Author Name</label>
                <input 
                  type="text" required
                  value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}
                  placeholder="Ex: Dr. Angela Yu"
                  className="w-full px-4 py-3 rounded border outline-none font-semibold text-sm transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label style={labelStyle}>Category</label>
                <select 
                  required
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded border outline-none font-semibold text-sm transition-all cursor-pointer"
                  style={inputStyle}
                >
                  <option value="">Select Category</option>
                  {ebookCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing & File */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label style={labelStyle}>Pricing System</label>
                <div className="flex gap-4">
                  {['Free', 'Paid'].map(type => (
                    <button 
                      key={type} type="button"
                      onClick={() => setFormData({...formData, priceType: type})}
                      className={`flex-1 py-3 rounded font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer border ${formData.priceType === type ? '' : 'opacity-40'}`}
                      style={{ 
                        backgroundColor: formData.priceType === type ? colors.primary : 'transparent',
                        color: formData.priceType === type ? colors.background : colors.text,
                        borderColor: formData.priceType === type ? colors.primary : colors.accent + '20'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {formData.priceType === 'Paid' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label style={labelStyle}>Price (₹)</label>
                  <input 
                    type="number" required
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Ex: 499"
                    className="w-full px-4 py-3 rounded border outline-none font-semibold text-sm transition-all"
                    style={inputStyle}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label style={labelStyle}>Upload PDF File</label>
                <div className="relative">
                  <input 
                    type="file" accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full px-4 py-3 rounded border border-dashed flex items-center gap-3 transition-all"
                       style={{ backgroundColor: colors.background, borderColor: colors.accent + '40', color: colors.text }}>
                    <Upload size={18} className="opacity-50" />
                    <span className="text-sm font-semibold truncate">
                      {formData.fileName || formData.downloadUrl ? (formData.fileName || "Current PDF File") : "Click to upload PDF..."}
                    </span>
                  </div>
                </div>
                {formData.fileSize && (
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Size: {formData.fileSize}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label style={labelStyle}>Description (Optional)</label>
            <textarea 
              rows="4"
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell something about this book..."
              className="w-full px-4 py-3 rounded border outline-none font-semibold text-sm transition-all resize-none"
              style={inputStyle}
            />
          </div>

          <div className="pt-6 border-t" style={{ borderColor: colors.accent + '10' }}>
            <button 
              type="submit"
              className="px-10 py-4 rounded font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95 flex items-center gap-3 cursor-pointer"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              <Check size={20} /> Update E-Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEBook;
