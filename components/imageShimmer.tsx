import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#d1d1d1" offset="20%" />
      <stop stop-color="#fff" offset="50%" />
      <stop stop-color="#d1d1d1" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#d1d1d1" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const placeholderImage = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}` as PlaceholderValue;

//  placeholder={`data:image/svg+xml;base64,${toBase64(
//             shimmer(selectedImage.width, selectedImage.height)
//           )}`}
