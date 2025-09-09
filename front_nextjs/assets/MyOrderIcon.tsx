import React from "react";

type MyOrderIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

export default function MyOrderIcon({
  size = 24,
  color = "currentColor", // по умолчанию наследует цвет текста
  className,
}: MyOrderIconProps) {
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
        d="M9.89999 4.39961C9.89999 4.12347 10.1238 3.89961 10.4 3.89961H13.6C13.8761 3.89961 14.1 4.12347 14.1 4.39961V5.99961H9.89999V4.39961ZM8.09999 5.99961V4.39961C8.09999 3.12935 9.12974 2.09961 10.4 2.09961H13.6C14.8702 2.09961 15.9 3.12935 15.9 4.39961V5.99961H20V17.9996C20 19.1042 19.1046 19.9996 18 19.9996H6C4.89543 19.9996 4 19.1042 4 17.9996L4 5.99961L8.09999 5.99961Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
