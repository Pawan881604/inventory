// src/loaders/servicesLoader.ts
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import VendorRepository from "../repositories/vendorRepository";
import VendorService from "../services/vendorService";
import CustomerService from "../services/customerService";
import CustomerRepository from "../repositories/customerRepository";

const servicesLoader = (repositories: {
  userRepository: UserRepository;
  vendorRepository: VendorRepository;
  customerRepository: CustomerRepository;
}) => {
  const userService = new UserService(repositories.userRepository);
  const vendorService = new VendorService(repositories.vendorRepository);
  const customerService = new CustomerService(repositories.customerRepository);

  return {
    userService,
    vendorService,
    customerService,
  };
};

export default servicesLoader;
