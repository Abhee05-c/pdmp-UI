import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <title>FlyHigh Logo</title>
        <path d="M2 22l8-2 3.5-3.5-2-8-8-2z" />
        <path d="M10 14L2 22" />
        <path d="M16.5 7.5l-3.5-3.5" />
        <path d="M22 2l-2.5 5.5-3.5-3.5L14 2z" />
    </svg>
  );
}
