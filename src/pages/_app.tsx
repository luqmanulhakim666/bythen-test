// src/pages/_app.tsx
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

const queryClient = new QueryClient()

function App({ Component, pageProps }: any) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isSidebarExpanded, setSidebarExpanded] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')

  // Effect to handle mobile screen resizing and sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
        setSidebarExpanded(true)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onExpanded={() => setSidebarExpanded((prev) => !prev)}
          isExpanded={isSidebarExpanded}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <Navbar
              onSearch={setSearchKeyword}
              setSidebarOpen={setSidebarOpen}
            />{' '}
            {/* Pass setSidebarOpen */}
          </div>

          {/*Pages*/}
          <div className="flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out p-6">
            <Component
              {...pageProps}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
