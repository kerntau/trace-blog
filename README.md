<div align="center">

# TRACE BLOG // FLATPAPER

**Hexo 内容模型驱动的 React 技术博客主题实验。**<br>
*An experimental React blog theme powered by a Hexo-style content model.*

[![GitHub](https://img.shields.io/badge/GitHub-kerntau%2Ftrace--blog-181717?style=for-the-badge&logo=github)](https://github.com/kerntau/trace-blog)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org)
[![Rsbuild](https://img.shields.io/badge/Rsbuild-1.2-F97316?style=for-the-badge)](https://rsbuild.dev)

</div>

---

## 01. PROJECT PURPOSE // 项目定位

Trace Blog 将 Hexo 风格的 Markdown 内容目录映射到 React 页面。文章保留在 source/ 下，构建脚本解析 front matter、生成内容数据，前端负责路由、阅读、分类和标签页面。

仓库定位是主题与内容管线实验，不是完整的 Hexo CLI 替代品。

## 02. TECHNICAL ARCHITECTURE // 技术架构

~~~mermaid
graph LR
    A[source/_posts Markdown] --> B[build-content.mjs]
    B --> C[src/data generated content]
    C --> D[React Router pages]
    D --> E[Rsbuild static output]
~~~

- React 19 + TypeScript 负责视图和类型边界。
- React Markdown、Remark GFM、Rehype Highlight 负责 Markdown、表格和代码高亮。
- Rsbuild/Rspack 负责开发服务器与生产构建。
- Hexo 风格的 source、categories、tags 目录保持内容组织习惯。

## 03. TECHNICAL MATRIX // 技术矩阵

| 层级 | 实现 | 说明 |
| --- | --- | --- |
| 内容 | Markdown + gray-matter | 读取 front matter 与正文 |
| 解析 | React Markdown + Remark GFM | 渲染 Markdown、表格和常用 GFM |
| 高亮 | Rehype Highlight | 代码块语法高亮 |
| 应用 | React 19 + React Router DOM | 博客路由与页面组件 |
| 构建 | Rsbuild/Rspack + Tailwind CSS | 开发、打包和样式 |

## 04. REPOSITORY TOPOLOGY // 源码工程拓扑

~~~text
.
├── source/
│   ├── _posts/               # 文章 Markdown
│   ├── about/                # 关于页面内容
│   ├── categories/           # 分类页数据
│   └── tags/                 # 标签页数据
├── src/                      # React 应用、页面、组件和样式
├── scripts/
│   └── build-content.mjs     # 生成前端内容数据
├── themes/flatpaper/         # 主题模板资源
├── _config.yml               # Hexo 风格内容配置
└── rsbuild.config.ts         # Rsbuild 配置
~~~

## 05. CLONE & QUICK START // 极速装配指南

环境要求：Node.js 18 或更高版本。

~~~bash
git clone https://github.com/kerntau/trace-blog.git
cd trace-blog
npm install
npm run content
npm run dev
~~~

npm run dev 会先生成内容数据，然后启动 Rsbuild 并尝试打开浏览器。

## 06. DEPLOYMENT & VERIFICATION // 部署与验证

~~~bash
npm run build
npm run preview
~~~

提交前至少验证内容生成和生产构建。仓库配置中的 site URL 仍是示例值；部署到自有域名或 GitHub Pages 时，请先在 _config.yml 中改成实际地址。

## 07. LICENSE // 许可证

仓库当前未附带独立 LICENSE 文件。对外发布或再分发前，请补充许可证并同步更新本节。
