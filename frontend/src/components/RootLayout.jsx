import Header from './Header'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout