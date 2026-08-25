import React, { useState, useMemo } from 'react';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { Icon } from '@/components/common/Icon';
import linksData from '@/data/links.json';
import { LinkGroup } from '@/types';

export const LinksPage: React.FC = () => {
  const groups = (linksData || []) as LinkGroup[];
  const [searchTerm, setSearchTerm] = useState('');

  const totalCount = useMemo(() => {
    return groups.reduce((acc, g) => acc + (g.items ? g.items.length : 0), 0);
  }, [groups]);

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return groups;
    const term = searchTerm.toLowerCase().trim();
    return groups
      .map(group => ({
        ...group,
        items: (group.items || []).filter(item => {
          const name = String(item.name || '').toLowerCase();
          const desc = String(item.descr || '').toLowerCase();
          const url = String(item.url || '').toLowerCase();
          return name.includes(term) || desc.includes(term) || url.includes(term);
        })
      }))
      .filter(group => group.items && group.items.length > 0);
  }, [groups, searchTerm]);

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="article-tape-wrap">
          <article className="article-paper friends-paper">
            <header className="article-header">
              <h1>友情链接</h1>
              <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                共收录 {totalCount} 位技术与设计博友
              </p>
            </header>

            <div className="article-content">
              <div className="note-block note-block--flat note-block--info" style={{ marginBottom: '20px' }}>
                <div className="note-block-head">
                  <Icon name="link" />
                  <span className="note-block-title">交换友链</span>
                </div>
                <div className="note-block-body">
                  欢迎交换友链！请提供站点名称、站点链接、头像地址以及简短的站点描述。
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="搜索友链名称、简介或网址..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    padding: '8px 14px',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    background: 'var(--paper-warm)',
                    color: 'var(--ink)',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              {filteredGroups.map((group, idx) => (
                <div key={idx} className="friends-section" style={{ marginBottom: '32px' }}>
                  <h2 className="friends-group-title" style={{ fontSize: '18px', margin: '0 0 4px' }}>{group.group}</h2>
                  {group.description && <p className="friends-group-desc" style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 16px' }}>{group.description}</p>}

                  <div className="friends-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                    {(group.items || []).map(item => (
                      <a
                        key={String(item.url) + String(item.name)}
                        className="friend-card"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 14px',
                          border: '1px solid var(--line)',
                          borderRadius: '10px',
                          background: 'var(--paper-warm)',
                          color: 'inherit',
                          textDecoration: 'none',
                          boxShadow: 'var(--soft-shadow)',
                          transition: 'transform 0.2s ease, border-color 0.2s ease'
                        }}
                      >
                        <div
                          className="friend-avatar"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: 'var(--line)',
                            display: 'grid',
                            placeItems: 'center'
                          }}
                        >
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Icon name="link" />
                          )}
                        </div>

                        <div className="friend-info" style={{ minWidth: 0, flex: 1 }}>
                          <h3
                            className="friend-name"
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              fontWeight: 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="friend-desc"
                            style={{
                              margin: '2px 0 0',
                              fontSize: '12px',
                              color: 'var(--muted)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                            title={item.descr || item.url}
                          >
                            {item.descr || item.url}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {filteredGroups.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)', fontSize: '14px' }}>
                  未找到匹配 “{searchTerm}” 的友链
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
