// const Order = require('../../../models/website/order/order');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const buySomething = async (req, res) => {
    try {
        // console.log(req.body);

        const lineItems = req.body.map((item) => (
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.product.name
                    },
                    unit_amount: item.product.price *100
                },
                quantity: item.quantity
            }
        ));
        // console.log("lineItems",lineItems)

        const customer = await stripe.customers.create({
            name: req.body[0].user.f_name,
            address:{
                line1:"Broadway 10th street",
                line2: 'bombay motors',
                city:'jodhpur',
                state: 'rajasthan',
                postal_code: '342001',
                country: 'in',
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/payment-failed',
            customer: customer.id
        });

        //FOR ORDER-LIST

        // if(session.id){
        //    const orderlist=  req.body.map((v)=>(
        //         {
        //             product_id:v.product._id,
        //             quantity:v.quantity,
        //             user:v.user._id,
        //             color:v.color._id,
        //             size:v.size._id,
        //         }
        //      ))
        //      let dataToSave 
        //     console.log(orderlist)
        //     orderlist.map((v)=>(
        //      dataToSave = new Order(orderlist)
        //     ))
            

        //     const response = await dataToSave.save();
        //     console.log(dataToSave)
        // }
        // console.log("Cust",customer,"SESS", session);



        res.status(200).json({ message: 'success' , session:session.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    buySomething
}