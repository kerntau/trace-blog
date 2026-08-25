import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { SvgDefs } from '@/components/common/SvgDefs';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SearchModal } from '@/components/search/SearchModal';

import { HomePage } from '@/pages/HomePage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { ArchivesPage } from '@/pages/ArchivesPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { TagsPage } from '@/pages/TagsPage';
import { LinksPage } from '@/pages/LinksPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const AppLayout: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useTheme();

  return (
    <>
      {/* 纸质纹理颗粒 */}
      <div className="page-grain"></div>

      {/* SVG 符号与滤镜定义 */}
      <SvgDefs />

      {/* 顶部导航 */}
      <Header />

      {/* 路由页面内容 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/article/:slug" element={<PostDetailPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/friend" element={<LinksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* 移动端抽屉遮罩 */}
      <div
        className={`sidebar-backdrop js-sidebar-close ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* 页面底部 */}
      <Footer />

      {/* 全局搜索弹窗 */}
      <SearchModal />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
