import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, MessageCircle, Heart, Share2, Send, CornerDownRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

function ViewShort() {
  const { colors } = useTheme();
  const { shorts, replyToComment } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [short, setShort] = useState(null);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const found = shorts.find(s => s.id === id);
    if (found) {
      setShort(found);
    } else {
      navigate('/dashboard/shorts');
    }
  }, [id, shorts, navigate]);

  if (!short) return null;

  const handleReplySubmit = (commentId) => {
      if (!replyText.trim()) return;
      replyToComment(short.id, commentId, replyText);
      setReplyText('');
      setActiveReplyId(null);
  };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/shorts')}
          className="p-2 rounded transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>View Short</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Player */}
          <div className="flex justify-center bg-black/5 rounded-xl p-4">
              <div className="relative aspect-[9/16] w-full max-w-sm rounded-lg overflow-hidden shadow-2xl bg-black">
                  <video 
                    src={short.videoUrl} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                  />
              </div>
          </div>

          {/* Right Column: Details & Comments */}
          <div className="flex flex-col h-[600px] lg:h-auto">
             {/* Details Card */}
             <div className="p-6 rounded border shadow-sm mb-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                 <h2 className="text-lg font-bold mb-2" style={{ color: colors.text }}>{short.description}</h2>
                 <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                         <User size={20} className="opacity-50" />
                     </div>
                     <div>
                         <p className="text-sm font-bold">{short.instructor}</p>
                         <p className="text-xs opacity-50">Instructor</p>
                     </div>
                 </div>
                 
                 <div className="flex items-center gap-6 py-4 border-t border-b" style={{ borderColor: colors.accent + '10' }}>
                     <div className="flex flex-col items-center gap-1">
                         <Heart size={20} />
                         <span className="text-xs font-bold">{short.likes}</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <MessageCircle size={20} />
                         <span className="text-xs font-bold">{short.comments?.length || 0}</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <Share2 size={20} />
                         <span className="text-xs font-bold">{short.shares}</span>
                     </div>
                 </div>
             </div>

             {/* Comments Section */}
             <div className="flex-1 flex flex-col rounded border shadow-sm overflow-hidden" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                 <div className="p-4 border-b" style={{ borderColor: colors.accent + '20' }}>
                     <h3 className="font-bold flex items-center gap-2">Comments <span className="opacity-40 text-xs">({short.comments?.length || 0})</span></h3>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {short.comments?.map(comment => (
                         <div key={comment.id} className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                 <span className="text-xs font-bold text-blue-600">{comment.user.charAt(0)}</span>
                             </div>
                             <div className="flex-1">
                                 <div className="bg-black/5 rounded-lg p-3">
                                     <div className="flex justify-between items-start mb-1">
                                         <p className="text-xs font-bold">{comment.user}</p>
                                         <p className="text-[10px] opacity-40">{comment.time}</p>
                                     </div>
                                     <p className="text-sm opacity-80">{comment.text}</p>
                                 </div>
                                 
                                 {/* Action Bar */}
                                 <div className="flex items-center gap-4 mt-1 px-1">
                                     <button 
                                        onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                                        className="text-[10px] font-bold opacity-60 hover:opacity-100 uppercase tracking-wide cursor-pointer"
                                     >
                                         Reply
                                     </button>
                                 </div>

                                 {/* Reply Input */}
                                 {activeReplyId === comment.id && (
                                     <div className="mt-2 flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                         <input 
                                            type="text" 
                                            autoFocus
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write a reply..."
                                            className="flex-1 px-3 py-2 rounded text-xs bg-black/5 outline-none border-transparent focus:border-blue-500 border"
                                         />
                                         <button 
                                            onClick={() => handleReplySubmit(comment.id)}
                                            className="p-2 rounded bg-blue-500 text-white cursor-pointer"
                                         >
                                             <Send size={14} />
                                         </button>
                                     </div>
                                 )}

                                 {/* Replies List */}
                                 {comment.replies && comment.replies.length > 0 && (
                                     <div className="mt-2 space-y-2 pl-4 border-l-2" style={{ borderColor: colors.accent + '10' }}>
                                         {comment.replies.map(reply => (
                                             <div key={reply.id} className="flex gap-2">
                                                 <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                                     <span className="text-[10px] font-bold text-purple-600">A</span>
                                                 </div>
                                                 <div className="flex-1">
                                                     <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                                                         <div className="flex justify-between items-start mb-0.5">
                                                             <p className="text-[10px] font-bold text-purple-600">{reply.user} <span className="text-[9px] opacity-50 text-black dark:text-white font-normal">• {reply.time}</span></p>
                                                         </div>
                                                         <p className="text-xs opacity-80">{reply.text}</p>
                                                     </div>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
}

export default ViewShort;
