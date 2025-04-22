const User = require("../models/user");
const Post = require("../models/post");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Post = require("../models/post");
module.exports = {
  createUser: async function (userInput, req) {
    // const { name, email, password } = userInput;
    // const user = {
    //   _id: Math.random().toString(),
    //   name,
    //   email,
    //   password,
    //   posts: [],
    // };
    // return user;
    console.log(userInput);

    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({
        message: "Email is invalid",
      });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({
        message: "Password too short!",
      });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422; // Unprocessable Entity
      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already.");
      throw error;
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    if (userInput.password.length < 5) {
      const error = new Error("Password too short!");
      throw error;
    }
    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    const posts = await Post.find({ creator: createdUser._id });
    const userWithPosts = {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
      posts: posts.map((post) => ({
        ...post._doc,
        _id: post._id.toString(),
      })),
    };
    return userWithPosts;
  },

  login: async function ({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found.");
      error.code = 401; // Unauthorized
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect.");
      error.code = 401; // Unauthorized
      throw error;
    }
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return { userId: user._id.toString(), token: token, tokenExpiration: 1 };
  },

  createPost: async function ({ postInput }, req) {
    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({
        msg: "Title is required and must be at least 5 characters long.",
      });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({
        msg: "Content is required and must be at least 5 characters long.",
      });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
    });
    const createdPost = await post.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
};
