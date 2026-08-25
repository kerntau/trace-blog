import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import tagsData from '@/data/tags.json';

export const TagsPage: React.FC = () => {
  const tags = Object.keys(tagsData);

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="taxonomy-paper">
          <div className="taxonomy-header">
            <h1>文章标签</h1>
            <span className="taxonomy-count">共 {tags.length} 个标签</span>
          </div>

          {/* 标签云徽章区 */}
          <div className="tags-cloud-paper">
            {tags.map(tag => {
              const list = (tagsData as Record<string, any[]>)[tag] || [];
              return (
                <a key={tag} href={`#${tag}`} className="tag-cloud-item">
                  <span>#{tag}</span>
                  <span className="tag-cloud-count">{list.length}</span>
                </a>
              );
            })}
          </div>

          {/* 各标签文章列表 */}
          <div className="tags-sections">
            {tags.map(tag => {
              const list = (tagsData as Record<string, any[]>)[tag] || [];
              return (
                <div key={tag} id={tag} className="tag-card">
                  <h2 className="tag-title">
                    <span>#{tag}</span>
                    <span className="tag-badge">({list.length})</span>
                  </h2>

                  <ul className="tag-post-list">
                    {list.map(post => (
                      <li key={post.slug} className="tag-post-item">
                        <Link className="tag-post-link" to={`/post/${post.slug}`}>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
