import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Trophy, BookOpen, CreditCard, Wallet, CheckCircle2, XCircle, Github, Linkedin, Globe, Mail, Phone, School, Layers, Code2, Award, Download, ArrowUpRight, ArrowDownLeft, UsersIcon, Gift } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function ViewUser() {
  const { colors } = useTheme();
  const { users, subscriptions, courses } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [certTab, setCertTab] = useState('course');
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);

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
    { id: 'achievements', label: 'Certificates', icon: Trophy },
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
          <p className="text-xs font-bold uppercase tracking-widest" style={{color:colors.textSecondary}}>Manage Student Identity</p>
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
               <h2 className="text-2xl font-bold mb-1" style={{color:colors.text}}>{user.name}</h2>
               <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold opacity-60 uppercase tracking-wider mb-3">
                   <span className="flex items-center gap-1" style={{color:colors.text}}><Mail size={12} /> {user.email}</span>
                   <span className="flex items-center gap-1" style={{color:colors.text}}><Phone size={12} /> {user.phone}</span>
               </div>
               <div className="flex justify-center md:justify-start gap-3">
                   {user.social?.github && <a href={user.social.github} target="_blank" className="p-2 rounded-full transition-colors" style={{color:colors.textSecondary, border:`1px solid ${colors.textSecondary}`}}><Github size={16} /></a>}
                   {user.social?.linkedin && <a href={user.social.linkedin} target="_blank" className="p-2 rounded-full  transition-colors" style={{color:colors.textSecondary, border:`1px solid ${colors.textSecondary}`}} ><Linkedin size={16} /></a>}
                   {user.social?.portfolio && <a href={user.social.portfolio} target="_blank" className="p-2 rounded-full transition-colors" style={{color:colors.textSecondary, border:`1px solid ${colors.textSecondary}`}}><Globe size={16} /></a>}
               </div>
           </div>
           <div className="flex flex-col gap-2 min-w-[150px]">
               <div className="p-3 rounded bg-black/5 border border-black/5 text-center">
                   <span className="block text-xs font-bold opacity-50 uppercase tracking-wider" style={{color:colors.textSecondary}}>Status</span>
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
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2" style={{color:colors.text}}><User size={16} /> About</h3>
                        <p className="text-sm opacity-80 leading-relaxed font-medium" style={{color:colors.textSecondary}}>{user.about || 'No bio added.'}</p>
                    </div>

                    {/* Student Stats */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{color:colors.text}}><UsersIcon size={16} /> Student Stats</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded bg-black/5" style={{color:colors.textSecondary}}>
                                    <span className="block text-2xl font-black" >{user.studentDetails?.completedCourses || 0}</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Completed</span>
                                </div>
                                <div className="p-3 rounded bg-black/5" style={{color:colors.textSecondary}}>
                                    <span className="block text-2xl font-black">{user.studentDetails?.ongoingCourses || 0}</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Ongoing</span>
                                </div>
                                <div className="p-3 rounded bg-black/5" style={{color:colors.textSecondary}}>
                                    <span className="block text-xl font-black">{user.studentDetails?.learningHours || 0}h</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Learning Time</span>
                                </div>
                                <div className="p-3 rounded bg-black/5" style={{color:colors.textSecondary}}>
                                    <span className="block text-xl font-black">{user.studentDetails?.progress || 0}%</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Avg Progress</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t" style={{ borderColor: colors.accent + '10',color:colors.textSecondary }}>
                                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Joined On</p>
                                <p className="font-bold">{new Date(user.studentDetails?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2" style={{color:colors.textSecondary}}><School size={16} /> Academic Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div><p style={labelStyle}>College</p><p style={valueStyle}>{user.college}</p></div>
                            <div><p style={labelStyle}>Course</p><p style={valueStyle}>{user.course}</p></div>
                            <div><p style={labelStyle}>Semester</p><p style={valueStyle}>{user.semester}</p></div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2" style={{color:colors.text}}><Code2 size={16} /> Skills & Tech</h3>
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
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2" style={{color:colors.textSecondary}}><UsersIcon size={16} /> Referral Stats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             {/* My Referral Code Field */}
                             <div className="p-4 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center shadow-md relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 p-2 opacity-20"><Award size={48} /></div>
                                 <span className="block text-xl font-mono font-black tracking-widest relative z-10">{user.referralData?.myReferralCode || 'GENERATE'}</span>
                                 <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 relative z-10">My Referral Code</span>
                             </div>

                            <div className="p-4 rounded bg-black/5 border border-black/5 text-center" style={{color:colors.textSecondary}}>
                                <span className="block text-2xl font-black">{user.referralData?.referralCount || 0}</span>
                                <span className="text-xs font-bold opacity-50 uppercase tracking-wider" >Users Referred</span>
                            </div>
                            <div className="p-4 rounded bg-black/5 border border-black/5 flex flex-col items-center justify-center">
                                <span className="text-xs font-bold opacity-50 uppercase tracking-wider mb-2" style={{color:colors.textSecondary}}>Referred By Someone?</span>
                                {user.referralData?.isReferred ? (
                                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-xs uppercase tracking-widest" >
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
                    className="space-y-6"
                >
                    {/* Sub-tabs for Certificates */}
                    <div className="flex gap-4 border-b" style={{ borderColor: colors.accent + '10' }}>
                        <button 
                            onClick={() => setCertTab('course')}
                            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${certTab === 'course' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            style={{ color: colors.text }}
                        >
                            Course Certificates
                            {certTab === 'course' && <motion.div layoutId="certUnderline" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary }} />}
                        </button>
                        <button 
                            onClick={() => setCertTab('quiz')}
                            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${certTab === 'quiz' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            style={{ color: colors.text }}
                        >
                            Quiz Certificates
                            {certTab === 'quiz' && <motion.div layoutId="certUnderline" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: colors.primary }} />}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Filtered Certificates */}
                        {(user.achievements || [])
                            .filter(ach => certTab === 'course' ? ach.type === 'Certificate' || !ach.type : ach.type === 'QuizCertificate')
                            .map((ach, i) => (
                            <div key={i} className={`p-6 rounded border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${ach.type?.includes('Certificate') ? 'border-primary/30 ring-1 ring-primary/10' : ''}`} style={{ backgroundColor: colors.sidebar || colors.background, borderColor: ach.type?.includes('Certificate') ? colors.primary + '40' : colors.accent + '20', color:colors.text }}>
                                <div className="absolute top-0 right-0 p-4 group-hover:scale-110 transition-transform opacity-10" style={{color:colors.textSecondary}}>
                                    {ach.type?.includes('Certificate') ? <Award size={100} /> : <Trophy size={80} />}
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-12 h-12 rounded flex items-center justify-center mb-4 shadow-inner ${ach.type?.includes('Certificate') ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {ach.type?.includes('Certificate') ? <Award size={24} /> : <Trophy size={24} />}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{ach.title}</h3>
                                    <p className="text-xs leading-relaxed opacity-70 font-medium mb-4 flex-1">{ach.description}</p>
                                    
                                    {ach.type === 'Certificate' && (
                                        <div className="flex items-center justify-between pt-4 border-t mt-auto" style={{ borderColor: colors.accent + '10' }}>
                                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{ach.date}</span>
                                            <button 
                                              className="text-[10px] font-black uppercase text-primary hover:underline underline-offset-4 flex items-center gap-1 transition-all cursor-pointer"
                                              onClick={() => {
                                                 navigate('/dashboard/courses/generate-certificate', { 
                                                   state: { 
                                                     studentName: user.name,
                                                     courseName: ach.courseName,
                                                     completedOn: ach.date,
                                                     existingConfig: ach.config
                                                   } 
                                                 });
                                              }}
                                            >
                                              View Design <ArrowUpRight size={12} />
                                            </button>
                                        </div>
                                    )}

                                    {ach.type === 'QuizCertificate' && (
                                        <div className="flex items-center justify-between pt-4 border-t mt-auto" style={{ borderColor: colors.accent + '10' }}>
                                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{ach.date}</span>
                                            <span className="text-[10px] font-black uppercase text-green-600 flex items-center gap-1">
                                                Score: {ach.score}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {((user.achievements || []).filter(ach => certTab === 'course' ? ach.type === 'Certificate' || !ach.type : ach.type === 'QuizCertificate').length === 0) && (
                            <div className="col-span-full text-center py-20 opacity-40 border rounded-lg border-dashed" style={{ borderColor: colors.accent + '30' }}>
                                 <Trophy size={48} className="mx-auto mb-4" />
                                 <p className="font-bold">No {certTab} certificates found.</p>
                            </div>
                        )}
                    </div>
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
                                        <div className="flex items-center gap-2">
                                            <h4 style={{color:colors.text}} className="font-bold">{purchase.title}</h4>
                                            {purchase.type === 'Course' && (() => {
                                                const course = courses.find(c => c.title === purchase.title);
                                                return course?.badge && course.badge !== 'Normal' && (
                                                    <span className="text-[8px] font-black uppercase text-amber-500 px-1 rounded bg-amber-50 border border-amber-200">
                                                        {course.badge}
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                        <p style={{color:colors.text}} className="text-xs opacity-60 font-bold uppercase tracking-wider">{purchase.type} • Purchased on {purchase.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span style={{color:colors.text}} className="block font-bold text-lg">₹{purchase.price}</span>
                                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest justify-end ${purchase.price === 0 ? 'text-blue-600' : 'text-green-600'}`}>
                                        <CheckCircle2 size={12} /> {purchase.price === 0 ? 'Free' : 'Paid'}
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
                    className="space-y-6"
                >
                    {/* Give Plan Button - At Top */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold" style={{color:colors.text}}>Subscription Plans</h3>
                        <p className="text-xs opacity-60" style={{color:colors.textSecondary}}>Manage user subscription plans</p>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                          style={{ backgroundColor: colors.primary, color: colors.background }}
                        >
                          <Gift size={18} /> Give Plan
                        </button>
                        
                        {/* Dropdown Menu */}
                        {showPlanDropdown && (
                          <div 
                            className="absolute top-full mt-2 right-0 w-80 rounded-lg shadow-xl border z-20"
                            style={{ backgroundColor: colors.background, borderColor: colors.accent + '30' }}
                          >
                            <div className="p-3 border-b" style={{borderColor: colors.accent + '20'}}>
                              <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{color:colors.text}}>
                                Select a Plan to Add
                              </p>
                            </div>
                            <div className="p-2 max-h-96 overflow-y-auto">
                              {subscriptions.filter(plan => plan.status === 'Active').map((plan) => (
                                <button
                                  key={plan.id}
                                  onClick={() => {
                                    // Add new plan to user's subscriptions
                                    const newPlan = {
                                      id: Date.now().toString(),
                                      plan: plan.planType + ' Plan',
                                      price: plan.price,
                                      status: 'Active',
                                      expiryDate: plan.duration === '1 Month' ? '30 Days' : plan.duration,
                                      benefits: plan.benefits,
                                      assignedDate: new Date().toLocaleDateString()
                                    };
                                    
                                    // Check if user.subscription is array, if not make it array
                                    if (user.subscription) {
                                      if (Array.isArray(user.subscription)) {
                                        setUser({...user, subscription: [...user.subscription, newPlan]});
                                      } else {
                                        // Convert single subscription to array and add new one
                                        setUser({...user, subscription: [user.subscription, newPlan]});
                                      }
                                    } else {
                                      setUser({...user, subscription: [newPlan]});
                                    }
                                    
                                    toast.success(`${plan.planType} Plan assigned to ${user.name}!`);
                                    setShowPlanDropdown(false);
                                  }}
                                  className="w-full text-left p-4 rounded-lg hover:bg-opacity-80 transition-all mb-2 border"
                                  style={{
                                    backgroundColor: colors.accent + '10',
                                    borderColor: colors.accent + '20',
                                    color: colors.text
                                  }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-base">{plan.planType} Plan</div>
                                    <div className="text-lg font-black" style={{color:colors.primary}}>₹{plan.price}</div>
                                  </div>
                                  <div className="text-xs opacity-60 mb-2">{plan.duration}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {plan.benefits?.slice(0, 3).map((benefit, idx) => (
                                      <span key={idx} className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                                        {benefit}
                                      </span>
                                    ))}
                                  </div>
                                </button>
                              ))}
                              {subscriptions.filter(plan => plan.status === 'Active').length === 0 && (
                                <div className="p-6 text-center text-sm opacity-60" style={{color:colors.text}}>
                                  No active plans available
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Subscription Cards */}
                    {user.subscription && (Array.isArray(user.subscription) ? user.subscription.length > 0 : true) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(Array.isArray(user.subscription) ? user.subscription : [user.subscription]).map((sub, index) => (
                            <div key={index} className="p-6 rounded-lg border shadow-md" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                  {sub.status}
                                </div>
                                {sub.price && (
                                  <div className="text-xl font-black" style={{color:colors.primary}}>₹{sub.price}</div>
                                )}
                              </div>
                              
                              <h3 className="text-xl font-bold mb-3" style={{color:colors.text}}>{sub.plan}</h3>
                              
                              <div className="space-y-2 mb-4">
                                {sub.benefits?.map((benefit, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm" style={{color:colors.textSecondary}}>
                                    <CheckCircle2 size={14} className="text-green-500 shrink-0" /> 
                                    <span className="line-clamp-1">{benefit}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-3 border-t space-y-1" style={{borderColor: colors.accent + '20'}}>
                                {sub.assignedDate && (
                                  <p className="text-xs opacity-60" style={{color:colors.textSecondary}}>
                                    Assigned: <span className="font-semibold" style={{color:colors.text}}>{sub.assignedDate}</span>
                                  </p>
                                )}
                                <p className="text-xs opacity-60" style={{color:colors.textSecondary}}>
                                  Valid Until: <span className="font-semibold" style={{color:colors.text}}>{sub.expiryDate}</span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border rounded-lg border-dashed" style={{ borderColor: colors.accent + '30', backgroundColor: colors.sidebar || colors.background }}>
                          <CreditCard size={48} className="mx-auto mb-3 opacity-30" style={{color:colors.text}} />
                          <p className="font-semibold opacity-60" style={{color:colors.text}}>No subscription plans assigned</p>
                          <p className="text-xs opacity-40 mt-2" style={{color:colors.textSecondary}}>Click "Give Plan" to assign a plan</p>
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
                        <div className="p-6 rounded border shadow-sm" style={{ borderColor: colors.accent + '20', backgroundColor:colors.sidebar }}>
                            <span className="block text-xs font-bold opacity-70 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Total Balance</span>
                            <span className="text-3xl text-green-600 font-bold">₹{user.wallet?.balance || 0}</span>
                        </div>
                        <div className="p-6 rounded border shadow-sm" style={{ borderColor: colors.accent + '20',backgroundColor:colors.sidebar }}>
                            <span className="block text-xs font-bold opacity-50 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Total Earnings</span>
                            <span className="text-3xl font-bold text-green-600">+₹{user.wallet?.earnings || 0}</span>
                        </div>
                        <div className="p-6 rounded border shadow-sm" style={{ borderColor: colors.accent + '20',backgroundColor:colors.sidebar }}>
                            <span className="block text-xs font-bold opacity-50 uppercase tracking-widest mb-1" style={{ color: colors.text }}>Withdrawn</span>
                            <span className="text-3xl font-bold text-red-500">-₹{user.wallet?.withdrawn || 0}</span>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="rounded border overflow-hidden" style={{ borderColor: colors.accent + '20', backgroundColor: colors.sidebar || colors.background }}>
                        <div className="p-4 border-b font-bold text-sm uppercase tracking-widest opacity-60" style={{ borderColor: colors.accent + '20',color:colors.text }}>Transaction History</div>
                        <div className="divide-y" style={{ divideColor: colors.accent + '10' }}>
                            {user.wallet?.transactions?.length > 0 ? (
                                user.wallet.transactions.map((txn, i) => (
                                    <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-black/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${txn.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {txn.type === 'Credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                            </div>
                                            <div style={{color:colors.text}}>
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
