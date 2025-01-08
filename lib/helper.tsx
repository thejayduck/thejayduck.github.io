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
