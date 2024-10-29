const parentcategory = require("../../../models/parent-category/parent-category")

const insertParentCategories = async(req,res)=>{
    try{
        const data = req.body

        const datatosave = new parentcategory(data)
        const response = await datatosave.save();
        // if(errorResponse.code===11000 && keyPattern && keyValue) return(res.status(11000).json({message:errorResponse.errmsg}))
        res.status(200).json({message:"data inserted",data:response})

    }
    catch(error){
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            return res.status(400).json({message: 'Parent category with this name already exists'});
        }
        res.status(500).json({message:"something wrong"})
    }
};

const readParentCategories = async(req,res)=>{
    try{
            const response = await parentcategory.find()
            res.status(200).json({message:"data fetched",data:response})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something wrong"})
    }
}

const deleteParentCategory = async(req,res)=>{
    try{
        const data = req.params
        const response = await parentcategory.deleteOne(data);
        res.status(200).json({message:"success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(200).json({message:"Internal Server Error"})
    }
}

const statusUpdateParentCategory = async(req,res)=>{
    try{
        // console.log(req.params._id)
        if(!req.params._id) return res.status(400).json({message:'please send category id'});
        // const data = req.params
        const response = await parentcategory.updateOne(req.params,{
            $set:{status : req.body.newvalue}
        });
        res.status(200).json({message:"status updated",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something wrong"});
    }
}

const multiDeleteParentCategory = async(req,res)=>{
    try{
        // if(!req.body) console.log("hello")
        // console.log(req.body)
        const response = await parentcategory.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Data Deleted"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const getParentCategoryById = async(req,res)=>{
    try{

        const data = req.params._id;
        // console.log(data)
        const response = await parentcategory.findById(data)

        res.status(200).json({meaasage:"success",data:response})

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const updateParentCategory = async(req,res)=>{
    try{
            const {name,short_discription,discription}= req.body
            // console.log(req.body,req.params)
            const response = await parentcategory.updateOne(req.params,
                {
                $set:{
                    name,
                    short_discription,
                    discription
                }
            }
        )
            res.status(200).json({message:"success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const activeParentCategories = async( req, res ) => {
    try{
        const response = await parentcategory.find({status:true});

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    insertParentCategories,
    readParentCategories,
    deleteParentCategory,
    statusUpdateParentCategory,
    multiDeleteParentCategory,
    getParentCategoryById,
    updateParentCategory,
    activeParentCategories
}