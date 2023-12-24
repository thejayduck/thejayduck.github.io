import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function GetPosts() {
  const directoryPath = path.join(process.cwd(), "docs/posts");
  const files = fs.readdirSync(directoryPath);

  const data = files
    .map((file) => {
      const filePath = path.join(directoryPath, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const obj = matter(fileContents);
      return {
        slug: file.replace(".md", ""),
        title: obj.data["title"],
        summary: obj.data["summary"],
        tags: obj.data["tags"],
        date: new Date(obj.data["date"]).toDateString(),
        image: obj.data["image"],
        content: obj.content,
      };
    })
    .reverse();

  return data;
}
