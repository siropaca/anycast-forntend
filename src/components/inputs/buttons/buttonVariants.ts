export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'danger';
export type ButtonVariant = 'solid' | 'outline' | 'text';

export const buttonBaseClasses =
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border font-medium leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50';

export const colorVariantClasses: Record<
  ButtonColor,
  Record<ButtonVariant, string>
> = {
  primary: {
    solid:
      'bg-primary text-white border-transparent enabled:hover:bg-primary/80 enabled:active:bg-primary/70',
    outline:
      'bg-transparent text-primary border-primary enabled:hover:bg-primary/10 enabled:active:bg-primary/20',
    text: 'bg-transparent text-primary border-transparent enabled:hover:bg-primary/10 enabled:active:bg-primary/20',
  },
  secondary: {
    solid:
      'bg-secondary text-black border-transparent enabled:hover:bg-secondary/80 enabled:active:bg-secondary/70',
    outline:
      'bg-transparent text-secondary border-secondary enabled:hover:bg-secondary/10 enabled:active:bg-secondary/20',
    text: 'bg-transparent text-secondary border-transparent enabled:hover:bg-secondary/10 enabled:active:bg-secondary/20',
  },
  danger: {
    solid:
      'bg-danger text-white border-transparent enabled:hover:bg-danger/80 enabled:active:bg-danger/70',
    outline:
      'bg-transparent text-danger border-danger enabled:hover:bg-danger/10 enabled:active:bg-danger/20',
    text: 'bg-transparent text-danger border-transparent enabled:hover:bg-danger/10 enabled:active:bg-danger/20',
  },
};
