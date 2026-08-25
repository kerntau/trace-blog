import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { useTheme } from '@/context/ThemeContext';
import postsData from '@/data/posts.json';
import categoriesData from '@/data/categories.json';
import tagsData from '@/data/tags.json';
import siteData from '@/data/site-config.json';

export const SidebarProfile: React.FC = () => {
  const { accent, setAccent, mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const location = useLocation();

  const profile = siteData.theme?.profile || {};
  const author = siteData.site?.author || 'Aroes';
  const role = profile.role || '日常记录';
  const bio = profile.bio || '介绍一下自己 — 一两句话，写写你想被别人记住的部分。';

  const postsCount = postsData.length;
  const categoriesCount = Object.keys(categoriesData).length;
  const tagsCount = Object.keys(tagsData).length;

  const accents = ['orange', 'purple', 'sakura', 'blue', 'pink', 'green', 'black'] as const;

  return (
    <aside
      id="paper-sidebar-drawer"
      className={`paper-sidebar paper-sidebar--right ${mobileMenuOpen ? 'is-open' : ''}`}
      aria-label="侧边栏"
    >
      {/* 移动端抽屉顶部工具条 */}
      <div className="drawer-toolbar" aria-label="侧边栏工具">
        <div className="drawer-accent-options" role="group" aria-label="主题色">
          {accents.map(c => (
            <button
              key={c}
              type="button"
              className={`accent-option ${accent === c ? 'active' : ''}`}
              aria-label={c}
              aria-pressed={accent === c}
              data-accent-option={c}
              onClick={() => setAccent(c as any)}
            >
              <span className={`accent-swatch accent-swatch--${c}`} aria-hidden="true"></span>
            </button>
          ))}
        </div>
        <button
          className="icon-button drawer-close js-sidebar-close"
          type="button"
          aria-label="关闭侧边栏"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Icon name="x" />
        </button>
      </div>

      {/* 移动端导航菜单卡片 */}
      <section className="side-card nav-card">
        <nav className="site-nav-drawer" aria-label="移动端导航">
          <Link
            className={location.pathname === '/' ? 'active' : ''}
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon name="home" />
            <span>首页</span>
          </Link>
          <Link
            className={location.pathname === '/links' ? 'active' : ''}
            to="/links"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon name="link" />
            <span>友链</span>
          </Link>
          <Link
            className={location.pathname === '/about' ? 'active' : ''}
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon name="user" />
            <span>关于</span>
          </Link>

          <div className="drawer-nav-group is-open">
            <button className="drawer-nav-parent" type="button" aria-expanded="true">
              <Icon name="folder" />
              <span>文章</span>
            </button>
            <div className="drawer-nav-children">
              <Link
                className={location.pathname === '/categories' ? 'active' : ''}
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="folder" />
                <span>分类</span>
              </Link>
              <Link
                className={location.pathname === '/tags' ? 'active' : ''}
                to="/tags"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="tag" />
                <span>标签</span>
              </Link>
              <Link
                className={location.pathname === '/archives' ? 'active' : ''}
                to="/archives"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="archive" />
                <span>归档</span>
              </Link>
            </div>
          </div>
        </nav>
      </section>

      {/* 个人资料卡片 1:1 结构 */}
      <section className="side-card profile-card">
        {profile.avatar ? (
          <div className={`avatar avatar--image ${profile.avatar_shape === 'circle' ? 'avatar--circle' : ''}`}>
            <img src={profile.avatar} alt={author} loading="lazy" />
          </div>
        ) : (
          <div className="avatar" aria-hidden="true">
            <span></span><i></i><em></em><b></b>
          </div>
        )}

        <h3>{author}</h3>
        {role && <p className="profile-role">{role}</p>}
        <p>{bio}</p>

        {/* 站点统计 */}
        <div className="site-info" aria-label="站点统计">
          <Link className="site-info__item" to="/archives">
            <strong>{postsCount}</strong>
            <span>文章</span>
          </Link>
          <Link className="site-info__item" to="/categories">
            <strong>{categoriesCount}</strong>
            <span>分类</span>
          </Link>
          <Link className="site-info__item" to="/tags">
            <strong>{tagsCount}</strong>
            <span>标签</span>
          </Link>
        </div>

        {/* 社交链接 */}
        <div className="socials">
          {profile.social?.GitHub && (
            <a
              href={profile.social.GitHub}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-tooltip="GitHub"
            >
              <Icon name="github" />
            </a>
          )}
          {profile.social?.Bilibili && (
            <a
              href={profile.social.Bilibili}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bilibili"
              data-tooltip="Bilibili"
            >
              <Icon name="play" />
            </a>
          )}
          {profile.social?.X && (
            <a
              href={profile.social.X}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              data-tooltip="X (Twitter)"
            >
              <Icon name="twitter" />
            </a>
          )}
          {profile.social?.Email && (
            <a
              href={profile.social.Email}
              aria-label="Email"
              data-tooltip="Email"
            >
              <Icon name="mail" />
            </a>
          )}
          <a
            href="/atom.xml"
            aria-label="RSS feed"
            data-tooltip="RSS feed"
          >
            <Icon name="rss" />
          </a>
        </div>
      </section>
    </aside>
  );
};
