export function countWords(str: string): number {
  str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  str = str.replace(/<[^>]*>/g, " ");
  str = str.trim();
  return str.split(" ").length;
}

export function readTime(words: number): number {
  const wpm = 200;

  return Math.ceil(words / wpm);
}