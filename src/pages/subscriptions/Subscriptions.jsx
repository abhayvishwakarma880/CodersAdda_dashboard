import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { Plus, Search, Eye, Edit, Trash2, CreditCard, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Toggle from '../../components/ui/Toggle';

function Subscriptions() {
  const { colors } = useTheme();
  const { subscriptions, deleteSubscription, updateSubscription } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Plan?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: colors.primary,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubscription(id);
        toast.success('Subscription plan deleted');
      }
    });
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
    updateSubscription(id, { status: newStatus });
    toast.info(`Plan ${newStatus}`);
  };

  const filteredPlans = subscriptions.filter(plan => 
    plan.planType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.price.toString().includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Subscription Plans</h1>
          <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Manage access tiers and pricing</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/subscriptions/add')}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          <Plus size={18} /> Add New Plan
        </button>
      </div>

      <div className="p-6 rounded border shadow-sm mb-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input 
            type="text"
            placeholder="Search by plan type or price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded border outline-none transition-all text-sm"
            style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
          />
        </div>
      </div>

      <div className="rounded border overflow-hidden shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.accent + '10',color: colors.text }}>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Plan Details</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Duration</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60">Price</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60 text-center">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider opacity-60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length > 0 ? filteredPlans.map((plan) => (
                <tr key={plan.id} className="border-b transition-colors hover:bg-black/5" style={{ borderColor: colors.accent + '05' }}>
                  <td className="p-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded flex items-center justify-center bg-primary/10" style={{ color: colors.primary }}>
                        <CreditCard size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm" style={{ color: colors.text }}>{plan.planType} Plan</span>
                        <span className="text-[10px] opacity-50 font-bold" style={{color:colors.textSecondary}}>{plan.benefits?.length || 0} Benefits included</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex items-center gap-1.5 opacity-60 text-xs font-bold" style={{ color: colors.text }}>
                      <Clock size={14} className="text-primary" style={{ color: colors.primary }} />
                      {plan.duration}
                    </div>
                  </td>
                  <td className="p-4 py-5">
                    <span className="font-black text-sm" style={{ color: colors.text }}>₹{plan.price}</span>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex justify-center items-center gap-2">
                        <Toggle active={plan.status === 'Active'} onClick={() => toggleStatus(plan.id, plan.status)} />
                        <span className={`text-[9px] font-black uppercase tracking-wider ${plan.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                            {plan.status}
                        </span>
                    </div>
                  </td>
                  <td className="p-4 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => navigate(`/dashboard/subscriptions/view/${plan.id}`)}
                        className="p-2 rounded hover:bg-primary/10 text-primary transition-all cursor-pointer"
                        title="View"
                        style={{color:colors.primary}}
                      >
                        <Eye size={18} />
                      </button>
                       <button 
                        onClick={() => navigate(`/dashboard/subscriptions/edit/${plan.id}`)}
                        className="p-2 rounded hover:bg-blue-500/10 text-blue-500 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(plan.id)}
                        className="p-2 rounded hover:bg-red-500/10 text-red-500 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center opacity-40 font-bold italic text-sm">No subscription plans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
