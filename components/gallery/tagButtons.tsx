import styles from "../../styles/Gallery.module.scss";

import React, { useRef, useState } from "react";

import gallery from "../../docs/json/gallery.json";
import { getIcon } from "../../lib/helper";
import { useToast } from "../toashHandler";

export const TagButtons = () => {
  const { showToast } = useToast();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const tagCollection = (item: (typeof gallery)[number]): string[] => {
    return [...(item.tags ?? []), item.mature ? "mature" : null].filter(
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

  const filteredGallery =
    selectedTags.length > 0
      ? gallery.filter((item) =>
          selectedTags.every((selectedTag) =>
            tagCollection(item).includes(selectedTag)
          )
        )
      : gallery;

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
    mature: ["Mature", "ri-eye-off-fill"],
    oc: ["Original Character", "ri-user-fill"],
    sketch: ["Sketch", "ri-sketching"],
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
        {Array.from(new Set(gallery.flatMap(tagCollection)))
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
};
