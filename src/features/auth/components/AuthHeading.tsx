import { TextLogo } from '@/components/dataDisplay/TextLogo/TextLogo';

interface Props {
  subtitle: string;
}

export function AuthHeading({ subtitle }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <TextLogo className="h-8 w-auto" />
      <p className="text-sm text-text-subtle mt-2">{subtitle}</p>
    </div>
  );
}
