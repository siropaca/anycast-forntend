interface Props {
  title: string;
}

export function SectionTitle({ title }: Props) {
  return <h2 className="text-lg font-bold">{title}</h2>;
}
