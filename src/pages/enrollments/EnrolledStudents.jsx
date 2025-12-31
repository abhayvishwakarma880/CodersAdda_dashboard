import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { Users, Eye, Mail, Phone, Calendar, BookOpen, Briefcase, CreditCard, FileText, IndianRupee, Hash, Clock, X, CheckCircle, GraduationCap, Building2 } from 'lucide-react';

function EnrolledStudents() {
  const { colors } = useTheme();
  const { service } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { courseEnrollments, ebookEnrollments, jobEnrollments, subscriptionEnrollments } = useData();
  const [activeTab, setActiveTab] = useState('free');

  const currentService = service || (location.pathname.includes('/courses/') ? 'courses' : 
                                   location.pathname.includes('/ebooks/') ? 'ebooks' : 
                                   location.pathname.includes('/jobs/') ? 'jobs' : 
                                   location.pathname.includes('/subscriptions/') ? 'subscriptions' : 'courses');

  const getServiceData = () => {
    switch(currentService) {
      case 'courses': return courseEnrollments;
      case 'ebooks': return ebookEnrollments;
      case 'jobs': return jobEnrollments;
      case 'subscriptions': return subscriptionEnrollments;
      default: return [];
    }
  };

  const getServiceIcon = () => {
    switch(currentService) {
      case 'courses': return <FileText size={20} />;
      case 'ebooks': return <BookOpen size={20} />;
      case 'jobs': return <Briefcase size={20} />;
      case 'subscriptions': return <CreditCard size={20} />;
      default: return <Users size={20} />;
    }
  };

  const getServiceName = () => {
    switch(currentService) {
      case 'courses': return 'Course';
      case 'ebooks': return 'E-Book';
      case 'jobs': return 'Job';
      case 'subscriptions': return 'Subscription';
      default: return 'Service';
    }
  };

  const getServiceItemName = (item) => {
    switch(currentService) {
      case 'courses': return item.courseName;
      case 'ebooks': return item.ebookName;
      case 'jobs': return item.jobTitle;
      case 'subscriptions': return item.planName;
      default: return 'Unknown';
    }
  };

  const serviceData = getServiceData();
  const freeEnrollments = serviceData.filter(item => item.type === 'free');
  const paidEnrollments = serviceData.filter(item => item.type === 'paid');
  const completedEnrollments = serviceData.filter(item => item.type === 'completed');

  const renderStudentTable = (students, type) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b" style={{ borderColor: colors.accent + '20' }}>
            <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>Student Name</th>
            <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>{getServiceName()}</th>
            <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>Contact</th>
            <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>{type === 'completed' ? 'Completed On' : 'Enrolled Date'}</th>
            {type !== 'completed' && <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>Expiry Date</th>}
            <th className="text-left p-4 font-bold text-sm" style={{ color: colors.text }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: colors.accent + '10' }}>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: colors.text }}>{student.name}</p>
                    <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{student.college}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <p className="font-bold text-sm" style={{ color: colors.text }}>{getServiceItemName(student)}</p>
                <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>
                   {type === 'paid' ? `₹${student.price}` : type === 'completed' ? 'Success' : 'Free Access'}
                </p>
              </td>
              <td className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
                    <Mail size={12} /> {student.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
                    <Phone size={12} /> {student.phone}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
                  <Calendar size={12} /> {type === 'completed' ? student.completedDate : student.enrolledDate}
                </div>
              </td>
              {type !== 'completed' && (
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
                    <Calendar size={12} /> {student.expiryDate}
                  </div>
                </td>
              )}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 cursor-pointer rounded hover:bg-opacity-20 transition-colors"
                    style={{ color: colors.primary }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '20'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => {
                      navigate(`${location.pathname}/view/${student.id}`);
                    }}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  {type === 'completed' && !student.isCertificateGenerated && (
                    <button 
                      className="px-3 cursor-pointer py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                      style={{ 
                        backgroundColor: colors.primary, 
                        color: colors.background,
                        boxShadow: `0 4px 14px ${colors.primary}40`
                      }}
                      onClick={() => {
                        navigate('/dashboard/courses/generate-certificate', { 
                          state: { 
                            enrollmentId: student.id,
                            studentName: student.name,
                            courseName: student.courseName,
                            completedOn: student.completedDate
                          } 
                        });
                      }}
                    >
                      <GraduationCap size={14} /> Generate Certificate
                    </button>
                  )}
                  {type === 'completed' && student.isCertificateGenerated && (
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                        <CheckCircle size={12} /> Generated
                      </span>
                      <button 
                        className="text-[10px] font-bold opacity-60 hover:opacity-100 underline decoration-dotted transition-all cursor-pointer"
                        style={{ color: colors.primary }}
                        onClick={() => {
                          navigate('/dashboard/courses/generate-certificate', { 
                            state: { 
                              enrollmentId: student.id,
                              studentName: student.name,
                              courseName: student.courseName,
                              completedOn: student.completedDate,
                              existingConfig: student.certificateConfig
                            } 
                          });
                        }}
                      >
                        Edit Certificate
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg" style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
          {getServiceIcon()}
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            {getServiceName()} Enrolled Students
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>
            Manage Student Enrollments & Transactions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                Free Enrolled 
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{freeEnrollments.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                Paid Enrolled 
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{paidEnrollments.length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users size={24} />
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                {currentService === 'courses' ? 'Completed' : 'Total Revenue'}
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                {currentService === 'courses' ? completedEnrollments.length : `₹${paidEnrollments.reduce((sum, item) => sum + item.price, 0)}`}
              </p>
            </div>
            <div className={`p-3 rounded-full ${currentService === 'courses' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
              {currentService === 'courses' ? <GraduationCap size={24} /> : <IndianRupee size={24} />}
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-60 uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                Total Students
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{serviceData.length}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('free')}
          className={`px-6 cursor-pointer py-3 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'free' ? 'shadow-md' : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            backgroundColor: activeTab === 'free' ? colors.primary : 'transparent',
            color: activeTab === 'free' ? colors.background : colors.text,
            border: activeTab === 'free' ? 'none' : `1px solid ${colors.accent}20`
          }}
        >
          Free Enrollments ({freeEnrollments.length})
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-6 cursor-pointer py-3 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'paid' ? 'shadow-md' : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            backgroundColor: activeTab === 'paid' ? colors.primary : 'transparent',
            color: activeTab === 'paid' ? colors.background : colors.text,
            border: activeTab === 'paid' ? 'none' : `1px solid ${colors.accent}20`
          }}
        >
          Paid Enrollments ({paidEnrollments.length})
        </button>
        {currentService === 'courses' && (
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 cursor-pointer py-3 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'completed' ? 'shadow-md' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'completed' ? colors.primary : 'transparent',
              color: activeTab === 'completed' ? colors.background : colors.text,
              border: activeTab === 'completed' ? 'none' : `1px solid ${colors.accent}20`
            }}
          >
            Complete Course ({completedEnrollments.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
        {activeTab === 'free' ? renderStudentTable(freeEnrollments, 'free') : 
         activeTab === 'paid' ? renderStudentTable(paidEnrollments, 'paid') :
         renderStudentTable(completedEnrollments, 'completed')}
      </div>

      {/* Empty State */}
      {serviceData.length === 0 && (
        <div className="text-center py-20 border rounded-lg border-dashed" style={{ borderColor: colors.accent + '30', backgroundColor: colors.sidebar }}>
          {getServiceIcon()}
          <p className="font-semibold opacity-60 mt-4" style={{ color: colors.text }}>No {getServiceName().toLowerCase()} enrollments found</p>
          <p className="text-xs opacity-40 mt-2" style={{ color: colors.textSecondary }}>Students will appear here once they enroll</p>
        </div>
      )}
    </div>
  );
}

export default EnrolledStudents;
