import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Briefcase, TrendingUp, Users, Clock, Filter, CheckCircle, XCircle } from 'lucide-react';

function JobSales() {
  const { colors } = useTheme();
  const { jobs } = useData();
  const [filterType, setFilterType] = useState('By Week');

  // Logic for filterable stats
  const getStats = () => {
    const statsMap = {
      'By Day': [
        { title: 'Total Jobs', value: jobs.length, icon: Briefcase, color: '#f59e0b' },
        { title: 'Today Revenue', value: '₹5,800', icon: TrendingUp, color: '#10b981' },
        { title: 'Companies', value: '12+', icon: Users, color: '#3b82f6' }
      ],
      'By Week': [
        { title: 'Total Jobs', value: jobs.length, icon: Briefcase, color: '#f59e0b' },
        { title: 'Weekly Revenue', value: '₹40,000', icon: TrendingUp, color: '#10b981' },
        { title: 'Companies', value: '45+', icon: Users, color: '#3b82f6' }
      ],
      'By Month': [
        { title: 'Total Jobs', value: jobs.length, icon: Briefcase, color: '#f59e0b' },
        { title: 'Monthly Revenue', value: '₹1,60,000', icon: TrendingUp, color: '#10b981' },
        { title: 'Companies', value: '85+', icon: Users, color: '#3b82f6' }
      ]
    };
    return statsMap[filterType];
  };

  const stats = getStats();

  const lineChartOptions = {
    chart: { type: 'spline', backgroundColor: 'transparent' },
    title: { text: 'Job Postings Revenue Trends', style: { color: colors.text } },
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
      data: filterType === 'By Day' ? [1200, 1800, 2200, 1900, 3100, 3500, 3000] :
            filterType === 'By Week' ? [12000, 25000, 32000, 26000] :
            [45000, 58000, 75000, 68000, 82000, 95000],
      color: '#f59e0b'
    }],
    credits: { enabled: false }
  };

  const pieChartOptions = {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: 'Job Postings by Industry', style: { color: colors.text } },
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
      name: 'Jobs',
      data: [
        { name: 'IT & Software', y: 60, color: '#f59e0b' },
        { name: 'Marketing', y: 20, color: '#3b82f6' },
        { name: 'Sales', y: 10, color: '#10b981' },
        { name: 'Other', y: 10, color: '#8b5cf6' }
      ]
    }],
    credits: { enabled: false }
  };

  const successTransactions = [
    { id: 'TXN301', student: 'Google', mobile: '+91 9000012345', ebook: 'Full Stack Dev Posting', amount: '₹14,999', date: '2023-12-28', status: 'Success' },
    { id: 'TXN302', student: 'Microsoft', mobile: '+91 9000054321', ebook: 'Azure Admin Posting', amount: '₹12,499', date: '2023-12-28', status: 'Success' },
  ];

  const failedTransactions = [
    { id: 'TXN303', student: 'Unknown Startup', mobile: '+91 9000099999', ebook: 'Web Designer Posting', amount: '₹4,999', date: '2023-12-27', status: 'Failed', remark: 'Transaction Cancelled' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Job Sales</h1>
          <p className="opacity-60 text-sm" style={{ color: colors.textSecondary }}>Detailed analytics for job postings</p>
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
                <th className="p-3 text-xs font-black uppercase opacity-60">Company Name</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Mobile</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Job Category</th>
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
                <th className="p-3 text-xs font-black uppercase opacity-60">Company Name</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Mobile</th>
                <th className="p-3 text-xs font-black uppercase opacity-60">Job Category</th>
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

export default JobSales;
