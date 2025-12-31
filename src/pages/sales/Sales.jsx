import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TrendingUp, BookOpen, Book, Briefcase, CreditCard, Filter, Clock } from 'lucide-react';

function Sales() {
  const { colors } = useTheme();
  const { courses, ebooks, jobs, subscriptions, users } = useData();
  
  // States
  const [statsFilter, setStatsFilter] = useState('By Week');
  const [chartFilter, setChartFilter] = useState('By Week');
  const [salesView, setSalesView] = useState('recent'); // 'recent' or 'mostly'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats data based on filter
  const getStatsData = () => {
    const dataMap = {
      'By Day': {
        course: '₹12,450',
        ebook: '₹3,200',
        job: '₹5,800',
        subscription: '₹8,500'
      },
      'By Week': {
        course: '₹85,000',
        ebook: '₹22,000',
        job: '₹40,000',
        subscription: '₹59,000'
      },
      'By Month': {
        course: '₹3,45,000',
        ebook: '₹88,000',
        job: '₹1,60,000',
        subscription: '₹2,40,000'
      }
    };
    return dataMap[statsFilter];
  };

  const statsData = getStatsData();

  // Helper function to parse currency strings
  const parseCurrency = (str) => {
    if (!str) return 0;
    return parseInt(str.replace(/[₹,]/g, '')) || 0;
  };

  const totalEarningsAmt = parseCurrency(statsData.course) + 
                           parseCurrency(statsData.ebook) + 
                           parseCurrency(statsData.job) + 
                           parseCurrency(statsData.subscription);

  // Earnings stats cards
  const earningsCards = [
    { title: 'Total Earnings', amount: `₹${totalEarningsAmt.toLocaleString('en-IN')}`, icon: TrendingUp, color: '#ef4444', growth: '+18%' },
    { title: 'Course Sales', amount: statsData.course, icon: BookOpen, color: '#10b981', growth: '+12%' },
    { title: 'Ebook Sales', amount: statsData.ebook, icon: Book, color: '#3b82f6', growth: '+8%' },
    { title: 'Job Postings', amount: statsData.job, icon: Briefcase, color: '#f59e0b', growth: '+15%' },
    { title: 'Subscriptions', amount: statsData.subscription, icon: CreditCard, color: '#8b5cf6', growth: '+20%' },
  ];

  // Chart data based on filter
  const getChartData = () => {
    const dataMap = {
      'By Day': {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        course: [1200, 1500, 1800, 1400, 2200, 2800, 2500],
        ebook: [800, 1000, 1200, 900, 1500, 1800, 1600],
        job: [500, 800, 1000, 700, 1200, 1500, 1300],
        subscription: [800, 1000, 1500, 1200, 1800, 2200, 2000]
      },
      'By Week': {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        course: [8500, 11000, 13000, 11500],
        ebook: [5000, 7500, 9500, 8000],
        job: [4000, 7000, 9000, 7500],
        subscription: [5900, 8500, 12000, 10500]
      },
      'By Month': {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        course: [32000, 45000, 58000, 52000, 41000, 48000],
        ebook: [18000, 28000, 38000, 32000, 25000, 30000],
        job: [15000, 27000, 36000, 30000, 24000, 28000],
        subscription: [24000, 38000, 52000, 44000, 35000, 42000]
      }
    };
    return dataMap[chartFilter];
  };

  const chartData = getChartData();

  // Highcharts configuration
  const chartOptions = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      height: 400
    },
    title: {
      text: 'Sales Trends',
      style: {
        color: colors.text,
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: chartData.categories,
      labels: {
        style: {
          color: colors.textSecondary
        }
      },
      lineColor: colors.accent + '40',
      tickColor: colors.accent + '40'
    },
    yAxis: {
      title: {
        text: 'Revenue (₹)',
        style: {
          color: colors.textSecondary
        }
      },
      labels: {
        style: {
          color: colors.textSecondary
        }
      },
      gridLineColor: colors.accent + '20'
    },
    legend: {
      itemStyle: {
        color: colors.text
      },
      itemHoverStyle: {
        color: colors.primary
      }
    },
    tooltip: {
      shared: true,
      backgroundColor: colors.background,
      borderColor: colors.accent,
      style: {
        color: colors.text
      },
      valuePrefix: '₹'
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: [
      {
        name: 'Courses',
        data: chartData.course,
        color: '#10b981'
      },
      {
        name: 'Ebooks',
        data: chartData.ebook,
        color: '#3b82f6'
      },
      {
        name: 'Jobs',
        data: chartData.job,
        color: '#f59e0b'
      },
      {
        name: 'Subscriptions',
        data: chartData.subscription,
        color: '#8b5cf6'
      }
    ],
    credits: {
      enabled: false
    }
  };

  // Pie chart configuration for Earnings Overview
  const earningsPieOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 550
    },
    title: {
      text: '', // Title in JSX
      style: { color: colors.text }
    },
    tooltip: {
      backgroundColor: colors.background,
      borderColor: colors.accent,
      style: { color: colors.text },
      pointFormat: 'Amount: <b>₹{point.y:,.0f}</b><br/>Share: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: colors.text,
        fontWeight: '500',
        fontSize: '12px'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '0%', // Full Pie
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          distance: 50,
          connectorColor: colors.accent + '40',
          style: {
            color: colors.textSecondary,
            fontSize: '13px',
            fontWeight: '600',
            textOutline: 'none'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Earnings',
      colorByPoint: true,
      data: [
        { name: 'Courses', y: parseCurrency(statsData.course), color: '#10b981' },
        { name: 'Ebooks', y: parseCurrency(statsData.ebook), color: '#3b82f6' },
        { name: 'Jobs', y: parseCurrency(statsData.job), color: '#f59e0b' },
        { name: 'Subscriptions', y: parseCurrency(statsData.subscription), color: '#8b5cf6' }
      ]
    }],
    credits: {
      enabled: false
    }
  };

  // Get actual data from context
  const getDisplayData = () => {
    if (salesView === 'recent') {
      return {
        courses: courses.slice(0, 3).map((course, index) => ({
          id: course.id,
          name: course.title,
          category: course.category,
          price: course.priceType === 'Free' ? 'Free' : `₹${course.Cprice}`,
          status: course.status,
          type: 'Course',
          sold: `${course.studentsCount || '50+'} students`,
          time: index === 0 ? '5 mins ago' : index === 1 ? '15 mins ago' : '45 mins ago',
          badge: course.badge,
          originalData: course
        })),
        ebooks: ebooks.slice(0, 3).map((ebook, index) => ({
          id: ebook.id,
          name: ebook.title,
          author: ebook.author,
          price: ebook.priceType === 'Free' ? 'Free' : `₹${ebook.Cprice || ebook.Oprice}`,
          status: ebook.status,
          type: 'Ebook',
          sold: `${Math.floor(Math.random() * 300) + 100} students`,
          time: index === 0 ? '10 mins ago' : index === 1 ? '30 mins ago' : '1 hour ago',
          originalData: ebook
        })),
        jobs: jobs.slice(0, 3).map((job, index) => ({
          id: job.id,
          name: job.title,
          company: job.companyName,
          location: job.location,
          status: job.status,
          type: 'Job',
          sold: `${job.openings} openings`,
          time: index === 0 ? '20 mins ago' : index === 1 ? '40 mins ago' : '2 hours ago',
          originalData: job
        })),
        subscriptions: subscriptions.slice(0, 3).map((sub, index) => ({
          id: sub.id,
          plan: sub.planType + ' Plan',
          duration: sub.duration,
          price: `₹${sub.price}`,
          status: sub.status,
          type: 'Subscription',
          sold: `${Math.floor(Math.random() * 200) + 50} students`,
          time: index === 0 ? '8 mins ago' : index === 1 ? '25 mins ago' : '50 mins ago',
          originalData: sub
        }))
      };
    } else {
      // Mostly sold - show all with count simulation
      return {
        courses: courses.slice(0, 3).map((course) => ({
          id: course.id,
          name: course.title,
          category: course.category,
          price: course.priceType === 'Free' ? 'Free' : `₹${course.Cprice}`,
          sold: `${course.studentsCount || '50+'} students`,
          status: course.status,
          type: 'Course',
          badge: course.badge,
          originalData: course
        })),
        ebooks: ebooks.slice(0, 3).map((ebook) => ({
          id: ebook.id,
          name: ebook.title,
          author: ebook.author,
          price: ebook.priceType === 'Free' ? 'Free' : `₹${ebook.Cprice || ebook.Oprice}`,
          sold: `${Math.floor(Math.random() * 300) + 100} students`,
          status: ebook.status,
          type: 'Ebook',
          originalData: ebook
        })),
        jobs: jobs.slice(0, 3).map((job) => ({
          id: job.id,
          name: job.title,
          company: job.companyName,
          location: job.location,
          posted: `${job.openings} openings`,
          type: 'Job',
          status: job.status,
          originalData: job
        })),
        subscriptions: subscriptions.slice(0, 3).map((sub) => ({
          id: sub.id,
          plan: sub.planType + ' Plan',
          duration: sub.duration,
          price: `₹${sub.price}`,
          sold: `${Math.floor(Math.random() * 200) + 50} students`,
          status: sub.status,
          type: 'Subscription',
          originalData: sub
        }))
      };
    }
  };

  const displayData = getDisplayData();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getStudentsForSelectedItem = () => {
    if (!selectedItem) return [];
    
    const itemTitle = (selectedItem.name || selectedItem.plan || '').toLowerCase();
    const itemType = (selectedItem.type || '').toLowerCase();

    // 1. Try exact or partial title match
    let matches = users.filter(user => 
      user.purchases?.some(p => 
        p.title.toLowerCase().includes(itemTitle) || 
        itemTitle.includes(p.title.toLowerCase())
      )
    );

    // 2. Fallback: If no direct match, show users who have purchased something of the same type
    // This ensures dummy data from DataContext is visible as requested
    if (matches.length === 0) {
      matches = users.filter(user => 
        user.purchases?.some(p => {
          const pType = (p.type || '').toLowerCase();
          // Map "E-Book" from context to "Ebook" in Sales.jsx
          if (itemType === 'ebook' && pType.includes('book')) return true;
          return pType === itemType;
        })
      );
    }

    // 3. Final Fallback: If still nothing (like for Jobs or new items), show a random selection of active users
    if (matches.length === 0) {
      return users.slice(0, 3);
    }

    return matches;
  };

  const purchaseStudents = getStudentsForSelectedItem();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Sales Dashboard</h1>
        <p className="text-sm opacity-60 mt-1" style={{ color: colors.textSecondary }}>
          Track your revenue and sales performance
        </p>
      </div>

      {/* Stats Filter Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.text }}>Earnings Overview</h2>
        <div className="relative">
          <select
            value={statsFilter}
            onChange={(e) => setStatsFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border font-semibold text-sm outline-none cursor-pointer"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.accent + '40',
              color: colors.text
            }}
          >
            <option value="By Day">By Day</option>
            <option value="By Week">By Week</option>
            <option value="By Month">By Month</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {earningsCards.map((card, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border shadow-md transition-all hover:shadow-lg hover:scale-105"
            style={{
              backgroundColor: colors.sidebar || colors.background,
              borderColor: colors.accent + '20'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.color + '20' }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <span 
                className="text-xs px-2 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: '#10b981' + '20',
                  color: '#10b981'
                }}
              >
                {card.growth}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-1" style={{ color: colors.text }}>
              {card.amount}
            </h3>
            <p className="text-sm font-medium opacity-60" style={{ color: colors.textSecondary }}>
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* Sales Chart with Filter */}
      <div
        className="p-6 rounded-lg border shadow-md"
        style={{
          backgroundColor: colors.sidebar || colors.background,
          borderColor: colors.accent + '20'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>Sales Trends</h2>
          <div className="flex items-center space-x-2">
            {['By Day', 'By Week', 'By Month'].map((filter) => (
              <button
                key={filter}
                onClick={() => setChartFilter(filter)}
                className="px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: chartFilter === filter ? colors.primary : colors.accent + '20',
                  color: chartFilter === filter ? colors.background : colors.text
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>

      {/* Earnings Overview Pie Chart */}
      <div
        className="p-6 rounded-lg border shadow-md flex flex-col items-center"
        style={{
          backgroundColor: colors.sidebar || colors.background,
          borderColor: colors.accent + '20'
        }}
      >
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>Earnings Overview (Distribution)</h2>
        </div>
        <div className="w-full">
          <HighchartsReact highcharts={Highcharts} options={earningsPieOptions} />
        </div>
      </div>

      {/* Sales View Toggle Buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: colors.text }}>Sales Details</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSalesView('recent')}
            className="px-5 cursor-pointer py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg"
            style={{
              backgroundColor: salesView === 'recent' ? colors.primary : colors.accent + '20',
              color: salesView === 'recent' ? colors.background : colors.text
            }}
          >
            Recent Sales
          </button>
          <button
            onClick={() => setSalesView('mostly')}
            className="px-5 cursor-pointer py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg"
            style={{
              backgroundColor: salesView === 'mostly' ? colors.primary : colors.accent + '20',
              color: salesView === 'mostly' ? colors.background : colors.text
            }}
          >
            Most Sold
          </button>
        </div>
      </div>

      {/* Sales Cards Grid - Using Real Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Sales Card */}
        <div
          className="p-6 rounded-lg border shadow-md"
          style={{
            backgroundColor: colors.sidebar || colors.background,
            borderColor: colors.accent + '20'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#10b981' + '20' }}
            >
              <BookOpen size={20} style={{ color: '#10b981' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Course Sales</h3>
              <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{courses.length} Total Courses</p>
            </div>
          </div>
          <div className="space-y-3">
            {displayData.courses.length > 0 ? displayData.courses.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-4 rounded-lg transition-all hover:shadow-md cursor-pointer border hover:border-green-500"
                style={{ backgroundColor: colors.accent + '10', borderColor: 'transparent' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{item.category}</p>
                      {item.badge && item.badge !== 'Normal' && (
                        <span className="px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase bg-amber-500 text-white shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-lg ml-2" style={{ color: '#10b981' }}>
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: colors.textSecondary }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xs" style={{ color: colors.primary }}>{item.sold}</span>
                    <span className={`px-2 py-0.5 rounded w-fit ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  {salesView === 'recent' && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="p-6 text-center opacity-50" style={{ color: colors.textSecondary }}>No courses available</div>
            )}
          </div>
        </div>

        {/* Ebook Sales Card */}
        <div
          className="p-6 rounded-lg border shadow-md"
          style={{
            backgroundColor: colors.sidebar || colors.background,
            borderColor: colors.accent + '20'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#3b82f6' + '20' }}
            >
              <Book size={20} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Ebook Sales</h3>
              <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{ebooks.length} Total Ebooks</p>
            </div>
          </div>
          <div className="space-y-3">
            {displayData.ebooks.length > 0 ? displayData.ebooks.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-4 rounded-lg transition-all hover:shadow-md cursor-pointer border hover:border-blue-500"
                style={{ backgroundColor: colors.accent + '10', borderColor: 'transparent' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                      {item.name}
                    </h4>
                    <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>By {item.author}</p>
                  </div>
                  <span className="font-black text-lg ml-2" style={{ color: '#3b82f6' }}>
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: colors.textSecondary }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xs" style={{ color: colors.primary }}>{item.sold}</span>
                    <span className={`px-2 py-0.5 rounded w-fit ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  {salesView === 'recent' && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="p-6 text-center opacity-50" style={{ color: colors.textSecondary }}>No ebooks available</div>
            )}
          </div>
        </div>

        {/* Job Sales Card */}
        <div
          className="p-6 rounded-lg border shadow-md"
          style={{
            backgroundColor: colors.sidebar || colors.background,
            borderColor: colors.accent + '20'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#f59e0b' + '20' }}
            >
              <Briefcase size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Job Postings</h3>
              <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{jobs.length} Total Jobs</p>
            </div>
          </div>
          <div className="space-y-3">
            {displayData.jobs.length > 0 ? displayData.jobs.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-4 rounded-lg transition-all hover:shadow-md cursor-pointer border hover:border-amber-500"
                style={{ backgroundColor: colors.accent + '10', borderColor: 'transparent' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                      {item.name}
                    </h4>
                    <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{item.company} • {item.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: colors.textSecondary }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xs" style={{ color: colors.primary }}>{item.sold}</span>
                    <span className={`px-2 py-0.5 rounded w-fit ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  {salesView === 'recent' && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="p-6 text-center opacity-50" style={{ color: colors.textSecondary }}>No jobs available</div>
            )}
          </div>
        </div>

        {/* Subscription Sales Card */}
        <div
          className="p-6 rounded-lg border shadow-md"
          style={{
            backgroundColor: colors.sidebar || colors.background,
            borderColor: colors.accent + '20'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#8b5cf6' + '20' }}
            >
              <CreditCard size={20} style={{ color: '#8b5cf6' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Subscriptions</h3>
              <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>{subscriptions.length} Total Plans</p>
            </div>
          </div>
          <div className="space-y-3">
            {displayData.subscriptions.length > 0 ? displayData.subscriptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="p-4 rounded-lg transition-all hover:shadow-md cursor-pointer border hover:border-purple-500"
                style={{ backgroundColor: colors.accent + '10', borderColor: 'transparent' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                      {item.plan}
                    </h4>
                    <p className="text-xs opacity-60" style={{ color: colors.textSecondary }}>Duration: {item.duration}</p>
                  </div>
                  <span className="font-black text-lg ml-2" style={{ color: '#8b5cf6' }}>
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: colors.textSecondary }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xs" style={{ color: colors.primary }}>{item.sold}</span>
                    <span className={`px-2 py-0.5 rounded w-fit ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  {salesView === 'recent' && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="p-6 text-center opacity-50" style={{ color: colors.textSecondary }}>No subscriptions available</div>
            )}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col scale-in"
            style={{ backgroundColor: colors.background }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.accent + '20' }}>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{selectedItem.name || selectedItem.plan}</h2>
                  {selectedItem.badge && selectedItem.badge !== 'Normal' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-white shadow-sm">
                      {selectedItem.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm opacity-60" style={{ color: colors.textSecondary }}>{selectedItem.type} Details & Purchase History</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                style={{ backgroundColor: colors.accent + '20', color: colors.text }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Item Summary Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl border flex flex-col items-center justify-center text-center" style={{ borderColor: colors.accent + '20', backgroundColor: colors.accent + '05' }}>
                  <p className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: colors.textSecondary }}>Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedItem.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {selectedItem.status}
                  </span>
                </div>
                <div className="p-4 rounded-xl border flex flex-col items-center justify-center text-center" style={{ borderColor: colors.accent + '20', backgroundColor: colors.accent + '05' }}>
                  <p className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: colors.textSecondary }}>Total Value</p>
                  <p className="text-xl font-black" style={{ color: colors.primary }}>{selectedItem.price}</p>
                </div>
                <div className="p-4 rounded-xl border flex flex-col items-center justify-center text-center" style={{ borderColor: colors.accent + '20', backgroundColor: colors.accent + '05' }}>
                  <p className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: colors.textSecondary }}>Total Buyers</p>
                  <p className="text-xl font-black" style={{ color: colors.text }}>{selectedItem.sold}</p>
                </div>
              </div>

              {/* Students Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: colors.text }}>
                    <TrendingUp size={20} className="text-green-500" />
                    Buyer List
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">
                    {purchaseStudents.length} Students Found
                  </span>
                </div>
                
                <div className="overflow-x-auto rounded-xl border" style={{ borderColor: colors.accent + '20' }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: colors.accent + '10' }}>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Student</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Email</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Mobile</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Join Date</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: colors.textSecondary }}>Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ divideColor: colors.accent + '10' }}>
                      {purchaseStudents.length > 0 ? purchaseStudents.map((user) => {
                        const purchase = user.purchases.find(p => p.title === (selectedItem.name || selectedItem.plan));
                        return (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={user.profilePhoto} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-semibold text-sm" style={{ color: colors.text }}>{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-sm" style={{ color: colors.textSecondary }}>{user.email}</td>
                            <td className="p-4 text-sm" style={{ color: colors.textSecondary }}>{user.phone || '+91 98765 43210'}</td>
                            <td className="p-4 text-sm" style={{ color: colors.textSecondary }}>{purchase?.date || user.studentDetails.createdAt}</td>
                            <td className="p-4 text-sm font-bold" style={{ color: colors.primary }}>₹{purchase?.price || selectedItem.price.replace('₹', '')}</td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan="4" className="p-10 text-center text-sm" style={{ color: colors.textSecondary }}>
                            No student purchase data found in local database.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex justify-end" style={{ borderColor: colors.accent + '20' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: colors.primary, color: colors.background }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.accent}40;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default Sales;
