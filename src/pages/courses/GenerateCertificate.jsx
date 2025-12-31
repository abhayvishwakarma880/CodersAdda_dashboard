import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { Settings, Save, Move, Type, Calendar, User, BookOpen, ChevronLeft, RefreshCw, Upload, CheckCircle, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'react-toastify';

function GenerateCertificate() {
  const { colors } = useTheme();
  const { updateCertificateStatus } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Initial data from navigation state
  const initialData = location.state || {
    enrollmentId: null,
    studentName: 'Student Name',
    courseName: 'Course Name',
    completedOn: '31/12/2023',
    existingConfig: null
  };

  // State for text elements
  const [elements, setElements] = useState(initialData.existingConfig?.elements || {
    name: { text: initialData.studentName, x: 50, y: 45, fontSize: 42, fontFamily: "'Playfair Display', serif", color: '#1a1a1a', fontWeight: 'bold', letterSpacing: 0 },
    course: { text: initialData.courseName, x: 50, y: 60, fontSize: 24, fontFamily: "'Montserrat', sans-serif", color: '#333333', fontWeight: '600', letterSpacing: 1 },
    date: { text: initialData.completedOn, x: 50, y: 75, fontSize: 18, fontFamily: "'Roboto', sans-serif", color: '#555555', fontWeight: '500', letterSpacing: 0 }
  });

  const [bgImage, setBgImage] = useState(initialData.existingConfig?.bgImage || null);
  const [activeElement, setActiveElement] = useState('name');
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setBgImage(event.target.result);
        toast.success("Sample image uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (key, field, value) => {
    setElements(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSave = () => {
    if (!initialData.enrollmentId) {
       toast.error("Enrollment ID not found!");
       return;
    }
    if (!bgImage) {
      toast.error("Please upload a sample certificate image first!");
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      updateCertificateStatus(initialData.enrollmentId, true, { elements, bgImage });
      setIsSaving(false);
      toast.success("Certificate saved successfully!");
      navigate(-1);
    }, 800);
  };

  const fonts = [
    { name: 'Playfair Display', value: "'Playfair Display', serif" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
    { name: 'Roboto', value: "'Roboto', sans-serif" },
    { name: 'Great Vibes', value: "'Great Vibes', cursive" },
    { name: 'Dancing Script', value: "'Dancing Script', cursive" }
  ];

  return (
    <div className="min-h-screen flex flex-col scrollbar-hide" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header className="p-3 border-b flex flex-wrap items-center justify-between sticky -top-5 z-50 bg-inherit gap-3" style={{ borderColor: colors.accent + '20' }}>
        <div className="flex  items-center gap-2 md:gap-4">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-black/5" style={{ color: colors.text }}>
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-base md:text-lg font-bold" style={{ color: colors.text }}>Certificate Editor</h1>
          </div>
          
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaving || !bgImage}
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
            style={{ backgroundColor: colors.text,opacity:1, color: colors.background }}
          >
            {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      <div className="flex-1 p-2 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1600px] mx-auto w-full h-full">
        {/* Editor Sidebar */}
        <div className="lg:col-span-5 space-y-3 overflow-y-auto lg:max-h-[calc(100vh-80px)] pr-1 scrollbar-hide order-2 lg:order-1">
          
          {/* Upload Box */}
          <div className="p-3 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 transition-all hover:bg-black/5" 
               style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '30' }}>
            {bgImage ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border" style={{ borderColor: colors.accent + '20' }}>
                <img src={bgImage} className="w-full h-full object-contain" alt="Preview" />
                <button onClick={() => setBgImage(null)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-lg">
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center gap-1 py-4 w-full">
                <div className="p-2 rounded-full bg-primary/10" style={{ color: colors.primary }}>
                  <Upload size={20} />
                </div>
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest" style={{ color: colors.text }}>Upload Sample Image</span>
              </button>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </div>

          {/* Element Selector */}
          <div className="flex gap-1 p-1 rounded-lg bg-black/5" style={{ backgroundColor: colors.sidebar }}>
            {Object.keys(elements).map(key => (
              <button
                key={key}
                onClick={() => setActiveElement(key)}
                className={`flex-1 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all ${activeElement === key ? 'shadow-sm' : 'opacity-40'}`}
                style={{ 
                  backgroundColor: activeElement === key ? colors.primary : 'transparent',
                  color: activeElement === key ? colors.background : colors.text
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Settings Box */}
          <div className="p-3 rounded-xl border space-y-3 shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{ color: colors.text}}>Text</label>
              <input 
                type="text" value={elements[activeElement].text}
                onChange={(e) => updateElement(activeElement, 'text', e.target.value)}
                className="w-full p-2 rounded-md border text-xs outline-none"
                style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>X Pos ({elements[activeElement].x}%)</label>
                <input type="range" min="0" max="100" value={elements[activeElement].x} onChange={(e) => updateElement(activeElement, 'x', parseInt(e.target.value))} className="w-full h-1 accent-primary" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Y Pos ({elements[activeElement].y}%)</label>
                <input type="range" min="0" max="100" value={elements[activeElement].y} onChange={(e) => updateElement(activeElement, 'y', parseInt(e.target.value))} className="w-full h-1 accent-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Font Size</label>
                <input type="range" min="8" max="80" value={elements[activeElement].fontSize} onChange={(e) => updateElement(activeElement, 'fontSize', parseInt(e.target.value))} className="w-full h-1 accent-primary" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Spacing</label>
                <input type="range" min="-2" max="10" value={elements[activeElement].letterSpacing || 0} onChange={(e) => updateElement(activeElement, 'letterSpacing', parseInt(e.target.value))} className="w-full h-1 accent-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
               <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Font Family</label>
                <select 
                  value={elements[activeElement].fontFamily} onChange={(e) => updateElement(activeElement, 'fontFamily', e.target.value)}
                  className="w-full p-1.5 rounded-md border text-[10px] outline-none"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text }}
                >
                  {fonts.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Color</label>
                <input type="color" value={elements[activeElement].color} onChange={(e) => updateElement(activeElement, 'color', e.target.value)} className="w-full h-7 rounded bg-transparent" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{color:colors.text}}>Weight</label>
                <select 
                  value={elements[activeElement].fontWeight} onChange={(e) => updateElement(activeElement, 'fontWeight', e.target.value)}
                  className="w-full p-1.5 rounded-md border text-[10px] outline-none"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text }}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
           <div className="w-full flex justify-center items-center flex-1 bg-black/5 rounded-2xl border border-dashed" 
                style={{ borderColor: colors.accent + '20', backgroundColor: colors.sidebar }}>
             {bgImage ? (
               <div className="relative w-full shadow-xl overflow-hidden bg-white max-w-[800px]" style={{ aspectRatio: '1.414 / 1', }}>
                  <img src={bgImage} alt="Certificate" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                  {Object.entries(elements).map(([key, item]) => (
                    <div
                      key={key}
                      style={{
                        position: 'absolute', top: `${item.y}%`, left: `${item.x}%`, transform: 'translate(-50%, -50%)',
                        fontSize: `clamp(6px, ${item.fontSize * 0.1}vw, ${item.fontSize}px)`,
                        fontFamily: item.fontFamily, color: item.color, fontWeight: item.fontWeight,
                        letterSpacing: `${item.letterSpacing}px`, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
                        border: activeElement === key ? '1px dashed #3b82f6' : 'none', padding: '1px 3px'
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
               </div>
             ) : (
               <div className="text-center space-y-2 opacity-30" style={{ color: colors.text }}>
                 <ImageIcon size={48} className="mx-auto" />
                 <p className="text-xs font-bold uppercase tracking-widest">Upload sample image to start editing</p>
               </div>
             )}
           </div>
        </div>
      </div>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&family=Roboto:wght@400;500;700&display=swap');
          input[type="range"] { accent-color: ${colors.primary}; }
        `}
      </style>
    </div>
  );
}

export default GenerateCertificate;
