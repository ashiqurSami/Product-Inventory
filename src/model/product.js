const mongoose=require("mongoose");
const Schema=mongoose.Schema(
    {
        title:{type:String},
        description:{type:String},
        price:{type:Number},
        discount:{type:Number},
        stock:{type:Boolean},
        remark:{type:String},
    },
    {
        versionkey: false,
        timestamps: true,
    }
);

const productModel=mongoose.model("products",Schema);
module.exports=productModel;