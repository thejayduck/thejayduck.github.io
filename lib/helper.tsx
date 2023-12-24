export function countWords(str: string): number {
  str = str.replace(/<[^>]*>/g, " ");
  const wordCount = str.match(/(?:http(?:s)?:\/\/[^\s]*|\w)+/g) || [];
  // str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  // str = str.replace(/(\[[^\]]*\]:.*)|(\s*\|([^|]-*\|)*)|(#*)/gm, "");
  // str = str.trim();
  return wordCount.length;
}

export function readTime(n: number): number {
  const wordsPerMinute = 200;
  const result = Math.ceil(n / wordsPerMinute); // In minutes

  return result;
}

interface AnchorItemProps {
  id: string;
  content: string;
}

export function truncate(str: string, n: number): string {
  return str.length > n ? `${str.substring(0, n)}...` : str;
}

export function getAnchors(str: string): AnchorItemProps[] {
  const regex = /<h3+.*?id="([^"]*?)".*?>(.+?)<\/h3>/gi;
  let match;

  const results = [];

  while ((match = regex.exec(str)) !== null) {
    results.push({ id: match[1], content: match[2] });
  }

  return results;
}

export function formatDate(str: string): string {
  const date = new Date(`${str}-01`);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
