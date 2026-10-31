import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { Sidebar } from '@/components/layout/Sidebar'

export function AppLayout() {
  return (
    <div className="bp-shell">
      <Sidebar />
      <div className="bp-main-col">
        <main className="bp-main">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  )
}
