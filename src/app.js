const express = require('express');


const adminRoutes = require('./routes/admin/admin-r/admin');
const parentroutes = require('./routes/admin/parent-categories/parent-category-route');
const sizeroutes = require('./routes/admin/size/size-routes');
const productCategories = require('./routes/admin/product_categories/product_categories_routes');
const colors = require('./routes/admin/color/color_route');
const products_api = require('./routes/admin/products/products_routes');
const userRouter = require('./routes/website/users/user-routes');
const cartRouter = require('./routes/website/cart/cart-routes');
const wishRouter = require('./routes/website/wish/wish-routes');
const paymentRouter = require('./routes/website/paymentGateway/paymentGate');

const allRoutes = express.Router();

const websiteRouter = express.Router();
const adminRouter = express.Router();
// const appRouter = express.Router();


//admin panel routes
adminRouter.use('/admin', adminRoutes);
adminRouter.use('/parentCategory',parentroutes);
adminRouter.use('/size',sizeroutes);
adminRouter.use('/productCategory',productCategories);
adminRouter.use('/colorss',colors);
adminRouter.use('/product-details',products_api);

//website routes
websiteRouter.use('/user', userRouter);
websiteRouter.use('/cart',cartRouter);
websiteRouter.use('/wishlist' , wishRouter);
websiteRouter.use('/payment', paymentRouter);


allRoutes.use('/franandoak-services', websiteRouter);
allRoutes.use('/admin-panel', adminRouter);

module.exports = allRoutes