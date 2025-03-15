import { PanInfo } from "framer-motion";

export function countWords(str: string): number {
  str = str.replace(/<[^>]*>/g, " ");
  const wordCount = str.match(/(?:http(?:s)?:\/\/[^\s]*|\w)+/g) || [];
  return wordCount.length;
}

export function readTime(n: number): number {
  const wordsPerMinute = 200;
  const result = Math.ceil(n / wordsPerMinute); // In minutes

  return result;
}

interface AnchorItemProps {
  level: number;
  id: string;
  content: string;
}

export function truncate(str: string, n: number): string {
  return str.length > n ? `${str.substring(0, n)}...` : str;
}

export function getAnchors(str: string): AnchorItemProps[] {
  const regex =
    /(?:^(?<md_level>#{1,3})\s(?<md_content>.*))|(?:<h(?<html_level>[1-3]).*?>(?<html_content>.*?)<\/h[1-3]>)/gm;

  const anchors = [];

  for (const match of str.matchAll(regex)) {
    const groups = match.groups;
    if (groups) {
      const anchor: AnchorItemProps = {
        level:
          groups.md_level != undefined
            ? groups.md_level.length
            : parseInt(groups.html_level),
        id: (groups.md_content != undefined
          ? groups.md_content
          : groups.html_content
        )
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""), // Removes special characters
        content:
          groups.md_content != undefined
            ? groups.md_content
            : groups.html_content,
      };
      anchors.push(anchor);
    }
  }
  return anchors;
}

type Tree<T> = (Tree<T> | T)[];
export function groupTreeBy<T>(input: T[], key: (el: T) => number): Tree<T> {
  const children: Tree<T> = [];

  for (
    let currIndex = 0;
    currIndex != -1 && currIndex < input.length;
    currIndex++
  ) {
    const curr = input[currIndex];
    const nextIndex = input.findIndex(
      (el, idx) => idx > currIndex && key(el) == key(curr)
    );
    if (nextIndex - currIndex != 1 || nextIndex == -1) {
      const childTree = groupTreeBy(
        input.slice(currIndex + 1, nextIndex == -1 ? undefined : nextIndex),
        key
      );
      children.push({ ...curr, children: childTree });
    } else {
      children.push(curr);
    }
    currIndex = nextIndex - 1;
  }
  return children;
}

export function formatDate(str: string): string {
  const date = new Date(`${str}-01`);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function dragHandler(
  _: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
  callback: (swipeDirection: number) => void
) {
  const dragDistance = info.offset.x;
  const dragThreshold = 100;

  const dragVelocity = info.velocity.x;
  const dragVelocityThreshold = 500;

  if (dragVelocity > dragVelocityThreshold || dragDistance > dragThreshold)
    callback(-1);
  else if (
    dragVelocity < -dragVelocityThreshold ||
    dragDistance < -dragThreshold
  )
    callback(1);
}

export function getImageUrl(id: string) {
  const BASE_URL = "https://utfs.io/a/41l64ami3u/";

  return `${BASE_URL}${id}`;
}

export function getProcessUrl(id: string) {
  const BASE_URL = "https://utfs.io/a/fal25h328h/";

  return `${BASE_URL}${id}`;
}

export function isNewTimestamp(timestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const threshold = 259200; // 3 days in seconds

  return currentTime - timestamp < threshold;
}

const iconList: Record<string, string> = {
  close: "ri-close-fill",
  lightMode: "ri-sun-fill",
  darkMode: "ri-moon-fill",
  link: "ri-link",
  external: "ri-external-link-fill",
  leftArrow: "ri-arrow-left-fill",
  rightArrow: "ri-arrow-right-fill",
  upArrow: "ri-arrow-up-fill",
  burgerMenu: "ri-menu-fill",
  recording: "ri-video-on-fill",
  stack: "ri-stack-fill",
  censorship: "ri-eye-off-fill",
  emojiSad: "ri-emotion-sad-fill",
  dotFilled: "ri-circle-fill", // table of content
  dotEmpty: "ri-circle-line", // table of content
  at: "ri-at-line",
  error: "ri-error-warning-fill",
  back: "ri-arrow-go-back-fill",
  notification: "ri-notification-3-fill",
  imageFile: "ri-file-image-fill",
  textFile: "ri-file-text-fill",
  newIndicator: "ri-sparkling-2-fill",
  // Pages
  blog: "ri-news-fill",
  projects: "ri-lightbulb-fill",
  gallery: "ri-gallery-fill",
  dots: "ri-more-fill",
  // Links
  github: "ri-github-fill",
  itchio: "ri-store-2-fill",
  mail: "ri-mail-fill",
  cara: "ri-copyright-fill",
  deviantart: "ri-image-fill",
  linkedin: "ri-linkedin-box-fill",
  instagram: "ri-instagram-fill",
  // Profile Wrap
  hobbies: "ri-archive-stack-fill",
  programming: "ri-braces-fill",
  drawing: "ri-pen-nib-fill",
  writing: "ri-quill-pen-fill",
  cooking: "ri-bowl-fill",
  reading: "ri-book-fill",
  languages: "ri-code-s-slash-fill",
  software: "ri-terminal-box-fill",
  others: "ri-archive-fill",
  // Gallery
  imagePosts: "ri-image-2-fill",
  hand: "ri-hand",
  createdDate: "ri-calendar-fill",
  softwareUsed: "ri-pen-nib-fill",
  moreImages: "ri-multi-image-fill",
  tag: "ri-hashtag",
  // Projects
  projectPosts: "ri-briefcase-fill",
  opensource: "ri-open-source-fill",
};

export function getIcon(icon: keyof typeof iconList) {
  return iconList[icon];
}
