import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ArrowLeft, Mail, Phone, User, Camera, Save, X } from 'lucide-react';

function EditUser() {
  const { colors } = useTheme();
  const { users, updateUser } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = users.find(u => u.id === id);
    if (user) {
      setFormData(user);
    } else {
      navigate('/dashboard/users');
    }
  }, [id, users, navigate]);

  if (!formData) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for localStorage safety
        alert("File size too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(id, formData);
    navigate('/dashboard/users');
  };

  const inputClass = "w-full pl-12 pr-4 py-3 rounded-xl border outline-none font-semibold text-sm transition-all focus:ring-2";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-10 transition-all duration-300" style={{ backgroundColor: colors.background }}>
      {/* Simple Header */}
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl transition-all cursor-pointer"
          style={{ backgroundColor: colors.sidebar || colors.background, color: colors.text, border: `1px solid ${colors.accent}20` }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.text }}>Edit Identity</h1>
          <p className="text-xs font-medium opacity-40 uppercase tracking-widest" style={{ color: colors.textSecondary }}>System Management</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 md:p-8 rounded-3xl border shadow-sm flex flex-col items-center md:flex-row md:items-start gap-10" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '15' }}>
          {/* File Upload Section */}
          <div className="relative group shrink-0">
             <div className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-sm" style={{ borderColor: colors.primary }}>
               <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <button 
               type="button"
               onClick={() => fileInputRef.current.click()}
               className="absolute -bottom-1 -right-1 p-2 rounded-xl border flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-90" 
               style={{ backgroundColor: colors.primary, color: colors.background, borderColor: colors.primary }}
             >
               <Camera size={14} />
             </button>
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               accept="image/*" 
               className="hidden" 
             />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="col-span-full">
               <label className={labelClass}>Full Legal Name</label>
               <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                 <input 
                    required type="text" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={inputClass}
                    style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text, ringColor: colors.primary + '30' }}
                 />
               </div>
             </div>

             <div>
               <label className={labelClass}>Electronic Mail</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                 <input 
                    required type="email" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={inputClass}
                    style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text, ringColor: colors.primary + '30' }}
                 />
               </div>
             </div>

             <div>
               <label className={labelClass}>Mobile Digits</label>
               <div className="relative">
                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                 <input 
                    required type="tel" value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    className={inputClass}
                    style={{ backgroundColor: colors.background, borderColor: colors.accent + '20', color: colors.text, ringColor: colors.primary + '30' }}
                 />
               </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
           <button 
             type="submit"
             className="flex-1 py-4 cursor-pointer rounded-2xl font-bold uppercase tracking-[2px] text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
             style={{ backgroundColor: colors.primary, color: colors.background }}
           >
             <Save size={18} /> Update Index
           </button>
           <button 
             type="button" onClick={() => navigate(-1)}
             className="flex-1 py-4 cursor-pointer rounded-2xl font-bold uppercase tracking-[2px] text-xs transition-all border opacity-40 hover:opacity-100 active:scale-95"
             style={{ color: colors.text, borderColor: colors.accent + '30' }}
           >
             Cancel Operation
           </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
