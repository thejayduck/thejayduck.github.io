import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import CardPanel from "../components/cardPanel";
import { ImagePreview } from "../components/imagePreview";
import PageBase from "../components/pageBase";
import SocialItem from "../components/socialItem";
import gallery from "../docs/json/gallery.json";

export default function Gallery() {
  // Ref for gallery container
  const containerRef = useRef<HTMLDivElement>(null);
  // State to track selected image index for preview
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

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
        const ratio = gallery[index].width / gallery[index].height;

        galleryItem.style.flexBasis = `calc(${ratio} * 15em)`;
        galleryItem.style.flexGrow = `calc(${ratio} * 100)`;
      });
    };

    calculateColumnSpan();
    window.addEventListener("resize", calculateColumnSpan);

    return () => {
      window.removeEventListener("resize", calculateColumnSpan);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Gallery · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Gallery" />
      </Head>

      <PageBase>
        {/* Back to Homepage button */}
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem
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
              📮<b>{gallery.length}</b> Posts
            </p>
            <p>
              ❗Here I post my sketches and finished drawings. All of the images
              down below are downscaled!
            </p>

            <hr />

            {/* Gallery Items */}
            <div className={styles.gallery} ref={containerRef}>
              {gallery.map((galleryItem: any, index: number) => (
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
                      [{galleryItem.date}]
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
            {selectedImageIndex && (
              <ImagePreview
                key={"imagePreviewModal"}
                imageIndex={selectedImageIndex}
                onClose={handleClosePreview}
              />
            )}
          </AnimatePresence>
        </section>
      </PageBase>
    </>
  );
}
