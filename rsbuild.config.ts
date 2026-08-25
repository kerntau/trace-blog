import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'FlatPaper - 个人博客',
    favicon: './src/assets/favicon.png',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0',
      description: 'A quiet paper-inspired blog theme built with React and Rsbuild'
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
