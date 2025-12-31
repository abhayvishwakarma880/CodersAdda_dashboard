import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { 
  Users, Mail, Phone, Calendar, BookOpen, Briefcase, 
  CreditCard, FileText, IndianRupee, Hash, Clock, 
  X, CheckCircle, GraduationCap, Building2, ArrowLeft 
} from 'lucide-react';

function ViewEnrolledStudent() {
  const { colors } = useTheme();
  const { service, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseEnrollments, ebookEnrollments, jobEnrollments, subscriptionEnrollments } = useData();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let data = [];
    if (location.pathname.includes('/courses/')) data = courseEnrollments;
    else if (location.pathname.includes('/ebooks/')) data = ebookEnrollments;
    else if (location.pathname.includes('/jobs/')) data = jobEnrollments;
    else if (location.pathname.includes('/subscriptions/')) data = subscriptionEnrollments;

    const found = data.find(s => s.id === id);
    setStudent(found);
  }, [id, service, courseEnrollments, ebookEnrollments, jobEnrollments, subscriptionEnrollments, location.pathname]);

  const getServiceName = () => {
    if (location.pathname.includes('/courses/')) return 'Course';
    if (location.pathname.includes('/ebooks/')) return 'E-Book';
    if (location.pathname.includes('/jobs/')) return 'Job';
    if (location.pathname.includes('/subscriptions/')) return 'Subscription';
    return 'Service';
  };

  const getServiceItemName = (item) => {
    if (location.pathname.includes('/courses/')) return item.courseName;
    if (location.pathname.includes('/ebooks/')) return item.ebookName;
    if (location.pathname.includes('/jobs/')) return item.jobTitle;
    if (location.pathname.includes('/subscriptions/')) return item.planName;
    return 'Unknown';
  };

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: colors.text }}>
        <p className="text-xl font-bold opacity-60">Student Enrollment Not Found</p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
            style={{ backgroundColor: colors.accent + '20', color: colors.text }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.text }}>View Enrollment</h1>
            <p className="text-xs font-bold opacity-40 uppercase tracking-widest" style={{ color: colors.textSecondary }}>
              Details for {student.name}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-2xl border text-center shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-4xl shadow-lg ring-4 ring-offset-4 ring-offset-transparent" style={{ backgroundColor: colors.primary + '20', color: colors.primary, ringColor: colors.primary + '40' }}>
              {student.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: colors.text }}>{student.name}</h2>
            <p className="text-sm opacity-60 mb-4" style={{ color: colors.textSecondary }}>{student.college}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${student.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${student.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></div>
              {student.status}
            </div>
          </div>

          <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <h3 className="font-bold text-xs uppercase tracking-widest opacity-40 mb-4" style={{ color: colors.textSecondary }}>Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colors.accent + '10', color: colors.primary }}>
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase opacity-40 font-bold" style={{ color: colors.textSecondary }}>Email</p>
                  <p className="text-sm font-semibold truncate" style={{ color: colors.text }}>{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colors.accent + '10', color: colors.primary }}>
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-40 font-bold" style={{ color: colors.textSecondary }}>Phone</p>
                  <p className="text-sm font-semibold" style={{ color: colors.text }}>{student.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Enrollment & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-2xl border shadow-sm h-full" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <div className="flex items-center gap-3 mb-8 border-b pb-4" style={{ borderColor: colors.accent + '20' }}>
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <CreditCard size={20} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Payment & Service Details</h3>
            </div>

            <div className={`grid grid-cols-1 ${student.type === 'free' ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-y-8 gap-x-12`}>
              <div>
                <p className="text-xs font-bold uppercase opacity-40 tracking-wider mb-2" style={{ color: colors.textSecondary }}>{getServiceName()} Enrolled</p>
                <div className="flex items-start gap-3">
                   <div className="mt-1 text-primary"><FileText size={18} style={{ color: colors.primary }} /></div>
                   <p className="font-bold text-lg leading-tight" style={{ color: colors.text }}>{getServiceItemName(student)}</p>
                </div>
              </div>

              {student.type !== 'free' && (
                <>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-40 tracking-wider mb-2" style={{ color: colors.textSecondary }}>Transaction ID</p>
                    <p className="font-mono text-sm font-bold bg-gray-100 dark:bg-gray-800 p-2 rounded inline-block" style={{ color: colors.primary }}>
                      {student.transactionId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase opacity-40 tracking-wider mb-2" style={{ color: colors.textSecondary }}>Price Breakdown</p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-black text-green-600">₹{student.price}</p>
                        <p className="text-[10px] font-bold opacity-40" style={{ color: colors.textSecondary }}>Final Price</p>
                      </div>
                      {student.originalPrice > student.price && (
                        <div>
                          <p className="text-lg font-bold opacity-40 line-through" style={{ color: colors.text }}>₹{student.originalPrice}</p>
                          <p className="text-[10px] font-bold opacity-40" style={{ color: colors.textSecondary }}>Original</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase opacity-40 tracking-wider mb-2" style={{ color: colors.textSecondary }}>Payment Info</p>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">
                        {student.paymentMode}
                      </div>
                      <div className="px-3 py-1 bg-green-50 text-green-600 rounded text-xs font-bold">
                        {student.paymentStatus}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border" style={{ borderColor: colors.accent + '10', backgroundColor: colors.background }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold opacity-40 uppercase" style={{ color: colors.textSecondary }}>Enrollment Date</p>
                    <p className="text-lg font-bold" style={{ color: colors.text }}>{student.enrolledDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold opacity-40 uppercase" style={{ color: colors.textSecondary }}>Expiry Date</p>
                    <p className="text-lg font-bold" style={{ color: colors.text }}>{student.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEnrolledStudent;
