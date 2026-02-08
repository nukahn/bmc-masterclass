import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, LayoutGrid, TrendingUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const { user } = useAuth()

  const navItems = [
    {
      to: '/basics',
      label: '1단계: 기초 개념',
      shortLabel: '기초',
      icon: BookOpen,
      color: 'blue'
    },
    {
      to: '/bmc',
      label: '2단계: BMC 9블록',
      shortLabel: 'BMC',
      icon: LayoutGrid,
      color: 'green'
    },
    {
      to: '/patterns',
      label: '3단계: 성공 패턴',
      shortLabel: '패턴',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      to: '/ai-lab',
      label: '4단계: AI 실습',
      shortLabel: 'AI',
      icon: Sparkles,
      color: 'purple',
      requiresAuth: true
    }
  ]

  const getNavClasses = (isActive: boolean, color: string) => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200'

    if (isActive) {
      const activeColors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100',
        green: 'bg-green-50 text-green-700 shadow-sm border border-green-100',
        orange: 'bg-orange-50 text-orange-700 shadow-sm border border-orange-100',
        purple: 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100'
      }
      return cn(baseClasses, activeColors[color])
    }

    return cn(baseClasses, 'text-slate-600 hover:bg-slate-100')
  }

  return (
    <nav className="flex justify-center mb-8">
      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isLocked = item.requiresAuth && !user

          return (
            <NavLink
              key={item.to}
              to={isLocked ? '/login' : item.to}
              className={({ isActive }) => getNavClasses(isActive && !isLocked, item.color)}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.shortLabel}</span>
              {isLocked && (
                <span className="text-xs bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded hidden sm:inline">
                  🔒
                </span>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
