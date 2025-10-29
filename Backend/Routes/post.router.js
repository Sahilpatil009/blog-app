const express = require("express");
const postsController = require("../controller/postController");
const commentsController = require("../controller/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const postsRouter = express.Router();
 
// ----------------- Posts Routes -----------------

// Create a post
postsRouter.post("/createpost", authMiddleware, postsController.createPost);

// Get all posts
postsRouter.get("/getallpost", postsController.getAllPosts);

// Likes
postsRouter.post("/:postId/like", authMiddleware, postsController.toggleLike);


// Update a post (only owner)
postsRouter.put("/updatepost/:id", authMiddleware, postsController.updatePost);

//get post By id
postsRouter.get("/getpostbyid/:userId",  postsController.getpostbyid);

// Delete a post (only owner)
postsRouter.delete("/deletepost/:id", authMiddleware, postsController.deletePost);

// ----------------- Comments Routes -----------------

// Add comment to a post
postsRouter.post("/:postId/addcomments", authMiddleware, commentsController.createComment);

// Get all comments for a post
postsRouter.get("/:postId/allcomments", commentsController.getComments);

// Delete a comment (only comment owner)

module.exports = postsRouter;
