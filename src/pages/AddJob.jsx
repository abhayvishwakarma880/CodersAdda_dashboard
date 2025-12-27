import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Info, Layout, Building2, User2, Mail, Phone, Globe, Briefcase, MapPin, DollarSign, Users, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

function AddJob() {
  const { colors } = useTheme();
  const { addJob } = useData();
  const navigate = useNavigate();
  
  const initialFormState = {
    title: '',
    category: 'Senior Developer',
    location: '',
    workType: 'Work From Office',
    experience: 'Fresher',
    salary: '',
    openings: '',
    skills: '',
    companyName: '',
    companyEmail: '',
    companyMobile: '',
    companyWebsite: '',
    description: '',
    status: 'Active'
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.companyName) {
      toast.warning("Please fill in basic job details");
      return;
    }
    addJob(formData);
    toast.success('Job opportunity published!');
    navigate('/dashboard/jobs');
  };

  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' };
  const inputStyle = { backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Post New Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">

          
          {/* Job Info */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Briefcase size={18} className="text-primary" style={{ color: colors.primary }} /> Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label style={labelStyle}>Job Title</label>
                <input 
                  type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Senior Flutter Developer"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Category / Role</label>
                <input 
                  type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Ex: Senior Developer"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Location</label>
                <input 
                  type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Ex: Lucknow, Noida"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Salary / Package (LPA)</label>
                <input 
                  type="text" required value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  placeholder="Ex: 12-18 LPA"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Required Experience</label>
                <select 
                  value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none cursor-pointer text-sm"
                  style={inputStyle}
                >
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Work Type</label>
                <select 
                  value={formData.workType} onChange={(e) => setFormData({...formData, workType: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none cursor-pointer text-sm"
                  style={inputStyle}
                >
                  <option value="Work From Office">Work From Office</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Number of Openings</label>
                <input 
                  type="number" required value={formData.openings} onChange={(e) => setFormData({...formData, openings: e.target.value})}
                  placeholder="Ex: 5"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Required Skills (Comma separated)</label>
                <input 
                  type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="Ex: Flutter, Dart, Firebase"
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={inputStyle}
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
                <label style={labelStyle}>Job Description</label>
                <textarea 
                  rows="5" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detail the responsibilities and requirements..."
                  className="w-full px-4 py-3 rounded-md border outline-none resize-none text-sm"
                  style={inputStyle}
                ></textarea>
              </div>
          </div>

          {/* Company Details */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Building2 size={18} className="text-primary" style={{ color: colors.primary }} /> Company Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label style={labelStyle}>Company Name</label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                    <input 
                    type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Ex: Tech Solutions Pvt Ltd"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none text-sm"
                    style={inputStyle}
                    />
                </div>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Contact Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                    <input 
                    type="email" required value={formData.companyEmail} onChange={(e) => setFormData({...formData, companyEmail: e.target.value})}
                    placeholder="Ex: hr@techsolutions.com"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none text-sm"
                    style={inputStyle}
                    />
                </div>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Contact Mobile</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                    <input 
                    type="tel" value={formData.companyMobile} onChange={(e) => setFormData({...formData, companyMobile: e.target.value})}
                    placeholder="Ex: +91 9988776655"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none text-sm"
                    style={inputStyle}
                    />
                </div>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Company Website</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                    <input 
                    type="url" value={formData.companyWebsite} onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                    placeholder="Ex: https://techsolutions.com"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none text-sm"
                    style={inputStyle}
                    />
                </div>
              </div>
            </div>
          </div>

        {/* Status & Actions */}
        <div className="p-6 rounded border shadow-sm space-y-4" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Job Status</h3>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            type="submit"
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all cursor-pointer"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            Confirm & Post
          </button>
          <button 
            type="button" onClick={() => navigate('/dashboard/jobs')}
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest border opacity-60 hover:opacity-100 transition-all cursor-pointer"
            style={{ color: colors.text, borderColor: colors.accent + '30' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
