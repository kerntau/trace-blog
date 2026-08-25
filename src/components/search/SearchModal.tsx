import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { useTheme } from '@/context/ThemeContext';
import searchData from '@/data/search-index.json';
import { SearchIndexItem } from '@/types';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results: SearchIndexItem[] = query.trim()
    ? searchData.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q)) ||
          item.categories.some(c => c.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelect = (slug: string) => {
    setSearchOpen(false);
    navigate(`/post/${slug}`);
  };

  return (
    <div className="search-modal is-open" role="dialog" aria-modal="true" aria-label="搜索">
      <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}></div>
      
      <div className="search-modal-dialog">
        <div className="search-modal-header">
          <div className="search-input-wrap">
            <Icon name="search" className="search-input-icon" />
            <input
              ref={inputRef}
              className="search-input"
              type="search"
              placeholder="搜索文章标题、标签、分类..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                className="icon-button search-clear"
                type="button"
                aria-label="清空"
                onClick={() => setQuery('')}
              >
                <Icon name="x" />
              </button>
            )}
          </div>
          <button className="search-close" type="button" onClick={() => setSearchOpen(false)}>
            取消
          </button>
        </div>

        <div className="search-modal-body">
          {query.trim() === '' ? (
            <div className="search-empty">输入关键词搜索文章</div>
          ) : results.length === 0 ? (
            <div className="search-empty">未找到与 "{query}" 相关的文章</div>
          ) : (
            <ul className="search-results-list">
              {results.map(item => (
                <li
                  key={item.slug}
                  className="search-result-item"
                  onClick={() => handleSelect(item.slug)}
                >
                  <a className="search-result-link" href={`/post/${item.slug}`} onClick={e => e.preventDefault()}>
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-snippet">{item.excerpt}</div>
                    <div className="search-result-meta">
                      <span>{new Date(item.date).toISOString().slice(0, 10)}</span>
                      {item.tags.length > 0 && <span>#{item.tags.join(' #')}</span>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
