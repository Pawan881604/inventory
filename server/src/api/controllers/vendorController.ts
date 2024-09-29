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
  update_details = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("Incoming Request Data:", req.body);
      const vendor = await this.vendorService.add_new_vendor(req.body, next);

      // if (vendor) {
        return res.status(201).json({
          success: true,
          // vendor,
        });
      // }
    }
  );
  all_vendors = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;
    
      const resultPerpage = Number(query.rowsPerPage);

      const vendor = await this.vendorService.all_vendors(query);
      const data_counter = await this.vendorService.data_counter(query);
      if (vendor) {
        return res.status(201).json({
          success: true,
          vendor,
          resultPerpage,
          data_counter,
        });
      }
    }
  );
  get_vendor = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const vendor = await this.vendorService.find_by_vendor_id(id, next);
      if (vendor) {
        return res.status(201).json({
          success: true,
          vendor,
        });
      }
    }
  );
  removeVendor = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const id: string = req.params.id;
      const data: any = req.body;
      console.log(data);

      const vendor = await this.vendorService.find_by_vendor_id_and_update(
        id,
        data,
        next
      );
      if (vendor) {
        return res.status(200).json({
          succes: true,
        });
      }
    }
  );
}
export default VendorController;
