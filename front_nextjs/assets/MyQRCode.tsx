type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
};

export default function BackIcon({
  width = 24,
  height = 24,
  fill = "#1C1C1C",
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
        d="M11.3637 4.3637C11.7152 4.01223 12.285 4.01223 12.6365 4.3637C12.988 4.71517 12.988 5.28502 12.6365 5.63649L7.17289 11.1001H19.0001C19.4972 11.1001 19.9001 11.503 19.9001 12.0001C19.9001 12.4972 19.4972 12.9001 19.0001 12.9001H7.17289L12.6365 18.3637C12.988 18.7152 12.988 19.285 12.6365 19.6365C12.285 19.988 11.7152 19.988 11.3637 19.6365L4.36437 12.6372C4.36219 12.635 4.36001 12.6328 4.35785 12.6306C4.20023 12.47 4.10233 12.2507 4.10014 12.0084C4.10011 12.0056 4.1001 12.0029 4.1001 12.0001C4.1001 11.9973 4.10011 11.9946 4.10014 11.9918C4.10121 11.8731 4.12527 11.7599 4.16807 11.6564C4.21199 11.5499 4.2772 11.4502 4.3637 11.3637L11.3637 4.3637Z"
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
