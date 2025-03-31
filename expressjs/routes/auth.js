const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a Valid Email")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 3 })
      .isString()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a Valid Email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email is forbidden");
        // }
        // return true;

        return User.findOne({
          email: value,
        }).then((userDoc) => {
          if (userDoc) {
            if (userDoc) {
              return Promise.reject(
                "E-mail exists already, please pick a different one"
              );
            }
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters")
      // .isAlphanumeric()
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+=-]*$/)
      .withMessage("Password must contain only numbers and letters")
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
