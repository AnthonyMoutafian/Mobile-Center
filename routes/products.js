const express = require("express");
const { createPathToProductsDB } = require("../middleware/createPathProductsDB");
const { readFileForProductsDB } = require("../middleware/readFileToProductsDB");
const productsRoute = express.Router();

productsRoute.get("/",[createPathToProductsDB,readFileForProductsDB], (req,res)=>{
    res.json(res.locals.dbForProducts)
})

module.exports = productsRoute