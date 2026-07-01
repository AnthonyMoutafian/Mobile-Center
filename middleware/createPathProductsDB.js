const path = require("path");

const createPathToProductsDB = (req, res, next) => {
  try {
    const pathToProductsDB = path.join(__dirname, "..", "db", "products.json");
    res.locals.pathToProductsDB = pathToProductsDB;
    next();
  } catch (err) {
    res.json({message: err.message});
  }
};

module.exports.createPathToProductsDB = createPathToProductsDB;