import styles from "@/styles/components/GalleryToolbar.module.scss";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { getIcon, getLocalSavedItem, saveLocalItem } from "@/lib/helper";
import IGalleryEntry from "./IGalleryEntry";
import { Dropdown } from "./galleryToolbarDropdown";

export function GalleryToolbar(galleryData: IGalleryEntry[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [layoutView, setLayoutView] = useState<string>("custom");
  const [sortOrder, setSortOrder] = useState<string>("recent");

  useEffect(() => {
    getLocalSavedItem("galleryLayout", setLayoutView);
    getLocalSavedItem("sortOrder", setSortOrder);
  }, []);

  useEffect(() => {
    saveLocalItem("sortOrder", sortOrder);
    saveLocalItem("galleryLayout", layoutView);
  }, [sortOrder, layoutView]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const tagCollection = (item: IGalleryEntry): string[] => {
    return [...(item.tags ?? []), item.sensitive ? "sensitive" : null].filter(
      (tag) => typeof tag == "string"
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

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

  const filteredGallery = useMemo(() => {
    const filtered = galleryData.filter((item) => {
      const itemYear = item.date?.split("-")[0]; // Date format uses YYYY-MM
      const year = selectedYear == "all" || itemYear == selectedYear;

      const tags =
        selectedTags.length == 0 ||
        selectedTags.every((tag) => tagCollection(item).includes(tag));

      return year && tags;
    });

    return sortOrder === "old" ? filtered.reverse() : filtered;
  }, [selectedTags, selectedYear, galleryData, sortOrder]);

  // Used to disable unavailable tags and years depending on filter choices..
  const availableTags = useMemo(() => {
    const tagsSet = new Set(filteredGallery.flatMap(tagCollection));
    return tagsSet;
  }, [filteredGallery]);

  const availableYears = useMemo(() => {
    const yearsSet = new Set(
      filteredGallery.map((item) => item.date?.split("-")[0])
    );

    return yearsSet;
  }, [filteredGallery]);

  //? Move to helper.tsx ?
  const tagList: Record<string, [string, string]> = {
    animation: ["Animation", "ri-film-fill"],
    animal: ["Animal", "ri-leaf-fill"],
    cg: ["CG", "ri-computer-fill"],
    characterdesign: ["Character Design", "ri-compasses-2-fill"],
    commission: ["Commission", "ri-shake-hands-fill"],
    fanart: ["Fan Art", "ri-heart-fill"],
    fullcolor: ["Full Color", "ri-rainbow-fill"],
    gamejam: ["Game Jam", "ri-gamepad-fill"],
    lineart: ["Line Art", "ri-draft-fill"],
    sensitive: ["Sensitive", "ri-eye-off-fill"],
    oc: ["Original Character", "ri-user-fill"],
    sketch: ["Sketch", "ri-sketching"],
  };

  return {
    filteredGallery,
    selectedTags,
    selectedYear,
    layoutView,
    sortOrder,
    component: (
      <div ref={scrollRef} className={styles.filterTags} onWheel={handleWheel}>
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
          title="Toggle Order"
        >
          <i
            className={`${
              sortOrder === "old" ? getIcon("recentSort") : getIcon("oldSort")
            } ri-1x ri-fw`}
          />
        </button>

        <button
          className={`${styles.tagButton} ${styles.clearTags}`}
          disabled={selectedTags.length <= 0 && selectedYear == "all"}
          onClick={() => {
            setSelectedTags([]);
            setSelectedYear("all");
          }}
          title="Clear Filter(s)"
        >
          <i className={`${getIcon("clearFilter")} ri-1x ri-fw`} />
        </button>
        <Dropdown
          name="year"
          options={Array.from(
            new Set(galleryData.map((item) => item.date.split("-")[0]))
          )}
          value={selectedYear}
          onChange={setSelectedYear}
          disabledOptions={
            selectedTags.length > 0
              ? new Set(
                  Array.from(
                    new Set(galleryData.map((item) => item.date.split("-")[0]))
                  ).filter((year) => !availableYears.has(year))
                )
              : new Set()
          } // only enable years present in filteredGallery
          placeholderLabel="Year"
        />

        {Array.from(new Set(galleryData.flatMap(tagCollection)))
          .sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <button
              key={tag}
              className={`${styles.tagButton} ${
                selectedTags.includes(tag) ? styles.selected : ""
              }`}
              onClick={() => toggleTag(tag)}
              disabled={!availableTags.has(tag)}
              title={
                availableTags.has(tag)
                  ? `Filter by ${tagList[tag]?.[0] ?? tag}`
                  : `No images with ${tagList[tag]?.[0] ?? tag} tag available`
              }
            >
              <i
                className={`${tagList[tag]?.[1] ?? getIcon("tag")} ri-1x ri-fw`}
              />
              <span>{tagList[tag]?.[0] ?? tag}</span>
            </button>
          ))}
      </div>
    ),
  };
}
