import React from 'react';
import { useAtom } from 'jotai';
import { sidebarCollapsedAtom } from '@/store/playerStore';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed] = useAtom(sidebarCollapsedAtom);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main 
          className={cn(
            "flex-1 pt-16 transition-all duration-300",
            collapsed ? "lg:pl-16" : "lg:pl-64"
          )}
        >
          <div className="container mx-auto px-4 py-6 custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};