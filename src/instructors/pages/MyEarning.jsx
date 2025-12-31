import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { IndianRupee, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, Share2 } from 'lucide-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function MyEarning() {
  const { colors } = useTheme();
  
  const earningsData = [
    { title: 'Current Balance', value: '₹12,850', icon: Wallet, color: '#3b82f6', change: '+₹850 today' },
    { title: 'Total Revenue', value: '₹2,45,000', icon: IndianRupee, color: '#10b981', change: '+12% this month' },
    { title: 'Avg. per Sale', value: '₹1,200', icon: TrendingUp, color: '#f59e0b', change: 'Maintained' },
  ];

  const transactionChart = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 300 },
    title: { text: '' },
    xAxis: { 
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: { style: { color: colors.textSecondary } }
    },
    yAxis: { 
        title: { text: '' },
        labels: { style: { color: colors.textSecondary } },
        gridLineColor: colors.accent + '10'
    },
    series: [{
      name: 'Daily Revenue',
      data: [850, 1200, 950, 1500, 2200, 3100, 2800],
      color: colors.primary,
      borderRadius: 4
    }],
    legend: { enabled: false },
    credits: { enabled: false }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: colors.text }}>Earnings & Analytics</h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Detailed breakdown of your commission and sales</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded border text-xs font-bold transition-all hover:bg-black/5 cursor-pointer" style={{ borderColor: colors.accent + '20', color: colors.text }}>
                <Share2 size={14} /> Export Report
            </button>
            <button className="px-4 py-2 rounded bg-primary text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer" style={{ backgroundColor: colors.primary }}>
                Request Payout
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {earningsData.map((card, i) => (
            <div key={i} className="p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '10' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded bg-opacity-10" style={{ backgroundColor: card.color + '15', color: card.color }}>
                        <card.icon size={20} />
                    </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1" style={{ color: colors.text }}>{card.title}</p>
                <h3 className="text-2xl font-black mb-1" style={{ color: colors.text }}>{card.value}</h3>
                <span className="text-[10px] font-bold" style={{ color: card.color }}>{card.change}</span>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-6" style={{ color: colors.text }}>Weekly Revenue Trend</h3>
                <HighchartsReact highcharts={Highcharts} options={transactionChart} />
            </div>

            <div className="p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-6" style={{ color: colors.text }}>Recent Earning Events</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Sale: Python for Beginners', amt: '+₹499', type: 'in', date: 'Today, 02:45 PM' },
                        { title: 'Sale: MERN Stack Hackathon', amt: '+₹1,299', type: 'in', date: 'Today, 11:15 AM' },
                        { title: 'TDS Deduction (Dec Payout)', amt: '-₹4,500', type: 'out', date: 'Dec 31, 2023' },
                        { title: 'Bonus: Top Rated Instructor', amt: '+₹5,000', type: 'in', date: 'Dec 30, 2023' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded bg-black/5">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full border ${item.type === 'in' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'}`}>
                                    {item.type === 'in' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: colors.text }}>{item.title}</p>
                                    <span className="text-[10px] opacity-40 font-medium">{item.date}</span>
                                </div>
                            </div>
                            <span className={`text-sm font-black ${item.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>{item.amt}</span>
                        </div>
                    ))}
                </div>
            </div>
      </div>
    </div>
  );
}

export default MyEarning;
