import { useLocation, useNavigate } from 'react-router-dom';
import { Home, TreePine, Target, Camera, Gift } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: TreePine, label: 'Timeline', path: '/timeline' },
  { icon: Target, label: 'Quests', path: '/quests' },
  { icon: Camera, label: 'Memories', path: '/memories' },
  { icon: Gift, label: 'Keepsakes', path: '/keepsakes' },
];

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground transform -translate-y-1 dreamy-shadow'
                  : 'text-muted-foreground hover:text-foreground opacity-60'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-inter mt-1">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};