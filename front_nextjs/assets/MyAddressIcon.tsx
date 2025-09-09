import React from "react";

type MyAddressIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

export default function MyAddressIcon({
  size = 24,
  color = "currentColor", // по умолчанию наследует цвет текста
  className,
}: MyAddressIconProps) {
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
        d="M4.5 21C4.5 21.1733 4.58973 21.3342 4.73713 21.4253C4.88454 21.5164 5.06861 21.5247 5.22361 21.4472L12 18.059L18.7764 21.4472C18.9314 21.5247 19.1155 21.5164 19.2629 21.4253C19.4103 21.3342 19.5 21.1733 19.5 21V4.6V4.58072C19.5 4.31715 19.5 4.08977 19.4847 3.90249C19.4686 3.70481 19.4329 3.5082 19.3365 3.31901C19.1927 3.03677 18.9632 2.8073 18.681 2.66349C18.4918 2.56709 18.2952 2.53144 18.0975 2.51528C17.9102 2.49998 17.6828 2.49999 17.4193 2.5L17.4 2.5L6.6 2.5L6.58073 2.5C6.31715 2.49999 6.08977 2.49999 5.90249 2.51529C5.70481 2.53144 5.5082 2.5671 5.31901 2.66349C5.03677 2.8073 4.8073 3.03677 4.66349 3.31902C4.56709 3.50821 4.53144 3.70482 4.51528 3.90249C4.49998 4.08977 4.49999 4.31716 4.5 4.58073L4.5 4.6V21Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
