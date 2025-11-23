import styles from "@/styles/Gallery.module.scss";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { getIcon } from "@/lib/helper";
import IGalleryEntry from "./IGalleryEntry";

export function GalleryToolbar(galleryData: IGalleryEntry[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [layoutView, setLayoutView] = useState<"custom" | "grid">("custom");

  useEffect(() => {
    const saved = localStorage.getItem("galleryLayout");
    if (saved == "custom" || saved == "grid") {
      setLayoutView(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("galleryLayout", layoutView);
    }
  }, [layoutView]);

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
    return galleryData.filter((item) => {
      const itemYear = item.date?.split("-")[0]; // Date format uses YYYY-MM
      const year = selectedYear == "all" || itemYear == selectedYear;

      const tags =
        selectedTags.length == 0 ||
        selectedTags.every((tag) => tagCollection(item).includes(tag));

      return year && tags;
    });
  }, [selectedTags, selectedYear, galleryData]);

  const filteredTags = new Set(filteredGallery.flatMap(tagCollection)); // Used to disable unavailable tags.

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
    component: (
      <div ref={scrollRef} className={styles.filterTags} onWheel={handleWheel}>
        <button
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
        <select
          name="selectedYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All</option>
          {Array.from(
            new Set(galleryData.map((item) => item.date.split("-")[0]))
          )
            .sort((a, b) => a.localeCompare(b))
            .reverse()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>

        {Array.from(new Set(galleryData.flatMap(tagCollection)))
          .sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <button
              key={tag}
              className={`${styles.tagButton} ${
                selectedTags.includes(tag) ? styles.selected : ""
              }`}
              onClick={() => toggleTag(tag)}
              disabled={!filteredTags.has(tag)}
              title={
                filteredTags.has(tag)
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
