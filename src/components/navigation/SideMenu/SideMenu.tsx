import { SideMenuSectionGroup } from '@/components/navigation/SideMenu/SideMenuSectionGroup';
import type { MenuSection } from '@/components/navigation/SideMenu/types';

export type {
  MenuItem,
  MenuSection,
} from '@/components/navigation/SideMenu/types';

interface Props {
  sections: MenuSection[];
  bottomSections?: MenuSection[];
}

export function SideMenu({ sections, bottomSections }: Props) {
  return (
    <nav className="flex h-full flex-col justify-between p-4 md:pt-0">
      {/* 通常メニュー */}
      <div className="space-y-2">
        {sections.map((section, index) => (
          <SideMenuSectionGroup
            key={section.title ?? index}
            section={section}
          />
        ))}
      </div>

      {/* ボトムメニュー */}
      {bottomSections && bottomSections.length > 0 && (
        <div className="space-y-2">
          {bottomSections.map((section, index) => (
            <SideMenuSectionGroup
              key={section.title ?? index}
              section={section}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
