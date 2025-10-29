import styles from "../../styles/components/gallery/ContentWarningOverlay.module.scss";

import { getIcon } from "../../lib/helper";

interface IContentWarningOverlayProps {
  onReveal: () => void;
  noIcon?: boolean;
  dimensions?: { width: number | undefined; height: number | undefined };
}

// TODO add custom warning text
// TODO rename variable names from 'mature' to 'contentWarning' or similar
export default function ContentWarningOverlay({
  onReveal,
  noIcon,
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
      Content Warning
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
