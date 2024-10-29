// admin controllers

const { 
    adminLogin, 
    genrateOtp, 
    updateEmail,
    updateAdmin
} = require('./admin-panel/admin/admin-controller');

// color controller

const { 
    insertColor,
    readColors,
    deleteColor,
    updateStatusColor,
    multipledeleteColor,
    readColorById,
    updateColor,
    activeColor
 } = require('./admin-panel/color/color_controller');

// Parent-Category Controller

const {
     insertParentCategories,
     readParentCategories,
     deleteParentCategory,
     statusUpdateParentCategory,
     multiDeleteParentCategory,
     getParentCategoryById,
     updateParentCategory,
     activeParentCategories
 } = require('./admin-panel/parent-categories/parent-controllers');

//  Products Details

const {
     insertproducts, 
     readproducts,
     updateStatusProduct,
     deleteProduct,
     multipledeleteProduct,
     updateProduct,
     fetchProductById,
     activeProduct,
     searchProduct,
     filterProduct
} = require('./admin-panel/product/product_controller');

// Product Categories

const { 
    insertProductCategories,
    readProductCategories,
    updateStatusProductCategory,
    deleteProductCategory,
    multipledeleteProductCategory,
    fetchParentCategoryById,
    updateProductCategory,
    activeProductCategories
 } = require('./admin-panel/product_categories/product_Categories_Controller');

//  Size-Controller

const { 
    insertSize,
    readSize,
    deleteSize,
    activeSize,
    updateSize,
    readSizebyid,
    deleteManySize,
    activeSizesAvailable
 } = require('./admin-panel/size/size-controller');
const { addProductToCart, viewCart, deleteCart } = require('./website/cart-control/cart-controller');
const { buySomething } = require('./website/paymetGateway/paymentGate');

//  website 

const {
     registerUser, 
     loginUser,
     genrateOtpUser,
     updatePassword
} = require('./website/users/user-controller');
const { addProductToWish, viewWish, deleteWish, addProductToWishDirect } = require('./website/wish-control/wishlistController');


module.exports = {
    adminLogin,
    genrateOtp,
    updateEmail,
    updateAdmin,

    insertParentCategories,
    readParentCategories,
    deleteParentCategory,
    statusUpdateParentCategory,
    multiDeleteParentCategory,
    getParentCategoryById,
    updateParentCategory,
    activeParentCategories,

    insertSize,
    readSize,
    deleteSize,
    activeSize,
    readSizebyid,
    updateSize,
    deleteManySize,
    activeSizesAvailable,

    insertProductCategories,
    readProductCategories,
    updateStatusProductCategory,
    deleteProductCategory,
    multipledeleteProductCategory,
    fetchParentCategoryById,
    updateProductCategory,
    activeProductCategories,
    

    insertColor,
    readColors,
    deleteColor,
    updateStatusColor,
    multipledeleteColor,
    readColorById,
    updateColor,
    activeColor,

    insertproducts,
    readproducts,
    updateStatusProduct,
    deleteProduct,
    multipledeleteProduct,
    updateProduct,
    fetchProductById,
    activeProduct,
    searchProduct,
    filterProduct,

    registerUser,
    loginUser,
    genrateOtpUser,
    updatePassword,

    addProductToCart,
    viewCart,
    deleteCart,

    addProductToWish,
    addProductToWishDirect,
    viewWish,
    deleteWish,

    buySomething
};