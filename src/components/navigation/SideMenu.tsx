import type { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

export interface MenuItem {
  label: string;
  href: string;
  icon: Icon;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface Props {
  sections: MenuSection[];
}

export function SideMenu({ sections }: Props) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {sections.map((section, index) => (
        <div key={section.title ?? index} className={index > 0 ? 'mt-4' : ''}>
          {section.title && (
            <p className="px-3 py-2 text-sm">[{section.title}]</p>
          )}

          {section.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 flex gap-x-4 items-center"
            >
              <item.icon size={24} />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
