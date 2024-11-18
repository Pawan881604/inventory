import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../../middlewares/AsyncHandler";
import CategorieService from "../../../services/karnalwebtech/post-caregorie-service";
import ErrorHandler from "../../../utils/ErrorHandler";

class CategorieController {
  constructor(private categorieService: CategorieService) {}
  create = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: string = (req as any).user?._id;
      const files = req.files;
      if (!user) {
        return next(new ErrorHandler("User are not authenticated", 404));
      }
      const result:any = await this.categorieService.create(
        req.body,
        files,
        user,
        next
      );
      if (result) {
        return res.status(201).json({
          success: true,
        });
      }
    }
  );
}
