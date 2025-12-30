import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BookOpen, TrendingUp, Users, Clock, Filter, CheckCircle, XCircle } from 'lucide-react';

function CourseSales() {
  const { colors } = useTheme();
  const { courses, users } = useData();
  const [filterType, setFilterType] = useState('By Week');

  // Logic for filterable stats
  const getStats = () => {
    const statsMap = {
      'By Day': [
        { title: 'Total Courses', value: courses.length, icon: BookOpen, color: '#10b981' },
        { title: 'Today Revenue', value: '₹12,450', icon: TrendingUp, color: '#3b82f6' },
        { title: 'Today Students', value: '25+', icon: Users, color: '#f59e0b' }
      ],
      'By Week': [
        { title: 'Total Courses', value: courses.length, icon: BookOpen, color: '#10b981' },
        { title: 'Weekly Revenue', value: '₹85,000', icon: TrendingUp, color: '#3b82f6' },
        { title: 'Weekly Students', value: '180+', icon: Users, color: '#f59e0b' }
      ],
      'By Month': [
        { title: 'Total Courses', value: courses.length, icon: BookOpen, color: '#10b981' },
        { title: 'Monthly Revenue', value: '₹3,45,000', icon: TrendingUp, color: '#3b82f6' },
        { title: 'Monthly Students', value: '750+', icon: Users, color: '#f59e0b' }
      ]
    };
    return statsMap[filterType];
  };

  const stats = getStats();

  // Logic for Line Chart (Trends)
  const lineChartOptions = {
    chart: { type: 'spline', backgroundColor: 'transparent' },
    title: { text: 'Course Sales Trends', style: { color: colors.text } },
    xAxis: {
      categories: filterType === 'By Day' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : 
                 filterType === 'By Week' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : 
                 ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { color: colors.textSecondary } }
    },
    yAxis: {
      title: { text: 'Revenue (₹)', style: { color: colors.textSecondary } },
      gridLineColor: colors.accent + '20',
      labels: { style: { color: colors.textSecondary } }
    },
    series: [{
      name: 'Revenue',
      data: filterType === 'By Day' ? [2000, 3500, 2800, 4200, 3800, 5500, 4800] :
            filterType === 'By Week' ? [15000, 28000, 35000, 32000] :
            [85000, 92000, 110000, 95000, 120000, 135000],
      color: colors.primary
    }],
    credits: { enabled: false }
  };

  // Logic for Pie Chart (Distribution)
  const pieChartOptions = {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: 'Course Distribution by Category', style: { color: colors.text } },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
          style: { color: colors.text }
        }
      }
    },
    series: [{
      name: 'Courses',
      data: [
        { name: 'Web Development', y: 45, color: '#10b981' },
        { name: 'App Development', y: 25, color: '#3b82f6' },
        { name: 'Data Science', y: 15, color: '#f59e0b' },
        { name: 'UI/UX Design', y: 15, color: '#8b5cf6' }
      ]
    }],
    credits: { enabled: false }
  };

  // Dummy Transaction Table Data
  const successTransactions = [
    { id: 'TXN001', student: 'Amit Sharma', mobile: '+91 9876543210', course: 'Full Stack Web Dev', badge: 'Trending Course', amount: '₹4,999', date: '2023-12-25', status: 'Success' },
    { id: 'TXN002', student: 'Priya Patel', mobile: '+91 8765432109', course: 'React Native Bio', badge: 'Popular Course', amount: '₹2,499', date: '2023-12-26', status: 'Success' },
    { id: 'TXN003', student: 'Rahul Gupta', mobile: '+91 7654321098', course: 'Python for DS', badge: 'Top Course', amount: '₹3,200', date: '2023-12-27', status: 'Success' },
  ];

  const failedTransactions = [
    { id: 'TXN004', student: 'Suresh Kumar', mobile: '+91 6543210987', course: 'Machine Learning', amount: '₹5,500', date: '2023-12-24', status: 'Failed', remark: 'Internet Problem' },
    { id: 'TXN005', student: 'Anjali Singh', mobile: '+91 5432109876', course: 'UI/UX Advanced', amount: '₹1,999', date: '2023-12-25', status: 'Failed', remark: 'Low Balance' },
    { id: 'TXN006', student: 'Vikram Mehta', mobile: '+91 4321098765', course: 'Node.js Masterclass', amount: '₹3,499', date: '2023-12-26', status: 'Failed', remark: 'Bank Server Down' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Course Sales</h1>
          <p className="opacity-60 text-sm" style={{ color: colors.textSecondary }}>Detailed analytics for course purchases</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Global Filter:</span>
            <div className="flex bg-black/5 p-1 rounded-lg">
                {['By Day', 'By Week', 'By Month'].map(f => (
                    <button 
                    key={f} 
                    onClick={() => setFilterType(f)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${filterType === f ? 'shadow-sm' : 'opacity-40 hover:opacity-100'}`}
                    style={{ 
                        backgroundColor: filterType === f ? colors.primary : 'transparent', 
                        color: filterType === f ? colors.background : colors.text 
                    }}
                    >
                    {f}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-xl border shadow-sm transition-all hover:scale-[1.02]" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: stat.color + '20' }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.title}</p>
            <h2 className="text-3xl font-black mt-1" style={{ color: colors.text }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <h3 className="font-bold text-lg mb-6" style={{ color: colors.text }}>Sales Trends ({filterType})</h3>
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </div>

        <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
      </div>

      {/* Success Transactions Table */}
      <div className="p-6 rounded-xl border shadow-sm overflow-hidden" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: colors.text }}>
           <CheckCircle className="text-green-500" size={20} /> Success Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.accent + '10' }}>
                <th className="p-3 text-xs font-black uppercase opacity-60">TXN ID</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Student Name</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Mobile</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Course</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Amount</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Date</th>
                <th className="p-3 text-xs font-black uppercase opacity-60 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {successTransactions.map(txn => (
                <tr key={txn.id} className="border-b last:border-0 hover:bg-black/5 transition-colors" style={{ borderColor: colors.accent + '05' }}>
                  <td className="p-3 font-bold opacity-60">{txn.id}</td>
                  <td className="p-3 font-bold">{txn.student}</td>
                  <td className="p-3 font-medium opacity-70">{txn.mobile}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold">{txn.course}</span>
                      {txn.badge && txn.badge !== 'Normal' && (
                        <span className="text-[8px] font-black uppercase text-amber-600 w-fit px-1 rounded bg-amber-50">
                          {txn.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-green-600">{txn.amount}</td>
                  <td className="p-3 opacity-60">{txn.date}</td>
                  <td className="p-3">
                    <span className="block mx-auto w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase">Success</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failed Transactions Table */}
      <div className="p-6 rounded-xl border shadow-sm overflow-hidden" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: colors.text }}>
           <XCircle className="text-red-500" size={20} /> Failed Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.accent + '10' }}>
                <th className="p-3 text-xs font-black uppercase opacity-60">TXN ID</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Student Name</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Mobile</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Course</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Amount</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Date</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Remark</th>
                <th className="p-3 text-xs font-black uppercase opacity-60 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {failedTransactions.map(txn => (
                <tr key={txn.id} className="border-b last:border-0 hover:bg-black/5 transition-colors" style={{ borderColor: colors.accent + '05' }}>
                  <td className="p-3 font-bold opacity-60">{txn.id}</td>
                  <td className="p-3 font-bold">{txn.student}</td>
                  <td className="p-3 font-medium opacity-70">{txn.mobile}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold">{txn.course}</span>
                      {txn.badge && txn.badge !== 'Normal' && (
                        <span className="text-[8px] font-black uppercase text-amber-600 w-fit px-1 rounded bg-amber-50">
                          {txn.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-red-600">{txn.amount}</td>
                  <td className="p-3 opacity-60">{txn.date}</td>
                  <td className="p-3 text-red-500/70 font-medium italic">{txn.remark}</td>
                  <td className="p-3">
                    <span className="block mx-auto w-fit px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase">Failed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseSales;
