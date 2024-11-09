const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/get-all-post", postController.getAllPost);
router.post("/create-new-post", postController.createNewPost);
router.get("/get-single-post/:id", postController.getSinglePost);
router.put("/update-post/:id", postController.updatePost);
router.delete("/delete-post/:id", postController.deletePost);

module.exports = router;
