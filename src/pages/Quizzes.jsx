import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, FileQuestion, Clock, Layout, Award, MoreVertical, Hash, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function Quizzes() {
  const { colors } = useTheme();
  const { quizzes, deleteQuiz } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuizzes = (quizzes || []).filter(quiz =>
    quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Quiz?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuiz(id);
        toast.success('Quiz deleted successfully!');
      }
    });
  };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Quizzes</h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Manage assessments</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/quizzes/add')}
          className="flex items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 cursor-pointer"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Plus size={18} /> Add Quiz
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input
            type="text"
            placeholder="Search quizzes..."
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
                <th className="p-4">Quiz Title</th>
                <th className="p-4">Code</th>
                <th className="p-4">Details</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b last:border-0 hover:bg-black/5 transition-colors" style={{ borderColor: colors.accent + '10' }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <FileQuestion size={20} />
                            </div>
                            <div>
                                <p className="font-bold line-clamp-1">{quiz.title}</p>
                                <p className="text-xs opacity-50 line-clamp-1 max-w-[200px]">{quiz.description}</p>
                            </div>
                        </div>
                      </td>
                      <td className="p-4">
                          <div className="flex items-center gap-1 opacity-70">
                              <Hash size={12} />
                              <span>{quiz.quizCode || 'N/A'}</span>
                          </div>
                      </td>
                      <td className="p-4">
                          <div className="flex flex-col gap-1 text-xs opacity-70">
                              <span className="flex items-center gap-1"><Clock size={12} /> {quiz.duration} mins</span>
                              <span className="flex items-center gap-1"><Layout size={12} /> {quiz.questions?.length || 0} Questions</span>
                              <span className="flex items-center gap-1"><Award size={12} /> {quiz.points} Pts/Q</span>
                          </div>
                      </td>
                      <td className="p-4 text-center">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                             quiz.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                             quiz.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                             'bg-red-100 text-red-700'
                         }`}>
                             {quiz.level}
                         </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                           <button
                             onClick={() => navigate(`/dashboard/quizzes/view/${quiz.id}`)}
                             className="p-2 rounded border hover:bg-black/5 text-purple-500 cursor-pointer transition-colors"
                             style={{ borderColor: colors.accent + '30' }}
                             title="View details"
                           >
                             <Eye size={16} />
                           </button>
                           <button
                             onClick={() => navigate(`/dashboard/quizzes/edit/${quiz.id}`)}
                             className="p-2 rounded border hover:bg-black/5 text-blue-500 cursor-pointer transition-colors"
                             style={{ borderColor: colors.accent + '30' }}
                             title="Edit"
                           >
                             <Edit2 size={16} />
                           </button>
                           <button
                             onClick={() => handleDelete(quiz.id)}
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
                          <FileQuestion size={48} className="mx-auto mb-2" />
                          <p>No quizzes found</p>
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

export default Quizzes;
