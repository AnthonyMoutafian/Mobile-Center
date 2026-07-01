const express = require("express");

const {
  createPathToProductsDB,
  readFileForProductsDB,
} = require("../middleware");

const router = express.Router();

router.get(
  "/:slug",
  [createPathToProductsDB, readFileForProductsDB],
  (req, res) => {
    const slug = req.params.slug;

    const product = res.locals.dbForProducts.find((p) => p.slug === slug);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const relatedProducts = res.locals.dbForProducts.filter(
      (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug,
    );

    res.render("product", {
      title: product.title,
      product,
      relatedProducts,
    });
  },
);

module.exports = router;
