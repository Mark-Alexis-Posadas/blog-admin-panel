const db = require("../config/db");

const getAllPosts = async () => {
  const [rows, field] = await db.execute(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return rows;
};

const createPost = async (image, title, content) => {
  const [result] = await db.execute(
    "INSERT INTO posts (image,title, content) VALUES (?, ?)",
    [image, title, content]
  );
  return result;
};

const getPostById = async (id) => {
  const [rows, fields] = await db.execute("SELECT * FROM posts WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

module.exports = { getAllPosts, createPost, getPostById };
