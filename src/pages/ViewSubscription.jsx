import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, CreditCard, Clock, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

function ViewSubscription() {
  const { colors } = useTheme();
  const { subscriptions } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const found = subscriptions.find(s => s.id === id);
    if (found) {
      setPlan(found);
    } else {
      navigate('/dashboard/subscriptions');
    }
  }, [id, subscriptions, navigate]);

  if (!plan) return null;

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <button 
            onClick={() => navigate('/dashboard/subscriptions')}
            className="p-2 rounded transition-all cursor-pointer border"
            style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
            >
            <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Plan Details</h1>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{plan.planType} Tier Plan</p>
            </div>
        </div>
        <button 
            onClick={() => navigate(`/dashboard/subscriptions/edit/${plan.id}`)}
            className="flex items-center gap-2 px-6 py-2.5 rounded border font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
            style={{ borderColor: colors.accent + '30', color: colors.text }}
        >
            <Edit size={16} /> Edit Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
              <div className="p-8 rounded border " style={{ borderColor: colors.accent + '15', backgroundColor: colors.sidebar || colors.background }}>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-24 h-24 rounded flex items-center justify-center bg-primary/10 shadow-inner" style={{ color: colors.primary }}>
                          <CreditCard size={48} />
                      </div>
                      <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap gap-3">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm" 
                                    style={{ backgroundColor: colors.primary, color: colors.background }}>
                                  {plan.planType}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                                  plan.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}>
                                  {plan.status}
                              </span>
                          </div>
                          <h2 className="text-4xl font-black" style={{ color: colors.text }}>₹{plan.price} <span className="text-lg font-bold opacity-30 text-current">/ {plan.duration}</span></h2>
                      </div>
                  </div>
              </div>

              <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                      <Shield size={16} /> Included Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {plan.benefits?.map((benefit, i) => (
                          <div key={i} className="p-4 rounded border flex gap-3 items-center bg-white dark:bg-black/10 shadow-sm" style={{ borderColor: colors.accent + '10', backgroundColor: colors.sidebar || colors.accent }}>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/10 text-green-500">
                                  <CheckCircle2 size={18} />
                              </div>
                              <span className="text-sm font-bold opacity-80" style={{ color: colors.text }}>{benefit}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="p-6 rounded border space-y-6 shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
                  <h4 className="text-xs font-black uppercase tracking-widest opacity-40">Plan Info</h4>
                  <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: colors.accent + '05' }}>
                          <span className="text-xs font-bold opacity-40">Frequency</span>
                          <div className="flex items-center gap-1.5 font-bold text-xs" style={{ color: colors.text }}>
                              <Clock size={14} className="opacity-40" />
                              {plan.duration}
                          </div>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: colors.accent + '05' }}>
                          <span className="text-xs font-bold opacity-40">Currency</span>
                          <span className="font-bold text-xs" style={{ color: colors.text }}>INR (₹)</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                          <span className="text-xs font-bold opacity-40">Total Tiers</span>
                          <span className="font-bold text-xs" style={{ color: colors.text }}>3 Active</span>
                      </div>
                  </div>
              </div>

              <div className="p-6 rounded border flex gap-4 bg-yellow-500/5" style={{ borderColor: 'rgba(234, 179, 8, 0.2)' }}>
                  <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                  <p className="text-[11px] font-bold leading-relaxed text-yellow-700 dark:text-yellow-500">
                      Changes to the plan price or duration will effect all new subscribers immediately.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
}

export default ViewSubscription;
