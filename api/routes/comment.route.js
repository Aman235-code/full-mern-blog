import express from "express";
import {
  createComment,
  getPostsComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "./../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostsComments);

export default router;
