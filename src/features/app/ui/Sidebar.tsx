interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  return (
    <aside className="w-60 shrink-0 border-r border-foreground/10">
      {children}
    </aside>
  );
}
