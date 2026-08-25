import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import categoriesData from '@/data/categories.json';

export const CategoriesPage: React.FC = () => {
  const categories = Object.keys(categoriesData);

  return (
    <main className="paper-shell paper-shell--article">
      <SidebarProfile />

      <section className="paper-main">
        <div className="taxonomy-paper">
          <div className="taxonomy-header">
            <h1>文章分类</h1>
            <span className="taxonomy-count">共 {categories.length} 个分类</span>
          </div>

          <div className="category-tree">
            {categories.map(cat => {
              const list = (categoriesData as Record<string, any[]>)[cat] || [];
              return (
                <div key={cat} id={cat} className="category-card">
                  <h2 className="category-title">
                    <span>{cat}</span>
                    <span className="category-badge">({list.length})</span>
                  </h2>

                  <ul className="category-post-list">
                    {list.map(post => (
                      <li key={post.slug} className="category-post-item">
                        <Link className="category-post-link" to={`/post/${post.slug}`}>
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
