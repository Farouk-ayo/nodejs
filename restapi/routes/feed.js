const express = require("express");
const { body } = require("express-validator");
const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({
      min: 5,
    }),
    body("content").trim().isLength({
      min: 5,
    }),
    // body("imageUrl").trim().isURL(),
    // body("creator").trim().not().isEmpty(),
    // body("createdAt").trim().not().isEmpty(),
    // body("updatedAt").trim().not().isEmpty(),
  ],
  feedController.createPost
);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({
      min: 5,
    }),
    body("content").trim().isLength({
      min: 5,
    }),
    // body("imageUrl").trim().isURL(),
    // body("creator").trim().not().isEmpty(),
    // body("createdAt").trim().not().isEmpty(),
    // body("updatedAt").trim().not().isEmpty(),
  ],
  feedController.updatePost
);

router.get("/post/:postId", isAuth, feedController.getPost);
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
