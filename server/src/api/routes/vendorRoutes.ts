import { Router } from "express";
import VendorController from "../controllers/vendorController";

const vendorRoutes = (vendorController: VendorController) => {
  const router = Router();
  router.post("/add", vendorController.add_new.bind(vendorController)); // Defining vendor route
  router.get(
    "/all-vendors",
    vendorController.all_vendors.bind(vendorController)
  ); // Defining vendor route
  return router; // Return router so it can be used in app.ts
};

export default vendorRoutes;
