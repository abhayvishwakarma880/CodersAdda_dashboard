import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const { colors } = useTheme()

  const stats = [
    { title: 'Total Users', value: '2,543', icon: '', change: '+12%' },
    { title: 'Revenue', value: '₹4,678', icon: '', change: '+8%' },
    { title: 'Courses', value: '999', icon: '', change: '+23%' },
    { title: 'Growth', value: '89%', icon: '', change: '+5%' }
  ]

  return (
    <div className='space-y-6'>
      {/* Greeting Section */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2' style={{ color: colors.text }}>
          Good Morning!
        </h1>
        <p className='text-lg' style={{ color: colors.textSecondary }}>
          Welcome back to <span className='font-semibold'>CodersAdda</span> Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div key={index} 
               className='p-6 rounded border shadow-md transition-all duration-200 hover:scale-105'
               style={{ 
                 backgroundColor: colors.background,
                 borderColor: colors.accent + '30'
               }}>
            <div className='flex items-center justify-between mb-4'>
              <div className='text-2xl'>{stat.icon}</div>
              <span className='text-sm px-2 py-1 rounded-full' 
                    style={{ 
                      backgroundColor: colors.primary + '20',
                      color: colors.primary 
                    }}>
                {stat.change}
              </span>
            </div>
            <h3 className='text-2xl font-bold mb-1' style={{ color: colors.text }}>
              {stat.value}
            </h3>
            <p className='text-sm' style={{ color: colors.textSecondary }}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
        <div className='p-6 rounded border'
             style={{ 
               backgroundColor: colors.background,
               borderColor: colors.accent + '30'
             }}>
          <h3 className='text-xl font-semibold mb-4' style={{ color: colors.text }}>
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <NavLink to="/dashboard/courses/add" className='w-full flex items-center p-3 rounded transition-colors'
                    style={{ backgroundColor: colors.primary + '10', color: colors.text }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '20'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary + '10'}>
              <span className='mr-3'>➕</span>
              Add New Courses
            </NavLink>
            <NavLink to="/dashboard/ebooks/add" className='w-full flex items-center p-3 rounded transition-colors'
                    style={{ backgroundColor: colors.accent + '10', color: colors.text }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.accent + '20'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.accent + '10'}>
              <span className='mr-3'>📊</span>
              Add E-Books
            </NavLink>
            <button className='w-full flex items-center p-3 rounded transition-colors'
                    style={{ backgroundColor: colors.warning + '10', color: colors.text }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.warning + '20'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.warning + '10'}>
              <span className='mr-3'>⚙️</span>
              System Settings
            </button>
          </div>
        </div>

        <div className='p-6 rounded border'
             style={{ 
               backgroundColor: colors.background,
               borderColor: colors.accent + '30'
             }}>
          <h3 className='text-xl font-semibold mb-4' style={{ color: colors.text }}>
            Recent Activity
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 rounded-full' style={{ backgroundColor: colors.primary }}></div>
              <div>
                <p className='text-sm' style={{ color: colors.text }}>New user registered</p>
                <p className='text-xs' style={{ color: colors.textSecondary }}>2 minutes ago</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 rounded-full' style={{ backgroundColor: colors.accent }}></div>
              <div>
                <p className='text-sm' style={{ color: colors.text }}>Order #1234 completed</p>
                <p className='text-xs' style={{ color: colors.textSecondary }}>5 minutes ago</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 rounded-full' style={{ backgroundColor: colors.warning }}></div>
              <div>
                <p className='text-sm' style={{ color: colors.text }}>System backup completed</p>
                <p className='text-xs' style={{ color: colors.textSecondary }}>1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home