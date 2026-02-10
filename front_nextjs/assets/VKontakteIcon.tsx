import React from "react";

type VKontakteIconProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
};

export const VKontakteIcon: React.FC<VKontakteIconProps> = ({
  width = 32,
  height = 32,
  className,
  fill = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.65 10.046c.181-.603 0-1.046-.86-1.046h-2.844c-.723 0-1.057.383-1.238.804 0 0-1.446 3.526-3.495 5.816-.663.663-.965.874-1.326.874-.181 0-.452-.21-.452-.813v-5.635c0-.724-.2-1.046-.803-1.046h-4.47c-.452 0-.724.336-.724.654 0 .685 1.025.844 1.13 2.772v4.189c0 .918-.166 1.085-.527 1.085-.965 0-3.31-3.542-4.701-7.594C7.067 9.318 6.794 9 6.067 9H3.222c-.812 0-.975.383-.975.804 0 .754.964 4.49 4.49 9.433 2.35 3.375 5.662 5.204 8.676 5.204 1.808 0 2.031-.406 2.031-1.106v-2.551c0-.813.172-.975.744-.975.422 0 1.145.211 2.833 1.838 1.928 1.929 2.246 2.794 3.331 2.794h2.845c.812 0 1.219-.406.984-1.208-.256-.8-1.177-1.959-2.399-3.334-.663-.783-1.657-1.627-1.959-2.049-.422-.542-.301-.783 0-1.265 0 0 3.466-4.882 3.828-6.54z"
        fill={fill}
      />
    </svg>
  );
};
