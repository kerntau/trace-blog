import React from 'react';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { Icon } from '@/components/common/Icon';
import linksData from '@/data/links.json';
import { LinkGroup } from '@/types';

export const LinksPage: React.FC = () => {
  const groups = linksData as LinkGroup[];

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="article-tape-wrap">
          <span className="tape tape--top-right" aria-hidden="true"></span>
          
          <article className="article-paper friends-paper">
            <header className="article-header">
              <h1>友情链接</h1>
            </header>

            <div className="article-content">
              <div className="note-block note-block--flat note-block--info">
                <div className="note-block-head">
                  <Icon name="info" />
                  <span className="note-block-title">交换友链</span>
                </div>
                <div className="note-block-body">
                  欢迎交换友链！请提供站点名称、站点链接、头像地址以及简短的站点描述。
                </div>
              </div>

              {groups.map((group, idx) => (
                <div key={idx} className="friends-section">
                  <h2 className="friends-group-title">{group.group}</h2>
                  {group.description && <p className="friends-group-desc">{group.description}</p>}

                  <div className="friends-grid">
                    {group.items.map(item => (
                      <a
                        key={item.name}
                        className="friend-card"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="friend-avatar">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Icon name="link" />
                          )}
                        </div>

                        <div className="friend-info">
                          <h3 className="friend-name">{item.name}</h3>
                          <p className="friend-desc">{item.descr || item.url}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
