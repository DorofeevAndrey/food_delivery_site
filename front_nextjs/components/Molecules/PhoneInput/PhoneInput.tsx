import styles from "./PhoneInput.module.css";
import cn from "classnames";
import { use, useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function PhoneInput({ value, onChange, className }: Props) {
  const formatPhone = (val: string) => {
    let digits = val.replace(/\D/g, ""); // только цифры
    let formatted = "+7 ";

    if (digits.length > 1) {
      formatted += digits.substring(1, Math.min(4, digits.length));
    }

    if (digits.length > 4) {
      formatted =
        "+7 (" +
        digits.substring(1, 4) +
        ") " +
        digits.substring(4, Math.min(7, digits.length));
    }

    if (digits.length > 7) {
      formatted += "-" + digits.substring(7, Math.min(9, digits.length));
    }

    if (digits.length > 9) {
      formatted += "-" + digits.substring(9, Math.min(11, digits.length));
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhone(e.target.value));
  };
  return (
    <input
      type="text"
      placeholder="Укажите номер телефона"
      className={cn(styles.phoneInput, className)}
      value={value}
      onChange={handleChange}
    />
  );
}
