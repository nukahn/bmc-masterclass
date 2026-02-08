import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, LayoutGrid, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'

export default function Index() {
  const { user } = useAuth()

  const stages = [
    {
      icon: BookOpen,
      number: 1,
      title: '기초 개념',
      description: '비즈니스 모델의 정의와 핵심 구성요소를 학습합니다.',
      link: '/basics',
      color: 'blue'
    },
    {
      icon: LayoutGrid,
      number: 2,
      title: 'BMC 9블록',
      description: '비즈니스 모델 캔버스의 9개 블록을 상세히 알아봅니다.',
      link: '/bmc',
      color: 'green'
    },
    {
      icon: TrendingUp,
      number: 3,
      title: '성공 패턴',
      description: '검증된 비즈니스 모델 패턴과 사례를 분석합니다.',
      link: '/patterns',
      color: 'orange'
    },
    {
      icon: Sparkles,
      number: 4,
      title: 'AI 실습',
      description: 'AI와 함께 나만의 비즈니스 모델을 설계합니다.',
      link: '/ai-lab',
      color: 'purple',
      requiresAuth: true
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', hover: 'hover:border-blue-400' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', hover: 'hover:border-green-400' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', hover: 'hover:border-orange-400' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', hover: 'hover:border-purple-400' }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          비즈니스 모델 마스터 클래스
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          이론부터 실무 AI 적용까지, 상세한 설명이 포함된 자가 학습 자료입니다.
          <br />
          각 단계를 클릭하여 핵심 원리를 학습하고, AI와 함께 나만의 BMC를 설계해보세요.
        </p>

        {!user && (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              회원가입
            </Link>
          </div>
        )}
      </section>

      {/* Learning Stages */}
      <section className="grid md:grid-cols-2 gap-6">
        {stages.map((stage) => {
          const colors = getColorClasses(stage.color)
          const Icon = stage.icon
          const isLocked = stage.requiresAuth && !user

          return (
            <Link
              key={stage.number}
              to={isLocked ? '/login' : stage.link}
              className={`group relative p-6 bg-white rounded-xl border-2 ${colors.border} ${colors.hover} transition-all hover:shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {stage.number}단계
                    </span>
                    {isLocked && (
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        로그인 필요
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                    {stage.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {stage.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          )
        })}
      </section>

      {/* Quick Stats */}
      {user && (
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                내 프로젝트
              </h3>
              <p className="text-slate-600 text-sm">
                저장된 비즈니스 모델을 확인하고 관리하세요.
              </p>
            </div>
            <Link
              to="/projects"
              className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              프로젝트 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
