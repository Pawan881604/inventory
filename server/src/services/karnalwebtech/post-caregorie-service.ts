import { NextFunction } from "express";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import { ImageUploader } from "../../utils/ImageUpload";
import ErrorHandler from "../../utils/ErrorHandler";
import ImageRepository from "../../repositories/crm/imageRepository";
const imageUploader = new ImageUploader();
const add_image = new ImageRepository();
class CategorieService {
  constructor(private categorieRepository: CategorieRepository) {}
  async create(data: any, files: any, user_id: string, next: NextFunction) {
    const image_uploader = await imageUploader.uploadImage(files, next,"karnalwebtech");
    if (!image_uploader) {
      return next(
        new ErrorHandler(
          "Something wrong image is not uploaded to the server",
          404
        )
      );
    }
    const image_data = await add_image.createImage(
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
}
export default CategorieService;
