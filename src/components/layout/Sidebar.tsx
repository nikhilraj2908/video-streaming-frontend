import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Users, Library, Clock, ThumbsUp, PlaySquare, Flame } from 'lucide-react';
import { useAtom } from 'jotai';
import { sidebarCollapsedAtom } from '@/store/playerStore';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Trending', url: '/trending', icon: Flame },
  { title: 'Subscriptions', url: '/subscriptions', icon: Users },
  { title: 'Library', url: '/library', icon: Library },
  { title: 'Dashboard', url: '/admindashboard', icon: PlaySquare },
];

const libraryItems = [
  { title: 'Watch Later', url: '/watch-later', icon: Clock },
  { title: 'Liked Videos', url: '/liked', icon: ThumbsUp },
  { title: 'Playlists', url: '/playlists', icon: PlaySquare },
];

export const Sidebar: React.FC = () => {
  const [collapsed] = useAtom(sidebarCollapsedAtom);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border transition-all duration-300 z-40 custom-scrollbar overflow-y-auto",
      collapsed ? "w-16" : "w-64"
    )}>
      <nav className="p-3 space-y-1">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                isActive(item.url)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        {!collapsed && <div className="border-t border-border my-4" />}

        {/* Library Section */}
        {!collapsed && (
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Library
            </h3>
            {libraryItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                  isActive(item.url)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="ml-3">{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};