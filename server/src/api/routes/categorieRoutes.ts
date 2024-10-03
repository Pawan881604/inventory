import { Router } from "express";
import CategorieController from "../controllers/categorieController";

const categorieRoutes = (categorieController: CategorieController) => {
  const router = Router();
  router.post(
    "/add",
    categorieController.add_new_customer.bind(categorieController)
  );
  return router;
};
export default categorieRoutes;
