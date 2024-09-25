import VendorModel from "../models/vendorModel";
import { generateRandomId } from "../utils/generateRandomId";

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
}
export default VendorRepository;
