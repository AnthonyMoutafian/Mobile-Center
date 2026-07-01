const express = require("express");

const {
  createPathToProductsDB,
  readFileForProductsDB,
} = require("../middleware");

const router = express.Router();

router.get("/", [createPathToProductsDB, readFileForProductsDB], (req, res) => {
  const search = (req.query.search || "").trim().toLowerCase();

  const products = res.locals.dbForProducts;

  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search),
  );

  const specifications = {};
  const brands = [];

  searchedProducts.forEach((product) => {
    if (!brands.includes(product.brand)) {
      brands.push(product.brand);
    }

    product.params.forEach((param) => {
      if (!specifications[param.title]) {
        specifications[param.title] = [];
      }

      if (!specifications[param.title].includes(param.desc)) {
        specifications[param.title].push(param.desc);
      }
    });
  });

  res.render("search", {
    title: `Search: ${req.query.search || ""}`,
    products: searchedProducts,
    search: req.query.search || "",
    brands,
    specifications,
  });
});

module.exports = router;
