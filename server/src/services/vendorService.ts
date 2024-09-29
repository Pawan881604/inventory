import { NextFunction } from "express";
import VendorRepository from "../repositories/vendorRepository";
import ErrorHandler from "../utils/ErrorHandler";

class VendorService {
  constructor(private vendorRepository: VendorRepository) {}

  async add_new_vendor(vendordata: any, next: NextFunction) {
    const existing = await this.vendorRepository.findByGstin(vendordata.gstin);
    if (existing) {
      return next(
        new ErrorHandler("Vendor with this Gstin already exists", 400)
      );
    }
    if (
      isNaN(vendordata.pin_code) ||
      vendordata.pin_code < 100000 ||
      vendordata.pin_code > 999999
    ) {
      return next(
        new ErrorHandler("Pincode must be a valid 6-digit number.", 400)
      );
    }

    return await this.vendorRepository.createVendor(vendordata);
  }
  async all_vendors(query: any) {
    return await this.vendorRepository.all_vendors(query);
  }
  async data_counter(query: any) {
    return await this.vendorRepository.data_counter(query);
  }
  async find_by_vendor_id_and_update(
    id: string,
    data: any,
    next: NextFunction
  ) {
    return await this.vendorRepository.find_by_vendor_id_and_update(
      id,
      data,
      next
    );
  }
  async find_by_vendor_id(id: string, next: NextFunction) {
    return await this.vendorRepository.find_by_vendor_id(id, next);
  }
}
export default VendorService;
