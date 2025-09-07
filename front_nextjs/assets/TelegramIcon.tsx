// components/TelegramIcon.tsx
import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
};

export default function TelegramIcon({
  width = 24,
  height = 24,
  fill = "var(--interactiveBasePrimary)", // как в оригинальном svg
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
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.44364 10.7489C8.08077 8.20867 11.8397 6.534 13.7206 5.72489C19.0907 3.4147 20.2065 3.01339 20.9338 3.00014C21.0938 2.99723 21.4514 3.03823 21.6831 3.23267C21.8787 3.39685 21.9326 3.61863 21.9583 3.77429C21.9841 3.92995 22.0162 4.28455 21.9907 4.56163C21.6997 7.7241 20.4405 15.3986 19.7999 18.9406C19.5288 20.4394 18.9951 20.9419 18.4784 20.9911C17.3554 21.098 16.5027 20.2235 15.4151 19.4861C13.7132 18.3323 12.7517 17.614 11.0997 16.488C9.19056 15.1868 10.4282 14.4716 11.5162 13.3027C11.801 12.9969 16.7486 8.34226 16.8444 7.92001C16.8564 7.86721 16.8675 7.67036 16.7544 7.56642C16.6414 7.46248 16.4745 7.49802 16.3541 7.52629C16.1834 7.56636 13.4646 9.42501 8.19761 13.1022C7.42588 13.6503 6.72687 13.9174 6.10058 13.9034C5.41015 13.888 4.08204 13.4996 3.09473 13.1677C1.88374 12.7606 0.921278 12.5453 1.00509 11.8539C1.04874 11.4937 1.52826 11.1254 2.44364 10.7489Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
