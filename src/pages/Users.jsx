import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit2, Trash2, ChevronLeft, ChevronRight, UserPlus, Users as UsersIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Users() {
  const { colors } = useTheme();
  const { users, deleteUser } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Increased items per page for better use of space

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.number.includes(searchTerm)
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
      <div className="flex-shrink-0 mb-6 sticky top-0 z-30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ backgroundColor: colors.background }}>
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

        {/* Search Bar - Position Fixed logic via sticky parent */}
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
          <table className="w-full text-left border-collapse table-auto min-w-[800px]">
            <thead className="sticky top-0 z-30" style={{ backgroundColor: colors.sidebar || colors.background }}>
              <tr style={{ borderBottom: `2px solid ${colors.accent}15`, backgroundColor: colors.sidebar || colors.background }}>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest w-16 text-center whitespace-nowrap" style={{ color: colors.textSecondary }}>Sr.</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest w-20 text-center whitespace-nowrap" style={{ color: colors.textSecondary }}>Profile</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: colors.textSecondary }}>Identity Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest w-64 whitespace-nowrap" style={{ color: colors.textSecondary }}>Contact Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right  right-0 z-40 whitespace-nowrap" style={{ backgroundColor: colors.sidebar || colors.background, color: colors.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ divideColor: colors.accent + '08' }}>
              {paginatedUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-opacity-10 transition-colors" style={{ color: colors.text }}>
                  <td className="px-4 py-4 text-xs font-bold opacity-30 text-center whitespace-nowrap">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="w-10 h-10 rounded-full overflow-hidden border shadow-sm mx-auto" style={{ borderColor: colors.accent + '20' }}>
                      <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold truncate max-w-[150px]">{user.name}</span>
                      <span className="text-[10px] font-medium opacity-50 uppercase tracking-wider">Verified Identity</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col truncate max-w-[200px]">
                      <span className="text-xs font-semibold opacity-60 truncate">{user.email}</span>
                      <span className="text-[10px] font-bold opacity-30 tracking-tighter">{user.number}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right right-0 z-20 whitespace-nowrap" style={{ backgroundColor: colors.sidebar || colors.background }}>
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/dashboard/users/view/${user.id}`)}
                        className="p-2 cursor-pointer rounded-xl transition-all hover:bg-opacity-20"
                        style={{ color: colors.primary, backgroundColor: colors.primary + '10' }}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
                        className="p-2 cursor-pointer rounded-xl transition-all hover:bg-opacity-20"
                        style={{ color: colors.accent, backgroundColor: colors.accent + '10' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Delete this identity?')) deleteUser(user.id); }}
                        className="p-2 cursor-pointer rounded-xl transition-all hover:bg-opacity-20"
                        style={{ color: '#ef4444', backgroundColor: '#ef444415' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {paginatedUsers.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center opacity-30">
              <UsersIcon size={48} className="mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">No Identities Match Your Query</p>
            </div>
          )}
        </div>

        {/* Fixed Pagination Bar */}
        <div className="flex-shrink-0 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: colors.accent + '15', backgroundColor: colors.sidebar || colors.background }}>
           <div className="text-[10px] font-bold uppercase tracking-[3px] opacity-40 whitespace-nowrap" style={{ color: colors.textSecondary }}>
             Vault Index: {currentPage} / {Math.max(1, totalPages)}
           </div>
           
           <div className="flex items-center gap-3">
             <button 
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="p-2.5 rounded-xl transition-all disabled:opacity-20 cursor-pointer shadow-sm active:scale-95 flex items-center gap-2 text-xs font-bold border whitespace-nowrap"
               style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.accent + '20' }}
             >
               <ChevronLeft size={16} /> <span className="hidden sm:inline">PREV</span>
             </button>
             
             <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'shadow-inner' : 'opacity-40 hover:opacity-100'}`}
                        style={{ 
                            backgroundColor: currentPage === i + 1 ? colors.primary : 'transparent',
                            color: currentPage === i + 1 ? colors.background : colors.text
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
             </div>

             <button 
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages || totalPages === 0}
               className="p-2.5 rounded-xl transition-all disabled:opacity-20 cursor-pointer shadow-md active:scale-95 flex items-center gap-2 text-xs font-bold whitespace-nowrap"
               style={{ backgroundColor: colors.primary, color: colors.background }}
             >
               <span className="hidden sm:inline">NEXT</span> <ChevronRight size={16} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
