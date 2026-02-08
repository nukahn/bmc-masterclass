import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import Layout from '@/components/layout/Layout'
import AuthGuard from '@/components/auth/AuthGuard'

// Pages
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Basics from '@/pages/Basics'
import BMC from '@/pages/BMC'
import Patterns from '@/pages/Patterns'
import AILab from '@/pages/AILab'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Layout */}
        <Route element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/bmc" element={<BMC />} />
          <Route path="/patterns" element={<Patterns />} />

          {/* Protected Pages */}
          <Route element={<AuthGuard />}>
            <Route path="/ai-lab" element={<AILab />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">404</h1>
                <p className="text-slate-600 mb-6">페이지를 찾을 수 없습니다.</p>
                <a
                  href="/"
                  className="text-purple-600 hover:underline font-medium"
                >
                  홈으로 돌아가기
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
