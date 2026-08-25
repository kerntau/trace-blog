import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'kerntau - 心中有景,花香满径',
    favicon: './src/assets/favicon.svg',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0',
      description: '个人技术博客与知识库，记录全栈开发、云原生、系统架构与工程实践心得。',
      keywords: 'kerntau, 全栈开发, 云原生, 系统架构, React 19, Rsbuild, Trace, SSG'
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
