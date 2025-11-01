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

export function formatUnixTimestamp(timestamp: number): string {
  const convertedDate = new Date(timestamp * 1000);
  return convertedDate.toLocaleString("de-DE", { hour12: false });
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

export function isNewImage(timestamp: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  const threshold = 259200; // 3 days in seconds

  return currentTime - timestamp < threshold;
}

export function galleryRouterSet(id: string, index: number) {
  const routes = {
    gallery: {
      path: "/gallery/",
      param: "id",
      indexParam: "index",
    },
  };

  return {
    navigate: (
      page: keyof typeof routes,
      router: any,
      options = { scroll: false }
    ) => {
      router.replace(routes[page].path, undefined, options);
    },
    navigateTo: (
      page: keyof typeof routes,
      router: any,
      options = { scroll: false }
    ) => {
      const route = routes[page];
      let url = `${route.path}?${route.param}=${id}`;

      if (route.indexParam) {
        url += `&${route.indexParam}=${index}`;
      }
      router.replace(url, undefined, options);
    },
    setIndex: (newIndex: number) => galleryRouterSet(id, newIndex),
    getIndex: (): number => index,
    getId: () => id,
  };
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
  loading: "ri-refresh-fill",
  level1: "ri-circle-fill", // table of content
  level2: "ri-circle-line", // table of content
  level3: "ri-subtract-fill", // table of content
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
  createdDate: "ri-calendar-fill",
  softwareUsed: "ri-pen-nib-fill",
  moreImages: "ri-multi-image-fill",
  tag: "ri-hashtag",
  clearFilter: "ri-filter-off-fill",
  flipX: "ri-arrow-left-right-line",
  flipY: "ri-arrow-up-down-line",
  rotateLeft: "ri-anticlockwise-fill",
  rotateRight: "ri-clockwise-fill",
  pixelated: "ri-color-filter-fill",
  grayscale: "ri-contrast-fill",
  resetZoom: "ri-fullscreen-fill",
  zoomIn: "ri-zoom-in-fill",
  zoomOut: "ri-zoom-out-fill",
  play: "ri-play-fill",
  pause: "ri-pause-fill",
  // Projects
  projectPosts: "ri-briefcase-fill",
  opensource: "ri-open-source-fill",
};

export function getIcon(icon: keyof typeof iconList) {
  return iconList[icon];
}

export async function decodeFrames(path: string): Promise<VideoFrame[]> {
  const response = await fetch(path);
  const contentType = response.headers.get("Content-Type");
  const blob = await response.arrayBuffer();

  const decoder = new ImageDecoder({
    data: blob,
    type: contentType ?? "image/gif",
  });

  await decoder.tracks.ready;

  const track = decoder.tracks.selectedTrack;
  const frameCount = track?.frameCount ?? 1;

  const frames = [];

  if (frameCount != undefined) {
    for (let i = 0; i < frameCount; i++) {
      const { image } = await decoder.decode({ frameIndex: i });
      frames.push(image);
    }
  }
  return frames;
}
