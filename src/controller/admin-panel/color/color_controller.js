const Colormodel = require("../../../models/color/color");
// const colors = require("../../../routes/admin/color/color_route");

const insertColor = async(req,res)=>{
    try{
        // console.log(req.body);
        const data = req.body;
        const datatosave = new Colormodel(data);
        const response = await datatosave.save();
        res.status(200).json({message:"Color is Inserted Successfully ",data:response})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error "})
    }
}

const readColors = async(req,res)=>{
    try{
        const response = await Colormodel.find();
        res.status(200).json({message:"Color is Fetched Successfully ",data:response})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error "})
    }
}

const deleteColor = async(req,res)=>{
    try{
        // console.log(req.params);
        const response = await Colormodel.deleteOne(req.params)
        res.status(200).json({message:"Category Deleted Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const updateStatusColor = async(req,res)=>{
    try{
        // console.log(req.body,req.params)
        const response = await Colormodel.updateOne(req.params,
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

const multipledeleteColor = async(req,res)=>{
    try{
        console.log(req.body.ids)
        const response =await Colormodel.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Category Deleted Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const readColorById=async(req,res)=>{
    try{
        const response = await Colormodel.findById({_id:req.params._id})
        res.status(200).json({message:"Success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateColor = async(req,res)=>{
    try{
        const {color,color_code}= req.body
        // console.log(req.body,req.params)
        const response = await Colormodel.updateOne(req.params,
            {
            $set:{
                color,
                color_code
            }
        }
    )
        res.status(200).json({message:"Color Updated Successfully",data:response})
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"})
}

}

const activeColor = async( req, res ) => {
    try{
        const response = await Colormodel.find({status:true});

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    insertColor,
    readColors,
    deleteColor,
    updateStatusColor,
    multipledeleteColor,
    readColorById,
    updateColor,
    activeColor
};