import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Trophy, BookOpen, CreditCard, Wallet, CheckCircle2, XCircle, Github, Linkedin, Globe, Mail, Phone, School, Layers, Code2, Award, Download, ArrowUpRight, ArrowDownLeft, UsersIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';

function ViewUser() {
  const { colors } = useTheme();
  const { users } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const found = users.find(u => u.id === id);
    if (found) {
      setUser(found);
    } else {
      navigate('/dashboard/users');
    }
  }, [id, users, navigate]);

  if (!user) return null;

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'courses', label: 'Course Purchase', icon: BookOpen },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  const labelStyle = { color: colors.textSecondary, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' };
  const valueStyle = { color: colors.text, fontSize: '15px', fontWeight: '600' };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/users')}
          className="p-2 rounded transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>User Profile</h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Manage Student Identity</p>
        </div>
      </div>

      {/* User Summary Card */}
      <div className="p-6 rounded border shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
           <div className="w-24 h-24 rounded-full border-4 shadow-md overflow-hidden shrink-0" style={{ borderColor: colors.primary + '20' }}>
               {user.profilePhoto ? (
                   <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
               ) : (
                   <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-bold">{user.name?.charAt(0)}</div>
               )}
           </div>
           <div className="flex-1 text-center md:text-left">
               <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
               <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold opacity-60 uppercase tracking-wider mb-3">
                   <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                   <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>
               </div>
               <div className="flex justify-center md:justify-start gap-3">
                   {user.social?.github && <a href={user.social.github} target="_blank" className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"><Github size={16} /></a>}
                   {user.social?.linkedin && <a href={user.social.linkedin} target="_blank" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-black/10 transition-colors"><Linkedin size={16} /></a>}
                   {user.social?.portfolio && <a href={user.social.portfolio} target="_blank" className="p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-black/10 transition-colors"><Globe size={16} /></a>}
               </div>
           </div>
           <div className="flex flex-col gap-2 min-w-[150px]">
               <div className="p-3 rounded bg-black/5 border border-black/5 text-center">
                   <span className="block text-xs font-bold opacity-50 uppercase tracking-wider">Status</span>
                   <span className={`text-sm font-black uppercase tracking-widest ${user.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{user.status}</span>
               </div>
           </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
              <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                      ? 'shadow-md scale-105' 
                      : 'opacity-60 hover:opacity-100 hover:bg-black/5'
                  }`}
                  style={{ 
                      backgroundColor: activeTab === tab.id ? colors.primary : 'transparent', 
                      color: activeTab === tab.id ? colors.background : colors.text,
                      border: activeTab === tab.id ? 'none' : `1px solid ${colors.accent}20`
                  }}
              >
                  <tab.icon size={16} /> {tab.label}
              </button>
          ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
                <motion.div 
                    key="personal"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* About Section */}
                    <div className="md:col-span-2 p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-2 flex items-center gap-2"><User size={16} /> About</h3>
                        <p className="text-sm opacity-80 leading-relaxed font-medium">{user.about || 'No bio added.'}</p>
                    </div>

                    {/* Student Stats */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2"><UsersIcon size={16} /> Student Stats</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded bg-black/5">
                                    <span className="block text-2xl font-black">{user.studentDetails?.completedCourses || 0}</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Completed</span>
                                </div>
                                <div className="p-3 rounded bg-black/5">
                                    <span className="block text-2xl font-black">{user.studentDetails?.ongoingCourses || 0}</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Ongoing</span>
                                </div>
                                <div className="p-3 rounded bg-black/5">
                                    <span className="block text-xl font-black">{user.studentDetails?.learningHours || 0}h</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Learning Time</span>
                                </div>
                                <div className="p-3 rounded bg-black/5">
                                    <span className="block text-xl font-black">{user.studentDetails?.progress || 0}%</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Avg Progress</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t" style={{ borderColor: colors.accent + '10' }}>
                                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Joined On</p>
                                <p className="font-bold">{new Date(user.studentDetails?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2"><School size={16} /> Academic Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div><p style={labelStyle}>College</p><p style={valueStyle}>{user.college}</p></div>
                            <div><p style={labelStyle}>Course</p><p style={valueStyle}>{user.course}</p></div>
                            <div><p style={labelStyle}>Semester</p><p style={valueStyle}>{user.semester}</p></div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2"><Code2 size={16} /> Skills & Tech</h3>
                        <div>
                            <p style={labelStyle}>Technology Stack</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.technology?.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p style={labelStyle}>Skills</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.skills?.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 rounded bg-purple-50 text-purple-600 text-xs font-bold border border-purple-100">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                     {/* Referral Stats */}
                     <div className="md:col-span-2 p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2"><UsersIcon size={16} /> Referral Stats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             {/* My Referral Code Field */}
                             <div className="p-4 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center shadow-md relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 p-2 opacity-20"><Award size={48} /></div>
                                 <span className="block text-xl font-mono font-black tracking-widest relative z-10">{user.referralData?.myReferralCode || 'GENERATE'}</span>
                                 <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 relative z-10">My Referral Code</span>
                             </div>

                            <div className="p-4 rounded bg-black/5 border border-black/5 text-center">
                                <span className="block text-2xl font-black">{user.referralData?.referralCount || 0}</span>
                                <span className="text-xs font-bold opacity-50 uppercase tracking-wider">Users Referred</span>
                            </div>
                            <div className="p-4 rounded bg-black/5 border border-black/5 flex flex-col items-center justify-center">
                                <span className="text-xs font-bold opacity-50 uppercase tracking-wider mb-2">Referred By Someone?</span>
                                {user.referralData?.isReferred ? (
                                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                                        <CheckCircle2 size={14} /> Yes
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500 font-bold bg-gray-200 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                                        <XCircle size={14} /> No
                                    </div>
                                )}
                            </div>
                             {user.referralData?.isReferred && (
                                <div className="p-4 rounded bg-black/5 border border-black/5 text-center">
                                    <span className="block text-xl font-mono font-bold">{user.referralData?.referredByCode}</span>
                                    <span className="text-xs font-bold opacity-50 uppercase tracking-wider">Referred By Code</span>
                                </div>
                             )}
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'achievements' && (
                <motion.div 
                    key="achievements"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {user.achievements?.length > 0 ? (
                        user.achievements.map((ach, i) => (
                            <div key={i} className="p-6 rounded border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Award size={80} />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
                                        <Trophy size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{ach.title}</h3>
                                    <p className="text-xs leading-relaxed opacity-70 font-medium">{ach.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-20 opacity-40">
                             <Trophy size={48} className="mx-auto mb-4" />
                             <p>No achievements unlocked yet.</p>
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'courses' && (
                <motion.div 
                    key="courses"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                >
                     {user.purchases?.length > 0 ? (
                        user.purchases.map((purchase) => (
                            <div key={purchase.id} className="p-4 rounded border flex items-center justify-between" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded ${purchase.type === 'Course' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {purchase.type === 'Course' ? <Layers size={24} /> : <BookOpen size={24} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{purchase.title}</h4>
                                        <p className="text-xs opacity-60 font-bold uppercase tracking-wider">{purchase.type} • Purchased on {purchase.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-lg">₹{purchase.price}</span>
                                    <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest justify-end">
                                        <CheckCircle2 size={12} /> Paid
                                    </div>
                                </div>
                            </div>
                        ))
                     ) : (
                        <div className="text-center py-20 opacity-40 border rounded border-dashed" style={{ borderColor: colors.accent + '40' }}>
                             <BookOpen size={48} className="mx-auto mb-4" />
                             <p>No courses or ebooks purchased yet.</p>
                        </div>
                     )}
                </motion.div>
            )}

            {activeTab === 'subscription' && (
                <motion.div 
                    key="subscription"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                    {user.subscription ? (
                        <div className="max-w-xl mx-auto p-8 rounded border shadow-lg relative overflow-hidden text-center" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                             <h3 className="text-sm font-bold opacity-50 uppercase tracking-widest mb-2">Current Plan</h3>
                             <h2 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{user.subscription.plan}</h2>
                             
                             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 from-green-600 text-green-700 text-xs font-bold uppercase tracking-widest mb-8">
                                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {user.subscription.status}
                             </div>

                             <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
                                 {user.subscription.benefits?.map((benefit, i) => (
                                     <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                         <CheckCircle2 size={16} className="text-green-500" /> {benefit}
                                     </div>
                                 ))}
                             </div>

                             <p className="text-xs opacity-40 font-bold uppercase tracking-widest">Valid Until: {user.subscription.expiryDate}</p>
                        </div>
                    ) : (
                         <div className="text-center py-20 opacity-40 border rounded border-dashed" style={{ borderColor: colors.accent + '40' }}>
                             <CreditCard size={48} className="mx-auto mb-4" />
                             <p>No active subscription.</p>
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'wallet' && (
                <motion.div 
                    key="wallet"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                >
                    {/* Wallet Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded border bg-white shadow-sm" style={{ borderColor: colors.accent + '20' }}>
                            <span className="block text-xs font-bold opacity-70 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Total Balance</span>
                            <span className="text-3xl text-green-600 font-bold">₹{user.wallet?.balance || 0}</span>
                        </div>
                        <div className="p-6 rounded border bg-white shadow-sm" style={{ borderColor: colors.accent + '20' }}>
                            <span className="block text-xs font-bold opacity-50 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Total Earnings</span>
                            <span className="text-3xl font-bold text-green-600">+₹{user.wallet?.earnings || 0}</span>
                        </div>
                        <div className="p-6 rounded border bg-white shadow-sm" style={{ borderColor: colors.accent + '20' }}>
                            <span className="block text-xs font-bold opacity-50 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Withdrawn</span>
                            <span className="text-3xl font-bold text-red-500">-₹{user.wallet?.withdrawn || 0}</span>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="rounded border overflow-hidden" style={{ borderColor: colors.accent + '20', backgroundColor: colors.sidebar || colors.background }}>
                        <div className="p-4 border-b font-bold text-sm uppercase tracking-widest opacity-60" style={{ borderColor: colors.accent + '20' }}>Transaction History</div>
                        <div className="divide-y" style={{ divideColor: colors.accent + '10' }}>
                            {user.wallet?.transactions?.length > 0 ? (
                                user.wallet.transactions.map((txn, i) => (
                                    <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-black/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${txn.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {txn.type === 'Credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{txn.description}</p>
                                                <p className="text-xs opacity-50 font-bold uppercase tracking-wider">{txn.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold font-mono ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                                            {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center opacity-40 text-sm">No transactions yet</div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default ViewUser;
