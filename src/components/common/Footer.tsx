import React from 'react';
import { Icon } from '@/components/common/Icon';
import siteData from '@/data/site-config.json';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const author = siteData.site?.author || 'Aroes';

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copy">
          <span>© {currentYear} {author}</span>
          <span className="footer-heart" style={{ margin: '0 4px', color: '#d4716c' }}>
            <Icon name="heart" />
          </span>
          <span>Powered by React 19 & Rsbuild</span>
        </p>
        <p className="footer-theme" style={{ marginTop: '4px', opacity: 0.8 }}>
          FlatPaper Theme 1:1 Architecture Port — A quiet paper-inspired blog.
        </p>
      </div>
    </footer>
  );
};
