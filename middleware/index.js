const { createPathToCategoriesDB } = require("./createPAthCategoriesDb");
const { createPathToProductsDB } = require("./createPathProductsDB");
const { readFileForCategoriesDB } = require("./readFileToCategoriesDB");
const { readFileForProductsDB } = require("./readFileToProductsDB");

module.exports = {
    createPathToProductsDB,
    readFileForProductsDB,
    createPathToCategoriesDB,
    readFileForCategoriesDB,
};