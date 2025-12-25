import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { ArrowLeft, Mail, Phone, Edit2, User, Globe } from 'lucide-react';

function ViewUser() {
  const { colors } = useTheme();
  const { users } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const found = users.find(u => u.id === id);
    if (found) {
      setUser(found);
    } else {
      navigate('/dashboard/users');
    }
  }, [id, users, navigate]);

  if (!user) return null;

  const cardStyle = { 
    backgroundColor: colors.sidebar || colors.background, 
    borderColor: colors.accent + '15' 
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 transition-all duration-300">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer border"
          style={{ backgroundColor: colors.sidebar || colors.background, color: colors.text, borderColor: colors.accent + '15' }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        
        <button 
          onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
          className="p-3 rounded-xl transition-all cursor-pointer shadow-md"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Edit2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-5">
           <div className="p-8 rounded-3xl border shadow-sm flex flex-col items-center" style={cardStyle}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-md mb-6" style={{ borderColor: colors.primary }}>
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-center" style={{ color: colors.text }}>{user.name}</h2>
              <div className="flex items-center gap-2 opacity-50 mb-8">
                 <Globe size={12} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Global Account</span>
              </div>

              <div className="w-full space-y-4 pt-6 border-t" style={{ borderColor: colors.accent + '10' }}>
                 <div className="flex items-center gap-3">
                    <Mail size={16} className="opacity-30 shrink-0" />
                    <div className="flex flex-col truncate">
                       <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">Email</span>
                       <span className="text-sm font-semibold truncate" style={{ color: colors.text }}>{user.email}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={16} className="opacity-30 shrink-0" />
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">Phone</span>
                       <span className="text-sm font-semibold" style={{ color: colors.text }}>{user.number}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Section */}
        <div className="md:col-span-7">
           <div className="p-8 rounded-3xl border shadow-sm h-full" style={cardStyle}>
              <h3 className="text-sm font-bold opacity-30 uppercase tracking-[3px] mb-6">Identity Summary</h3>
              <p className="text-sm font-medium leading-relaxed opacity-60" style={{ color: colors.textSecondary }}>
                This identity is registered within the central repository. All contact protocols and personal markers have been verified for system-wide consistency.
              </p>
              
              <div className="mt-8 space-y-4">
                 <div className="p-4 rounded-2xl border" style={{ borderColor: colors.accent + '08', backgroundColor: colors.background }}>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Account ID</span>
                       <span className="text-[10px] font-mono font-bold" style={{ color: colors.primary }}>#{user.id}</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl border" style={{ borderColor: colors.accent + '08', backgroundColor: colors.background }}>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Status</span>
                       <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Connectivity</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
