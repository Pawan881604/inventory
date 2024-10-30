import { NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { ImageUploader } from "../utils/ImageUpload";
import ImageRepository from "../repositories/imageRepository";
import OrderDetailsRepository from "../repositories/orderDetailsRepository";
import PurchaseRepository from "../repositories/purchasesRepository";
const imageUploader = new ImageUploader();
const add_image = new ImageRepository();

const orderDetailsRepository = new OrderDetailsRepository();
class PurchasesService {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async add_new(data: any, files: any, user_id: string, next: NextFunction) {
    const product_details = JSON.parse(data.products_details);
    const order_details_data = await orderDetailsRepository.create(
      product_details,
      next
    );
    // Flatten the files object into a single array
    let allFiles = [
      ...(files.invoice || []),
      ...(files.doket || []),
      ...(files.image || []),
    ];

    let image_uploader;
    let image_data;
    if (allFiles.length > 0) {
      // Use a single upload call for all files
      try {
        image_uploader = await imageUploader.uploadImage(allFiles, next);
      } catch (error) {
        return next(
          new ErrorHandler("Something went wrong with the upload.", 500)
        );
      }

      // Check if uploads were successful
      if (!image_uploader || image_uploader.length === 0) {
        return next(
          new ErrorHandler(
            "Something went wrong; images are not uploaded to the server",
            404
          )
        );
      }

      image_data = await add_image.createImage(
        files,
        image_uploader,
        user_id,
        next
      );

      if (!image_data) {
        return next(
          new ErrorHandler(
            "Something wrong image is not added into database",
            404
          )
        );
      }
    }
    // // await FileManager.deleteFiles(files);
    return await this.purchaseRepository.create(
      data,
      image_data,
      user_id,
      order_details_data,
      next
    );
  }
  async update(data: any, files: any, user_id: string, next: NextFunction) {
    const product_details = JSON.parse(data.products_details);

    // Flatten the files object into a single array
    let allFiles = [
      ...(files.invoice || []),
      ...(files.doket || []),
      ...(files.image || []),
    ];

    // Check if there are files to upload
    let image_uploader;
    let image_data;

    if (allFiles.length > 0) {
      // Use a single upload call for all files
      try {
        image_uploader = await imageUploader.uploadImage(allFiles, next);
      } catch (error) {
        return next(
          new ErrorHandler("Something went wrong with the upload.", 500)
        );
      }

      // Check if uploads were successful
      if (!image_uploader || image_uploader.length === 0) {
        return next(
          new ErrorHandler(
            "Something went wrong; images are not uploaded to the server",
            404
          )
        );
      }

      image_data = await add_image.createImage(
        files,
        image_uploader,
        user_id,
        next
      );

      if (!image_data) {
        return next(
          new ErrorHandler(
            "Something wrong image is not added into database",
            404
          )
        );
      }
    }
    // await FileManager.deleteFiles(files);
    return await this.purchaseRepository.update(
      data,
      image_data,
      user_id,
      next
    );
  }
  async all(query: any) {
    return await this.purchaseRepository.all(query);
  }
  async data_counter(query: any) {
    return await this.purchaseRepository.data_counter(query);
  }
  // async find_by_id_and_update(id: string, data: any, next: NextFunction) {
  //   return await this.productRepository.find_by_id_and_update(id, data, next);
  // }
  async find_by_id(id: string, next: NextFunction) {
    return await this.purchaseRepository.find_by_id(id, next);
  }
}
export default PurchasesService;