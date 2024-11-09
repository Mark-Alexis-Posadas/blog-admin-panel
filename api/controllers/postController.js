// const Post = require("../models/Post");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewPost = async (req, res) => {
  const { firstName, middleName, lastName, email } = req.body;
  try {
    const post = await Post.create({
      firstName,
      middleName,
      lastName,
      email,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(Post);
  } catch (err) {
    console.log("Error updating Post:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPost,
  createNewPost,
  getSinglePost,
  deletePost,
  updatePost,
};
