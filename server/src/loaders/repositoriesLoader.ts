// src/loaders/repositoriesLoader.ts

import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";

export const repositoriesLoader = () => {
  const userRepository = new UserRepository();
  const vendorRepository = new VendorRepository();
  return { userRepository, vendorRepository };
};
