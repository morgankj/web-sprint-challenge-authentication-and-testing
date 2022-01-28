const db = require("../../data/dbConfig");

const missingInfo = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};

const usernameUnique = async (req, res, next) => {
  const { username } = req.body;
  const usernameExists = await db("users")
    .where("username", username)
    .first();
  if (usernameExists) {
    next({ status: 401, message: "username taken" });
  } else {
    next();
  }
};

module.exports = {
  missingInfo,
  usernameUnique,
};
