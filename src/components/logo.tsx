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
      <title>EstimateRUL Logo</title>
      <path d="M21 12a9 9 0 1 1-6.2-8.7" />
      <path d="M16 4.1L19 7l-3.4 2.1" />
      <path d="M12 9v4l2 2" />
    </svg>
  );
}
