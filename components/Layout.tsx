
import React from 'react';
import { NavigationItem } from '../types';
import { Home, Map, Trophy, Gamepad2, Menu } from 'lucide-react'; // Using lucide-react for icons

interface LayoutProps {
  children: React.ReactNode;
  activeNav?: NavigationItem;
  onNavClick?: (item: NavigationItem) => void;
  showNav?: boolean;
  fullScreen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeNav = 'HOME', 
  onNavClick, 
  showNav = true,
  fullScreen = false
}) => {
  
  const navItems: { id: NavigationItem; label: string; icon: React.ReactNode }[] = [
    { id: 'MENU', label: 'Menu', icon: <Menu size={20} /> },
    { id: 'GAME', label: 'Game', icon: <Map size={20} /> },
    { id: 'HOME', label: 'Home', icon: <Home size={20} /> },
    { id: 'APP_GAME', label: 'Play', icon: <Gamepad2 size={20} /> },
    { id: 'PRIZES', label: 'Prizes', icon: <Trophy size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Container: Toggles between Mobile Constrained (max-w-md) and Full Screen */}
      <div 
        className={`
            bg-white shadow-2xl relative flex flex-col transition-all duration-300
            ${fullScreen ? 'w-full h-screen max-w-none' : 'w-full max-w-md min-h-screen'}
        `}
      >
        
        {/* Content Scroll Area */}
        <main className={`flex-1 relative flex flex-col ${fullScreen ? 'overflow-hidden p-0' : 'overflow-y-auto no-scrollbar pb-24'}`}>
          {children}
        </main>

        {/* Bottom Navigation */}
        {showNav && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-6 pt-2 flex justify-around items-end z-50">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              
              // Special styling for Home button (Center, elevated)
              if (item.id === 'HOME') {
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavClick?.(item.id)}
                    className="relative -top-6 group"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isActive ? 'bg-brand-red text-white scale-110' : 'bg-brand-red text-white'}`}>
                      {item.icon}
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick?.(item.id)}
                  className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${isActive ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {item.icon}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
