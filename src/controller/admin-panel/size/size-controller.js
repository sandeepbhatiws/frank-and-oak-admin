const { response } = require("express");
const SizeModel = require("../../../models/size/size")

const insertSize = async(req,res)=>{
    try{
        const data = req.body
        const datatosave = new SizeModel(data)
        const response = await datatosave.save()

        res.status(200).json({message:"inserted successfully",data:response})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something wrong"})
    }
};

const readSize = async(req,res)=>{
    try{
        const response = await SizeModel.find();

        res.status(200).json({message:"data fetch successfully",data:response})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
};

const deleteSize = async(req,res)=>{
    try{
        const data = req.params
        const response = await SizeModel.deleteOne(data);
        res.status(200).json({message:"Data deleted",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something wrong"});
    }
}

const activeSize= async(req,res)=>{
    try{
        // console.log(req.params._id)
        if(!req.params._id) return res.status(400).json({message:'please send category id'});
        // const data = req.params
        const response = await SizeModel.updateOne(req.params,{
            $set:{status : req.body.newvalue}
        });
        res.status(200).json({message:"status updated",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something wrong"});
    }
}

const readSizebyid =async(req,res)=>{
    try{
        const response = await SizeModel.findById(req.params._id);
        if(!response) return res.status(400).json({message: 'plaese send a valid id'});
        res.status(200).json({message:"success",data:response})
    }
    catch(error){
        console.log(error)
    }
}

const updateSize=async(req,res)=>{
    try{
        const {name,order} = req.body
        if(!req.params._id) return res.status(400).json({message:'please send category id'});

        const response = await SizeModel.updateOne(req.params,
            {
                $set:{
                    name,
                    order
                }
            }
        )

        res.status(200).json({message:"Data Updated",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const deleteManySize=async(req,res)=>{
    try{
            // const data=req.body
            // console.log(data)
            const response =await SizeModel.deleteMany({_id:{$in:req.body.ids}})
            res.status(200).json({message:"Data Deleted",data:response})
            
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const activeSizesAvailable = async( req, res ) => {
    try{
        const response = await SizeModel.find({status:true});

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    insertSize,
    readSize,
    deleteSize,
    activeSize,
    readSizebyid,
    updateSize,
    deleteManySize,
    activeSizesAvailable
}