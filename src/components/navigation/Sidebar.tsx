interface Props {
  children: React.ReactNode;
}

// TODO: 仮コンポーネント
export function Sidebar({ children }: Props) {
  return <aside className="w-sidebar shrink-0 border-r">{children}</aside>;
}
