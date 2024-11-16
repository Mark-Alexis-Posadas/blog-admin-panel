const postModel = require("../models/postsModel");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewPost = async (req, res) => {
  const { image, title, content, categories } = req.body;

  if (!image || !title || !content || !categories) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const post = await postModel.createPost(image, title, content, categories);
    if (post && post.insertId) {
      return res.status(201).json({
        id: post.insertId,
        title,
        content,
        image,
        categories,
      });
    }

    return res.status(500).json({ message: "Failed to create post" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.deletePost(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { image, title, content, categories } = req.body;

  try {
    const updatedPost = await postModel.updatePost(id, {
      image,
      title,
      content,
      categories,
    });
    if (updatedPost) {
      res
        .status(200)
        .json({ message: "Post updated successfully", updatedPost });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  getSinglePost,
  deletePost,
  updatePost,
};
