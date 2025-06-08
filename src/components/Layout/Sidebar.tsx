
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Bell, 
  Settings, 
  User,
  Calendar,
  Phone,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['resident', 'admin', 'security'] },
  { name: 'Visitors', href: '/visitors', icon: Users, roles: ['resident', 'security'] },
  { name: 'Announcements', href: '/announcements', icon: Bell, roles: ['resident', 'admin'] },
  { name: 'Payments', href: '/payments', icon: Calendar, roles: ['resident'] },
  { name: 'Services', href: '/services', icon: Settings, roles: ['resident'] },
  { name: 'Amenities', href: '/amenities', icon: Calendar, roles: ['resident'] },
  { name: 'Emergency', href: '/emergency', icon: Phone, roles: ['resident', 'security'] },
  { name: 'Security', href: '/security', icon: Shield, roles: ['security', 'admin'] },
  { name: 'Profile', href: '/profile', icon: User, roles: ['resident', 'admin', 'security'] },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">CommunityGate</h1>
        <p className="text-sm text-muted-foreground mt-1">Community Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.flatNumber} • {user.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
