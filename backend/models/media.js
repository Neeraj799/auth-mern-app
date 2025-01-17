import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    drive: {
      type: String,
      required: true,
      default: "imagekit",
      enum: ["embed", "imagekit", "cloudinary"],
    },
    url: {
      type: String,
      required: true,
    },
    meta: {
      title: String,
      alt_text: String,
    },
    response: {
      type: Object,
    },
    file: {
      type: Object,
    },
    file_type: {
      type: String,
      required: true,
      default: "image/jpeg",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Media = mongoose.model("Media", MediaSchema);

export default Media;
