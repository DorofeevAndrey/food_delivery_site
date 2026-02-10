// front_nextjs/assets/NotificationMessageIcon.tsx
import { SVGProps } from "react";

export default function NotificationMessageIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="8" ry="8" fill="#00A980" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 28C26.0751 28 31 23.9706 31 19C31 14.0294 26.0751 10 20 10C13.9249 10 9 14.0294 9 19C9 20.9267 9.73994 22.7119 11 24.1759C11 24.1759 11.5 27.3865 10 30C14 30 16 27.3865 16 27.3865C17.2397 27.7826 18.5888 28 20 28ZM16 20C16.5523 20 17 19.5523 17 19C17 18.4477 16.5523 18 16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20ZM20 20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18C19.4477 18 19 18.4477 19 19C19 19.5523 19.4477 20 20 20ZM25 19C25 19.5523 24.5523 20 24 20C23.4477 20 23 19.5523 23 19C23 18.4477 23.4477 18 24 18C24.5523 18 25 18.4477 25 19Z"
        fill="white"
      />
    </svg>
  );
}
