import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { ChevronLeft, Save, GraduationCap, Mail, Lock, User, Briefcase, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

function AddInstructor() {
  const { colors } = useTheme();
  const { addInstructor, updateInstructor, instructors } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const existingInstructor = id ? instructors.find(ins => ins.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingInstructor?.name || '',
    email: existingInstructor?.email || '',
    password: '',
    role: existingInstructor?.role || 'Instructor',
    createdAt: existingInstructor?.createdAt || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!id && !formData.password)) {
      toast.error("Please fill all required fields");
      return;
    }

    if (id) {
      updateInstructor(id, formData);
      toast.success("Instructor updated successfully");
    } else {
      addInstructor(formData);
      toast.success("Instructor created successfully");
    }
    navigate('/dashboard/instructors');
  };

  return (
    <div className="p-2 max-w-full mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          style={{ color: colors.text }}
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            {id ? 'Edit' : 'Create'} Instructor
          </h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>
            {id ? 'Update instructor details' : 'Add a new member to your instructional team'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2" style={{ color: colors.text }}>
              <User size={14} /> Full Name *
            </label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Abhay Vishwakarma"
              className="w-full px-4 py-2.5 rounded border outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text, "--tw-ring-color": colors.primary + '40' }}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2" style={{ color: colors.text }}>
              <Mail size={14} /> Email Address *
            </label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="instructor@codersadda.com"
              className="w-full px-4 py-2.5 rounded border outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text, "--tw-ring-color": colors.primary + '40' }}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2" style={{ color: colors.text }}>
              <Lock size={14} /> {id ? 'New Password (Optional)' : 'Password *'}
            </label>
            <input 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded border outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text, "--tw-ring-color": colors.primary + '40' }}
              required={!id}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2" style={{ color: colors.text }}>
              <Briefcase size={14} /> Role/Designation *
            </label>
            <input 
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              placeholder="e.g. Senior React Developer"
              className="w-full px-4 py-2.5 rounded border outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text, "--tw-ring-color": colors.primary + '40' }}
              required
            />
          </div>

          {/* Created At */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2" style={{ color: colors.text }}>
              <Calendar size={14} /> Joining Date
            </label>
            <input 
              type="date"
              value={formData.createdAt}
              onChange={(e) => setFormData({...formData, createdAt: e.target.value})}
              className="w-full px-4 py-2.5 rounded border outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text, "--tw-ring-color": colors.primary + '40' }}
            />
          </div>
        </div>

        <div className="pt-6 border-t flex flex-col md:flex-row gap-4" style={{ borderColor: colors.accent + '10' }}>
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              <Save size={18} /> {id ? 'Update Instructor' : 'Create Account'}
            </button>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded font-bold border transition-all hover:bg-black/5 cursor-pointer"
              style={{ borderColor: colors.accent + '30', color: colors.text }}
            >
              Cancel
            </button>
        </div>
      </form>

      <div className="mt-8 p-4 rounded border bg-primary/5 flex gap-3 items-start" style={{ borderColor: colors.primary + '20' }}>
         <GraduationCap className="text-primary mt-0.5 shrink-0" size={18} />
         <div className="text-xs leading-relaxed opacity-70" style={{ color: colors.text }}>
           <p className="font-bold mb-1">Instructor Permissions</p>
           Instructors will be able to manage their assigned courses, upload lectures, and interact with students. They will not have access to financial reports or system-wide settings.
         </div>
      </div>
    </div>
  );
}

export default AddInstructor;
