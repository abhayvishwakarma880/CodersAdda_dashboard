import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function UserQuizResult() {
  const { colors } = useTheme();
  const { quizzes } = useData();
  const { quizId, studentId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      const foundAttempt = foundQuiz.attempts?.find(a => a.studentId === studentId);
      if (foundAttempt) {
        setAttempt(foundAttempt);
      } else {
        navigate(`/dashboard/quizzes/report/${quizId}`);
      }
    } else {
      navigate('/dashboard/quizzes');
    }
  }, [quizId, studentId, quizzes, navigate]);

  if (!quiz || !attempt) return null;

  const handleExportResult = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Quiz Result: ${quiz.title}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${attempt.studentName}`, 14, 30);
    doc.text(`Score: ${attempt.marks} / ${attempt.totalMarks}`, 14, 38);
    doc.text(`Date: ${attempt.date}`, 14, 46);

    let yPos = 60;

    quiz.questions.forEach((q, index) => {
        const studentAnsObj = attempt.answers.find(ans => ans.questionId === q.id);
        const studentOptionIndex = studentAnsObj ? studentAnsObj.selectedOption : -1;
        const isCorrect = studentOptionIndex === q.correctOption;

        // Page break check
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(`Q${index + 1}: ${q.question}`, 14, yPos);
        yPos += 8;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        
        q.options.forEach((opt, optIdx) => {
             let prefix = "- ";
             if (optIdx === q.correctOption) prefix = "(Correct) ";
             if (optIdx === studentOptionIndex) prefix = "(Selected) ";
             if (optIdx === q.correctOption && optIdx === studentOptionIndex) prefix = "(Correct & Selected) ";

             doc.text(`${prefix}${opt}`, 20, yPos);
             yPos += 6;
        });

        yPos += 4;
        if (!isCorrect) {
             doc.setTextColor(200, 0, 0);
             doc.text(`Result: Incorrect`, 14, yPos);
        } else {
             doc.setTextColor(0, 150, 0);
             doc.text(`Result: Correct`, 14, yPos);
        }
        doc.setTextColor(0, 0, 0);
        yPos += 10;
    });

    doc.save(`Result_${attempt.studentName.replace(/\s+/g, '_')}_${quiz.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
            <button
            onClick={() => navigate(`/dashboard/quizzes/report/${quizId}`)}
            className="p-2 rounded transition-all cursor-pointer border"
            style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
            >
            <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Detailed Result</h1>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{attempt.studentName} • {quiz.title}</p>
            </div>
        </div>
        <button
          onClick={handleExportResult}
          className="flex items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 cursor-pointer"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Download size={18} /> Export Result PDF
        </button>
      </div>

      {/* Summary Card */}
      <div className="p-6 rounded border shadow-sm mb-8 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
         <div>
             <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Score</p>
             <p className="text-2xl font-black">{attempt.marks} <span className="text-sm opacity-40">/ {attempt.totalMarks}</span></p>
         </div>
         <div>
             <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Status</p>
             <p className={`text-xl font-black uppercase ${attempt.status === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>{attempt.status}</p>
         </div>
         <div>
             <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Date</p>
             <p className="text-lg font-bold opacity-80">{attempt.date}</p>
         </div>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        {quiz.questions.map((q, index) => {
            const studentAnsObj = attempt.answers.find(ans => ans.questionId === q.id);
            const studentOptionIndex = studentAnsObj ? studentAnsObj.selectedOption : -1;
            const isCorrect = studentOptionIndex === q.correctOption;

            return (
                <div 
                    key={q.id} 
                    className="p-6 rounded border shadow-sm transition-all"
                    style={{ 
                        backgroundColor: colors.sidebar || colors.background, 
                        borderColor: isCorrect ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)',
                        borderLeftWidth: '4px'
                    }}
                >
                    <div className="flex gap-4">
                        <span className={`text-lg font-black ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>Q{index + 1}.</span>
                        <div className="flex-1 space-y-4">
                            <h3 className="text-lg font-bold" style={{ color: colors.text }}>{q.question}</h3>
                            <div className="space-y-2">
                                {q.options.map((opt, optIdx) => {
                                    let optionStyle = { borderColor: colors.accent + '20', opacity: 0.7 };
                                    let icon = null;

                                    if (optIdx === q.correctOption) {
                                        optionStyle = { borderColor: '#22c55e', backgroundColor: '#22c55e10', color: '#15803d', fontWeight: 'bold' };
                                        icon = <CheckCircle size={16} className="text-green-600" />;
                                    }
                                    if (optIdx === studentOptionIndex && !isCorrect) {
                                        optionStyle = { borderColor: '#ef4444', backgroundColor: '#ef444410', color: '#b91c1c', fontWeight: 'bold' };
                                        icon = <XCircle size={16} className="text-red-600" />;
                                    }

                                    return (
                                        <div 
                                            key={optIdx} 
                                            className="p-3 rounded border flex items-center justify-between"
                                            style={optionStyle}
                                        >
                                            <span className="text-sm">{opt}</span>
                                            {icon}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}

export default UserQuizResult;
