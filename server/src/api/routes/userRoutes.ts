import { Router } from "express";
import UserController from "../controllers/userController";

const userRoutes = (userController: UserController) => {
  const router = Router();

  router.post("/register", userController.register.bind(userController));
  router.post("/login", userController.login.bind(userController));
  router.get("/", userController.getAllUsers.bind(userController));
  router.get("/:id", userController.getUserById.bind(userController));
  router.put("/:id", userController.updateUser.bind(userController));
  router.delete("/:id", userController.deleteUser.bind(userController));

  return router;
};

export default userRoutes;
