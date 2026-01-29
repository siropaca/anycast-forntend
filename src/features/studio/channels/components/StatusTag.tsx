interface Props {
  isPublished: boolean;
}

export function StatusTag({ isPublished }: Props) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${
        isPublished
          ? 'bg-status-published-bg text-status-published'
          : 'bg-status-draft-bg text-status-draft'
      }`}
    >
      {isPublished ? '公開中' : '下書き'}
    </span>
  );
}
