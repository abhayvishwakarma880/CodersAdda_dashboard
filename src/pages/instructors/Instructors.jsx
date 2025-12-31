import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { Plus, Search, Eye, Edit, Trash2, UserCheck, Mail, Calendar, GraduationCap } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Toggle from '../../components/ui/Toggle';

function Instructors() {
  const { colors } = useTheme();
  const { instructors, deleteInstructor, updateInstructor } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInstructor(id);
        toast.success('Instructor removed successfully');
      }
    });
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
    updateInstructor(id, { status: newStatus });
    toast.info(`Instructor ${newStatus}`);
  };

  const filteredInstructors = instructors.filter(ins => 
    ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ins.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ins.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>All Instructors</h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Manage your teaching staff and their roles</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/instructors/add')}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Plus size={18} /> Create Instructor
        </button>
      </div>

      <div className="p-4 rounded border shadow-sm mb-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input 
            type="text"
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded border outline-none transition-all text-sm"
            style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
          />
        </div>
      </div>

      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.accent + '10', color: colors.text }}>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Sr. No</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Instructor</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Role</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Created At</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.length > 0 ? filteredInstructors.map((ins, index) => (
                <tr key={ins.id} className="border-b transition-colors hover:bg-black/5" style={{ borderColor: colors.accent + '05', color: colors.text }}>
                  <td className="p-4 py-5 text-sm font-medium opacity-60">{index + 1}</td>
                  <td className="p-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
                        <GraduationCap size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{ins.name}</span>
                        <span className="text-[11px] opacity-50 flex items-center gap-1 font-medium"><Mail size={10} /> {ins.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 py-5">
                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: colors.accent + '10', color: colors.text }}>
                      {ins.role}
                    </span>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex items-center gap-1.5 opacity-60 text-xs font-semibold">
                      <Calendar size={14} />
                      {ins.createdAt}
                    </div>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex items-center gap-2">
                        <Toggle active={ins.status === 'Active'} onClick={() => toggleStatus(ins.id, ins.status)} />
                        <span className={`text-[9px] font-black uppercase tracking-wider ${ins.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                            {ins.status || 'Active'}
                        </span>
                    </div>
                  </td>
                  <td className="p-4 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => navigate(`/dashboard/instructors/view/${ins.id}`)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all cursor-pointer"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                       <button 
                        onClick={() => navigate(`/dashboard/instructors/edit/${ins.id}`)}
                        className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ins.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center opacity-40 font-bold italic">No instructors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Instructors;
