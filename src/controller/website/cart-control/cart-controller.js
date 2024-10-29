// const Cart = require("../../../models/cart/cart");

const Cart = require("../../../models/website/cart/cart");

const addProductToCart = async (req, res) =>{ 

    try{
        // console.log(req.body)
        const dataToSave = new Cart(req.body);
        // console.log(dataToSave);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});
        console.log('Add',response)


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server'});
    }
};

const viewCart = async (req, res)=>{
    try{
        // console.log(req.params);
        if(!req.params)return res.status(400).json({message:'Id not found'})
        const response = await Cart.find({userr:req.params})
        .populate('color')
        .populate('size')
        .populate('userr')
        .populate('proo');

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        res.status(200).json({message: 'success', data:response,file_path:file_path});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server'});
    }
}

const deleteCart = async(req,res)=>{
    try{
        const data = req.params
        const response = await Cart.deleteOne(data);
        res.status(200).json({message:"success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(200).json({message:"Internal Server Error"})
    }
}

module.exports = {
    addProductToCart,
    viewCart,
    deleteCart
};