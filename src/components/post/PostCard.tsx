import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { Post } from '@/types';

const FALLBACK_COVERS = [
  '/images/cover/mountain.webp',
  '/images/cover/camera.webp',
  '/images/cover/notebook.webp',
  '/images/cover/port.webp',
  '/images/cover/snowman.webp'
];

export const PostCard: React.FC<{ post: Post; index?: number }> = ({ post, index = 0 }) => {
  const variant = index % 3;
  const coverSrc = post.cover || FALLBACK_COVERS[index % FALLBACK_COVERS.length];

  return (
    <article className="post-card" data-title={post.title}>
      <Link className="post-thumb-link" to={`/post/${post.slug}`} aria-label={post.title}>
        <div className={`paper-thumb paper-thumb-${variant} paper-thumb--cover`}>
          {coverSrc ? (
            <img
              className="paper-thumb__img"
              src={coverSrc}
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <>
              <div className="sun"></div>
              <div className="cloud cloud-a"></div>
              <div className="cloud cloud-b"></div>
              <div className="mountain mountain-a"></div>
              <div className="mountain mountain-b"></div>
              <div className="mountain mountain-c"></div>
              {variant === 1 && <div className="screen"><i></i><i></i><i></i></div>}
              {variant === 2 && <div className="camera"><i></i></div>}
            </>
          )}
        </div>
      </Link>

      <div className="post-card-copy">
        <h3>
          <Link to={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p>{post.excerpt}</p>

        {post.tags.length > 0 && (
          <div className="meta-line meta-line--tags">
            <span className="meta-tags">
              <Icon name="tag" />
              {post.tags.map(tag => (
                <Link key={tag} className="meta-tag-link" to={`/tags#${tag}`}>
                  #{tag}
                </Link>
              ))}
            </span>
          </div>
        )}

        <div className="meta-line meta-line--tax">
          <span className="meta-date">
            <Icon name="calendar" />
            {new Date(post.date).toISOString().slice(0, 10)}
          </span>

          {post.categories.length > 0 && (
            <span className="meta-cat">
              <Icon name="folder" />
              <Link className="meta-cat-link" to={`/categories#${post.categories[0]}`}>
                {post.categories[0]}
              </Link>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
