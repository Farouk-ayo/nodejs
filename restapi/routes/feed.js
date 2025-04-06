const express = require("express");
const { body } = require("express-validator");
const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({
      min: 7,
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

// router.post(
//   "/post/:postId",
//   [
//     body("title").trim().isLength({
//       min: 7,
//     }),
//     body("content").trim().isLength({
//       min: 5,
//     }),
//     body("imageUrl").trim().isURL(),
//     body("creator").trim().not().isEmpty(),
//     body("createdAt").trim().not().isEmpty(),
//     body("updatedAt").trim().not().isEmpty(),
//   ],
//   feedController.updatePost
// );

router.get("/post/:postId", feedController.getPost);
// router.delete("/post/:postId", feedController.deletePost);

module.exports = router;
