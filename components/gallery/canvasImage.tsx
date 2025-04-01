import styles from "../../styles/components/gallery/CanvasItem.module.scss";

import { motion } from "framer-motion";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getIcon } from "../../lib/helper";
import Button from "../button";
import { useToast } from "../toashHandler";

interface CanvasItemProps {
  imageId: string;
  imageUrl: string;
  imageAlt?: string;
  width: number;
  height: number;
  scrollZoom: boolean; // Toggle to disable shortcuts when multiple images are available // TODO rename to shortcuts or something similar
}

interface CanvasFunctionProps {
  icon: string;
  shortcut?: string | number;
  meta?: string;
  action: () => void;
  title?: string;
  label: string;
}

export function CanvasImage({
  imageId,
  imageUrl,
  imageAlt,
  width,
  height,
  scrollZoom,
}: CanvasItemProps) {
  const { showToast } = useToast();

  const zoomFactor: number = 0.15;
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [flipX, setFlipX] = useState(false); // horizontal
  const [flipY, setFlipY] = useState(false); // vertical
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pixelated, setPixelated] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  const resetTransform = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setFlipX(false);
    setFlipY(false);
    setRotation(0);
    setPixelated(false);
    setGrayscale(false);
    setZoomIndex(0);
  }, [
    setPosition,
    setFlipX,
    setFlipY,
    setRotation,
    setPixelated,
    setGrayscale,
    setZoomIndex,
  ]);

  const actions = useMemo<Record<string, CanvasFunctionProps>>(
    () => ({
      Reset: {
        icon: getIcon("back"),
        action: () => resetTransform(),
        shortcut: "KeyR",
        label: "Reset",
      },
      ResetZoom: {
        icon: getIcon("resetZoom"),
        action: () => {
          setZoomIndex(0);
          setPosition({ x: 0, y: 0 });
        },
        label: "Reset Zoom and Position",
        title: `${Math.ceil((1 + zoomIndex * zoomFactor) * 100)}%`,
      },
      ZoomIn: {
        icon: getIcon("zoomIn"),
        shortcut: "NumpadAdd",
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev + 1, -4), 10)),
        label: "Zoom In",
      },
      ZoomOut: {
        icon: getIcon("zoomOut"),
        shortcut: "NumpadSubtract",
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev - 1, -4), 10)),
        label: "Zoom Out",
      },
      FlipX: {
        icon: getIcon("flipX"),
        shortcut: "KeyH",
        action: () => setFlipX((prev) => !prev),
        label: "Flip Horizontal",
      },
      FlipY: {
        icon: getIcon("flipY"),
        shortcut: "KeyV",
        action: () => setFlipY((prev) => !prev),
        label: "Flip Vertical",
      },
      RotateLeft: {
        icon: getIcon("rotateLeft"),
        shortcut: "KeyQ",
        action: () => setRotation((prev) => prev - 1),
        label: "Rotate Left",
      },
      RotateRight: {
        icon: getIcon("rotateRight"),
        shortcut: "KeyE",
        action: () => setRotation((prev) => prev + 1),
        label: "Rotate Right",
      },
      Grayscale: {
        icon: getIcon("grayscale"),
        shortcut: "KeyC",
        action: () => setGrayscale((prev) => !prev),
        label: "Toggle Grayscale",
      },
      Rendering: {
        icon: getIcon("pixelated"),
        shortcut: "KeyP",
        action: () => setPixelated((prev) => !prev),
        label: `${pixelated ? "Smooth" : "Pixelated"}`,
      },
    }),
    [
      zoomIndex,
      pixelated,
      resetTransform,
      setZoomIndex,
      setPosition,
      setFlipX,
      setFlipY,
      setRotation,
      setGrayscale,
      setPixelated,
    ]
  );

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (!scrollZoom) {
        showToast(
          "Warning",
          "Keyboard shortcuts are disabled when there are multiple images."
        );
        return;
      }

      for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
          const action = actions[key];
          if (
            action.shortcut &&
            action.shortcut === e.code &&
            (!action.meta ||
              (action.meta === "Shift" && e.shiftKey) ||
              (action.meta === "Control" && e.ctrlKey) ||
              (action.meta === "Alt" && e.altKey))
          ) {
            e.preventDefault();
            action.action();
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [actions, scrollZoom, showToast]);

  useEffect(() => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new window.Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";

    // Aspect ratio // TODO recalculate on resize
    const calculateRatio = () => {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
      let newWidth = Math.min(width, maxWidth);
      let newHeight = Math.min(height, maxHeight);
      const aspectRatio = width / height;
      if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }
      return { width: newWidth, height: newHeight };
    };

    canvas.width = calculateRatio().width;
    canvas.height = calculateRatio().height;

    // Placeholder Background
    ctx.fillStyle = "hsl(251, 17%, 25%)";
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "hsl(251, 17%, 35%)");
    gradient.addColorStop(1, "hsl(251, 17%, 15%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, calculateRatio().width, calculateRatio().height);
    // Placeholder Text
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `${
      Math.min(calculateRatio().width, calculateRatio().height) * 0.05
    }px Nunito, sans-serif`;
    ctx.fillText(
      "Loading Image",
      calculateRatio().width / 2,
      calculateRatio().height / 2
    );

    image.onload = () => {
      // ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        image,
        0,
        0,
        calculateRatio().width,
        calculateRatio().height
      );
      setImageLoaded(true);
    };

    // Recalculate on resize
    calculateRatio();
    window.addEventListener("resize", calculateRatio);
    window.addEventListener("load", calculateRatio);

    return () => {
      window.removeEventListener("resize", calculateRatio);
      window.addEventListener("load", calculateRatio);
    };
  }, [imageUrl, width, height]);

  return (
    <li className={styles.canvasWrapper}>
      <motion.canvas
        id={imageId}
        ref={canvasElementRef}
        className={styles.canvasItem}
        style={{
          imageRendering: pixelated ? "pixelated" : "auto",
          filter: grayscale ? "grayscale(100%)" : "none",
        }}
        // Drag
        drag
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
          // if (isDragging) return;
        }}
        onDoubleClick={() => {
          if (zoomIndex != 0) {
            setZoomIndex(0);
            setPosition({ x: 0, y: 0 });
          } else {
            setZoomIndex(2);
          }
        }}
        onWheel={(e) => {
          if (e.shiftKey && scrollZoom) {
            setZoomIndex((prev) =>
              Math.min(
                Math.max(
                  prev -
                    Math.sign(
                      navigator.userAgent.toUpperCase().indexOf("APPLEWEBKIT") >
                        -1
                        ? e.deltaX // Damn you webkit
                        : e.deltaY
                    ),
                  -4
                ),
                10
              )
            );
            return true;
          }

          // showToast("Shift + Scroll to Zoom");
        }}
        animate={{
          scale: 1 + zoomIndex * zoomFactor,
          scaleX: flipX ? -1 : 1,
          scaleY: flipY ? -1 : 1,
          cursor: "grab",
          x: position.x,
          y: position.y,
          rotate: rotation * 90,
        }}
        transition={{ duration: 0.3 }}
      ></motion.canvas>
      {imageLoaded && !isDragging && (
        <>
          {imageAlt && zoomIndex == 0 && (
            <span className={styles.imageAlt}>
              {imageAlt} ({width}x{height})
            </span>
          )}
          <div className={styles.controls}>
            {Object.entries(actions).map(([key, action]) => (
              <Button
                key={key}
                title={action.title || ""}
                icon={action.icon}
                label={`${action.label}${
                  action.shortcut
                    ? ` (${action.meta ? `${action.meta} + ` : ""}${
                        action.shortcut
                      })`
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  action.action();
                }}
              />
            ))}
          </div>
        </>
      )}
    </li>
  );
}
