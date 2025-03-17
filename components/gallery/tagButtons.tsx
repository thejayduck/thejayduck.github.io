import styles from "../../styles/Gallery.module.scss";

import React, { useRef, useState } from "react";

import gallery from "../../docs/json/gallery.json";
import { getIcon } from "../../lib/helper";
import { useToast } from "../toashHandler";

export const TagButtons = () => {
  const { showToast } = useToast();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  const filteredGallery =
    selectedTags.length > 0
      ? gallery.filter((item) =>
          selectedTags.every((selectedTag) => item.tags.includes(selectedTag))
        )
      : gallery;

  const filteredTags = new Set(filteredGallery.flatMap((item) => item.tags)); // Used to disable unavailable tags.

  //? Move to helper.tsx ?
  const tagList: Record<string, string> = {
    animal: "ri-leaf-fill",
    cg: "ri-computer-fill",
    characterdesign: "ri-compasses-2-fill",
    commission: "ri-shake-hands-fill",
    fanart: "ri-heart-fill",
    fullcolor: "ri-rainbow-fill",
    gamejam: "ri-gamepad-fill",
    lineart: "ri-draft-fill",
    mature: "ri-eye-off-fill",
    oc: "ri-user-fill",
    process: "ri-loader-2-fill",
    sketch: "ri-sketching",
  };

  return {
    filteredGallery,
    selectedTags,
    component: (
      <div ref={scrollRef} className={styles.filterTags} onWheel={handleWheel}>
        <button
          className={`${styles.tagButton} ${styles.clearTags}`}
          disabled={selectedTags.length <= 0}
          onClick={() => {
            setSelectedTags([]);
            showToast(
              "Cleared Filters!",
              undefined,
              getIcon("clearFilter"),
              "low"
            );
          }}
          title="Clear Filter"
        >
          <i className={`${getIcon("clearFilter")} ri-1x ri-fw`} />
          {/* <span>Clear Filter</span> */}
        </button>
        {Array.from(new Set(gallery.flatMap((item) => item.tags)))
          .sort((a, b) => a.localeCompare(b)) // Alphabetical Order
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
                  ? `Filter by ${tag}`
                  : `No images with ${tag} tag available`
              }
            >
              <i className={`${tagList[tag] ?? getIcon("tag")} ri-1x ri-fw`} />
              <span>{tag}</span>
            </button>
          ))}
      </div>
    ),
  };
};
