
import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-4">
      <div className="flex items-center gap-2">
        {toggleSidebar && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="font-bold text-railway-primary text-xl">
            <span className="text-railway-secondary">Re</span>Railway
          </div>
          {title && <span className="hidden md:inline-block text-sm text-muted-foreground ml-2">| {title}</span>}
        </div>
      </div>

      <div className="hidden md:flex items-center relative max-w-sm">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search trains, stations..."
          className="w-full pl-8 rounded-md bg-background"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-railway-secondary rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
