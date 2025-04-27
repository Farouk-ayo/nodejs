const expect = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const Post = require("../models/post");
const FeedController = require("../controllers/feed");

describe("Feed Controller - Login", () => {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://Faroukayo:Faroukayo@cluster0.2tlgmgj.mongodb.net/test-feeds?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "5f8d0c3b8b3e2c0017a4e1f9",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  it("should add a create post to the posts of the creator", (done) => {
    const req = {
      body: {
        title: "A new post",
        content: "This is a new post",
      },
      file: {
        path: "abc",
      },
      userId: "5f8d0c3b8b3e2c0017a4e1f9",
    };
    const res = {
      status: function (code) {
        return this;
      },
      json: function () {},
    };
    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      ///note that i have to return the user from the createPost function in order to test it but i am unable to do so due to the fact that i am using io.getIO().emit to send the post to the client and i am not able to return the user from the createPost function. I will have to revert the socket io commit.
      expect(savedUser).to.be.an("object");
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.be.an("array").that.is.not.empty;
      expect(savedUser.posts[0]).to.have.property("title", "A new post");
      expect(savedUser.posts[0]).to.have.property(
        "content",
        "This is a new post"
      );
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
