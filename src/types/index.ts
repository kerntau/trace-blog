export interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  cover?: string;
  featured?: boolean;
  excerpt: string;
  content: string;
  toc: TocItem[];
}

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export interface LinkGroup {
  group: string;
  description?: string;
  items: LinkItem[];
}

export interface LinkItem {
  name: string;
  url: string;
  avatar?: string;
  descr?: string;
}

export interface SearchIndexItem {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  excerpt: string;
}

export interface SiteConfig {
  site: {
    title: string;
    subtitle: string;
    description: string;
    author: string;
    language: string;
  };
  theme: {
    menu: Record<string, any>;
    profile: {
      role: string;
      bio: string;
      avatar: string;
      avatar_shape: string;
      social: Record<string, string>;
    };
    background: {
      style: string;
    };
    accent_colors: Array<{ name: string; value: string }>;
  };
}
