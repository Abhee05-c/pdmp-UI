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
      <title>AirWise Logo</title>
      <path d="M12 12c-2 0-4.5.9-6.2 2.3-.3.2-.5.5-.5.9v2.1c0 .4.2.8.5.9 1.8 1.4 4.2 2.3 6.2 2.3s4.5-.9 6.2-2.3c.3-.2.5-.5.5-.9v-2.1c0-.4-.2-.8-.5-.9-1.7-1.4-4.2-2.3-6.2-2.3z" />
      <path d="M12 12c2 0 4.5-.9 6.2-2.3.3-.2.5-.5.5-.9V6.7c0-.4-.2-.8-.5-.9-1.8-1.4-4.2-2.3-6.2-2.3s-4.5.9-6.2 2.3c-.3.2-.5.5-.5.9v2.1c0 .4.2.8.5.9 1.7 1.4 4.2 2.3 6.2 2.3z" />
    </svg>
  );
}
