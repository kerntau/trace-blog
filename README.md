# Trace Blog

基于 Hexo 内容模型与 React/Rsbuild 前端的博客主题实验项目。Markdown 文章位于 source/_posts/，构建脚本将 front matter 与文章内容转换为前端可消费的数据。

## 技术栈

- React 19、TypeScript、React Router DOM
- Rsbuild/Rspack、Tailwind CSS
- React Markdown、Remark GFM、Rehype Highlight
- Hexo 风格的 source/ 内容目录与 _config.yml 配置

## 目录

~~~text
source/_posts/     # 博客文章
source/about/      # 关于页面
source/categories/ # 分类页
source/tags/       # 标签页
src/               # React 应用、组件、页面和样式
scripts/            # 内容构建脚本
themes/flatpaper/  # 主题模板
_config.yml        # Hexo 内容与站点配置
rsbuild.config.ts  # 前端构建配置
~~~

## 本地开发

需要 Node.js 18+。

~~~bash
npm install
npm run content    # 生成内容数据
npm run dev        # 内容生成后启动 Rsbuild
~~~

生产构建与预览：

~~~bash
npm run build
npm run preview
~~~

_config.yml 中的 url 默认是示例值 http://example.com，部署前请替换为自己的 HTTPS 域名；不部署时不要把示例地址当作站点链接发布。

## 写作

在 source/_posts/ 新建 Markdown 文件，并使用 Hexo front matter（title、date、tags、categories）。运行 npm run content 检查并生成文章数据。

## 许可证

以仓库中的 LICENSE 为准。
