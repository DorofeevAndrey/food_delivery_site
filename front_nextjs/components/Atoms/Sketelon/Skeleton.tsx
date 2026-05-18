"use client";

import cn from "classnames";
import styles from "./Skeleton.module.css";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
};

export default function Skeleton({
  width,
  height,
  borderRadius,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
  };

  return <div className={cn(styles.skeleton, className)} style={style} />;
}
