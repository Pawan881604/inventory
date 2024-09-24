// src/loaders/repositoriesLoader.ts

import UserRepository from "../repositories/userRepository";


export const repositoriesLoader = () => {
  const userRepository = new UserRepository();
  return { userRepository };
};
