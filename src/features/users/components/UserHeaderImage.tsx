import Image from 'next/image';

const HEADER_HEIGHT = 200;

interface Props {
  src?: string;
}

export function UserHeaderImage({ src }: Props) {
  return (
    <div
      className="-mx-6 -mt-5 relative overflow-hidden rounded-t-md"
      style={{ height: HEADER_HEIGHT }}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-linear-to-r from-primary/30 to-primary/10" />
      )}
    </div>
  );
}
