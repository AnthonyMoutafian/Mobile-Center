const { createPathForLoggedInUser } = require("./");
const fs = require("fs").promises;

const readFileForProductsDB = async (req,res,next)=>{
    try{
        const dbForProducts = JSON.parse(await fs.readFile(res.locals.pathToProductsDB, "utf-8"));
        res.locals.dbForProducts = dbForProducts
        next();
    }catch(err){
        res.status(500).json({message: "Error! - " + err})
    }
}

module.exports.readFileForProductsDB = readFileForProductsDB