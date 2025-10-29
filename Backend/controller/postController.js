const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); 
const User = require("../models/userModel");
const Post=require("../models/postModel");


async function createPost(req,res){
    const {title,content}=req.body;
    try{
        const post=new Post({
            title,
            content,
            user:req.user,
        })

        await post.save();
        res.status(201).json(post);
    }catch(err){
    console.error("Error creating post:", err.message);
    res.status(500).send("Server error!");
    }
}

async function updatePost(req,res){
    try{
        const { id } = req.params;
        const { title, content } = req.body;

        const post=await Post.findById(id);

        if(!post){
             return res.status(404).json({error:"post not found"});
        }

        if(post.user.toString() !== req.user) {
            return res.status(403).json({error: "Not authorized"});
        }
        post.title=title;
        post.content=content;

        await post.save();

        res.json(post);

    }catch(err){
    console.error("Error updating post:", err.message);
    res.status(500).send("Server error!");
    }
}

async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);  // fetch the post first
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error during deletion", err.message);
    res.status(500).send("Server error!");
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
    .populate("user", "username email"); // show author info
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).send("Server error!");
  }
}

async function getpostbyid(req, res) {
  const { userId } = req.params; // we pass userId from frontend
  try {
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 }); // latest first
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Toggle like on a post
async function toggleLike(req, res) {
  const { postId } = req.params;
  const userId = req.user;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: hasLiked ? "Post unliked" : "Post liked", likes: post.likes.length });
  } catch (err) {
    console.error("Error toggling like:", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports={
    getAllPosts,
    deletePost,
    updatePost,
    createPost,
    getpostbyid,
    toggleLike
}