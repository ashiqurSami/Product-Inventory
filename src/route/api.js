const express=require("express");
const router=express.Router();
const productController=require("../controller/productController");

//create
router.post("/create-product",productController.createProduct);
//read
router.get("/get-one-product/:id",productController.getOneProduct);
router.get("/get-all-product",productController.getAllProduct);
//update
router.post("/update-product/:id",productController.updateProduct);
//delete
router.delete("/delete-product/:id",productController.deleteProduct);

module.exports=router