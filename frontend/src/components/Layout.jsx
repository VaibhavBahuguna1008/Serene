import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AiChatBubble from './AiChatBubble';
import {
  Home,
  Smile,
  BookOpen,
  Wind,
  ClipboardList,
  Info,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ShieldAlert,
  Zap,
  HeartPulse,
  ChevronLeft,
  Leaf
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home size={18} />, path: '/dashboard' },
    { name: 'Mood Tracker', icon: <Smile size={18} />, path: '/mood' },
    { name: 'Journal', icon: <BookOpen size={18} />, path: '/journal' },
    { name: 'Thought Reframing', icon: <Zap size={18} />, path: '/reframe' },
    { name: 'Therapy Toolkit', icon: <Wind size={18} />, path: '/toolkit' },
    { name: 'Assessments', icon: <ClipboardList size={18} />, path: '/assessments' },
    { name: 'Therapy Types', icon: <HeartPulse size={18} />, path: '/therapy' },
    { name: 'Natural Treatments', icon: <Leaf size={18} />, path: '/natural-treatments' },
    { name: 'Learning Hub', icon: <Info size={18} />, path: '/learning' },
    { name: 'Crisis Support', icon: <ShieldAlert size={18} />, path: '/crisis' },
  ];

  const handleLogout = () => {
    navigate('/', { replace: true });
    logout();
  };

  const SidebarContent = ({ collapsed = false, onLinkClick }) => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'px-4 py-5 justify-center' : 'px-5 py-5'}`}>
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 shrink-0 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary-200 dark:shadow-primary-900/40">
          S
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-xl bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent truncate">
            Serene
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              title={collapsed ? item.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-linear-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-200/60 dark:shadow-primary-900/40'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <span className={`shrink-0 transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="truncate text-sm font-medium">{item.name}</span>
              )}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

    </>
  );

  return (
    <div className={`h-screen flex transition-colors duration-300 ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 overflow-hidden`}>

      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 transition-all duration-300 ease-in-out sticky top-0 h-screen shrink-0 ${isSidebarOpen ? 'w-64' : 'w-18'}`}>
        <SidebarContent collapsed={!isSidebarOpen} />

        {/* Collapse toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all duration-200 z-10"
        >
          <motion.span
            animate={{ rotate: isSidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={12} />
          </motion.span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col h-screen"
          >
            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X size={18} />
            </button>
            <SidebarContent onLinkClick={() => setIsMobileOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Go back"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white">
              {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* User avatar + dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user?.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{user?.role || 'Member'}</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm border border-primary-200 dark:border-primary-800 shadow-sm shrink-0">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <>
                    {/* Click-outside overlay */}
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={() => { setProfileOpen(false); toggleDarkMode(); }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all text-sm font-medium"
                        >
                          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button
                          onClick={() => { setProfileOpen(false); handleLogout(); }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-all text-sm font-medium"
                        >
                          <LogOut size={16} />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth scrollbar-hide">
          {location.pathname === '/chat' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/60 p-4 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div className="space-y-0.5">
                  <p className="text-amber-900 dark:text-amber-300 text-sm font-semibold">Mental Health Support Notice</p>
                  <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">If you're in crisis, please reach out to professional help services available in your area. Serene is a companion tool, not a medical service.</p>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AiChatBubble />
    </div>
  );
};

export default Layout;
