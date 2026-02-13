import type { Icon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

export interface IsActivePathOptions {
  matchPaths?: string[];
  matchPrefix?: string[];
}

interface MenuItemBase extends IsActivePathOptions {
  label: string;
  icon: Icon;
  iconSize?: number;
  isActive?: boolean;
}

export interface MenuItemLink extends MenuItemBase {
  href: string;
  onClick?: never;
}

export interface MenuItemButton extends MenuItemBase {
  href?: never;
  onClick: () => void;
}

export type MenuItem = MenuItemLink | MenuItemButton;

export interface MenuSection {
  title?: string;
  titleComponent?: ComponentType;
  items: MenuItem[];
}
