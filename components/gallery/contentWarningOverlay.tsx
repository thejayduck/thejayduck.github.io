import styles from "../../styles/components/gallery/ContentWarningOverlay.module.scss";

import { getIcon } from "../../lib/helper";

interface IContentWarningOverlayProps {
  onReveal: () => void;
  noIcon?: boolean;
  text?: string;
  dimensions?: { width: number | undefined; height: number | undefined };
}

export default function ContentWarningOverlay({
  onReveal,
  noIcon,
  text,
  dimensions,
}: IContentWarningOverlayProps) {
  return (
    <div
      className={styles.contentWarningWrapper}
      onClick={(e) => e.stopPropagation()}
      style={{
        width: dimensions?.width,
        height: dimensions?.height,
      }}
    >
      {!noIcon && <i className={getIcon("censorship")} />}
      <span>Content Warning</span>
      {text && (
        <>
          <br />
          {text}
        </>
      )}
      <br />
      <button
        title="Click to Reveal Image"
        onClick={(e) => {
          e.stopPropagation();
          onReveal?.();
        }}
      >
        Show
      </button>
    </div>
  );
}
