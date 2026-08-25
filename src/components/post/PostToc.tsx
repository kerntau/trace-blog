import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { TocItem } from '@/types';

export const PostToc: React.FC<{ toc: TocItem[] }> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc
        .map(item => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <aside className="paper-sidebar paper-sidebar--left">
      <section className="side-card toc-card">
        <div className="toc-title">
          <Icon name="table-of-contents" />
          <span>目录</span>
        </div>

        <ol className="toc">
          {toc.map(item => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`toc-item toc-level-${item.level} ${isActive ? 'active is-active' : ''}`}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                <a className="toc-link" href={`#${item.id}`}>
                  <span className="toc-text">{item.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>
    </aside>
  );
};
