import React from "react";

type AddFriendIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

export default function AddFriendIcon({
  size = 24,
  color = "#1C1C1C",
  className,
}: AddFriendIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1C11.7614 1 14 3.23858 14 6C14 8.76142 11.7614 11 9 11C6.23858 11 4 8.76142 4 6C4 3.23858 6.23858 1 9 1ZM17.9925 18.6767C18 18.8383 18 19.0294 18 19.4118C18 19.4937 18 19.5347 17.9984 19.5693C17.9626 20.3433 17.3433 20.9626 16.5693 20.9984C16.5347 21 16.4937 21 16.4118 21H1.58824C1.50631 21 1.46534 21 1.43072 20.9984C0.656747 20.9626 0.0373836 20.3433 0.00160054 19.5693C0 19.5347 0 19.4937 0 19.4118C0 19.0294 0 18.8383 0.00746917 18.6767C0.174457 15.0648 3.06482 12.1745 6.67672 12.0075C6.83827 12 7.02944 12 7.41176 12H10.5882C10.9706 12 11.1617 12 11.3233 12.0075C14.9352 12.1745 17.8255 15.0648 17.9925 18.6767Z"
        fill={color}
      />
      <path
        d="M20 6.48828V12.4883"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 9.48828H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
