<<<<<<< HEAD
export default function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5L21 5"
        stroke="var(--color-black)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 12L21 12"
        stroke="var(--color-black)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 19L21 19"
        stroke="var(--color-black)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
=======
import React from "react";

type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
};

export default function MenuIcon({
  width = 20,
  height = 20,
  fill = "var(--color-black)",
  className,
}: IconProps) {
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
        d="M3 5L21 5"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12L21 12"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19L21 19"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
>>>>>>> 90b41b270e9a67161a330b44968a5a45aab49186
    </svg>
  );
}
