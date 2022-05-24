export function countWords(str: string): number {
  
  str = str.replace(/<[^>]*>/g, " ");
  const wordCount = (str.match(/(?:http(?:s)?:\/\/[^\s]*|\w)+/g) || []);
  // str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  // str = str.replace(/(\[[^\]]*\]:.*)|(\s*\|([^|]-*\|)*)|(#*)/gm, "");
  // str = str.trim();
  console.log(wordCount);
  return wordCount.length;
}

export function readTime(n: number): number {
  const wpm = 200;
  const result = Math.ceil(n / wpm);

  return result;
}

interface AnchorItemProps {
  id: string,
  content: string,
}

export function truncate(str: string, n: number): string{
  return (str.length > n) ? `${str.substring(0, n - 1)  }...` : str;
}

export function getAnchors(str: string): AnchorItemProps[] {    
  const regex = /<h[1-6]+.*?id="([^"]*?)".*?>(.+?)<\/h[1-6]>/gi;
  let match;

  const results = [];

  while ((match = regex.exec(str)) !== null) {
    results.push({ id: match[1], content: match[2]});
  }

  return results;
}