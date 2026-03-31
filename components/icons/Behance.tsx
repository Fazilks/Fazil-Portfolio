import React from "react";

export default function Behance({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 11.5c0-.85-.65-1.5-1.5-1.5H8.5v3h2c.85 0 1.5-.65 1.5-1.5z" />
      <path d="M10 7H8.5v1.5h1.5C10.85 8.5 11.5 7.85 11.5 7S10.85 5.5 10 5.5H8.5V7" />
      <path d="M3 5.5h5.5c2.5 0 2.5 4 0 4h-3.5v3.5h3.5c2.5 0 2.5 4 0 4H3V5.5z" />
      <path d="M14 15.5h8" />
      <path d="M22 13c0-3.5-5.5-3.5-5.5 0 0 2 1.5 3 3 3 1.5 0 2-.5 2.5-1" />
      <path d="M16.5 13h5" />
    </svg>
  );
}
