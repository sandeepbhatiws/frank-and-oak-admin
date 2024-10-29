const Product_Model = require("../../../models/product/product_model");
const fs = require('fs');
const path = require('path');

const insertproducts = async(req,res)=>{
    try{
        const data = req.body;
        

        data.colors=JSON.parse(data.colors);
        data.sizes=JSON.parse(data.sizes);

        // console.log(data,req.files.thumbnail[0].filename)

        if(req.files){
            if(req.files.thumbnail){
                data.thumbnail = req.files.thumbnail[0].filename
            }

            if(req.files.thumbnail_animation){
                data.thumbnail_animation = req.files.thumbnail_animation[0].filename
            }

            if(req.files.images){
                data.images = req.files.images.map((image) => image.filename)
            }
        }

        // console.log(data);

        const dataToSave = new Product_Model(data);

        // console.log(dataToSave)

        const response = await dataToSave.save();

        console.log(response)
        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const readproducts = async(req,res)=>{
    try{

        const response = await Product_Model.find()
        .populate('sizes')
        .populate('colors')
        .populate('parent_Category')
        .populate('product_Category')

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products`;

        res.status(200).json({message:"success",data:response,file_path})

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const updateStatusProduct = async(req,res)=>{
    try{
        // console.log(req.body,req.params)
        const response = await Product_Model.updateOne(req.params,
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

const deleteProduct = async(req,res)=>{
    try{
        const predata = await Product_Model.findById(req.params._id)
        

        if(!predata) return  res.status(404).json({message:'data not found'});

        
        
     
        const  filePath = path.join('D:','ws-cube','react','Next_Js','Frank_and_Oak','backend','src','uploads','products');
        //'D:','ws-cube','react','Next_Js','backend',D:\ws-cube\react\Next_Js\backend\src\uploads\products

        // console.log(predata,filePath)
        
           if(predata.images){

            if(fs.existsSync(`${filePath}/${predata.thumbnail}`)){
                fs.unlinkSync(`${filePath}/${predata.thumbnail}`)
            }
      
            
            if(fs.existsSync(`${filePath}/${predata.thumbnail_animation}`)){
                fs.unlinkSync(`${filePath}/${predata.thumbnail_animation}`)
            }

                predata.images.forEach((image) => {
                    if (fs.existsSync(`${filePath}/${image}`)) {
                        fs.unlinkSync(`${filePath}/${image}`);
                    }
                })
           }
               
        const response = await Product_Model.deleteOne(req.params)
        res.status(200).json({message:"Category Deleted Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const multipledeleteProduct = async(req,res)=>{
    try{
        // console.log(req.body.ids)

        const response =await Product_Model.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Category Deleted Successfully",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

const fetchProductById = async(req,res)=>{
    try{
        const response = await Product_Model.findById({_id:req.params._id})
        .populate('sizes')
        .populate('colors')
        .populate('parent_Category')
        .populate('product_Category')

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;
        
        res.status(200).json({message:"Success",data:response,file_Path:file_path})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateProduct = async(req,res)=>{ 
    
    const predata = await Product_Model.findById(req.params._id);

    // console.log(predata)

    if(!predata) return  res.status(404).json({message:'data not found'});

    const data = req.body
    data.colors=JSON.parse(data.colors)
    data.sizes=JSON.parse(data.sizes)

    if(req.files){

    const  filePath = path.join('D:','ws-cube','react','Next_Js','Frank_and_Oak','backend','src','uploads','products');

    // console.log(filePath)

       if(req.files.thumbnail){
        data.thumbnail = req.files.thumbnail[0].filename

        if(fs.existsSync(`${filePath}/${predata.thumbnail}`)){
            fs.unlinkSync(`${filePath}/${predata.thumbnail}`)
        }
    }

    if(req.files.thumbnail_animation){
        data.thumbnail_animation = req.files.thumbnail_animation[0].filename
        
        if(fs.existsSync(`${filePath}/${predata.thumbnail_animation}`)){
            fs.unlinkSync(`${filePath}/${predata.thumbnail_animation}`)
        }
    }

        if(req.files.images){
            data.images = req.files.images.map((image) => image.filename)

            predata.images.forEach((image) => {
                if (fs.existsSync(`${filePath}/${image}`)) {
                    fs.unlinkSync(`${filePath}/${image}`);
                }
            })
            
        }
    }
      try{
            const response = await Product_Model.updateOne(
                req.params,
                {
                    $set:data
                }
            )
            const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/admin`;
    
            res.status(200).json({ message: 'data updated successfully',data:response,file_path});

            // console.log(data)
            // console.log(req.files);

        }
        
    
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }

}

const activeProduct = async( req, res ) => {
    try{
        const response = await Product_Model.find({status:true})
        .populate('sizes')
        .populate('colors')
        .populate('parent_Category')
        .populate('product_Category')

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        // const resData = {...response,filePath}

        res.status(200).json({message: 'success', data: response,file_Path:file_path});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const searchProduct = async(req, res)=>{
    try{
        // const response = await parentCategory.find({name: {$regex: new RegExp('e')}}); 
        if(req.params.key){        
        const response = await Product_Model.find({$or:[
            {name: {$regex : new RegExp(req.params.key)}},
            {description: {$regex : new RegExp(req.params.key)}},
            {brand:{$regex : new RegExp(req.params.key)}},
            // {sizes:{$regex : new RegExp({$in:req.params.key})}},
            // {colors:{$regex : new RegExp({$in:req.params.key})}}
        ]})
        // .populate('sizes');

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;
        
        res.status(200).json({message:'success', data: response,file_path:file_path});
    }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const filterProduct=async(req,res)=>{
    try{
            res.status(200).json({message:"Success "})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}


module.exports = {
    insertproducts,
    readproducts,
    updateStatusProduct,
    deleteProduct,
    multipledeleteProduct,
    fetchProductById,
    updateProduct,
    activeProduct,
    searchProduct,
    filterProduct
}