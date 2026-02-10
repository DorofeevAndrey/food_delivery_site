"use client";

import { ReactNode } from "react";
import styles from "./Modal.module.css";
import cn from "classnames";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
};

export default function Modal({
  className,
  isOpen,
  onClose,
  children,
  overlayClassName,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={cn(styles.overlay, overlayClassName)} onClick={onClose}>
      <div
        className={cn(styles.modal, className)}
        onClick={(e) => e.stopPropagation()} // чтобы клик внутри окна не закрывал
      >
        {children}
      </div>
    </div>
  );
}
