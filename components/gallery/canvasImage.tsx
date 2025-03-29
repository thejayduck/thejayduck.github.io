import styles from "../../styles/components/gallery/CanvasItem.module.scss";

import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { getIcon } from "../../lib/helper";
import Button from "../button";

interface CanvasItemProps {
  imageId: string;
  imageUrl: string;
  imageAlt?: string;
  width: number;
  height: number;
}

export function CanvasImage({
  imageId,
  imageUrl,
  imageAlt,
  width,
  height,
}: CanvasItemProps) {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(false);
  const [flipX, setFlipX] = useState(false); // horizontal
  const [flipY, setFlipY] = useState(false); // vertical
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pixelated, setPixelated] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  // Keyboard Navigation
  useEffect(() => {
    const shortcuts: Record<string, () => void> = {
      KeyH: () => setFlipX((prev) => !prev), // Horizontal Flip
      KeyV: () => setFlipY((prev) => !prev), // Vertical Flip
      KeyQ: () => setRotation((prev) => prev - 1), // Rotate Left
      KeyE: () => setRotation((prev) => prev + 1), // Rotate Right
      KeyR: () => resetTransform(), // Reset
      KeyC: () => setGrayscale((prev) => !prev), // Grayscale
      KeyP: () => setPixelated((prev) => !prev), // Pixelated
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (shortcuts[e.code]) {
        e.preventDefault();
        shortcuts[e.code]();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function resetTransform() {
    setPosition({ x: 0, y: 0 });
    setZoom(false);
    setFlipX(false);
    setFlipY(false);
    setRotation(0);
    setPixelated(false);
    setGrayscale(false);
  }

  useEffect(() => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new window.Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";

    // Image Placeholder
    canvas.width = width;
    canvas.height = height;
    // Background
    ctx.fillStyle = "hsl(251, 17%, 25%)";
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "hsl(251, 17%, 35%)");
    gradient.addColorStop(1, "hsl(251, 17%, 15%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // Text
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `${Math.min(width, height) * 0.05}px Nunito, sans-serif`;
    ctx.fillText("Loading Image", width / 2, height / 2);

    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height);
      setImageLoaded(true);
    };
  }, [imageUrl, width, height]);

  return (
    <li className={styles.canvasWrapper}>
      <motion.canvas
        id={imageId}
        ref={canvasElementRef}
        className={styles.canvasItem}
        drag={zoom}
        style={{
          imageRendering: pixelated ? "pixelated" : "auto",
          filter: grayscale ? "grayscale(100%)" : "none",
        }}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing" }}
        dragConstraints={{
          top: -height / 2,
          right: width / 2,
          bottom: height / 2,
          left: -width / 2,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
          setTimeout(() => {
            setIsDragging(false);
          }, 192);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isDragging) return;
          if (zoom) {
            setPosition({ x: 0, y: 0 });
          }
          setZoom(!zoom);
        }}
        animate={{
          scale: zoom ? 1.5 : 1,
          scaleX: flipX ? -1 : 1,
          scaleY: flipY ? -1 : 1,
          cursor: zoom ? "grab" : "zoom-in",
          x: zoom ? position.x : 0,
          y: zoom ? position.y : 0,
          rotate: rotation * 90,
        }}
        transition={{ duration: 0.3 }}
      ></motion.canvas>
      {imageLoaded && (
        <>
          {imageAlt && !zoom && (
            <span className={styles.imageAlt}>
              {imageAlt} ({width}x{height})
            </span>
          )}
          <div className={styles.controls}>
            <Button
              icon={getIcon("back")}
              label="Reset (R)"
              onClick={(e) => {
                e.stopPropagation();
                resetTransform();
              }}
            />
            <Button
              icon={getIcon("flipX")}
              label="Flip Horizontal (H)"
              onClick={(e) => {
                e.stopPropagation();
                setFlipX(!flipX);
              }}
            />
            <Button
              icon={getIcon("flipY")}
              label="Flip Vertical (V)"
              onClick={(e) => {
                e.stopPropagation();
                setFlipY(!flipY);
              }}
            />
            <Button
              icon={getIcon("rotateLeft")}
              label="Rotate Left (Q)"
              onClick={(e) => {
                e.stopPropagation();
                setRotation((prev) => prev - (flipX != flipY ? -1 : 1));
                //? setRotation((prev) => (prev - 1) % 4); ?
              }}
            />
            <Button
              icon={getIcon("rotateRight")}
              label="Rotate Right (E)"
              onClick={(e) => {
                e.stopPropagation();
                setRotation((prev) => prev - (flipX != flipY ? 1 : -1));
                //? setRotation((prev) => (prev + 1) % 4); ?
              }}
            />
            <Button
              icon={getIcon("pixelated")}
              label={`${pixelated ? "Smooth" : "Pixelated"} (P)`}
              onClick={(e) => {
                e.stopPropagation();
                setPixelated(!pixelated);
              }}
            />
            <Button
              icon={getIcon("grayscale")}
              label="Toggle Grayscale (C)"
              onClick={(e) => {
                e.stopPropagation();
                setGrayscale(!grayscale);
              }}
            />
          </div>
        </>
      )}
    </li>
  );
}
