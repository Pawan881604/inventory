import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../middlewares/AsyncHandler";
import CategorieService from "../../services/categorieService";

class CategorieController {
  constructor(private categorieService: CategorieService) {}
  add_new_customer = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      
      return res.status(201).json({
        success: true,
      });
    }
  );
}
export default CategorieController;
