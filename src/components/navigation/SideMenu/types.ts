import type { Icon } from '@phosphor-icons/react';

export interface IsActivePathOptions {
  matchPaths?: string[];
  matchPrefix?: string[];
}

export interface MenuItem extends IsActivePathOptions {
  label: string;
  href: string;
  icon: Icon;
  iconSize?: number;
  isActive?: boolean;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}
