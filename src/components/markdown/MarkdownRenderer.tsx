import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Icon } from '@/components/common/Icon';

interface MarkdownRendererProps {
  content: string;
}

// 预处理 Hexo 便签语法
function preprocessMarkdown(content: string): string {
  let processed = content;

  // 匹配 {% note [type] [title] %} ... {% endnote %}
  processed = processed.replace(
    /\{%\s*note\s+([a-zA-Z]+)?\s*([^%]*?)\s*%\}([\s\S]*?)\{%\s*endnote\s*%\}/g,
    (_, type = 'info', title = '', body) => {
      const cleanType = type.trim().toLowerCase() || 'info';
      const cleanTitle = title.trim();
      return `<div class="note-block note-block--flat note-block--${cleanType}" data-note-type="${cleanType}" data-title="${cleanTitle}">\n\n${body.trim()}\n\n</div>`;
    }
  );

  // 匹配 ::: [type] [title] ... :::
  processed = processed.replace(
    /:::\s*([a-zA-Z]+)?\s*([^\n]*)\n([\s\S]*?):::/g,
    (_, type = 'info', title = '', body) => {
      const cleanType = type.trim().toLowerCase() || 'info';
      const cleanTitle = title.trim();
      return `<div class="note-block note-block--flat note-block--${cleanType}" data-note-type="${cleanType}" data-title="${cleanTitle}">\n\n${body.trim()}\n\n</div>`;
    }
  );

  return processed;
}

const CodeBlock: React.FC<{ language?: string; value: string }> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = value.split('\n');

  return (
    <figure className={`highlight ${language || 'text'}`}>
      <div className="code-badge-bar">
        <span className="code-badge">{language ? language.toUpperCase() : 'CODE'}</span>
        <button
          type="button"
          className="code-copy-btn"
          onClick={handleCopy}
          aria-label="复制代码"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="gutter">
              <pre>
                {lines.map((_, idx) => (
                  <span key={idx} className="line">{idx + 1}</span>
                ))}
              </pre>
            </td>
            <td className="code">
              <pre>
                <code>{value}</code>
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
    </figure>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const preprocessed = preprocessMarkdown(content);

  return (
    <div className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h1 id={id}>{children}</h1>;
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h3 id={id}>{children}</h3>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
              return <code className="inline-code" {...props}>{children}</code>;
            }
            return <CodeBlock language={match ? match[1] : ''} value={String(children).replace(/\n$/, '')} />;
          },
          div: ({ node, className, children, ...props }: any) => {
            if (className?.includes('note-block')) {
              const type = (props['data-note-type'] as string) || 'info';
              const title = (props['data-title'] as string) || '';

              let iconName = 'info';
              if (type === 'warning') iconName = 'alert-triangle';
              if (type === 'success') iconName = 'check-circle';
              if (type === 'danger' || type === 'error') iconName = 'alert-circle';

              return (
                <div className={`note-block note-block--flat note-block--${type}`}>
                  {title && (
                    <div className="note-block-head">
                      <Icon name={iconName} />
                      <span className="note-block-title">{title}</span>
                    </div>
                  )}
                  <div className="note-block-body">{children}</div>
                </div>
              );
            }
            return <div className={className} {...props}>{children}</div>;
          }
        }}
      >
        {preprocessed}
      </ReactMarkdown>
    </div>
  );
};
