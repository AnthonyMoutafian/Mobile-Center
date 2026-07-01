var express = require("express");
const {
  createPathToProductsDB,
  readFileForProductsDB,
  createPathToCategoriesDB,
  readFileForCategoriesDB,
} = require("../middleware");

var router = express.Router();

router.get(
  "/",
  [
    createPathToProductsDB,
    readFileForProductsDB,
    createPathToCategoriesDB,
    readFileForCategoriesDB,
  ],
  (req, res) => {
    res.render("index", {
      title: "Home",
      products: res.locals.dbForProducts,
      categories: res.locals.categories,
    });
  },
);

module.exports = router;
