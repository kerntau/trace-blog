import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const ROOT_DIR = process.cwd();
const SOURCE_POSTS_DIR = path.join(ROOT_DIR, 'source', '_posts');
const SOURCE_DATA_DIR = path.join(ROOT_DIR, 'source', '_data');
const OUTPUT_DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const THEME_CONFIG_FILE = path.join(ROOT_DIR, '_config.flatpaper.yml');
const SITE_CONFIG_FILE = path.join(ROOT_DIR, '_config.yml');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DATA_DIR)) {
  fs.mkdirSync(OUTPUT_DATA_DIR, { recursive: true });
}

// 1. 读取配置文件
let siteConfig = {
  title: 'FlatPaper Blog',
  subtitle: 'A quiet paper-inspired blog',
  description: 'A quiet paper-inspired Hexo theme rewritten with React and Rsbuild',
  author: 'Aroes',
  language: 'zh-CN',
};

if (fs.existsSync(SITE_CONFIG_FILE)) {
  try {
    const raw = fs.readFileSync(SITE_CONFIG_FILE, 'utf-8');
    const parsed = yaml.load(raw);
    siteConfig = { ...siteConfig, ...parsed };
  } catch (err) {
    console.warn('读取 _config.yml 失败:', err);
  }
}

let themeConfig = {
  menu: {
    '首页': { link: '/', icon: 'home' },
    '友链': { link: '/links', icon: 'link' },
    '关于': { link: '/about', icon: 'user' },
    '文章': {
      icon: 'folder',
      item: {
        '分类': { link: '/categories', icon: 'folder' },
        '标签': { link: '/tags', icon: 'tag' },
        '归档': { link: '/archives', icon: 'archive' }
      }
    }
  },
  profile: {
    role: '日常记录',
    bio: '介绍一下自己 — 一两句话，写写你想被别人记住的部分。',
    avatar: '',
    avatar_shape: 'square',
    social: {
      github: 'https://github.com',
      rss: '/atom.xml'
    }
  },
  background: {
    style: 'default'
  },
  accent_colors: [
    { name: '经典蓝', value: '#40798C' },
    { name: '抹茶绿', value: '#5B8E7D' },
    { name: '暖木棕', value: '#8C5E48' },
    { name: '暮山紫', value: '#6E5D7E' },
    { name: '珊瑚粉', value: '#A85A65' }
  ]
};

if (fs.existsSync(THEME_CONFIG_FILE)) {
  try {
    const raw = fs.readFileSync(THEME_CONFIG_FILE, 'utf-8');
    const parsed = yaml.load(raw);
    if (parsed) {
      themeConfig = { ...themeConfig, ...parsed };
    }
  } catch (err) {
    console.warn('读取 _config.flatpaper.yml 失败:', err);
  }
}

// 2. 读取友链数据
let links = [];

const friendsJsonFile = path.join(SOURCE_DATA_DIR, 'friends.json');
const linksFile = path.join(SOURCE_DATA_DIR, 'links.yml');

if (fs.existsSync(friendsJsonFile)) {
  try {
    const raw = fs.readFileSync(friendsJsonFile, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // 转换为标准友链分组格式
      const items = parsed.map(item => ({
        name: item.name,
        url: item.link || item.url || '#',
        avatar: item.avatar || '',
        descr: item.desc || item.descr || ''
      }));

      links = [
        {
          group: '推荐伙伴',
          description: '与我一路相伴、互相交流的技术与设计朋友们',
          items: items.slice(0, 16)
        },
        {
          group: '更多博友',
          description: `全网技术同路人 (共 ${items.length} 位)`,
          items: items.slice(16)
        }
      ];
    }
  } catch (err) {
    console.warn('读取 friends.json 失败:', err);
  }
} else if (fs.existsSync(linksFile)) {
  try {
    const raw = fs.readFileSync(linksFile, 'utf-8');
    const parsed = yaml.load(raw);
    if (Array.isArray(parsed)) {
      links = parsed;
    }
  } catch (err) {
    console.warn('读取 links.yml 失败:', err);
  }
}

// 如果没有友链，提供默认展示
if (links.length === 0) {
  links = [
    {
      group: '常用推荐',
      description: '优质技术与设计站点',
      items: [
        {
          name: 'FlatPaper Demo',
          url: 'https://flatpaper.nep.me/',
          avatar: 'https://flatpaper.nep.me/images/favicon.png',
          descr: 'A quiet paper-inspired Hexo theme.'
        }
      ]
    }
  ];
}

// 3. 提取文章 TOC 目录
function extractTOC(content) {
  const headings = [];
  const lines = content.split('\n');
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
      headings.push({ level, text, id });
    }
  }
  return headings;
}

// 4. 读取所有 Markdown 文章
const posts = [];
if (fs.existsSync(SOURCE_POSTS_DIR)) {
  const files = fs.readdirSync(SOURCE_POSTS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(SOURCE_POSTS_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);

    // slug 优先使用 frontmatter.url
    const slug = data.url || file.replace(/\.md$/, '');
    const title = data.title || slug;
    const dateStr = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
    
    // 规范化 categories & tags
    let categories = [];
    if (data.categories) {
      categories = Array.isArray(data.categories) ? data.categories : [data.categories];
    } else if (data.category) {
      categories = Array.isArray(data.category) ? data.category : [data.category];
    }
    
    let tags = [];
    if (data.tags) {
      tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    }

    // 封面图处理 (兼容 cover 与 images 数组)
    let cover = data.cover || '';
    if (!cover && data.images) {
      cover = Array.isArray(data.images) ? data.images[0] : data.images;
    }

    // 精选文章判断 (兼容 featured 与 recommend >= 90)
    const featured = Boolean(data.featured || (data.recommend && Number(data.recommend) >= 90));

    // 提取纯文本摘要 (前 160 字)
    const plainText = content
      .replace(/\{%[\s\S]*?%\}/g, '')
      .replace(/:::[\s\S]*?:::/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/#+\s+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const excerpt = data.summary || data.description || (plainText.slice(0, 160) + (plainText.length > 160 ? '...' : ''));

    const toc = extractTOC(content);

    posts.push({
      slug,
      title,
      date: dateStr,
      categories,
      tags,
      cover: cover || '',
      featured,
      excerpt,
      content,
      toc
    });
  }
}

// 按发布时间倒序排列
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// 5. 生成分类与标签索引
const categoriesMap = {};
const tagsMap = {};
const archivesMap = {};

for (const post of posts) {
  for (const cat of post.categories) {
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push({ slug: post.slug, title: post.title, date: post.date });
  }
  for (const tag of post.tags) {
    if (!tagsMap[tag]) tagsMap[tag] = [];
    tagsMap[tag].push({ slug: post.slug, title: post.title, date: post.date });
  }
  const year = new Date(post.date).getFullYear().toString();
  if (!archivesMap[year]) archivesMap[year] = [];
  archivesMap[year].push({ slug: post.slug, title: post.title, date: post.date, categories: post.categories, tags: post.tags });
}

// 6. 生成全局搜索索引
const searchIndex = posts.map(p => ({
  slug: p.slug,
  title: p.title,
  date: p.date,
  categories: p.categories,
  tags: p.tags,
  excerpt: p.excerpt
}));

// 7. 读取并传递其它附加数据 (关于我、里程碑、动态等)
const extraDataFiles = ['my.json', 'milestones.json', 'records.json', 'equipment.json'];
for (const extraFile of extraDataFiles) {
  const extraPath = path.join(SOURCE_DATA_DIR, extraFile);
  if (fs.existsSync(extraPath)) {
    try {
      const content = fs.readFileSync(extraPath, 'utf-8');
      fs.writeFileSync(path.join(OUTPUT_DATA_DIR, extraFile), content);
    } catch (e) {
      console.warn(`拷贝 ${extraFile} 失败:`, e);
    }
  }
}

// 8. 写入核心数据文件
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'posts.json'), JSON.stringify(posts, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'categories.json'), JSON.stringify(categoriesMap, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'tags.json'), JSON.stringify(tagsMap, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'archives.json'), JSON.stringify(archivesMap, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'links.json'), JSON.stringify(links, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
fs.writeFileSync(path.join(OUTPUT_DATA_DIR, 'site-config.json'), JSON.stringify({ site: siteConfig, theme: themeConfig }, null, 2));

console.log(`[Content Builder] 成功生成数据: ${posts.length} 篇文章, ${Object.keys(categoriesMap).length} 个分类, ${Object.keys(tagsMap).length} 个标签, ${links.reduce((acc, g) => acc + g.items.length, 0)} 条友链。`);
