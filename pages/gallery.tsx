import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";

import CardPanel from "../components/cardPanel";
import { ImagePreview } from "../components/imagePreview";
import PageBase from "../components/pageBase";
import SocialItem from "../components/socialItem";
import gallery from "../docs/json/gallery.json";

type ImageData = {
  title: string;
  date: string;
  url: string;
  image: string;
  width: number;
  height: number;
  index: number;
};

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const handleImageClick = (imageData: ImageData) => {
    setSelectedImage(imageData);
    document.body.style.overflow = "hidden";
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        containerRef.current?.querySelectorAll("div") || []
      );

      galleryItems.forEach((item: HTMLElement, index) => {
        const ratio = gallery[index].width / gallery[index].height;

        item.style.flexBasis = `calc(${ratio} * 15em)`;
        item.style.flexGrow = `calc(${ratio} * 100)`;
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
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem
            icon="bx bx-undo"
            label="back to homepage"
            title="Back to Homepage"
            href="/"
            newPage={false}
          />
        </ul>

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

            <div className={styles.gallery} ref={containerRef}>
              {gallery.map((q: any, idx: number) => (
                <div
                  className={styles.galleryItem}
                  key={idx}
                  onClick={() =>
                    handleImageClick({
                      title: q.title,
                      date: q.date,
                      url: q.url,
                      image: q.image,
                      width: q.width,
                      height: q.height,
                      index: idx,
                    })
                  }
                >
                  <figure>
                    <Image
                      src={q.image}
                      alt={`Drawing ${q.title}`}
                      width={q.width}
                      height={q.height}
                      quality={65}
                      blurDataURL={q.image}
                      placeholder="blur"
                    />
                    <figcaption>
                      [{q.date}]
                      <br />
                      {q.title}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </CardPanel>
          {selectedImage && (
            <ImagePreview
              imageData={selectedImage}
              imageList={gallery}
              onClose={handleClosePreview}
            />
          )}
        </section>
      </PageBase>
    </>
  );
}
