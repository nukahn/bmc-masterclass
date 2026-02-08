import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, User, FolderOpen, Sparkles } from 'lucide-react'

export default function Header() {
  const { user, profile, signOut, loading } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 hidden sm:block">
              BMC 마스터클래스
            </span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse" />
            ) : user ? (
              <>
                <Link
                  to="/projects"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">내 프로젝트</span>
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden md:block max-w-[120px] truncate">
                      {profile?.display_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="로그아웃"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
