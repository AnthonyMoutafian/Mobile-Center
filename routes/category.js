const express = require("express");

const {
  createPathToProductsDB,
  readFileForProductsDB,
  createPathToCategoriesDB,
  readFileForCategoriesDB,
} = require("../middleware");

const router = express.Router();

router.get(
  "/:slug",
  [
    createPathToProductsDB,
    readFileForProductsDB,
    createPathToCategoriesDB,
    readFileForCategoriesDB,
  ],
  (req, res) => {
    const categorySlug = req.params.slug;

    const products = res.locals.dbForProducts;
    const categories = res.locals.categories;

    const category = categories.find((c) => c.slug === categorySlug);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    let filteredProducts = products.filter(
      (product) => product.categorySlug === categorySlug,
    );

    const specifications = {};
    const brands = [];

    filteredProducts.forEach((product) => {
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

    res.render("category", {
      title: category.title,
      products: filteredProducts,
      specifications,
      brands,
    });
  },
);

module.exports = router;
