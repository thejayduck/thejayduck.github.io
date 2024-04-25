import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import IGalleryItem from "../components/gallery/IGalleryItem";
import { ImagePreview } from "../components/gallery/imagePreview";
import PageBase from "../components/pageBase";
import gallery from "../docs/json/gallery.json";
import { formatDate } from "../lib/helper";

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the gallery container
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Selected tags for filtering
  const [focusedImage, setFocusedImage] = useState<number | null>(null); // Index of the clicked image
  const [hoveredImage, setHoveredImage] = useState<number | null>(null); // Index of the hovered image
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Handler for hover
  const handleMouseEnter = (index: number) => {
    setHoveredImage(null);
    setTimer(
      setTimeout(() => {
        setHoveredImage(index);
      }, 2000)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(timer as NodeJS.Timeout);
    setHoveredImage(null);
  };

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
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
            <br />
            {/* Gallery Items */}
            <div className={styles.gallery} ref={containerRef}>
              {filteredGallery.map(
                (galleryItem: IGalleryItem, index: number) => (
                  <div
                    className={`${styles.galleryItem} ${
                      galleryItem.suggestive ? styles.suggestiveFilter : ""
                    }`}
                    key={index}
                    onClick={() => handleImageClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onTouchStart={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <figure>
                      <Image
                        src={galleryItem.image}
                        alt={`Drawing ${galleryItem.title}`}
                        width={galleryItem.width}
                        height={galleryItem.height}
                        quality={65}
                      />

                      {galleryItem.process && (
                        <>
                          <i
                            className={`${styles.processIndicator} bx bxs-camera-movie`}
                          ></i>
                          <AnimatePresence>
                            {hoveredImage === index && (
                              <motion.video
                                className={styles.processVideo}
                                autoPlay
                                muted
                                loop
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <source
                                  src={galleryItem.process.video}
                                  type="video/mp4"
                                />
                                The video tag is not supported in your browser.
                              </motion.video>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                      <figcaption>
                        [{formatDate(galleryItem.date)}]
                        <br />
                        {galleryItem.title}
                      </figcaption>
                    </figure>
                  </div>
                )
              )}
            </div>
          </CardPanel>

          {/* Image Preview Component */}
          <AnimatePresence>
            {focusedImage !== null && (
              <ImagePreview
                key={"imagePreviewModal"}
                targetIndex={focusedImage}
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
