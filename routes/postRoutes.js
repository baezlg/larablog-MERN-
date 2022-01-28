import express from "express";
const router = express.Router();
import postController from "./../controllers/postController.js";
import commentController from "./../controllers/commentController.js";

router.get("/popular-post", commentController.popularPost);
router.get("/categories-count", postController.getCategoriesCount);
router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:slug")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router
  .route("/:postId/comments")
  .get(commentController.getAllCommentsByPost)
  .post(commentController.createComment);

export default router;
