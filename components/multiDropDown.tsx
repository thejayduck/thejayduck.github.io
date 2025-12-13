import styles from "@/styles/components/CustomDropdown.module.scss";

import { useEffect, useMemo, useRef, useState } from "react";
import ClientOnlyPortal from "@/lib/clientOnlyPortal";
import { AnimatePresence, motion } from "motion/react";
import { getIcon } from "@/lib/helper";

// TODO add mobile view support for dropdown
// TODO organize and separate interface to a new file
interface MultiDropdownProps {
  icon?: string;
  title?: string;
  alt?: string;
  searchInput?: boolean;
  multiSelect?: boolean;
  placeHolder?: string;
  /** Adds a button at top that says "All", it is used as an alternative way to reset selection.  */
  showResetOption?: boolean;
  /** Array of all available options */
  options: string[];
  /** Disable elements that are not present in the current filtered gallery pool.  */
  disableUnmatched?: boolean;
  /** Array of options that are disabled. Used to apply a filter.  */
  disabledOptions?: string[];
  /** Array of selected options  */
  selectedOptions: string[];

  groups?: Record<string, { name: string; tags: string[] }>;

  onSelect: (s: string) => void;
  onClear?: () => void;
}

export function MultiDropdown(props: MultiDropdownProps) {
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState<string>("");

  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropDownWidth, setDropdownWidth] = useState<number | "auto">("auto");
  const hasSelectedItem = useMemo(
    () => props.selectedOptions.length > 0,
    [props.selectedOptions]
  );
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const [buttonCoords, setButtonCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePosition = () => {
    if (!dropdownWrapperRef.current) return;

    const rect = dropdownWrapperRef.current.getBoundingClientRect();
    setButtonCoords({
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  };

  const groupedTags = useMemo(() => {
    if (!props.groups) return new Set();
    return new Set(Object.values(props.groups).flatMap((group) => group.tags));
  }, [props.groups]);

  const dropDownSelectElement = (option: string) => {
    const isDisabled =
      props.disableUnmatched && props.disabledOptions?.includes(option);

    return (
      <li
        key={option}
        className={`${styles.option} ${
          props.selectedOptions.includes(option) ? styles.active : ""
        } ${isDisabled ? styles.disabled : ""}`}
        onClick={() => {
          if (isDisabled) return;
          selectHandler(option);
        }}
      >
        {option}
      </li>
    );
  };

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("load", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.addEventListener("load", updatePosition);
    };
  }, []);

  useEffect(() => {
    if (!focused) return;

    const onOutsideClick = (e: MouseEvent) => {
      const wrapper = dropdownWrapperRef.current;
      const dropdown = dropdownRef.current;

      if (
        !wrapper?.contains(e.target as Node) &&
        !dropdown?.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [focused]);

  const selectHandler = (option: string) => {
    props.onSelect(option);
    if (!props.multiSelect) setFocused(false);
  };

  const filtered = useMemo(() => {
    return props.options.filter((o) =>
      o.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, props.options]);

  useEffect(() => {
    if (!focused || !dropdownRef.current) return;

    const selfWidth = dropdownRef.current.scrollWidth;

    if (selfWidth) {
      setDropdownWidth(
        selfWidth > buttonCoords.width ? "auto" : buttonCoords.width
      );
    }
  }, [focused, buttonCoords.width, filtered]);

  return (
    <div
      className={styles.dropDownWrapper}
      onClick={() => {
        setFocused((prev) => !prev);
        updatePosition();
      }}
      ref={dropdownWrapperRef}
      title={props.alt}
    >
      <div
        className={`${styles.toggleButton} ${
          hasSelectedItem ? styles.active : ""
        }`}
      >
        {props.icon && <i className={`${props.icon} ri-1x ri-fw`} />}
        <span>{props.title}</span>
        <a
          title={hasSelectedItem ? "Clear Selection" : ""}
          onClick={() => {
            props.onClear && props.onClear();
          }}
        >
          <i
            className={`${styles.dropdownArrow} ${
              hasSelectedItem ? "ri-close-circle-fill" : "ri-arrow-down-s-fill"
            } ri-fw`}
          />
        </a>
      </div>

      {/* Dropdown Modal. Uses portals due to overflow conflict. */}
      <AnimatePresence>
        {focused && (
          <ClientOnlyPortal selector="#modal">
            <motion.ul
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: "tween", stiffness: 260, damping: 20 },
              }}
              ref={dropdownRef}
              onWheel={(e) => e.stopPropagation()}
              className={styles.multiDropdownList}
              onClick={(e) => e.stopPropagation()}
              style={{
                top: buttonCoords.top,
                left: buttonCoords.left,
                width: dropDownWidth == "auto" ? "auto" : `${dropDownWidth}px`,
              }}
            >
              {props.searchInput && (
                <div className={styles.inputWrapper}>
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      props.placeHolder ? props.placeHolder : "Search..."
                    }
                    className={styles.input}
                  />
                  {props.showResetOption && (
                    <a
                      title="Clear Selection"
                      onClick={() => {
                        if (!hasSelectedItem) return;

                        props.onClear && props.onClear();
                        setFocused(false);
                      }}
                      className={`${styles.clearAllButton} ${
                        !hasSelectedItem ? styles.disabled : styles.active
                      }`}
                    >
                      <i className={getIcon("close")} />
                    </a>
                  )}
                </div>
              )}

              {/* Grouped Options */}
              {filtered.length > 0 && (
                <>
                  {props.groups &&
                    Object.values(props.groups).map((group) => {
                      // Find items in the current search results that belong to this group
                      const matches = filtered.filter((option) =>
                        group.tags.includes(option)
                      );

                      return (
                        <div key={group.name} className={styles.groupWrapper}>
                          <li className={styles.groupHeader}>{group.name}</li>
                          {matches.map(dropDownSelectElement)}
                        </div>
                      );
                    })}

                  {(() => {
                    const rest = filtered.filter(
                      (option) => !groupedTags.has(option)
                    );

                    if (rest.length == 0) return null; // If not added an unnecessary space is added

                    return (
                      <>
                        {props.groups && (
                          <li className={styles.groupHeader}>Other</li>
                        )}
                        {rest.map(dropDownSelectElement)}
                      </>
                    );
                  })()}
                </>
              )}

              {/* Rest of the options */}
              {filtered.length == 0 && (
                <li className={styles.noResults}>
                  <span>No matches</span> <i className={getIcon("emojiSad")} />
                </li>
              )}
            </motion.ul>
          </ClientOnlyPortal>
        )}
      </AnimatePresence>
    </div>
  );
}
