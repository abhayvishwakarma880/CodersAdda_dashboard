import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TrendingUp, BookOpen, Users, IndianRupee, Star, PlayCircle } from 'lucide-react';

function InstructorHome() {
  const { colors } = useTheme();
  const { courses, instructors, courseEnrollments } = useData();

  const instructorEmail = localStorage.getItem('instructorEmail') || 'abhay@codersadda.com';
  // For demo, we'll assume the first instructor matches if not found
  const instructor = instructors.find(ins => ins.email === instructorEmail) || instructors[0];

  // Calculate real data from context
  const instructorCourses = courses.filter(c => c.instructor === instructor?.name);
  const totalStudents = instructorCourses.reduce((sum, course) => {
    const enrollments = courseEnrollments.filter(ce => ce.courseName === course.title);
    return sum + enrollments.length;
  }, 0);
  
  const totalRevenue = instructorCourses.reduce((sum, course) => {
    const enrollments = courseEnrollments.filter(ce => ce.courseName === course.title);
    return sum + enrollments.reduce((s, e) => s + (e.price || 0), 0);
  }, 0);

  const statsCards = [
    { title: 'My Courses', value: instructorCourses.length, icon: BookOpen, color: '#3b82f6', trend: '+2 this month' },
    { title: 'Total Students', value: totalStudents, icon: Users, color: '#10b981', trend: '+15% from last month' },
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: '#f59e0b', trend: '+₹1,250 today' },
    { title: 'Avg. Rating', value: '4.8', icon: Star, color: '#8b5cf6', trend: 'Based on 125 reviews' },
  ];

  const chartOptions = {
    chart: { type: 'area', backgroundColor: 'transparent', height: 350 },
    title: { text: '' },
    xAxis: { 
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: { style: { color: colors.textSecondary } }
    },
    yAxis: { 
        title: { text: 'Revenue (₹)' },
        labels: { style: { color: colors.textSecondary } },
        gridLineColor: colors.accent + '10'
    },
    series: [{
      name: 'Monthly Revenue',
      data: [1500, 3200, 2800, 4500, 3900, 5200],
      color: colors.primary
    }],
    credits: { enabled: false },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, colors.primary + '40'],
            [1, colors.primary + '05']
          ]
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-black" style={{ color: colors.text }}>Hello, {instructor?.name}!</h1>
           <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>Here's what's happening with your courses today.</p>
        </div>
        <div className="px-4 py-2 rounded-lg border text-xs font-bold" style={{ backgroundColor: colors.sidebar, borderColor: colors.accent + '20', color: colors.text }}>
            Last Update: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
            <div key={i} className="p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '10' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded" style={{ backgroundColor: card.color + '15', color: card.color }}>
                        <card.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest" style={{ color: colors.text }}>{card.title}</span>
                </div>
                <h3 className="text-2xl font-black mb-1" style={{ color: colors.text }}>{card.value}</h3>
                <p className="text-[10px] font-semibold opacity-60" style={{ color: colors.textSecondary }}>{card.trend}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60" style={{ color: colors.text }}>Earning Performance</h3>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        <div className="p-6 rounded border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60" style={{ color: colors.text }}>Recent Activities</h3>
            <div className="space-y-6">
                {[
                    { text: 'New student enrolled in MERN Stack', time: '2 mins ago', icon: PlayCircle, color: '#3b82f6' },
                    { text: 'Payout of ₹4,500 processed', time: '1 hour ago', icon: IndianRupee, color: '#10b981' },
                    { text: 'New 5-star review from Rahul', time: '3 hours ago', icon: Star, color: '#f59e0b' },
                ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="p-2 rounded-full mt-0.5" style={{ backgroundColor: act.color + '15', color: act.color }}>
                            <act.icon size={14} />
                        </div>
                        <div>
                            <p className="text-xs font-bold leading-relaxed" style={{ color: colors.text }}>{act.text}</p>
                            <span className="text-[10px] opacity-40 font-medium">{act.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-8 py-2 text-xs font-bold border rounded transition-all hover:bg-black/5" style={{ borderColor: colors.accent + '20', color: colors.text }}>
                View All Activity
            </button>
        </div>
      </div>
    </div>
  );
}

export default InstructorHome;
