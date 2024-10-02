// src/loaders/repositoriesLoader.ts

import CustomerRepository from "../repositories/customerRepository";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";

export const repositoriesLoader = () => {
  const userRepository = new UserRepository();
  const vendorRepository = new VendorRepository();
  const customerRepository = new CustomerRepository();
  return { userRepository, vendorRepository,customerRepository };
};
