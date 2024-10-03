import Categorie_model from "../models/categorieModel";
import { generateRandomId } from "../utils/generateRandomId";

class CategorieRepository {
  async createCustomer(data: any, user_id: string) {
    const rendom_id = generateRandomId();
    const {
      shipping_address,
      billing_address,
      status,
      name,
      phone,
      email,
      company,
      gstin,
      uuid,
    } = data;

    // Create vendor data object
    const updated_data = {
      customer_id: `customer_${uuid}_${rendom_id}`,
      name: name,
      phone,
      email,
      company_name: company,
      gstin,
      status,
      audit_log: user_id,
    };

    // Save the vendor and return the result
    const customer_data = new Categorie_model(updated_data);
    return await customer_data.save();
  }
}
export default CategorieRepository;