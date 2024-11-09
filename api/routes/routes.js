const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/get-all-posts", postController.getAllPosts);
router.post("/create-post", postController.createPost);
router.get("/get-single-post/:id", postController.getSinglePost);
// router.put("/update-post/:id", postController.updatePost);
// router.delete("/delete-post/:id", postController.deletePost);

module.exports = router;