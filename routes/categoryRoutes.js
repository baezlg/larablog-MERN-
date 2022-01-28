import express from "express";
const router = express.Router();
import postController from "./../controllers/postController.js";

router
  .route("/")
  .get(postController.getAllCategories)
  .post(postController.createCategory);

export default router;
