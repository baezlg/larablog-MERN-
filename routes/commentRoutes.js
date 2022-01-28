import express from "express";
const router = express.Router();
import commentController from "../controllers/commentController.js.js.js.js";

router.get("/", commentController.getAllComments);
router
  .route("/:id")
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

export default router;
