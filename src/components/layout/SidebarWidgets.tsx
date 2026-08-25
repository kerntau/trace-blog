import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import postsData from '@/data/posts.json';
import siteData from '@/data/site-config.json';
import { Post } from '@/types';

export const SidebarWidgets: React.FC = () => {
  const [randomList, setRandomList] = useState<Post[]>([]);

  const refreshRandom = () => {
    const shuffled = [...(postsData as Post[])].sort(() => Math.random() - 0.5);
    setRandomList(shuffled.slice(0, 3));
  };

  useEffect(() => {
    refreshRandom();
  }, []);

  const welcome = siteData.theme?.profile || {};

  return (
    <aside className="paper-sidebar paper-sidebar--left">
      {/* 欢迎便签卡片 1:1 结构 */}
      <section className="welcome-card">
        <div className="welcome-thumb" aria-hidden="true">
          <div className="sun"></div>
          <div className="cloud cloud-a"></div>
          <div className="cloud cloud-b"></div>
          <div className="mountain mountain-a"></div>
          <div className="mountain mountain-b"></div>
        </div>

        <p className="hello">
          <span className="green-dot"></span>Hello!
        </p>

        <h1>欢迎来到这里</h1>
        <p className="welcome-text">
          这里是基于 FlatPaper 设计风格的个人博客。柔和纸面、胶带条、便签与安静的阅读体验。
        </p>

        <Link className="welcome-cta" to="/archives">
          <span>阅读所有文章</span>
          <Icon name="arrow-right" />
        </Link>
      </section>

      {/* 随机漫游卡片 1:1 结构 */}
      <section className="side-card random-posts-card">
        <div className="random-posts-header">
          <h3>
            <Icon name="shuffle" />
            <span>随便看看</span>
          </h3>
          <button
            className="random-posts-refresh icon-button"
            type="button"
            aria-label="换一批"
            onClick={refreshRandom}
          >
            <Icon name="compass" />
          </button>
        </div>

        <ul className="random-posts-list">
          {randomList.map(post => (
            <li key={post.slug} className="random-post-item">
              <Link className="random-post-link" to={`/post/${post.slug}`}>
                <span className="random-post-title">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
