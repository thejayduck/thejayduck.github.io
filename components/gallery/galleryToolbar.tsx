import styles from "@/styles/components/GalleryToolbar.module.scss";

import React, { useEffect, useRef, useState } from "react";

import { getIcon, getLocalSavedItem, saveLocalItem } from "@/lib/helper";
import IGalleryEntry from "./IGalleryEntry";
import { MultiDropdown } from "../multiDropDown";
import { GalleryFilters, TAG_METADATA } from "./filterManager";

export function GalleryToolbar(galleryData: IGalleryEntry[]) {
  const [layoutView, setLayoutView] = useState<string>("custom");
  const [sortOrder, setSortOrder] = useState<string>("recent");

  // Local Storage
  useEffect(() => {
    getLocalSavedItem("galleryLayout", setLayoutView);
    getLocalSavedItem("sortOrder", setSortOrder);
  }, []);

  useEffect(() => {
    saveLocalItem("sortOrder", sortOrder);
    saveLocalItem("galleryLayout", layoutView);
  }, [sortOrder, layoutView]);

  // Horizontal Scroll Handler
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();

      const scrollSpeed = e.deltaY + e.deltaX;
      scrollRef.current.scrollBy({
        left: scrollSpeed,
        behavior: "smooth",
      });
    }
  };

  // Tag Management

  const {
    filteredGallery,
    getAvailableFilters,
    clearAllFilters,
    clearFilterByKey,
    activeFilters,
    applyFilter,
    configs,
  } = GalleryFilters(galleryData, sortOrder);

  const activeFilterList = Object.values(activeFilters).some(
    (filter) => filter.length > 0
  );

  return {
    filteredGallery,
    layoutView,
    sortOrder,
    component: (
      <div className={styles.filterTags}>
        <button // Layout Toggle // ? make a component
          className={styles.tagButton}
          onClick={() =>
            setLayoutView((prev) => (prev === "custom" ? "grid" : "custom"))
          }
          title="Toggle Layout"
        >
          <i
            className={`${
              layoutView === "grid"
                ? getIcon("customLayout")
                : getIcon("gridLayout")
            } ri-1x ri-fw`}
          />
        </button>
        <button // Sort Order
          className={styles.tagButton}
          onClick={() =>
            setSortOrder((prev) => (prev === "recent" ? "old" : "recent"))
          }
          title={`Order by ${
            sortOrder === "recent" ? "oldest" : "most recent"
          }`}
        >
          <i
            className={`${
              sortOrder === "old" ? getIcon("oldSort") : getIcon("recentSort")
            } ri-1x ri-fw`}
          />
        </button>

        <button
          className={`${styles.tagButton} ${styles.clearTags}`}
          disabled={!activeFilterList}
          onClick={clearAllFilters}
          title="Clear Filter(s)"
        >
          <i className={`${getIcon("clearFilter")} ri-1x ri-fw`} />
        </button>

        <div
          className={styles.scrollableArea}
          ref={scrollRef}
          onWheel={handleWheel}
        >
          {configs.map((config) => {
            const selectedValues = activeFilters[config.key] || [];
            const options = config.getOptions(galleryData);

            if (config.type == "dropdown") {
              const isAvailable = getAvailableFilters[config.key];
              const disabledOptions = options.filter(
                (opt) => !isAvailable?.has(opt) && !selectedValues.includes(opt)
              );

              return (
                <MultiDropdown
                  key={config.key}
                  title={config.title}
                  alt={config.alt}
                  icon={config.icon}
                  searchInput={config.search}
                  options={options}
                  disableUnmatched={config.disableUnmatched}
                  disabledOptions={disabledOptions}
                  selectedOptions={selectedValues}
                  groups={config.groups}
                  showResetOption={true}
                  multiSelect={config.multiSelect}
                  onSelect={(s) => applyFilter(config.key, s, true)} // remove config.multiSelect bool parameter
                  onClear={() => clearFilterByKey(config.key)}
                />
              );
            }

            if (config.type == "list") {
              return options.map((tag) => {
                const isSelected = selectedValues.includes(tag);
                const isAvailable = getAvailableFilters[config.key]?.has(tag);
                const [label, icon] = TAG_METADATA[tag]; // Tag specific icons

                return (
                  <button
                    key={tag}
                    className={`${styles.tagButton} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => applyFilter(config.key, tag, true)}
                    disabled={!isAvailable}
                    title={`Filter by ${label}`}
                  >
                    <i className={`${icon} ri-1x ri-fw`} />
                    <span>{label}</span>
                  </button>
                );
              });
            }
          })}
        </div>
      </div>
    ),
  };
}
