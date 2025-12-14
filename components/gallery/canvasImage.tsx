import styles from "@/styles/components/gallery/CanvasItem.module.scss";

import { AnimatePresence, motion } from "motion/react";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getIcon } from "@/lib/helper";
import Button from "../button";
import { useToast } from "../ui/toashHandler";
import KaomojiLoader from "../ui/kaomojiLoader";
import { IImage } from "./IGalleryEntry";

interface CanvasItemProps {
  index: number;
  image: {
    title: string;
    url: string;
    object: IImage;
  };
  shortcuts: boolean;
  isSensitive?: boolean;
  isSensitiveContentVisible: boolean; // for content warning
  setIsDraggingPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CanvasFunctionProps {
  icon: string;
  shortcut?: {
    key: string | number;
    label: string;
  };
  meta?: string;
  action: () => void;
  title?: string;
  label: string;
  condition?: boolean;
}

export function CanvasImage({
  index,
  image,
  shortcuts,
  isSensitiveContentVisible, // for content warning
  isSensitive,
  setIsDraggingPreview,
}: CanvasItemProps) {
  const { showToast } = useToast();
  //? retain previous zoom value for double click
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  const zoomFactor: number = 0.15;
  const canvasElementRef = useRef<HTMLImageElement>(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [flipX, setFlipX] = useState(false); // horizontal
  const [flipY, setFlipY] = useState(false); // vertical
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pixelated, setPixelated] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  // Animation

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
        shortcut: {
          key: "KeyR",
          label: "R",
        },
        label: "Reset",
        condition: true,
      },
      ResetZoom: {
        icon: getIcon("resetZoom"),
        action: () => {
          setZoomIndex(0);
          setPosition({ x: 0, y: 0 });
        },
        label: "Reset Zoom and Position",
        title: `${Math.ceil((1 + zoomIndex * zoomFactor) * 100)}%`,
        condition: true,
      },
      ZoomIn: {
        icon: getIcon("zoomIn"),
        shortcut: {
          key: "NumpadAdd",
          label: "+",
        },
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev + 1, -4), 10)),
        label: "Zoom In",
        condition: true,
      },
      ZoomOut: {
        icon: getIcon("zoomOut"),
        shortcut: {
          key: "NumpadSubtract",
          label: "-",
        },
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev - 1, -4), 10)),
        label: "Zoom Out",
        condition: true,
      },
      FlipX: {
        icon: getIcon("flipX"),
        shortcut: {
          key: "KeyH",
          label: "H",
        },
        action: () => setFlipX((prev) => !prev),
        label: "Flip Horizontal",
        condition: true,
      },
      FlipY: {
        icon: getIcon("flipY"),
        shortcut: {
          key: "KeyV",
          label: "V",
        },
        action: () => setFlipY((prev) => !prev),
        label: "Flip Vertical",
        condition: true,
      },
      RotateLeft: {
        icon: getIcon("rotateLeft"),
        shortcut: {
          key: "KeyQ",
          label: "Q",
        },
        action: () => setRotation((prev) => prev - 1),
        label: "Rotate Left",
        condition: true,
      },
      RotateRight: {
        icon: getIcon("rotateRight"),
        shortcut: {
          key: "KeyE",
          label: "E",
        },
        action: () => setRotation((prev) => prev + 1),
        label: "Rotate Right",
        condition: true,
      },
      Grayscale: {
        icon: getIcon("grayscale"),
        shortcut: {
          key: "KeyC",
          label: "C",
        },
        action: () => setGrayscale((prev) => !prev),
        label: "Toggle Grayscale",
        condition: true,
      },
      Rendering: {
        icon: getIcon("pixelated"),
        shortcut: {
          key: "KeyP",
          label: "P",
        },
        action: () => setPixelated((prev) => !prev),
        label: `${pixelated ? "Smooth" : "Pixelated"}`,
        condition: true,
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
      if (!shortcuts) return;
      if (!imageLoaded) return;
      if (isSensitive && !isSensitiveContentVisible) return;

      for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
          const action = actions[key];

          if (
            action.shortcut &&
            action.shortcut.key === e.code &&
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
  }, [
    actions,
    shortcuts,
    showToast,
    imageLoaded,
    isSensitive,
    isSensitiveContentVisible,
  ]);

  return (
    <li className={styles.canvasWrapper} data-index={index}>
      {!imageLoaded && (
        <div className={styles.loaderWrapper}>
          <KaomojiLoader message="Loading Image..." />
        </div>
      )}
      <motion.img
        loading="lazy"
        decoding="async"
        className={styles.canvasItem}
        onLoad={() => {
          setImageLoaded(true);
        }}
        id={image.object.id}
        ref={canvasElementRef}
        src={image.url}
        alt={`${image.title} Drawing`}
        draggable={false}
        style={{
          imageRendering: pixelated ? "pixelated" : "auto",
          filter: grayscale ? "grayscale(100%)" : "none",

          userSelect: "none",
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: 1 + zoomIndex * 0.15,
          rotate: rotation * 90,
          scaleX: flipX ? -1 : 1,
          scaleY: flipY ? -1 : 1,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
        // Drag
        drag={isMobile ? false : shortcuts}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing" }}
        onDragStart={() => {
          setIsDragging(true);
          setIsDraggingPreview(true);
        }}
        onDragEnd={(_, info) => {
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
          setTimeout(() => {
            setIsDragging(false);
            setIsDraggingPreview(false);
          }, 192);
        }}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={() => {
          if (isMobile) return;
          if (zoomIndex != 0) {
            setZoomIndex(0);
          } else {
            setZoomIndex(2);
          }
        }}
        onWheel={(e) => {
          console.log(e.shiftKey);
          if (e.shiftKey && shortcuts) {
            const delta =
              Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

            setZoomIndex((prev) =>
              Math.min(Math.max(prev - Math.sign(delta), -4), 10)
            );
            return true;
          }
        }}
      />

      {/* Canvas Controller Bar */}
      {imageLoaded &&
        !isDragging &&
        (!isSensitive || isSensitiveContentVisible) && (
          <AnimatePresence>
            {shortcuts && (
              <>
                {image.object.alt && zoomIndex == 0 && (
                  <span className={styles.imageAlt}>
                    {image.object.alt} ({image.object.width}x
                    {image.object.height})
                  </span>
                )}
                <motion.div
                  className={styles.controls}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Object.entries(actions)
                    .filter(([_, action]) => action.condition == true)
                    .map(([key, action]) => (
                      <Button
                        key={key}
                        title={action.title || ""}
                        icon={action.icon}
                        label={`${action.label}${
                          action.shortcut
                            ? ` [${action.meta ? `${action.meta}, ` : ""}${
                                action.shortcut.label
                              }]`
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                      />
                    ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
    </li>
  );
}
