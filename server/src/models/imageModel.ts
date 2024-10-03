import mongoose, { Document, Model, Types, Schema } from "mongoose";

export interface Iimages extends Document {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  altText: string;
  title: string;
  caption: string;
  status: string;
}
const imageSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  altText: String,
  title: String,
  caption: String,
  status: {
    type: String,
    default: "active",
  },
  audit_log: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  is_active: {
    type: String,
    default: "yes",
  },
  is_delete: {
    type: String,
    default: "no",
  },
},
{
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Images", imageSchema);
