import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: string | number;
}

const ICON_MAP: Record<string, string> = {
  home: 'flatpaper-icon-lucide-house',
  house: 'flatpaper-icon-lucide-house',
  'layout-grid': 'flatpaper-icon-lucide-layout-grid',
  archive: 'flatpaper-icon-lucide-archive',
  link: 'flatpaper-icon-lucide-link',
  link2: 'flatpaper-icon-lucide-link',
  user: 'flatpaper-icon-lucide-user',
  search: 'flatpaper-icon-lucide-search',
  x: 'flatpaper-icon-lucide-x',
  close: 'flatpaper-icon-lucide-x',
  sun: 'flatpaper-icon-lucide-sun',
  moon: 'flatpaper-icon-lucide-moon',
  palette: 'flatpaper-icon-lucide-palette',
  github: 'flatpaper-icon-fa-brands-github',
  twitter: 'flatpaper-icon-fa-brands-twitter',
  'x-twitter': 'flatpaper-icon-fa-brands-x-twitter',
  mail: 'flatpaper-icon-lucide-mail',
  email: 'flatpaper-icon-lucide-mail',
  rss: 'flatpaper-icon-lucide-rss',
  atom: 'flatpaper-icon-lucide-atom',
  heart: 'flatpaper-icon-lucide-heart',
  'message-circle': 'flatpaper-icon-lucide-message-circle',
  'message-square': 'flatpaper-icon-lucide-message-square',
  calendar: 'flatpaper-icon-lucide-calendar',
  clock: 'flatpaper-icon-lucide-clock',
  shuffle: 'flatpaper-icon-lucide-shuffle',
  folder: 'flatpaper-icon-lucide-folder',
  tag: 'flatpaper-icon-lucide-tag',
  'arrow-right': 'flatpaper-icon-lucide-arrow-right',
  'arrow-left': 'flatpaper-icon-lucide-arrow-left',
  'chevron-right': 'flatpaper-icon-lucide-chevron-right',
  'chevron-down': 'flatpaper-icon-lucide-chevron-down',
  menu: 'flatpaper-icon-lucide-menu',
  leaf: 'flatpaper-icon-lucide-leaf',
  compass: 'flatpaper-icon-lucide-compass',
};

export const Icon: React.FC<IconProps> = ({ name, className = '', size = '1em' }) => {
  const cleanName = name.toLowerCase().replace(/^fa-(solid|brands|regular):/, '').trim();
  const symbolId = ICON_MAP[cleanName] || (ICON_MAP[name] || `flatpaper-icon-lucide-${cleanName}`);

  return (
    <svg
      className={`lucide lucide-${cleanName} ${className}`}
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '-0.125em' }}
    >
      <use href={`#${symbolId}`} />
    </svg>
  );
};
