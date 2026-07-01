const fs = require("fs").promises;

async function readFileForCategoriesDB(req, res, next) {
  const file = await fs.readFile(res.locals.path, "utf8");

  res.locals.categories = JSON.parse(file);

  next();
}

module.exports = {
  readFileForCategoriesDB,
};