import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Archive, Folder, Tag, Link2, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import siteData from '@/data/site-config.json';

export const MobileDrawer: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const location = useLocation();

  if (!mobileMenuOpen) return null;

  const links = [
    { to: '/', label: '首页', icon: Home },
    { to: '/archives', label: '归档', icon: Archive },
    { to: '/categories', label: '分类', icon: Folder },
    { to: '/tags', label: '标签', icon: Tag },
    { to: '/links', label: '友链', icon: Link2 },
    { to: '/about', label: '关于', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* 遮罩背景 */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* 抽屉面板 */}
      <div className="relative w-4/5 max-w-xs bg-[var(--paper)] h-full shadow-2xl p-6 flex flex-col border-r border-[var(--line)] z-10">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
          <span className="font-bold text-lg text-[var(--ink)]">
            {siteData.site?.title || 'FlatPaper'}
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-warm)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2">
          {links.map(link => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] font-semibold'
                    : 'text-[var(--ink-soft)] hover:bg-[var(--paper-warm)] hover:text-[var(--ink)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
