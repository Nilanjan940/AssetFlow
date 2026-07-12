import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Menu, 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  HelpCircle,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  X
} from 'lucide-react';
import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices/auth.slice';
import { cn } from '@/utils/helpers';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
    document.documentElement.className = themes[nextIndex] === 'system' ? '' : themes[nextIndex];
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Asset</span>
            <span className="text-xl font-bold">Flow</span>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets, people, bookings..."
              className="w-full rounded-md border bg-muted/50 px-9 py-2 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-primary"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {getThemeIcon()}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-md border bg-popover shadow-lg">
                <div className="flex items-center justify-between border-b p-3">
                  <span className="font-medium">Notifications</span>
                  <button className="text-xs text-primary hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  <div className="rounded-md p-3 hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Asset Allocated</p>
                    <p className="text-xs text-muted-foreground">Laptop AF-0114 allocated to Priya</p>
                    <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
                  </div>
                  <div className="rounded-md p-3 hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Maintenance Request</p>
                    <p className="text-xs text-muted-foreground">Server rack needs attention</p>
                    <p className="text-xs text-muted-foreground mt-1">15 min ago</p>
                  </div>
                </div>
                <div className="border-t p-3">
                  <button className="w-full text-center text-sm text-primary hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover shadow-lg">
                <div className="border-b p-3">
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{user?.role?.toLowerCase()}</p>
                </div>
                <div className="p-2">
                  <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors text-sm">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors text-sm">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors text-sm">
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </button>
                </div>
                <div className="border-t p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors text-sm text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border bg-muted/50 px-9 py-2 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};