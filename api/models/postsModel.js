const db = require("../config/db");

const getAllPosts = async () => {
  const [rows, field] = await db.execute(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return rows;
};

const createPost = async (image, title, content, categories) => {
  const [result] = await db.execute(
    "INSERT INTO posts (image, title, content,categories) VALUES (?, ?, ?, ?)",
    [image, title, content, categories]
  );
  return result;
};

const getPostById = async (id) => {
  const [rows, fields] = await db.execute("SELECT * FROM posts WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

const deletePost = async (id) => {
  try {
    const result = await db.execute("DELETE FROM posts WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("Post not found or failed to delete");
    }

    return { message: "Post deleted successfully", id };
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error;
  }
};

module.exports = { getAllPosts, createPost, getPostById, deletePost };
