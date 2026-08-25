import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import archivesData from '@/data/archives.json';
import postsData from '@/data/posts.json';

export const ArchivesPage: React.FC = () => {
  const years = Object.keys(archivesData).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="archive-paper">
          <div className="archive-header">
            <h1>文章归档</h1>
            <span className="archive-count">共计 {postsData.length} 篇</span>
          </div>

          <div className="archive-timeline">
            {years.map(year => {
              const list = (archivesData as Record<string, any[]>)[year] || [];
              return (
                <div key={year} className="archive-year-group">
                  <h2 className="archive-year">{year}</h2>
                  <ul className="archive-list">
                    {list.map(post => (
                      <li key={post.slug} className="archive-item">
                        <span className="archive-date">{new Date(post.date).toISOString().slice(5, 10)}</span>
                        <Link className="archive-link" to={`/post/${post.slug}`}>
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
