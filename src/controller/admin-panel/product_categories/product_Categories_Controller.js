const productCategoryModel = require("../../../models/product-category/productCategory");

const insertProductCategories = async(req,res)=>{
    try{
        const data=req.body;
        // console.log(data);
        const datatosave = new productCategoryModel(data);
        const response = await datatosave.save();
        res.status(200).json({message:"Data Inserted Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
};

const readProductCategories = async(req,res)=>{
    try{

        const response = await productCategoryModel.find();

        res.status(200).json({message:"Success",data:response})


    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateStatusProductCategory = async(req,res)=>{
    try{
        // console.log(req.body,req.params)
        const response = await productCategoryModel.updateOne(req.params,
            {$set:{
                status:
                req.body.newValue
            }}
        )
        res.status(200).json({message:"Status Updated Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const deleteProductCategory = async(req,res)=>{
    try{
        // console.log(req.params);
        const response = await productCategoryModel.deleteOne(req.params)
        res.status(200).json({message:"Category Deleted Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const multipledeleteProductCategory = async(req,res)=>{
    try{
        console.log(req.body.ids)
        const response =await productCategoryModel.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Category Deleted Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const fetchParentCategoryById = async(req,res)=>{
    try{
        const response = await productCategoryModel.findById({_id:req.params._id})
        res.status(200).json({message:"Success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateProductCategory = async(req,res)=>{
    try{
        const {name,short_discription,discription}= req.body
        // console.log(req.body,req.params)
        const response = await productCategoryModel.updateOne(req.params,
            {
            $set:{
                name,
                short_discription,
                discription
            }
        }
    )
        res.status(200).json({message:"Product Category Updated Successfully",data:response})
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"})
}

}

const activeProductCategories = async( req, res ) => {
    try{
        const response = await productCategoryModel.find({status:true});

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
     insertProductCategories,
     readProductCategories,
     updateStatusProductCategory,
     deleteProductCategory,
     multipledeleteProductCategory,
     fetchParentCategoryById,
     updateProductCategory,
     activeProductCategories
}