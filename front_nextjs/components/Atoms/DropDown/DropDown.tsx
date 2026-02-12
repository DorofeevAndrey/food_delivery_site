"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/Atoms/Input/Input";
import styles from "./DropDown.module.css";

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export default function Dropdown({
  value,
  placeholder,
  options,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // закрытие по клику снаружи
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <Input
        id="dropdown"
        type="text"
        readOnly
        value={value}
        placeholder={placeholder}
        onChange={() => {}}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={styles.option}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
