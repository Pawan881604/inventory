import { NextFunction } from "express";
import VendorModel from "../models/vendorModel";
import ApiFeatures from "../utils/apiFeatuers";
import { generateRandomId } from "../utils/generateRandomId";
import ErrorHandler from "../utils/ErrorHandler";

class VendorRepository {
  async createVendor(data: any) {
    const rendom_id = generateRandomId();
    const {
      country,
      name,
      phone,
      email,
      company,
      gstin,
      address_line_1,
      address_line_2,
      pin_code,
      state,
      city,
      uuid,
    } = data;
    const vendor_data = {
      vendor_id: `vedor_${uuid}_${rendom_id}`,
      vendor_name: name,
      phone: phone,
      email: email,
      company_name: company,
      gstin: gstin,
      address_line_1: address_line_1,
      address_line_2: address_line_2, // Make optional if not always provided
      pincode: pin_code ? Number(pin_code) : undefined,
      city: city,
      state: state,
      country: country,
    };
    const vendor = new VendorModel(vendor_data);
    return await vendor.save();
  }
  async findByGstin(gstin: string) {
    return await VendorModel.findOne({ gstin });
  }
  async all_vendors(query: any) {
    const resultPerpage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(VendorModel.find(), query);
    apiFeatures.search().filter().sort().pagination(resultPerpage);
    const result = await apiFeatures.exec();
    return result;
  }
  async data_counter(query: any) {
    const apiFeatures = new ApiFeatures(VendorModel.find(), query);
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }
  async find_by_vendor_id_and_update(
    id: string,
    data: any,
    next: NextFunction
  ) {
    const vendor = await VendorModel.findById(id);

    if (!vendor) {
      return next(new ErrorHandler(`Vendor with ID ${id} not found`, 404));
    }
    vendor.is_active = data.state;
    vendor.is_delete = data.hard_delete;
    await vendor.save();
    return vendor;
  }
  async find_by_vendor_id(id: string, next: NextFunction) {
    const vendor = await VendorModel.findById(id);

    if (!vendor) {
      return next(new ErrorHandler(`Vendor with ID ${id} not found`, 404));
    }
    return vendor;
  }
}
export default VendorRepository;
