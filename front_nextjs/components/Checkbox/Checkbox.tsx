"use client";
import { Check } from "lucide-react";
import styles from "./Checkbox.module.css";
import cn from "classnames";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Checkbox({ checked, className, onChange }: Props) {
  return (
    <div
      className={cn(styles.checkbox, className, { [styles.checked]: checked })}
      onClick={() => onChange(!checked)}
    >
      {checked && <Check className={styles.icon} size={14} />}
    </div>
  );
}
