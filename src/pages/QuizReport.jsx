import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Eye, Search, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function QuizReport() {
  const { colors } = useTheme();
  const { quizzes } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const found = quizzes.find(q => q.id === id);
    if (found) {
      setQuiz(found);
    } else {
      navigate('/dashboard/quizzes');
    }
  }, [id, quizzes, navigate]);

  if (!quiz) return null;

  const filteredAttempts = quiz.attempts?.filter(attempt => 
    attempt.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleExportReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text("Quiz Performance Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Quiz Title: ${quiz.title}`, 14, 30);
    doc.text(`Description: ${quiz.description.substring(0, 70)}...`, 14, 36);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 42);
    doc.text(`Total Attempts: ${quiz.attempts?.length || 0}`, 14, 48);

    const filteredData = filteredAttempts.length > 0 ? filteredAttempts : (quiz.attempts || []);

    if (filteredData.length === 0) {
        toast.info("No attempts data available to export.");
        return;
    }

    // Table
    const tableColumn = ["Student Name", "Date", "Score", "Total", "Status", "Performance"];
    const tableRows = filteredData.map(attempt => {
       const percentage = Math.round((attempt.marks / attempt.totalMarks) * 100);
       return [
         attempt.studentName,
         attempt.date,
         attempt.marks,
         attempt.totalMarks,
         attempt.status,
         `${percentage}%`
       ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [66, 133, 244], textColor: 255, fontStyle: 'bold', halign: 'center' },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { halign: 'center' },
        3: { halign: 'center' },
        5: { halign: 'center', fontStyle: 'bold' },
      },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    doc.save(`Quiz_Report_${quiz.title.substring(0, 15).replace(/\s+/g, '_')}_${Date.now()}.pdf`);
    toast.success("Report downloaded successfully!");
  };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
            <button
            onClick={() => navigate(-1)}
            className="p-2 rounded transition-all cursor-pointer border"
            style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
            >
            <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Quiz Report</h1>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{quiz.title}</p>
            </div>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 cursor-pointer"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Download size={18} /> Export Full Report
        </button>
      </div>

      {/* Stats/Filters */}
      <div className="mb-6 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input 
              type="text" 
              placeholder="Search student..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded border outline-none text-sm font-semibold transition-all"
              style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20', color: colors.text }}
            />
          </div>
      </div>

      {/* Table */}
      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr style={{ backgroundColor: colors.accent + '05', borderBottom: `1px solid ${colors.accent}15` }}>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Student Name</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Date</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Score</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60">Status</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest opacity-60 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: colors.accent + '10' }}>
                    {filteredAttempts.length > 0 ? (
                        filteredAttempts.map((attempt, index) => (
                            <tr key={index} className="hover:bg-black/[0.01] transition-colors">
                                <td className="p-4 font-bold text-sm" style={{ color: colors.text }}>{attempt.studentName}</td>
                                <td className="p-4 text-xs font-semibold opacity-70">{attempt.date}</td>
                                <td className="p-4">
                                     <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${attempt.marks >= (attempt.totalMarks * 0.5) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {attempt.marks} / {attempt.totalMarks}
                                     </span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${attempt.status === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>
                                        {attempt.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => navigate(`/dashboard/quizzes/report/${quiz.id}/result/${attempt.studentId}`)}
                                        className="p-2 rounded hover:bg-black/5 transition-all cursor-pointer text-blue-500"
                                        title="View Detailed Result"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-8 text-center opacity-30 font-bold uppercase tracking-widest text-xs">
                                No attempts found
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

export default QuizReport;
