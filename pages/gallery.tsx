import styles from "../styles/Gallery.module.scss";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import React, { useCallback, useEffect, useRef } from "react";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import { GalleryGrid } from "../components/gallery/galleryGrid";
import { ImagePreview } from "../components/gallery/imagePreview";
import { TagButtons } from "../components/gallery/tagButtons";
import PageBase from "../components/pageBase";
import gallery from "../docs/json/gallery.json";
import useStreamData from "../lib/useStreamData";

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
  // const { id } = router.query;

  const { selectedTags, component: TagButtonsComponent } = TagButtons();
  const filteredGallery =
    selectedTags.length > 0
      ? gallery.filter((item) =>
          selectedTags.every((selectedTag) => item.tags.includes(selectedTag))
        )
      : gallery;
  const filteredTags = new Set(filteredGallery.flatMap((item) => item.tags)); // Used to disable unavailable tags.

  const [streamData] = useStreamData();
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the gallery container

  // Handler for image click
  const handleImageClick = useCallback(
    (id: string) => {
      router.push(`/gallery/?id=${id}`);
      document.body.style.overflow = "hidden";
    },
    [router]
  );

  // Handler for closing image preview
  const handleClosePreview = () => {
    router.push("/gallery");
    document.body.style.overflow = "auto";
  };

  // Effect to calculate and update column span on window resize
  //? Move to galleryGrid.tsx
  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        containerRef.current?.querySelectorAll("div") || []
      );

      galleryItems.forEach((galleryItem: HTMLElement, index) => {
        //? Improve
        const item = filteredGallery[index];
        const ratio = item.width / item.height;

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
  }, [filteredGallery, streamData?.is_active]);

  return (
    <>
      <Head>
        <title>Gallery · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Gallery" />

        <meta
          property="og:image"
          content={`https://ardarmutcu.com/api/og?id=${id}`}
        />
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
                  (image) => image.id == id
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
