import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { IndianRupee, Download, CheckCircle2, Clock, Calendar } from 'lucide-react';

function Salary() {
  const { colors } = useTheme();
  
  const salaryHistory = [
    { id: '1', month: 'December 2023', amount: 45000, status: 'Paid', date: '2023-12-31' },
    { id: '2', month: 'November 2023', amount: 42500, status: 'Paid', date: '2023-11-30' },
    { id: '3', month: 'October 2023', amount: 48000, status: 'Paid', date: '2023-10-31' },
    { id: '4', month: 'September 2023', amount: 35000, status: 'Paid', date: '2023-09-30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: colors.text }}>Salary Management</h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Track your monthly payouts and payment history</p>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold transition-all hover:shadow-lg active:scale-95" style={{ backgroundColor: colors.primary }}>
            <Download size={14} /> Download Annual Statement
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 rounded border shadow-sm bg-primary/5" style={{ backgroundColor: colors.primary + '05', borderColor: colors.primary + '20' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1" style={{ color: colors.text }}>Next Payout Date</p>
            <h3 className="text-2xl font-black mb-4" style={{ color: colors.text }}>Jan 31, 2024</h3>
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                <Clock size={14} /> 25 Days to go
            </div>
        </div>
        <div className="md:col-span-1 p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1" style={{ color: colors.text }}>Base Salary (Monthly)</p>
            <h3 className="text-2xl font-black" style={{ color: colors.text }}>₹40,000</h3>
        </div>
        <div className="md:col-span-1 p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1" style={{ color: colors.text }}>Variable Pay / Bonus</p>
            <h3 className="text-2xl font-black" style={{ color: colors.text }}>₹5,000</h3>
        </div>
      </div>

      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
         <div className="p-4 border-b bg-black/5" style={{ borderColor: colors.accent + '10' }}>
             <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest" style={{ color: colors.text }}>Payout History</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b text-[10px] font-black uppercase tracking-wider opacity-40" style={{ borderColor: colors.accent + '10', color: colors.text }}>
                        <th className="p-4">Month</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Payment Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {salaryHistory.map((item) => (
                        <tr key={item.id} className="border-b transition-colors hover:bg-black/5" style={{ borderColor: colors.accent + '05', color: colors.text }}>
                            <td className="p-4 text-sm font-bold">{item.month}</td>
                            <td className="p-4 text-sm font-black">₹{item.amount.toLocaleString()}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-1 opacity-60 text-xs font-medium">
                                    <Calendar size={12} /> {item.date}
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase tracking-tighter">
                                    <CheckCircle2 size={12} /> {item.status}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <button className="p-2 rounded hover:bg-black/5 text-primary opacity-60 hover:opacity-100 transition-all cursor-pointer">
                                    <Download size={16} />
                                </button>
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

export default Salary;
