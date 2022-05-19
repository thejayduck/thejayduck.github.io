export function countWords(str: string): number {
  str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  str = str.replace(/<[^>]*>/g, " ");
  str = str.trim();
  return str.split(" ").length;
}

export function readTime(n: number): string {
  const wpm = 200;
  const result = Math.ceil(n / wpm);

  return `~${result} Minutes ⏱️`;
}

export function truncate(str:string, n: number): string{
  return (str.length > n) ? `${str.substring(0, n - 1)  }... <b>CLICK TO READ MORE</b>` : str;
} 