import styles from "../styles/Gallery.module.scss";

import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence } from "motion/react";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CardPanel from "../components/cardPanel";
import { GalleryGrid } from "../components/gallery/galleryGrid";
import IGalleryEntry from "../components/gallery/IGalleryEntry";
import { ImagePreview } from "../components/gallery/imagePreview";
import { GalleryToolbar } from "../components/gallery/galleryToolbar";
import PageBase from "../components/pageBase";
import { galleryRouterSet, getGallery, getIcon } from "../lib/helper";
import { useToast } from "../components/toashHandler";

const PER_PAGE = 12;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const index = context.query.index;
  return {
    props: {
      id: id || null,
      index: index || null,
    },
  };
};

export default function Gallery({ id, index }: { id: string; index: number }) {
  const router = useRouter();
  const galleryRouter = galleryRouterSet(id || "", 0);
  const { showToast } = useToast();

  // Gallery Data from MongoDB
  const [galleryData, setGalleryData] = useState<IGalleryEntry[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      await getGallery((res) => {
        setGalleryData(res);
      });
    };

    fetchGallery();
  }, []);

  // Paging
  const [page, setPage] = useState(1);
  const pageLoaderRef = useRef<HTMLDivElement>(null);

  // Contains IDs of revealed sensitive image posts
  const [visibleSensitiveImages, setVisibleSensitiveImages] = useState<
    Record<string, boolean>
  >({});

  const handleRevealClick = (id: string) => {
    setVisibleSensitiveImages((prev) => ({ ...prev, [id]: true }));
  };

  const {
    filteredGallery,
    layoutView,
    component: TagButtonsComponent,
  } = GalleryToolbar(galleryData);

  const [displayedGallery, setDisplayedGallery] = useState<IGalleryEntry[]>([]);

  useEffect(() => {
    setPage(1); // Reset page back to one after tag selection
    setDisplayedGallery(filteredGallery.slice(0, PER_PAGE));
  }, [filteredGallery]);

  useEffect(() => {
    if (page == 0) return;

    const newImages = filteredGallery.slice(0, page * PER_PAGE);
    setDisplayedGallery(newImages);
  }, [page]);

  // Page Observer for infinite scroll
  useEffect(() => {
    const currentLoader = pageLoaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          displayedGallery.length < filteredGallery.length
        ) {
          setPage((prev) => (prev += 1));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [displayedGallery.length, filteredGallery.length]);

  // Handler for image click
  const handleImageClick = useCallback(
    (id: string) => {
      const imageRouter = galleryRouterSet(id, 0);
      imageRouter.navigateTo("gallery", router);
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
    galleryRouter.navigate("gallery", router);
    document.body.style.overflow = "auto";
  };

  function getCount(target: IGalleryEntry[]): number {
    return target.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.images.length;
    }, 0);
  }

  const activeIndex = useMemo(() => {
    if (!id || filteredGallery.length == 0) return -1;

    return filteredGallery.findIndex((entry) => {
      if (entry._id == id) return true;
      return entry.images.some((img) => img.id == id);
    });
  }, [id, filteredGallery]);

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
          {/* Description */}
          <CardPanel title={"Gallery 🖌️"}>
            <p>
              <i className={getIcon("imagePosts")} />
              <b>{filteredGallery.length} </b> Posts
              <br />
              <i className={getIcon("moreImages")} />
              <b>{getCount(filteredGallery)} </b> Images
            </p>
            <blockquote>
              <p>
                <i className={getIcon("error")} /> All of the drawings down
                below are downscaled and compressed! <strong>DO NOT</strong>{" "}
                redistribute, print, or use without explicit permission.
                <br />
                <i className={getIcon("error")} /> I do not actively post my art
                outside of this <u>page</u>,{" "}
                <Link target="_blank" href="https://cara.app/thejayduck">
                  Cara
                </Link>{" "}
                and{" "}
                <Link
                  target="_blank"
                  href="https://www.youtube.com/@therealjayduck"
                >
                  YouTube.
                </Link>
              </p>
              <p>
                <i className={getIcon("newIndicator")} /> Recently added
                drawings
                <br />
                <i className={getIcon("stack")} /> Post with multiple images
                <br />
                <i className={getIcon("censorship")} /> Sensitive content
              </p>
            </blockquote>

            {/* Gallery Content */}
            <hr />
            {TagButtonsComponent}
            <br />
            <GalleryGrid
              handleImageClick={handleImageClick}
              gallery={displayedGallery}
              visibleSensitiveImages={visibleSensitiveImages}
              handleRevealClick={handleRevealClick}
              layoutView={layoutView}
            />
            {/* Infinite Loader Ref */}
            {displayedGallery.length < filteredGallery.length ? (
              <>
                <hr />
                <center ref={pageLoaderRef} className={styles.endNotice}>
                  <span>Loading more content... </span>
                  <i className={getIcon("loading")}></i>
                </center>
              </>
            ) : (
              displayedGallery.length > 0 && (
                <>
                  <hr />
                  <center className={styles.endNotice}>
                    <span>You&apos;ve reached the end </span>
                    <i className={getIcon("emojiSad")}></i>
                  </center>
                </>
              )
            )}
          </CardPanel>

          {/* Image Preview Component */}
          <AnimatePresence>
            {activeIndex != -1 && (
              <ImagePreview
                key={"imagePreviewModal"}
                activeIndex={activeIndex}
                imageScrollIndex={index}
                images={filteredGallery}
                onOutsideClick={handleClosePreview}
                // Content warning properties
                visibleSensitiveImages={visibleSensitiveImages}
                onRevealClick={handleRevealClick}
              />
            )}
          </AnimatePresence>
        </section>
      </PageBase>
    </>
  );
}
