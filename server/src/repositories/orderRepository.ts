import { generateRandomId } from "../utils/generateRandomId";
import Product_model from "../models/productModel";
import ApiFeatures from "../utils/apiFeatuers";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction } from "express";
import mongoose from "mongoose";
import Order_model from "../models/orderModel";
import AddressModel from "../models/addressModel";

class OrderRepository {
  async create(
    data: any,
    image_data: any,
    user_id: string,
    order_details: any,
    next: NextFunction
  ) {
    const rendom_id = generateRandomId();
    const service_data = JSON.parse(data.services);
    // Utility function to convert to number safely
    const toNumber = (value: any) => (isNaN(Number(value)) ? 0 : Number(value));
  
    // Extract image ids into merged object
    const merged = image_data.reduce((acc: any, { fieldname, _id }: any) => {
      if (["image", "doket", "invoice"].includes(fieldname)) {
        acc[`${fieldname}_id`] = _id;
      }
      return acc;
    }, {});

    const shipping_data = { ...data.shipping_address, audit_log: user_id };
    const [shipping_a] = await Promise.all([
      AddressModel.create(shipping_data),
    ]);

    // Build updated_data object
    const updated_data = {
      order_id: `ord_${data.uuid}_${rendom_id}`,
      order_date: data.order_date,
      order_status: data.order_status,
      customer: data.customer,
      dispatch_mod: data.dispatch_mod,
      invoice_no: data.invoice_no,
      payment_mode: data.payment_mode,
      name: data.name,
      shipping_charges: service_data.shipping_charges,
      discount: service_data.discount,
      other_charge: service_data.other_charge,
      order_details: order_details._id,
      shipping_address:shipping_a._id,
      company: data.company,
      email: data.email,
      phone: data.phone,
      gstin: data.gstin,
      audit_log: user_id,
      ...merged, // Spread merged image fields
    };
  
    // Validate and apply only if IDs are valid
    ["invoice_id", "doket_id", "image_id"].forEach((field) => {
      if (merged[field] && !mongoose.Types.ObjectId.isValid(merged[field])) {
        delete updated_data[field]; // Remove invalid IDs
      }
    });
  
    try {
      // Update product quantities in the Product model
      const productUpdates = order_details.product_details.map(
        async ({ product_id, quantity }: any) => {
          return Product_model.findOneAndUpdate(
            { _id: product_id },
            { $inc: { total_quantity: -quantity } }, // Decrease total_quantity
            { new: true } // Return the updated product
          );
        }
      );
  
      // Await all updates
      await Promise.all(productUpdates);
  
      // Save the order
      const newOrder = new Order_model(updated_data);
      return await newOrder.save();
    } catch (error: any) {
      return next(new ErrorHandler(error, 404));
    }
  }
  
  // async update(
  //   data: any,
  //   image_data: any,
  //   user_id: string,
  //   next: NextFunction
  // ) {
  //   const toNumber = (value: any) => (isNaN(Number(value)) ? 0 : Number(value));

  //   const image_ids =
  //     Array.isArray(image_data) && image_data.length > 0
  //       ? image_data.map((item: any) => item._id)
  //       : [];

  //   const updated_data: any = {
  //     name: data.name,
  //     status: data.status,
  //     selling_price: toNumber(data.selling_price),
  //     tax: data.tax,
  //     primary_unit: data.primary_unit,
  //     sku: data.sku,
  //     hsn: data.hsn,
  //     purchase_price: toNumber(data.purchase_price),
  //     total_quantity: toNumber(data.total_quantity),
  //     barcode: data.barcode,
  //     weight: toNumber(data.weight),
  //     depth: toNumber(data.depth),
  //     width: toNumber(data.width),
  //     height: toNumber(data.height),
  //     images_id: image_ids.length > 0 ? image_ids : data.images && data.images,
  //     audit_log: user_id,
  //   };
  //   if (data.categorie && mongoose.Types.ObjectId.isValid(data.categorie)) {
  //     updated_data.categorie = data.categorie;
  //   }
  //   try {
  //     const updated_custome_data = await Product_model.findByIdAndUpdate(
  //       data.id,
  //       updated_data,
  //       {
  //         new: true,
  //         runValidators: true,
  //         useFindAndModify: false,
  //       }
  //     );
  //     if (!updated_custome_data) {
  //       return next(new ErrorHandler("Product not found", 404));
  //     }
  //     return updated_custome_data
  //   } catch (error: any) {
  //     return next(new ErrorHandler(error, 404));
  //   }
  // }
  // async findByName(name: any) {
  //   const customer = await Product_model.findOne({ name: name });
  //   return customer;
  // }
  //   async all(query: any) {
  //     const resultPerPage = Number(query.rowsPerPage);
  //     const apiFeatures = new ApiFeatures(Product_model.find(), query);
  //     apiFeatures.search().filter().sort().pagination(resultPerPage);

  //     const result = await apiFeatures
  //       .getQuery() // Use the public getter
  //       .populate([
  //         {
  //           path: "audit_log",
  //           model: "User",
  //         },
  //         {
  //           path: "images_id",
  //           model: "Images",
  //         },
  //         {
  //           path: "categorie",
  //           model: "Categorie",
  //         },
  //       ])
  //       .sort({ updated_at: -1 })
  //       .exec();

  //     return result;
  //   }

  //   async data_counter(query: any) {
  //     const apiFeatures = new ApiFeatures(Product_model.find(), query);
  //     apiFeatures.search().filter();
  //     const result = await apiFeatures.exec();
  //     return result.length;
  //   }
  //   async find_by_id_and_update(id: string, data: any, next: NextFunction) {
  //     const product = await Product_model.findById(id);

  //     if (!product) {
  //       return next(new ErrorHandler(`Product with ID ${id} not found`, 404));
  //     }
  //     product.is_active = data.state;
  //     product.is_delete = data.hard_delete;
  //     await product.save();
  //     return product;
  //   }
  //   async find_by_id(id: string, next: NextFunction) {
  //     const product = await Product_model.findById(id).populate([
  //       {
  //         path: "audit_log",
  //         model: "User",
  //       },
  //       {
  //         path: "images_id",
  //         model: "Images",
  //       },
  //       {
  //         path: "categorie",
  //         model: "Categorie",
  //       },
  //     ]);

  //     if (!product) {
  //       return next(new ErrorHandler(`Product with ID ${id} not found`, 404));
  //     }
  //     return product;
  //   }
}
export default OrderRepository;
