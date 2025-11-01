import styles from "../../styles/components/gallery/CanvasItem.module.scss";

import { AnimatePresence, motion, useInView } from "framer-motion";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { decodeFrames, getIcon } from "../../lib/helper";
import Button from "../button";
import { useToast } from "../toashHandler";

import ContentWarningOverlay from "./contentWarningOverlay";

interface CanvasItemProps {
  index: number;
  imageId: string;
  imageUrl: string;
  imageAlt?: string;
  animated?: boolean;
  width: number;
  height: number;
  shortcuts: boolean;
  isSensitive?: boolean;
  isSensitiveContentVisible: boolean; // for content warning
  onReveal?: () => void;
  setIsDraggingPreview: React.Dispatch<React.SetStateAction<boolean>>;
  scrollContainerRef: React.RefObject<HTMLUListElement>;
}

interface CanvasFunctionProps {
  icon: string;
  shortcut?: string | number;
  meta?: string;
  action: () => void;
  title?: string;
  label: string;
  condition?: boolean;
}

export function CanvasImage({
  index,
  imageId,
  imageUrl,
  imageAlt,
  animated,
  width,
  height,
  shortcuts,
  isSensitiveContentVisible, // for content warning
  isSensitive,
  onReveal,
  setIsDraggingPreview,
  scrollContainerRef,
}: CanvasItemProps) {
  const { showToast } = useToast();
  //? retain previous zoom value for double click
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
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
  // Animation
  const [isPlaying, setIsPlaying] = useState(true);
  const frameIndexRef = useRef<number>(0);

  // useInView Handler
  const liRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(liRef, { root: scrollContainerRef, once: true });

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
        shortcut: "NumpadAdd",
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev + 1, -4), 10)),
        label: "Zoom In",
        condition: true,
      },
      ZoomOut: {
        icon: getIcon("zoomOut"),
        shortcut: "NumpadSubtract",
        meta: "Shift",
        action: () =>
          setZoomIndex((prev) => Math.min(Math.max(prev - 1, -4), 10)),
        label: "Zoom Out",
        condition: true,
      },
      FlipX: {
        icon: getIcon("flipX"),
        shortcut: "KeyH",
        action: () => setFlipX((prev) => !prev),
        label: "Flip Horizontal",
        condition: true,
      },
      FlipY: {
        icon: getIcon("flipY"),
        shortcut: "KeyV",
        action: () => setFlipY((prev) => !prev),
        label: "Flip Vertical",
        condition: true,
      },
      RotateLeft: {
        icon: getIcon("rotateLeft"),
        shortcut: "KeyQ",
        action: () => setRotation((prev) => prev - 1),
        label: "Rotate Left",
        condition: true,
      },
      RotateRight: {
        icon: getIcon("rotateRight"),
        shortcut: "KeyE",
        action: () => setRotation((prev) => prev + 1),
        label: "Rotate Right",
        condition: true,
      },
      Grayscale: {
        icon: getIcon("grayscale"),
        shortcut: "KeyC",
        action: () => setGrayscale((prev) => !prev),
        label: "Toggle Grayscale",
        condition: true,
      },
      Rendering: {
        icon: getIcon("pixelated"),
        shortcut: "KeyP",
        action: () => setPixelated((prev) => !prev),
        label: `${pixelated ? "Smooth" : "Pixelated"}`,
        condition: true,
      },
      Playback: {
        icon: `${isPlaying ? getIcon("pause") : getIcon("play")}`,
        shortcut: "Space",
        action: () => setIsPlaying((prev) => !prev),
        label: `${isPlaying ? "Pause" : "Play"}`,
        title: `${isPlaying ? "Pause" : "Play"}`,
        condition: !!animated,
      },
    }),
    [
      zoomIndex,
      pixelated,
      isPlaying,
      resetTransform,
      setZoomIndex,
      setPosition,
      setFlipX,
      setFlipY,
      setRotation,
      setGrayscale,
      setPixelated,
      setIsPlaying,
      animated,
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
  }, [
    actions,
    shortcuts,
    showToast,
    imageLoaded,
    isSensitive,
    isSensitiveContentVisible,
  ]);

  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasElementRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new window.Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";

    // Aspect ratio
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

    const { width: canvasWidth, height: canvasHeight } = calculateRatio();

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Placeholder Background
    ctx.fillStyle = "hsl(251, 17%, 25%)";
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "hsl(251, 17%, 35%)");
    gradient.addColorStop(1, "hsl(251, 17%, 15%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Placeholder Text
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `${
      Math.min(canvasWidth, canvasHeight) * 0.05
    }px Nunito, sans-serif`;
    ctx.fillText("Loading Image", canvasWidth / 2, canvasHeight / 2);

    image.onload = () => {
      // ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
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
  }, [imageUrl, width, height, isInView]);

  // Video Frame Renderer
  useEffect(() => {
    if (!animated) return;

    let isMounted = true;
    let animationFrameId: number;

    const renderGIF = async () => {
      const canvas = canvasElementRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frames = await decodeFrames(imageUrl);

      const drawFrame = () => {
        if (!isMounted || frames.length == 0) return;
        const frame = frames[frameIndexRef.current];
        const duration: number | null = frame.duration;

        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

        if (isPlaying) {
          frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
          animationFrameId = window.setTimeout(
            drawFrame,
            typeof duration == "number" ? duration / 1000.0 : 0
          );
        }
      };

      drawFrame();
    };

    renderGIF();

    return () => {
      isMounted = false;
      if (animationFrameId) clearTimeout(animationFrameId);
    };
  }, [imageUrl, animated, isPlaying]);

  return (
    <li className={styles.canvasWrapper} data-index={index} ref={liRef}>
      {!isSensitiveContentVisible && isSensitive && (
        <ContentWarningOverlay
          onReveal={() => onReveal?.()}
          dimensions={{
            width: canvasElementRef.current?.width,
            height: canvasElementRef.current?.height,
          }}
        />
      )}
      <motion.canvas
        id={imageId}
        ref={canvasElementRef}
        className={styles.canvasItem}
        style={{
          imageRendering: pixelated ? "pixelated" : "auto",
          filter: grayscale ? "grayscale(100%)" : "none",
        }}
        // Drag
        drag={isMobile ? false : shortcuts}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing" }}
        // dragConstraints={{
        //   top: -height / 2,
        //   right: width / 2,
        //   bottom: height / 2,
        //   left: -width / 2,
        // }}
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
            // setPosition({ x: 0, y: 0 });
          } else {
            setZoomIndex(2);
          }
        }}
        onWheel={(e) => {
          if (e.shiftKey && shortcuts) {
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
        transition={{ duration: 0.15, ease: "linear" }}
      ></motion.canvas>
      {imageLoaded && !isDragging && (
        <AnimatePresence>
          {shortcuts && (
            <>
              {imageAlt && zoomIndex == 0 && (
                <span className={styles.imageAlt}>
                  {imageAlt} ({width}x{height})
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}
