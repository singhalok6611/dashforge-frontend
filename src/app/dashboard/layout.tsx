'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Code, Home, Layout, Database, BarChart3, Users, FileText, Settings, LogOut, Plus, Sparkles, Menu, X, CreditCard } from 'lucide-react';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // With httpOnly cookies, we only need to check for user data in localStorage
    // The actual tokens are in secure cookies and validated by the backend
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (err) {
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to home page
    // Note: httpOnly cookies will be cleared by calling the logout endpoint
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Define nav items with role requirements
  const allNavItems = [
    { href: '/dashboard', icon: Home, label: 'Home', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
    { href: '/dashboard/showcase', icon: Sparkles, label: 'Showcase', highlight: true, roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
    { href: '/dashboard/apps', icon: Layout, label: 'My Apps', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
    { href: '/dashboard/datasources', icon: Database, label: 'Data Sources', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
    { href: '/dashboard/team', icon: Users, label: 'Team', roles: ['ADMIN'] }, // ADMIN only
    { href: '/dashboard/billing', icon: CreditCard, label: 'Billing', roles: ['ADMIN'] }, // ADMIN only
    { href: '/dashboard/docs', icon: FileText, label: 'Documentation', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
  ];

  // Filter nav items based on user role
  const navItems = allNavItems.filter(item =>
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[rgb(var(--card-bg))] border-b border-[rgb(var(--border))] z-20 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[rgb(var(--text))]">DashForge</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-[rgb(var(--hover))] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[rgb(var(--text))]" />
          ) : (
            <Menu className="w-6 h-6 text-[rgb(var(--text))]" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-[rgb(var(--card-bg))] border-r border-[rgb(var(--border))] z-40 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${isMobileMenuOpen ? 'pt-16' : ''} lg:pt-0`}>
        <div className="flex flex-col h-full">
          {/* Logo - Hidden on mobile since it's in the header */}
          <div className="hidden lg:block p-6 border-b border-[rgb(var(--border))]">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[rgb(var(--text))]">DashForge</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : item.highlight
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 hover:from-purple-100 hover:to-blue-100 font-medium'
                      : 'text-[rgb(var(--text))] hover:bg-[rgb(var(--hover))]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="ml-auto text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-[rgb(var(--border))]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[rgb(var(--text))] truncate">{user?.name}</p>
                    {user?.role && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'EDITOR' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'ADMIN' ? 'Admin' :
                         user.role === 'EDITOR' ? 'Editor' :
                         'Viewer'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[rgb(var(--text-secondary))] truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/dashboard/settings" className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--hover))] rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--hover))] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
}
