// src/loaders/servicesLoader.ts
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';

const servicesLoader = (repositories: { userRepository: UserRepository }) => {
  const userService = new UserService(repositories.userRepository);

  return {
    userService,
  };
};

export default servicesLoader;
