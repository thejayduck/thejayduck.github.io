import styles from "../../styles/Gallery.module.scss";

import { useState } from "react";

import gallery from "../../docs/json/gallery.json";
import { getIcon } from "../../lib/helper";

export const TagButtons = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
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
      <div className={styles.filterTags}>
        <div className={styles.tagButtons}>
          {Array.from(new Set(gallery.flatMap((item) => item.tags)))
            .sort((a, b) => a.localeCompare(b)) // Alphabetical Order
            .map((tag) => (
              <button
                key={tag}
                className={`cardItem ${styles.tagButton} ${
                  selectedTags.includes(tag) ? styles.selected : ""
                }`}
                onClick={() => toggleTag(tag)}
                disabled={!filteredTags.has(tag)}
                title={`Filter by ${tag}`}
              >
                <i
                  className={`${tagList[tag] ?? getIcon("tag")} ri-1x ri-fw`}
                />
                <span>{tag}</span>
              </button>
            ))}
          {selectedTags.length > 0 && ( // Clear tags button
            <button
              className={`cardItem ${styles.tagButton} ${styles.clearTags}`}
              onClick={() => setSelectedTags([])}
              title="Clear Filter"
            >
              <i className={`${getIcon("clearFilter")} ri-1x ri-fw`} />
              <span>Clear Filter</span>
            </button>
          )}
        </div>
      </div>
    ),
  };
};
