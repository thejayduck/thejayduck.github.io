import mongoose, { Model, Schema } from "mongoose";
import IGalleryEntry from "@/components/gallery/IGalleryEntry";

type GalleryDocument = IGalleryEntry & Document;

const GallerySchema = new Schema({
  hidden: { type: Boolean, default: false },
  title: { type: String, required: true },
  date: { type: String, required: true },
  timestamp: Number,
  attribution: { type: String },
  sensitive: { type: Boolean, default: false },
  sensitive_description: String,
  software: String,
  external: [
    {
      url: String,
      alt: String,
      icon: String,
    },
  ],
  tags: [String],
  descriptiveTags: [String],
  images: [
    {
      width: Number,
      height: Number,
      id: Number,
    },
  ],
});

const GalleryEntry: Model<GalleryDocument> =
  mongoose.models.GalleryEntry ||
  mongoose.model<GalleryDocument>("GalleryEntry", GallerySchema, "gallery");

export default GalleryEntry;
