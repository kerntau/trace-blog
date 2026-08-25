import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { Icon } from '@/components/common/Icon';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="article-tape-wrap">
          <span className="tape tape--top-right" aria-hidden="true"></span>

          <article className="article-paper not-found-paper">
            <header className="article-header">
              <h1>404 - 页面不存在</h1>
            </header>

            <div className="article-content not-found-body" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div className="not-found-code" style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--color-accent)', opacity: 0.8 }}>
                404
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--ink-soft)' }}>
                您所寻找的页面已经移走或不存在。
              </p>
              <Link className="welcome-cta" to="/" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
                <span>返回首页</span>
                <Icon name="arrow-right" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
