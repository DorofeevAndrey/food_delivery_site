// components/CloseIcon.tsx
import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  stroke?: string;
  className?: string;
};

export default function CloseIcon({
  width = 24,
  height = 24,
  stroke = "#1C1C1C",
  className,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 12L18 6M12 12L6 18M12 12L18 18M12 12L6 6"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
