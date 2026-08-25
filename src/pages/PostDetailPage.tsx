import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { SidebarProfile } from '@/components/layout/SidebarProfile';
import { PostToc } from '@/components/post/PostToc';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import postsData from '@/data/posts.json';
import { Post } from '@/types';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = (postsData as Post[]).find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) {
    return (
      <main className="paper-shell paper-shell--article">
        <SidebarProfile />
        <section className="paper-main">
          <div className="article-paper" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2>文章未找到</h2>
            <p>抱歉，您访问的文章不存在或已被移除。</p>
            <Link className="welcome-cta" to="/" style={{ display: 'inline-flex', marginTop: '1rem' }}>
              <span>返回首页</span>
              <Icon name="arrow-right" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="paper-shell paper-shell--article">
      {/* 左侧个人栏 */}
      <SidebarProfile />

      {/* 中间文章主体 */}
      <section className="paper-main">
        <div className="article-tape-wrap">
          <span className="tape tape--top-right" aria-hidden="true"></span>
          
          <article className="article-paper">
            <header className="article-header">
              {post.categories.length > 0 && (
                <Link className="label-pill" to={`/categories#${post.categories[0]}`}>
                  <Icon name="folder" />
                  <span>{post.categories[0]}</span>
                </Link>
              )}

              <h1>{post.title}</h1>

              <div className="meta-line meta-line--article">
                <span className="meta-date">
                  <Icon name="calendar" />
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>

                {post.tags.length > 0 && (
                  <span className="meta-tags">
                    <Icon name="tag" />
                    {post.tags.map(tag => (
                      <Link key={tag} className="meta-tag-link" to={`/tags#${tag}`}>
                        #{tag}
                      </Link>
                    ))}
                  </span>
                )}
              </div>
            </header>

            {/* Markdown 正文渲染 */}
            <MarkdownRenderer content={post.content} />

            {/* 文章底部互动栏 */}
            <footer className="article-reactions">
              <div className="reaction-group">
                <button
                  type="button"
                  className="reaction reaction--comment"
                  aria-label="评论"
                  onClick={() => alert('已到底部')}
                >
                  <Icon name="message-circle" />
                </button>
                <span className="reaction-label">评论</span>
              </div>
            </footer>
          </article>
        </div>
      </section>

      {/* 右侧 TOC 目录栏 */}
      <PostToc toc={post.toc} />
    </main>
  );
};
