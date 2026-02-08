import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

  // Pages that should show navigation
  const showNavigation = ['/basics', '/bmc', '/patterns', '/ai-lab', '/'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showNavigation && <Navigation />}
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
