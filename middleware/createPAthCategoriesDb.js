const path = require("path");

function createPathToCategoriesDB(req, res, next) {
  res.locals.path = path.join(
    __dirname,
    "../db/categories.json"
  );

  next();
}

module.exports = {
  createPathToCategoriesDB,
};