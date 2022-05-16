import matter from "gray-matter";

export default function GetPosts() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require("path");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require("fs");
  
  const directoryPath = path.join(process.cwd(), "docs");
  const files = fs.readdirSync(directoryPath);

  const data = files.map((file: string) => {
    const filePath = path.join(directoryPath, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const obj = matter(fileContents);
    return {
      slug: file.replace(".md", ""),
      title: obj.data["title"],
      image: obj.data["image"],
      content: obj.content,
    };
  });

  return data;
}