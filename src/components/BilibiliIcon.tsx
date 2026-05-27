import React from 'react';

interface BilibiliIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  id?: string;
}

export default function BilibiliIcon({ className = "w-6 h-6", ...props }: BilibiliIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Antennas */}
      <path d="M5.5 2.5L9 6" />
      <path d="M18.5 2.5L15 6" />
      {/* TV Body */}
      <rect x="2" y="6" width="20" height="15" rx="4" />
      {/* Inside Eyes (Vertical Capsules) */}
      <rect x="6.8" y="11.3" width="2.4" height="4.4" rx="1.2" fill="currentColor" stroke="none" />
      <rect x="14.8" y="11.3" width="2.4" height="4.4" rx="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
