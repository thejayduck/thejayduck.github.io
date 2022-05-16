import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function GetPosts() {
  
  const directoryPath = path.join(process.cwd(), "docs");
  const files = fs.readdirSync(directoryPath);

  const data = files.map((file) => {
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