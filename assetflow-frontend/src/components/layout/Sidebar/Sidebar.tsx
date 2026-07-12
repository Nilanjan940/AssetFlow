import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Calendar,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Building2,
  History
} from 'lucide-react';
import { cn } from '@/utils/helpers';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/dashboard' },
    { id: 'assets', label: 'Assets', icon: <Package className="h-5 w-5" />, path: '/assets' },
    { id: 'allocations', label: 'Allocations', icon: <ArrowLeftRight className="h-5 w-5" />, path: '/allocations' },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" />, path: '/bookings', badge: 2 },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench className="h-5 w-5" />, path: '/maintenance' },
    { id: 'audit', label: 'Audit', icon: <ClipboardCheck className="h-5 w-5" />, path: '/audit' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, path: '/reports' },
    { id: 'organization', label: 'Organization', icon: <Building2 className="h-5 w-5" />, path: '/organization' },
    { id: 'logs', label: 'Activity Logs', icon: <History className="h-5 w-5" />, path: '/logs' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Close sidebar on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300',
          'md:sticky md:top-16',
          isCollapsed ? 'w-[72px]' : 'w-[260px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed && isMobileOpen && 'w-[260px]'
        )}
      >
        <nav className="flex h-full flex-col gap-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                    isCollapsed && !isMobileOpen && 'justify-center px-2'
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {(!isCollapsed || isMobileOpen) && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom section with version */}
          <div className="mt-auto border-t pt-3">
            <div className={cn(
              'text-xs text-muted-foreground px-3 py-2',
              isCollapsed && !isMobileOpen && 'text-center'
            )}>
              {(!isCollapsed || isMobileOpen) ? (
                <span>v1.0.0</span>
              ) : (
                <span className="block w-4 h-4 rounded-full bg-primary/20 text-primary text-[8px] flex items-center justify-center">v</span>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};