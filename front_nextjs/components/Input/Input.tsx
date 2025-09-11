import styles from "./Input.module.css";
import cn from "classnames";
import { ChangeEvent } from "react";

type InputProps = {
  type?: string;
  placeholder: string; // теперь обязательно, т.к. это наш label
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  minLength?: number;
  autoComplete?: string;
  disable?: boolean;
};

export default function Input({
  type = "text",
  disable = false,
  placeholder,
  className,
  value,
  onChange,
  id,
  minLength,
  autoComplete = "off",
}: InputProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        id={id}
        type={type}
        className={cn(styles.input, { [styles.filled]: value })}
        value={value}
        onChange={onChange}
        disabled={disable}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder=" " // ставим пробел, чтобы браузер не показывал дефолтный placeholder
      />
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
    </div>
  );
}
