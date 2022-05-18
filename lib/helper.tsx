export function countWords(str: string): number {
  str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  str = str.replace(/<[^>]*>/g, " ");
  str = str.trim();
  return str.split(" ").length;
}

export function readTime(words: number): string {
  const wpm = 200;
  console.log(words / wpm);
  const result = Math.ceil(words / wpm);

  return `~${result} Minutes ⏱️`;
}