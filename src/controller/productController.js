const mongoose=require("mongoose");
const productModel=require("../model/product");

//create
exports.createProduct=async (req,res)=>{
    try{
        let reqBody=req.body;
        let data=await productModel.create(reqBody);
        res.status(200).json({status:"Success",data:data});
    } catch (e) {
        res.status(401).json({status:"error",error:e.toString()});
    }
};

//read
exports.getOneProduct=async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id);
    try{
        let data=await productModel.aggregate([{$match:{_id:id}}]);
        res.status(200).json({status:"Success",data:data});
    }catch (e) {
        res.status(401).json({status:"Error",error:e.toString()});
    }
}

exports.getAllProduct=async(req,res)=>{
    try{
        let data=await productModel.aggregate([
            {
                $project:{
                    title:1,
                    description:1,
                    price:1,
                    remark:1,
                },
            },
        ]);
        res.status(200).json({status:"Success",data:data});
    }catch (e) {
        res.status(401).json({status:"Error",error:e.toString()});
    }
};

//update
exports.updateProduct=async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id);
    let query={_id:id};
    let reqBody=req.body;
    try{
        let data=await productModel.updateOne(query,reqBody);
        res.status(200).json({status:"Success",data:data});
    }catch (e) {
        res.status(401).json({status:"Error",error:e.toString()});
    }
};


//delete
exports.deleteProduct=async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id);
    let query={_id:id};
    try{
        let data=await productModel.deleteOne(query);
        res.status(200).json({status:"Success",data:data});
    }catch (e) {
        res.status(401).json({status:"Error",error:e.toString()});
    }
};