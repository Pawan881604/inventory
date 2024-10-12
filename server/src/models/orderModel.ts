import mongoose, { Document, Types, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  order_id: string;
  name?: string;
  dispatch_mod?: string;
  email?: string;
  gstin?: string;
  order_date: Date;
  order_status: string;
  invoice_no: string;
  payment_mode: string;
  status: string;
  company: string;
  phone: string;
  shipping_charges?: Number;
  discount?: Number;
  other_charge?: Number;
  products_details?: Types.ObjectId;
  customer?: Types.ObjectId;
  shipping_address: Types.ObjectId;
  image_id: Types.ObjectId;
  doket_id: Types.ObjectId;
  invoice_id: Types.ObjectId;
  audit_log: Types.ObjectId;
  is_active?: string; // Optional field
  is_delete?: string; // Optional field
}

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    order_id: {
      type: String,
      trim: true,
      default: null,
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    dispatch_mod: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    gstin: {
      type: String,
      default: null,
    },
    order_date: {
      type: Date,
      default: null,
    },
    order_status: {
      type: String,
      default: null,
    },
    invoice_no: {
      type: String,
      default: null,
    },
    payment_mode: {
      type: String,
      default: null,
    },
    company: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    shipping_charges: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    other_charge: {
      type: Number,
      default: 0,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Images",
    },
    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: "Images",
    },
    products_details: {
      type: Schema.Types.ObjectId,
      ref: "Images",
    },
    image_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
    doket_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
    invoice_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
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
  }
);

const Order_model: Model<IOrder> = mongoose.model<IOrder>(
  "Orders",
  orderSchema
);
export default Order_model;
