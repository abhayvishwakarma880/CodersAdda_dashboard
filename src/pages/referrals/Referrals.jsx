import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Edit2, Trash2, Share2, Copy, Check, Mail, Phone, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function Referrals() {
  const { colors } = useTheme();
  const { referrals, deleteReferral } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredReferrals = (referrals || []).filter(ref =>
    ref.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referralCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Referral?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReferral(id);
        toast.success('Referral deleted successfully!');
      }
    });
  };

  const handleCopy = (code, id) => {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success("Code copied!");
      setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Referrals</h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Track user referrals</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input
            type="text"
            placeholder="Search by name, email or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded border outline-none text-sm font-semibold"
            style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
          />
        </div>
      </div>

      {/* Table View */}
      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-black uppercase tracking-widest opacity-60 border-b" style={{ borderColor: colors.accent + '20' }}>
                <th className="p-4">User</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Education</th>
                <th className="p-4">Referral Code</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {filteredReferrals.length > 0 ? (
                  filteredReferrals.map((ref) => (
                    <tr key={ref.id} className="border-b last:border-0 hover:bg-black/5 transition-colors" style={{ borderColor: colors.accent + '10' }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                            {/* <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 font-bold">
                                {ref.fullName?.charAt(0)}
                            </div> */}
                            <div>
                                <p className="font-bold line-clamp-1">{ref.fullName}</p>
                            </div>
                        </div>
                      </td>
                      <td className="p-4">
                          <div className="flex flex-col gap-1 text-xs opacity-70">
                              <span className="flex items-center gap-1"><Mail size={12} /> {ref.email}</span>
                              <span className="flex items-center gap-1"><Phone size={12} /> {ref.phone}</span>
                          </div>
                      </td>
                      <td className="p-4">
                          <div className="flex flex-col gap-1 text-xs opacity-70">
                              <span className="flex items-center gap-1 font-bold"><GraduationCap size={12} /> {ref.college}</span>
                              <span className="pl-4 opacity-70">{ref.course}</span>
                          </div>
                      </td>
                      <td className="p-4">
                         <div 
                            className="bg-black/5 rounded px-2 py-1 flex items-center gap-2 w-fit border border-black/5 cursor-pointer hover:bg-black/10 transition-colors group"
                            onClick={() => handleCopy(ref.referralCode, ref.id)}
                         >
                             <Share2 size={12} className="opacity-40" />
                             <span className="font-mono text-xs font-bold">{ref.referralCode}</span>
                             {copiedId === ref.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="opacity-0 group-hover:opacity-40 transition-opacity" />}
                         </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                           <button
                             onClick={() => navigate(`/dashboard/referrals/view/${ref.id}`)}
                             className="p-2 rounded border hover:bg-black/5 text-purple-500 cursor-pointer transition-colors"
                             style={{ borderColor: colors.accent + '30' }}
                             title="View"
                           >
                             <Eye size={16} />
                           </button>
                           <button
                             onClick={() => navigate(`/dashboard/referrals/edit/${ref.id}`)}
                             className="p-2 rounded border hover:bg-black/5 text-blue-500 cursor-pointer transition-colors"
                             style={{ borderColor: colors.accent + '30' }}
                             title="Edit"
                           >
                             <Edit2 size={16} />
                           </button>
                           <button
                             onClick={() => handleDelete(ref.id)}
                             className="p-2 rounded border hover:bg-red-50 text-red-500 cursor-pointer transition-colors"
                             style={{ borderColor: colors.accent + '30' }}
                             title="Delete"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan={5} className="p-8 text-center opacity-40">
                          <Share2 size={48} className="mx-auto mb-2" />
                          <p>No referrals found</p>
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
