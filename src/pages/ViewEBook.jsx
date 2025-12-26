import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ChevronLeft, FileText, User, Tag, Download, Calendar, ExternalLink, Lock, Eye } from 'lucide-react';

function ViewEBook() {
  const { id } = useParams();
  const { colors } = useTheme();
  const { ebooks } = useData();
  const navigate = useNavigate();
  
  const [ebook, setEbook] = useState(null);

  useEffect(() => {
    const found = ebooks.find(b => b.id === id);
    if (found) {
      setEbook(found);
    } else {
      navigate('/dashboard/ebooks');
    }
  }, [id, ebooks, navigate]);

  if (!ebook) return null;

  const labelStyle = { color: colors.textSecondary, fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="flex-shrink-0 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl transition-all hover:bg-black/5 cursor-pointer"
            style={{ color: colors.text }}
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.text }}>E-Book Details</h1>
            <p className="text-xs opacity-50" style={{ color: colors.textSecondary }}>Review digital resource information</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border p-8 shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
              <div className="flex flex-col md:flex-row gap-8">
                {/* PDF Icon/Preview Placeholder */}
                <div className="w-full md:w-48 h-64 rounded-xl flex items-center justify-center border-2 border-dashed" style={{ borderColor: colors.accent + '20', backgroundColor: colors.background }}>
                  <div className="flex flex-col items-center gap-3">
                    <FileText size={64} style={{ color: colors.primary }} className="opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">PDF Preview</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-2 inline-block" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                      {ebook.category}
                    </span>
                    <h2 className="text-3xl font-bold leading-tight" style={{ color: colors.text }}>{ebook.title}</h2>
                    <div className="flex items-center gap-2 mt-2 opacity-60">
                      <User size={16} />
                      <span className="font-semibold">{ebook.author || 'Unknown Author'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label style={labelStyle}>File Size</label>
                      <p className="font-bold text-sm" style={{ color: colors.text }}>{ebook.fileSize || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <label style={labelStyle}>Price Mode</label>
                      <div className="flex items-center gap-1.5">
                         {ebook.priceType === 'Free' ? (
                           <span className="text-green-500 font-bold text-sm uppercase tracking-widest">Free</span>
                         ) : (
                           <span className="text-amber-500 font-bold text-sm flex items-center gap-1 uppercase tracking-widest">
                             <Lock size={14} /> ₹{ebook.price}
                           </span>
                         )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label style={labelStyle}>Created At</label>
                      <p className="font-bold text-sm opacity-50" style={{ color: colors.text }}>
                        {ebook.createdAt ? new Date(ebook.createdAt).toLocaleDateString() : 'Dec 25, 2025'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t" style={{ borderColor: colors.accent + '10' }}>
                    <div className="flex flex-wrap gap-4">
                      {ebook.downloadUrl && (
                        <a 
                          href={ebook.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95"
                          style={{ backgroundColor: colors.primary, color: colors.background }}
                        >
                          <ExternalLink size={16} /> Open PDF
                        </a>
                      )}
                      <button 
                        className="px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all border opacity-70"
                        style={{ color: colors.text, borderColor: colors.accent + '30' }}
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border p-8" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
              <label style={labelStyle} className="mb-4 block">About this E-Book</label>
              <p className="text-sm leading-relaxed opacity-70 whitespace-pre-wrap" style={{ color: colors.text }}>
                {ebook.description || "No description provided for this digital resource."}
              </p>
            </div>
          </div>

          {/* Sidebar Info/Stats */}
          <div className="space-y-6">
            <div className="rounded-2xl border p-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
               <h3 className="font-bold text-xs uppercase tracking-[2px] mb-6 opacity-40">Resource Stats</h3>
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Download size={16} /></div>
                     <span className="text-xs font-bold opacity-60">Downloads</span>
                   </div>
                   <span className="font-bold text-sm">1.2k+</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><Eye size={16} /></div>
                     <span className="text-xs font-bold opacity-60">Views</span>
                   </div>
                   <span className="font-bold text-sm">4.5k+</span>
                 </div>
               </div>
            </div>

            <div className="rounded-2xl border p-6 border-dashed" style={{ borderColor: colors.primary + '30', backgroundColor: colors.primary + '05' }}>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">Note</p>
               <p className="text-xs italic opacity-60" style={{ color: colors.text }}>
                 PDF content is served via secure dynamic links. Previews are generated upon resource validation.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEBook;
