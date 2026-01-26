interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  return (
    <aside className="w-sidebar shrink-0 overflow-y-auto">{children}</aside>
  );
}
