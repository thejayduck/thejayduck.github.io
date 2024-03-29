import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import { ImagePreview } from "../components/gallery/imagePreview";
import PageBase from "../components/pageBase";
import gallery from "../docs/json/gallery.json";
import { formatDate } from "../lib/helper";

export default function Gallery() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

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

  // Handler for image click
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Handler for closing image preview
  const handleClosePreview = () => {
    setSelectedImageIndex(null);
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
              ❗Here I post my sketches and finished drawings. All of the images
              down below are downscaled!
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
                      } `}
                      onClick={() => toggleTag(tag)}
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
              {filteredGallery.map((galleryItem: any, index: number) => (
                <div
                  className={styles.galleryItem}
                  key={index}
                  onClick={() => handleImageClick(index)}
                >
                  <figure>
                    <Image
                      src={galleryItem.image}
                      alt={`Drawing ${galleryItem.title}`}
                      width={galleryItem.width}
                      height={galleryItem.height}
                      quality={65}
                    />
                    <figcaption>
                      [{formatDate(galleryItem.date)}]
                      <br />
                      {galleryItem.title}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </CardPanel>

          {/* Image Preview Component */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <ImagePreview
                key={"imagePreviewModal"}
                targetIndex={selectedImageIndex}
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
