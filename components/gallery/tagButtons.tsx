import styles from "../../styles/Gallery.module.scss";

import { useState } from "react";

import gallery from "../../docs/json/gallery.json";

export const TagButtons = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return {
    selectedTags,
    component: (
      <div className={styles.filterTags}>
        <div className={styles.tagButtons}>
          {Array.from(new Set(gallery.flatMap((item) => item.tags))).map(
            (tag) => (
              <button
                key={tag}
                className={`cardItem ${styles.tagButton} ${
                  selectedTags.includes(tag) ? styles.selected : ""
                }`}
                onClick={() => toggleTag(tag)}
                // disabled={!filteredTags.has(tag)}
                title={`Filter by ${tag}`}
              >
                <span>{tag}</span>
              </button>
            )
          )}
          {selectedTags.length > 0 && ( // Clear tags button
            <button
              className={`cardItem ${styles.tagButton} ${styles.clearTags}`}
              onClick={() => setSelectedTags([])}
              title="Clear Filter"
            >
              <i className="bx bx-x" />
              <span>Clear Filter</span>
            </button>
          )}
        </div>
      </div>
    ),
  };
};
