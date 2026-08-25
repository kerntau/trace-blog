import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { useTheme } from '@/context/ThemeContext';
import siteData from '@/data/site-config.json';

export const Header: React.FC = () => {
  const { isDark, toggleTheme, accent, setAccent, setSearchOpen, setMobileMenuOpen, mobileMenuOpen } = useTheme();
  const [accentMenuOpen, setAccentMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const location = useLocation();

  const siteTitle = siteData.site?.title || 'FlatPaper';
  const accents = ['orange', 'purple', 'sakura', 'blue', 'pink', 'green', 'black'] as const;

  return (
    <header className="site-header">
      {/* 移动端汉堡切换按钮 */}
      <button
        className="icon-button js-sidebar-toggle sidebar-toggle"
        type="button"
        aria-label="打开侧边栏"
        aria-controls="paper-sidebar-drawer"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Icon name="menu" />
      </button>

      {/* 站点 Logo 与标题 */}
      <div className="brand">
        <div className="brand-mark-wrapper">
          <Link className="brand-mark" to="/" aria-label="首页">
            <Icon name="layout-grid" />
          </Link>
        </div>
        <Link className="brand-text" to="/">
          {siteTitle}
        </Link>
      </div>

      {/* 顶部主导航 */}
      <nav className="site-nav" aria-label="主导航">
        <Link className={`site-nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
          <Icon name="home" />
          <span>首页</span>
        </Link>

        <Link className={`site-nav-link ${location.pathname === '/links' ? 'active' : ''}`} to="/links">
          <Icon name="link" />
          <span>友链</span>
        </Link>

        <Link className={`site-nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
          <Icon name="user" />
          <span>关于</span>
        </Link>

        {/* 二级菜单：文章 (分类/标签/归档) */}
        <div
          className={`site-nav-item has-children ${['/categories', '/tags', '/archives'].includes(location.pathname) ? 'active' : ''}`}
          onMouseEnter={() => setNavDropdownOpen(true)}
          onMouseLeave={() => setNavDropdownOpen(false)}
        >
          <button
            className="site-nav-link site-nav-parent"
            type="button"
            aria-haspopup="true"
            aria-expanded={navDropdownOpen}
            onClick={() => setNavDropdownOpen(!navDropdownOpen)}
          >
            <Icon name="folder" />
            <span>文章</span>
          </button>
          
          <div className="site-nav-menu" role="menu" style={{ display: navDropdownOpen ? 'flex' : undefined }}>
            <Link className={location.pathname === '/categories' ? 'active' : ''} to="/categories" role="menuitem">
              <Icon name="folder" />
              <span>分类</span>
            </Link>
            <Link className={location.pathname === '/tags' ? 'active' : ''} to="/tags" role="menuitem">
              <Icon name="tag" />
              <span>标签</span>
            </Link>
            <Link className={location.pathname === '/archives' ? 'active' : ''} to="/archives" role="menuitem">
              <Icon name="archive" />
              <span>归档</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 顶部功能按钮集合 */}
      <div className="header-tools">
        {/* 搜索按钮 */}
        <button
          className="icon-button js-search-open"
          type="button"
          aria-label="搜索文章"
          onClick={() => setSearchOpen(true)}
        >
          <Icon name="search" />
        </button>

        {/* 强调色选择器 */}
        <div className="accent-picker">
          <button
            className="icon-button accent-toggle"
            type="button"
            aria-label="选择主题色"
            title="选择主题色"
            aria-haspopup="true"
            aria-expanded={accentMenuOpen}
            aria-controls="accent-menu"
            onClick={() => setAccentMenuOpen(!accentMenuOpen)}
          >
            <Icon name="palette" />
          </button>

          <div
            className="accent-menu"
            id="accent-menu"
            role="menu"
            aria-label="主题色"
            style={{ display: accentMenuOpen ? 'flex' : undefined }}
          >
            {accents.map(colorName => (
              <button
                key={colorName}
                type="button"
                className={`accent-option ${accent === colorName ? 'active' : ''}`}
                role="menuitemradio"
                aria-label={colorName}
                aria-checked={accent === colorName}
                data-accent-option={colorName}
                onClick={() => {
                  setAccent(colorName as any);
                  setAccentMenuOpen(false);
                }}
              >
                <span className={`accent-swatch accent-swatch--${colorName}`} aria-hidden="true"></span>
              </button>
            ))}
          </div>
        </div>

        {/* 深浅色模式切换 */}
        <button
          className="icon-button js-mode-toggle theme-toggle"
          type="button"
          aria-label="切换配色模式"
          title="切换配色模式"
          onClick={toggleTheme}
        >
          <Icon name={isDark ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
};
