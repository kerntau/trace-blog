import React from 'react';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { SidebarWidgets } from '@/components/layout/SidebarWidgets';
import { PostCard } from '@/components/post/PostCard';
import postsData from '@/data/posts.json';
import { Post } from '@/types';

export const HomePage: React.FC = () => {
  const posts = postsData as Post[];

  return (
    <main className="paper-shell">
      {/* 左侧个人栏 */}
      <SidebarProfile />

      {/* 中间主内容区（文章流） */}
      <section className="paper-main">
        <div className="post-list">
          {posts.map((post, idx) => (
            <PostCard key={post.slug} post={post} index={idx} />
          ))}
        </div>
      </section>

      {/* 右侧欢迎与小挂件栏 */}
      <SidebarWidgets />
    </main>
  );
};
