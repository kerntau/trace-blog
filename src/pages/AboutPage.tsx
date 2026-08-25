import React from 'react';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { Icon } from '@/components/common/Icon';
import siteData from '@/data/site-config.json';
import myData from '@/data/my.json';

export const AboutPage: React.FC = () => {
  const author = siteData.site?.author || 'kerntau';
  const projects = (myData && Array.isArray(myData.project)) ? myData.project : [];
  const goals = (myData && Array.isArray(myData.goals)) ? myData.goals : [];
  const techStack = (myData && Array.isArray(myData.technology_stack)) ? myData.technology_stack : [];

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="article-tape-wrap">
          <article className="article-paper">
            <header className="article-header">
              <h1>关于我与本站</h1>
            </header>

            <div className="article-content">
              <h2>个人简介</h2>
              <p>
                你好！我是 <strong>{author}</strong>，一名全栈开发工程师与开源爱好者。
              </p>
              <blockquote>
                心中有景，花香满径。在有序的代码世界里，探索全栈架构、云原生与极致的用户体验。
              </blockquote>

              {goals.length > 0 && (
                <>
                  <h2>近期目标</h2>
                  <div className="about-goals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', margin: '14px 0' }}>
                    {goals.map((g: any, idx: number) => (
                      <div key={idx} className="note-block note-block--flat note-block--info" style={{ margin: 0, padding: '12px 14px' }}>
                        <div className="note-block-head" style={{ marginBottom: 0 }}>
                          <Icon name="tag" />
                          <span className="note-block-title" style={{ fontSize: '13px', fontWeight: 600 }}>{g.value || g}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {projects.length > 0 && (
                <>
                  <h2>代表项目</h2>
                  <div className="about-projects" style={{ display: 'grid', gap: '16px', margin: '16px 0' }}>
                    {projects.map((proj: any, idx: number) => (
                      <div
                        key={idx}
                        className="project-card"
                        style={{
                          padding: '18px 20px',
                          border: '1px solid var(--line)',
                          borderRadius: '10px',
                          background: 'var(--paper-warm)',
                          boxShadow: 'var(--soft-shadow)'
                        }}
                      >
                        <h3 style={{ margin: '0 0 8px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>{proj.name}</span>
                          {proj.front?.url && (
                            <a
                              href={proj.front.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-accent-strong)' }}
                            >
                              GitHub 仓库 ↗
                            </a>
                          )}
                        </h3>
                        <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>
                          {proj.description}
                        </p>
                        {proj.front?.technology && (
                          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                            <strong>技术栈：</strong> {proj.front.technology}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {techStack.length > 0 && (
                <>
                  <h2>技术图谱</h2>
                  <div className="tag-cloud" style={{ margin: '14px 0 24px' }}>
                    {techStack.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="tag-chip"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <h2>联系方式</h2>
              <ul>
                <li>GitHub：<a href="https://github.com/kerntau" target="_blank" rel="noreferrer">https://github.com/kerntau</a></li>
                <li>Bilibili：<a href="https://space.bilibili.com/9655855" target="_blank" rel="noreferrer">https://space.bilibili.com/9655855</a></li>
                <li>X (Twitter)：<a href="https://x.com/Kerntao" target="_blank" rel="noreferrer">https://x.com/Kerntao</a></li>
                <li>Email：<a href="mailto:hi@keru.in">hi@keru.in</a></li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
