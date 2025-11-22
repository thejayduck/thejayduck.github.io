// app/api/users/route.js
import dbConnect from "../../lib/mongodb";
import GalleryEntry from "../../lib/models/gallery";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const entries = await GalleryEntry.find({}).lean();
    return res.status(200).json({ entries });
  }
}
