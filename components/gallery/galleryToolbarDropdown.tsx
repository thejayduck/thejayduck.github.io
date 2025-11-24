import styles from "@/styles/components/GalleryToolbar.module.scss";
import { useRef } from "react";

interface GalleryToolBarDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholderLabel: string;
  disabledOptions?: Set<string>;
  name: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholderLabel,
  disabledOptions,
  name,
}: GalleryToolBarDropdownProps) => {
  return (
    <div className={styles.dropDownWrapper}>
      <i className="ri-calendar-fill ri-fw ri-1x"></i>

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">{placeholderLabel}</option>
        {options
          .sort((a, b) => a.localeCompare(b))
          .map((option) => (
            <option
              key={option}
              value={option}
              disabled={disabledOptions ? disabledOptions.has(option) : false}
            >
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};
