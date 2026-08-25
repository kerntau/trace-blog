import React from 'react';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { Icon } from '@/components/common/Icon';
import siteData from '@/data/site-config.json';

export const AboutPage: React.FC = () => {
  const author = siteData.site?.author || 'Aroes';

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="article-tape-wrap">
          <span className="tape tape--top-right" aria-hidden="true"></span>
          
          <article className="article-paper">
            <header className="article-header">
              <h1>关于我与本站</h1>
            </header>

            <div className="article-content">
              <h2>关于本站</h2>
              <p>
                这里是基于 <strong>React 19 + Rsbuild + FlatPaper</strong> 架构重构的个人博客。
              </p>

              <blockquote>
                FlatPaper 是一个面向个人写作的主题：柔和纸面、扁平插画、便签、胶带条，以及在桌面和移动端都尽量安静的阅读界面。
              </blockquote>

              <h2>博主介绍</h2>
              <p>
                你好！我是 <strong>{author}</strong>，热爱开源与工程化技术，专注于高质量代码与极致用户体验。
              </p>

              <div className="note-block note-block--flat note-block--success">
                <div className="note-block-head">
                  <Icon name="check-circle" />
                  <span className="note-block-title">架构 1:1 状态</span>
                </div>
                <div className="note-block-body">
                  当前已实现全量 FlatPaper 样式复刻，包含原生 CSS 变量、纸张滤镜、双栏/三栏响应式骨架与即时搜索。
                </div>
              </div>

              <h2>联系方式</h2>
              <ul>
                <li>GitHub：<a href="https://github.com" target="_blank" rel="noreferrer">https://github.com</a></li>
                <li>Email：<a href="mailto:contact@example.com">contact@example.com</a></li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
