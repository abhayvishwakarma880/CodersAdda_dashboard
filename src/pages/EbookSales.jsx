import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Book, TrendingUp, Users, Clock, Filter, CheckCircle, XCircle } from 'lucide-react';

function EbookSales() {
  const { colors } = useTheme();
  const { ebooks } = useData();
  const [filterType, setFilterType] = useState('By Week');

  // Logic for filterable stats
  const getStats = () => {
    const statsMap = {
      'By Day': [
        { title: 'Total Ebooks', value: ebooks.length, icon: Book, color: '#3b82f6' },
        { title: 'Today Revenue', value: '₹3,200', icon: TrendingUp, color: '#10b981' },
        { title: 'Today Readers', value: '45+', icon: Users, color: '#8b5cf6' }
      ],
      'By Week': [
        { title: 'Total Ebooks', value: ebooks.length, icon: Book, color: '#3b82f6' },
        { title: 'Weekly Revenue', value: '₹22,000', icon: TrendingUp, color: '#10b981' },
        { title: 'Weekly Readers', value: '320+', icon: Users, color: '#8b5cf6' }
      ],
      'By Month': [
        { title: 'Total Ebooks', value: ebooks.length, icon: Book, color: '#3b82f6' },
        { title: 'Monthly Revenue', value: '₹88,000', icon: TrendingUp, color: '#10b981' },
        { title: 'Monthly Readers', value: '1,200+', icon: Users, color: '#8b5cf6' }
      ]
    };
    return statsMap[filterType];
  };

  const stats = getStats();

  const lineChartOptions = {
    chart: { type: 'spline', backgroundColor: 'transparent' },
    title: { text: 'Ebook Sales Trends', style: { color: colors.text } },
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
      data: filterType === 'By Day' ? [800, 1200, 1500, 1100, 2100, 2500, 1800] :
            filterType === 'By Week' ? [8500, 12000, 15000, 9500] :
            [25000, 32000, 41000, 38000, 45000, 52000],
      color: '#3b82f6'
    }],
    credits: { enabled: false }
  };

  const pieChartOptions = {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: 'Ebook Distribution by Theme', style: { color: colors.text } },
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
      name: 'Ebooks',
      data: [
        { name: 'Programming', y: 55, color: '#3b82f6' },
        { name: 'Interview Prep', y: 25, color: '#10b981' },
        { name: 'Design', y: 10, color: '#f59e0b' },
        { name: 'Business', y: 10, color: '#8b5cf6' }
      ]
    }],
    credits: { enabled: false }
  };

  const successTransactions = [
    { id: 'TXN201', student: 'Rohan Mehra', mobile: '+91 9988776655', ebook: 'Mastering JavaScript', amount: '₹499', date: '2023-12-28', status: 'Success' },
    { id: 'TXN202', student: 'Sneha Rao', mobile: '+91 8877665544', ebook: 'Python Basics', amount: '₹299', date: '2023-12-28', status: 'Success' },
  ];

  const failedTransactions = [
    { id: 'TXN203', student: 'Karan Johar', mobile: '+91 7766554433', ebook: 'React Hooks', amount: '₹599', date: '2023-12-27', status: 'Failed', remark: 'Wrong PIN' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Ebook Sales</h1>
          <p className="opacity-60 text-sm" style={{ color: colors.textSecondary }}>Detailed analytics for ebook purchases</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <h3 className="font-bold text-lg mb-6" style={{ color: colors.text }}>Sales Trends ({filterType})</h3>
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </div>
        <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20' }}>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
      </div>

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
                <th className="p-3 text-xs font-black uppercase opacity-60">Ebook</th>
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
                  <td className="p-3">{txn.ebook}</td>
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
                <th className="p-3 text-xs font-black uppercase opacity-60">Ebook</th>
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
                  <td className="p-3">{txn.ebook}</td>
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

export default EbookSales;
