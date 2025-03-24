import styles from "../styles/Gallery.module.scss";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import React, { useCallback, useEffect, useRef } from "react";

import CardPanel from "../components/cardPanel";
import { GalleryGrid } from "../components/gallery/galleryGrid";
import IGalleryEntry from "../components/gallery/IGalleryEntry";
import { ImagePreview } from "../components/gallery/imagePreview";
import { TagButtons } from "../components/gallery/tagButtons";
import PageBase from "../components/pageBase";
import gallery from "../docs/json/gallery.json";
import { getIcon } from "../lib/helper";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return {
    props: {
      id: id || null,
    },
  };
};

export default function Gallery({ id }: { id: string }) {
  const router = useRouter();

  const {
    filteredGallery,
    selectedTags,
    component: TagButtonsComponent,
  } = TagButtons();

  const containerRef = useRef<HTMLDivElement>(null); // Reference to the gallery container

  // Handler for image click
  const handleImageClick = useCallback(
    (id: string) => {
      router.replace(`/gallery/?id=${id}`, undefined, { scroll: false });
      document.body.style.overflow = "hidden";
    },
    [router]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = id ? "hidden" : "auto";
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [id]);

  // Handler for closing image preview
  const handleClosePreview = () => {
    router.replace("/gallery", undefined, { scroll: false });
    document.body.style.overflow = "auto";
  };

  function getCount(target: IGalleryEntry[]): number {
    return target.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.images.length;
    }, 0);
  }

  // Effect to calculate and update column span on window resize
  //? Move to galleryGrid.tsx
  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        containerRef.current?.querySelectorAll(`.${styles.galleryItem}`) || []
      );

      galleryItems.forEach((element, index) => {
        const galleryItem = element as HTMLElement;
        const item = filteredGallery[index].images[0]; // Main image is the first in the array

        // Calculate the ratio and apply styles
        const ratio = item.width / item.height;
        const baseSize = 15; // em
        galleryItem.style.flexBasis = `calc(${ratio} * ${baseSize}em)`;
        galleryItem.style.flexGrow = `${ratio * 100}`;
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

        <meta
          property="og:image"
          content={`https://ardarmutcu.com/api/ogGallery${
            id ? `?id=${id}` : ""
          }`}
        />
      </Head>

      <PageBase backPath="/" label="Back to Homepage">
        {/* Main Gallery Section */}
        <section className={`${styles.mainSection} flex flexColumn`}>
          <CardPanel title={"Gallery 🖌️"}>
            <p>
              <i className={getIcon("imagePosts")} />
              <b>{gallery.length} </b> Posts{" "}
              {selectedTags.length > 0
                ? `(Filtered: ${filteredGallery.length})`
                : ""}
              <br />
              <i className={getIcon("moreImages")} />
              <b>{getCount(gallery)} </b> Images{" "}
              {selectedTags.length > 0
                ? `(Filtered: ${getCount(filteredGallery)})`
                : ""}
            </p>
            <blockquote>
              <p>
                <i className={getIcon("error")} /> All of the drawings down
                below are downscaled and compressed! <strong>DO NOT</strong>{" "}
                redistribute, print, or use without explicit permission.
              </p>
              <p>
                <i className={getIcon("newIndicator")} /> Recently added
                drawings
                <br />
                <i className={getIcon("recording")} /> Hover to play process
                video
                <br />
                <i className={getIcon("stack")} /> Multiple images available
                <br />
                <i className={getIcon("censorship")} /> Mature content (hover to
                reveal)
              </p>
            </blockquote>

            <hr />
            {TagButtonsComponent}
            <br />
            <GalleryGrid
              containerRef={containerRef}
              handleImageClick={handleImageClick}
              gallery={filteredGallery}
            />
          </CardPanel>

          {/* Image Preview Component */}
          <AnimatePresence>
            {id != undefined && (
              <ImagePreview
                key={"imagePreviewModal"}
                activeIndex={filteredGallery.findIndex(
                  (image) => image.images[0].id == id
                )}
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
