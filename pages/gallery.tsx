import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import GalleryItem from "../components/gallery/galleryItem";
import IGalleryEntry from "../components/gallery/IGalleryEntry";
import { ImagePreview } from "../components/gallery/imagePreview";
import PageBase from "../components/pageBase";
import gallery from "../docs/json/gallery.json";

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the gallery container
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Selected tags for filtering
  const [focusedImage, setFocusedImage] = useState<number | null>(null); // Index of the clicked image

  // Handler for tag selection
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

  // Handler for image click
  const handleImageClick = (index: number) => {
    setFocusedImage(index);
    document.body.style.overflow = "hidden";
  };

  // Handler for closing image preview
  const handleClosePreview = () => {
    setFocusedImage(null);
    document.body.style.overflow = "auto";
  };

  // Effect to calculate and update column span on window resize
  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        containerRef.current?.querySelectorAll("div") || []
      );

      galleryItems.forEach((galleryItem: HTMLElement, index) => {
        const ratio =
          filteredGallery[index].width / filteredGallery[index].height;

        galleryItem.style.flexBasis = `calc(${ratio} * 15em)`;
        galleryItem.style.flexGrow = `calc(${ratio} * 100)`;
      });
    };

    calculateColumnSpan();
    window.addEventListener("resize", calculateColumnSpan);
    window.addEventListener("load", calculateColumnSpan);

    return () => {
      window.removeEventListener("resize", calculateColumnSpan);
      window.addEventListener("load", calculateColumnSpan);
    };
  }, [filteredGallery]);

  return (
    <>
      <Head>
        <title>Gallery · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Gallery" />
      </Head>

      <PageBase>
        {/* Back to Homepage button */}
        <ul className={"flex flexRight backButton"}>
          <Button
            icon="bx bx-undo"
            label="back to homepage"
            title="Back to Homepage"
            href="/"
            newPage={false}
          />
        </ul>

        {/* Main Gallery Section */}
        <section className={`${styles.mainSection} flex flexColumn`}>
          <CardPanel title={"Gallery 🖌️"}>
            <p>
              📮
              <b>{gallery.length} </b> Posts{" "}
              {selectedTags.length > 0
                ? `(Filtered: ${filteredGallery.length})`
                : ""}
            </p>
            <p>
              ❗All of the drawings down below are downscaled and compressed!
              <br />
              📽️ Some drawings also play a process video when hovered.
              <br />✋ Blurred posts are suggestive, hovering will reveal it.
              <br />
              🎨 In this page, you can view my drawings. Most of my posts
              consist of sketches, I just prefer the way they look over clean
              lines.
            </p>

            <hr />
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
                      disabled={!filteredTags.has(tag)}
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
            <br />
            {/* Gallery Items */}
            <div className={styles.gallery} ref={containerRef}>
              {filteredGallery.map(
                (galleryEntry: IGalleryEntry, index: number) => (
                  <GalleryItem
                    key={index}
                    entry={galleryEntry}
                    index={index}
                    handleImageClick={handleImageClick}
                  />
                )
              )}
            </div>
            <hr />
            <center className={styles.endNotice}>
              <span>You&apos;ve reached the end </span>

              <i className="bx bxs-sad"></i>
            </center>
          </CardPanel>

          {/* Image Preview Component */}
          <AnimatePresence>
            {focusedImage !== null && (
              <ImagePreview
                key={"imagePreviewModal"}
                activeIndex={focusedImage}
                images={filteredGallery}
                onOutsideClick={handleClosePreview}
              />
            )}
          </AnimatePresence>
        </section>
      </PageBase>
    </>
  );
}
