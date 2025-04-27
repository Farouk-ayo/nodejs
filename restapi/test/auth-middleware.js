const { expect } = require("chai");
const authMiddleware = require("../middleware/is-auth");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth Middleware", () => {
  it("should throw an error if no auth header is present", () => {
    const req = {
      get: function (header) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated"
    );
  });

  it("should throw an error if the auth header is only one string", () => {
    const req = {
      get: function (header) {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should throw an error if the auth header is not a token", () => {
    const req = {
      get: function (header) {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should throw an error if the token is not valid", () => {
    const req = {
      get: function (header) {
        return "Bearer xyz.abc.def";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it("should yield a userId after decoding the token", () => {
    const req = {
      get: function (header) {
        return "Bearer xyz.abc.def";
      },
    };
    // Stub the jwt.verify method to return a mock userId
    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abc",
    });
    jwt.verify = function () {
      return { userId: "abc" };
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
