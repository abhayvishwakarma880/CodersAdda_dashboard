import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit2, Trash2, Users as UsersIcon, Github, Linkedin, Globe, Phone, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Toggle from '../../components/ui/Toggle';

function Users() {
  const { colors,currentTheme,isDarkMode } = useTheme();
  const { users, deleteUser, updateUser } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Toggle Status
  const toggleStatus = (id, currentStatus) => {
      const newStatus = (currentStatus || 'Active') === 'Active' ? 'Disabled' : 'Active';
      updateUser(id, { status: newStatus });
      toast.info(`User ${newStatus}`);
  };

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this identity!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        toast.success('User identity deleted successfully!');
      }
    });
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
    );
  }, [users, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-xl" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
              <UsersIcon size={24} />
           </div>
           <div>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: colors.text }}>Users</h1>
              <p className="text-[10px] md:text-xs font-semibold opacity-40 uppercase tracking-widest" style={{ color: colors.textSecondary }}>
                Total Students: {users.length} Identities
              </p>
           </div>
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" style={{ color: colors.text }} />
          <input
            type="text"
            placeholder="Search by name, email or number..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-4 py-3 rounded outline-none border transition-all text-sm font-semibold"
            style={{ 
              backgroundColor: colors.sidebar || colors.background, 
              borderColor: colors.accent + '20',
              color: colors.text 
            }}
          />
        </div>
      </div>

      {/* Scrollable Table Area */}
      <div className="flex-1 min-h-0 flex flex-col rounded border shadow-sm w-full overflow-hidden" style={{ borderColor: colors.accent + '15', backgroundColor: colors.sidebar || colors.background }}>
        <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full" style={{ scrollbarColor: `${colors.accent}40 transparent` }}>
          <table className="w-full text-left border-collapse table-auto min-w-[1000px]">
            <thead className="sticky top-0 z-30" style={{ backgroundColor: colors.sidebar || colors.background }}>
              <tr style={{ borderBottom: `2px solid ${colors.accent}15`, backgroundColor: colors.sidebar || colors.background }}>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest w-12 text-center" style={{ color: colors.textSecondary }}>Sr.</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>Details</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>Academic</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>Social</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>Status</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>Referral Code</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-right" style={{ color: colors.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: colors.accent + '08' }}>
              {paginatedUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-opacity-10 transition-colors" style={{ color: colors.text }}>
                  <td className="px-4 py-4 text-xs font-bold opacity-30 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border shadow-sm shrink-0" style={{ borderColor: colors.accent + '20' }}>
                           {user.profilePhoto ? (
                               <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                           ) : (
                               <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">{user.name?.charAt(0)}</div>
                           )}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold truncate max-w-[150px]">{user.name}</span>
                           <div className="flex flex-col opacity-60 text-[10px] font-medium">
                               <span className="flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                               <span className="flex items-center gap-1"><Phone size={10} /> {user.phone}</span>
                           </div>
                        </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                     <div className="flex flex-col truncate max-w-[200px]">
                        <span className="text-xs font-bold opacity-80">{user.college || 'N/A'}</span>
                        <span className="text-[10px] font-semibold opacity-50 uppercase tracking-wider">{user.course || 'N/A'}</span>
                     </div>
                  </td>
                  <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                          {user.social?.github && (
                              <a href={user.social.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-black/5 transition-colors opacity-60 hover:opacity-100" style={{ color: colors.text }}>
                                  <Github size={14} />
                              </a>
                          )}
                          {user.social?.linkedin && (
                              <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-black/5 transition-colors opacity-60 hover:opacity-100 text-blue-600">
                                  <Linkedin size={14} />
                              </a>
                          )}
                          {user.social?.portfolio && (
                              <a href={user.social.portfolio} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-black/5 transition-colors opacity-60 hover:opacity-100 text-purple-600">
                                  <Globe size={14} />
                              </a>
                          )}
                          {!user.social?.github && !user.social?.linkedin && !user.social?.portfolio && (
                              <span className="text-[10px] opacity-30 font-bold uppercase tracking-wider">No Links</span>
                          )}
                      </div>
                  </td>
                  <td className="px-4 py-4">
                      <div className="flex items-center gap-2" >
                         <Toggle  active={(user.status || 'Active') === 'Active'} onClick={() => toggleStatus(user.id, user.status)} />
                         <span className={`text-[10px]  font-bold uppercase tracking-widest ${
                             (user.status || 'Active') === 'Active' ? 'text-green-600' : 'text-red-500'
                         }`}>
                             {user.status || 'Active'}
                         </span>
                      </div>
                  </td>
                  <td className="px-4 py-4">
                      <div className="flex items-center gap-2" >
                         <span>{user.referralData?.myReferralCode || 'GENERATE'}</span>
                      </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/dashboard/users/view/${user.id}`)}
                        className="p-2 cursor-pointer rounded border hover:bg-black/5 transition-colors"
                        style={{ color: colors.primary, borderColor: colors.accent + '30' }}
                        title="View Full Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
                        className="p-2 cursor-pointer rounded border hover:bg-black/5 transition-colors"
                        style={{ color: colors.accent, borderColor: colors.accent + '30' }}
                         title="Edit Details"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 cursor-pointer rounded border hover:bg-red-50 transition-colors"
                        style={{ color: '#ef4444', borderColor: colors.accent + '30' }}
                         title="Delete Identity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Info */}
        <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: colors.accent + '15' }}>
            <span style={{color:colors.textSecondary}} className="text-xs font-bold opacity-40 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black/5 transition-colors"
                    style={{ borderColor: colors.accent + '30', color:colors.primary }}
                >
                    Prev
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black/5 transition-colors"
                    style={{ borderColor: colors.accent + '30', color:colors.primary }}
                >
                    Next
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
