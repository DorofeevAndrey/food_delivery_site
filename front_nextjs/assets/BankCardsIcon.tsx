import React from "react";

type BankCardsIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

export default function BankCardsIcon({
  size = 24,
  color = "currentColor", // по умолчанию наследует цвет текста
  className,
}: BankCardsIconProps) {
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
        d="M23 16.8V7.2C23 6.0799 23 5.51984 22.782 5.09202C22.5903 4.71569 22.2843 4.40973 21.908 4.21799C21.4802 4 20.9201 4 19.8 4L4.2 4.00001C3.07989 4.00001 2.51984 4.00001 2.09202 4.21799C1.71569 4.40974 1.40973 4.7157 1.21799 5.09202C1 5.51984 1 6.07989 0.999997 7.19998L0.999997 7.2L0.999992 16.8C0.999995 17.9201 0.999997 18.4802 1.21798 18.908C1.40973 19.2843 1.71569 19.5903 2.09202 19.782C2.51984 20 3.0798 20 4.19974 20H19.8002C20.9202 20 21.4802 20 21.908 19.782C22.2843 19.5903 22.5903 19.2843 22.782 18.908C23 18.4802 23 17.9201 23 16.8Z"
        fill={color}
      />
      <rect opacity="0.4" x="1" y="7" width="22" height="3" fill="white" />
    </svg>
  );
}
