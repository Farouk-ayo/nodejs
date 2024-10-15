const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return (
      db
        .collection("users")
        //   if you use findOne, then no need for next()
        .find({ _id: new ObjectId(userId) })
        .next()
    );
  }
}

module.exports = User;
