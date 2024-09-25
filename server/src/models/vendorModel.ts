import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVendor extends Document {
  vendor_id: string;
  vendor_name: string;
  phone: string;
  email: string;
  company_name: string;
  gstin: string;
  address_line_1: string;
  address_line_2?: string; // Make optional if not always provided
  pincode: number;
  city: string;
  state: string;
  country: string;
  isActive?: boolean; // Optional field
}

const vendorSchema: Schema<IVendor> = new mongoose.Schema(
  {
    vendor_id: {
      type: String,
      trim: true,
      required: true, // You may want to require vendor_id
    },
    vendor_name: {
      type: String,
      trim: true,
      required: true, // Consider making vendor_name required
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    company_name: {
      type: String,
      trim: true,
      default: null,
    },
    gstin: {
      type: String,
      trim: true,
      default: null,
    },
    address_line_1: {
      type: String,
      trim: true,
      required: true, // You may want to require address_line_1
    },
    address_line_2: {
      type: String,
      trim: true,
      default: null,
    },
    pincode: {
      type: Number,
      required: true, // You may want to require pincode
      min: 100000, // Minimum 6-digit number
      max: 999999, // Maximum 6-digit number
    },
    city: {
      type: String,
      trim: true,
      required: true, // You may want to require city
    },
    state: {
      type: String,
      trim: true,
      required: true, // You may want to require state
    },
    country: {
      type: String,
      trim: true,
      required: true, // You may want to require country
    },
    isActive: {
      type: Boolean,
      default: true, // Active by default
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const VendorModel: Model<IVendor> = mongoose.model<IVendor>('Vendor', vendorSchema);

export default VendorModel;
