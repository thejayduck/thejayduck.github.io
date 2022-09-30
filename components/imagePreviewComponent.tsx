import styles from "../styles/Gallery.module.scss";

import { AnimatePresence, motion } from "framer-motion";

interface ImagePreviewComponentProps {
    imageData: {
      title: string,
      date: string,
      url: string,
      image: string
    },
    onClickOutside: () => void,
}

export function ImagePreviewComponent({ imageData, onClickOutside }: ImagePreviewComponentProps) {
  return (
    <AnimatePresence>
      {imageData && (
        <motion.div
          initial={false}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          key="preview"
          className={styles.imagePreviewWrap}
          onClick={onClickOutside}
        >
          <motion.img
            className={styles.imagePreview}
            src={imageData.image} 
            
            layoutId={`image-${imageData.title}`}
          />
          <motion.a
            className={"cardItem"}
            
            initial={{y: 100}}
            animate={{y: -30}}
            transition={{ delay: .85, duration: .4, type: "spring"}}
            
            title="Click to View This Image on Deviant!"
            href={imageData.url}
            target="_blank"
            rel="noreferrer"
            
            onClick={(e) => e.stopPropagation()}
          >
            {imageData.title}
            {imageData.url &&
              <span>
                <hr/>
                <i className='bx bxl-deviantart' />
                DeviantArt
              </span>
            }
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}