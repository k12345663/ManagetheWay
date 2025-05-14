import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, LogOut } from 'lucide-react';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title = 'Hotel Grand Reservations' }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        </div>
        
        {user && (
          <div className="flex items-center">
            <div className="mr-4 text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.username}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
            
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;