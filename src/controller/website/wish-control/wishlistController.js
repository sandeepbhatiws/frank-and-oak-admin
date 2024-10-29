const Cart = require("../../../models/website/cart/cart");
const Wish = require("../../../models/website/wish/wishlist");


const addProductToWish = async (req, res) => {

    try {
        
            // console.log(req.params)
            const data = await Cart.findById(req.params)
            console.log(data)
            const {_id ,quantity, ...withoutid} = data._doc
            // console.log(withoutid)
            let dataToSave = new Wish(withoutid);
            // console.log(dataToSave);

            let response = await dataToSave.save();

            res.status(200).json({ message: 'success', data: response });
            // console.log(response)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server' });
    }
};

const addProductToWishDirect = async (req, res) => {

    try {
        
            // console.log(req.body)
            let dataToSave = new Wish(req.body);
            // console.log(dataToSave);

             response = await dataToSave.save();

            res.status(200).json({ message: 'success', data: response });
            // console.log(response)

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server' });
    }
};

const viewWish = async (req, res) => {
    try {
        // console.log(req.params);
        if (!req.params) return res.status(400).json({ message: 'Id not found' })
        const response = await Wish.find({ userr: req.params })
            .populate('color')
            .populate('size')
            .populate('userr')
            .populate('proo');

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        res.status(200).json({ message: 'success', data: response, file_path: file_path });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server' });
    }
}

const deleteWish = async (req, res) => {
    try {
        const data = req.params
        const response = await Wish.deleteOne(data);
        res.status(200).json({ message: "success", data: response })
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    addProductToWish,
    viewWish,
    deleteWish,
    addProductToWishDirect
};