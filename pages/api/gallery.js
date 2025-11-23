// app/api/users/route.js
import dbConnect from "@/lib/mongodb";
import GalleryEntry from "@/lib/models/gallery";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    let entries = await GalleryEntry.find({}).lean();
    entries = entries.reverse(); // Have to reverse because of how mongodb inserts new documents
    return res.status(200).json({ entries });
  }
}
