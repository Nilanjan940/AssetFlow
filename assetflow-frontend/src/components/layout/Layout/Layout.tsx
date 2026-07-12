import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { cn } from '@/utils/helpers';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle window resize for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />
        <main 
          className={cn(
            'flex-1 transition-all duration-300',
            'p-4 md:p-6',
            isSidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]',
            'max-w-full overflow-x-hidden'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};