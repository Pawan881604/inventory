import { NextFunction } from "express";
import CategorieRepository from "../repositories/categorieRepository";

class CategorieService {
  constructor(private categorieRepository: CategorieRepository) {}

  async add_new_customer(data: any, user_id: string, next: NextFunction) {
    return await this.categorieRepository.createCustomer(data, user_id);
  }
}
export default CategorieService;