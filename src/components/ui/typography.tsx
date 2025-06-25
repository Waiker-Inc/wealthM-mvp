import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { JSX } from 'react';

const typographyVariants = cva('inherit', {
  variants: {
    size: {
      'display-lg': 'text-[60px] leading-[140%] sm:text-[34px]',
      'display-md': 'text-[54px] leading-[140%] sm:text-[30px]',
      'display-sm': 'text-[40px] leading-[140%] sm:text-[26px]',
      'headline-lg': 'text-[36px] leading-[140%] sm:text-[24px]',
      'headline-md': 'text-[30px] leading-[140%] sm:text-[22px]',
      'headline-sm': 'text-[26px] leading-[140%] sm:text-[20px]',
      'title-lg': 'text-[24px] leading-[160%] sm:text-[18px]',
      'title-md': 'text-[22px] leading-[160%] sm:text-[17px]',
      'title-sm': 'text-[20px] leading-[160%] sm:text-[16px]',
      'body-lg': 'text-[18px] leading-[160%] sm:text-[16px]',
      'body-md': 'text-[16px] leading-[160%] sm:text-[15px]',
      'body-sm': 'text-[14px] leading-[160%] sm:text-[14px]',
      'label-lg': 'text-[13px] leading-[140%] sm:text-[13px]',
      'label-md': 'text-[12px] leading-[140%] sm:text-[12px]',
      'label-sm': 'text-[11px] leading-[140%] sm:text-[11px]',
    } as const,
    weight: {
      regular: 'font-normal', // 400
      medium: 'font-medium', // 500
      bold: 'font-bold', // 700
    } as const,
  },
  defaultVariants: {
    size: 'body-md',
    weight: 'regular',
  },
});

type TypographySize =
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'headline-lg'
  | 'headline-md'
  | 'headline-sm'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label-lg'
  | 'label-md'
  | 'label-sm';

type TypographyWeight = 'regular' | 'medium' | 'bold';

type TypographyProps<T extends keyof JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T> & {
    children: React.ReactNode;
    className?: string;
    as?: T;
    size?: TypographySize;
    weight?: TypographyWeight;
  };

export default function Typography<
  T extends keyof JSX.IntrinsicElements = 'p'
>({ children, className, as, size, weight, ...props }: TypographyProps<T>) {
  const Element = (as || 'p') as React.ElementType;
  return (
    <Element
      className={cn(typographyVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Element>
  );
}
