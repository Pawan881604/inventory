import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../middlewares/AsyncHandler";
import VendorService from "../../services/vendorService";

class VendorController {
  constructor(private vendorService: VendorService) {}
  add_new = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const vendor = await this.vendorService.add_new_vendor(req.body, next);

      if (vendor) {
        return res.status(201).json({
          success: true,
          vendor,
        });
      }
    }
  );
  all_vendors = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const vendor = await this.vendorService.all_vendors(req.body, next);

      if (vendor) {
        return res.status(201).json({
          success: true,
          vendor,
        });
      }
    }
  );
}
export default VendorController;
