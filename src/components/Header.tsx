import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, Home, LogIn, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
    navigate({ to: '/' })
    setIsOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu strokeWidth={1} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/" className="hover:text-indigo-400 transition-colors">
              Buildrr
            </Link>
          </h1>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-white hover:text-indigo-400 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-white hover:text-indigo-400 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/Login"
                className="px-4 py-2 text-white hover:text-indigo-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth/Register"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X strokeWidth={1} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 w-full text-left"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <Link
                to="/auth/Login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 w-full text-left"
              >
                <LogIn size={20} />
                <span className="font-medium">Sign In</span>
              </Link>

              <Link
                to="/auth/Register"
                onClick={() => setIsOpen(false)}
                className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium block text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[0.5px] z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
