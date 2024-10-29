const otpData = require('../../../data/support');
// const Admin = require('./../../../models/admin/admin');
const User = require('../../../models/website/users/user');
const nodemailer = require('nodemailer');

const genrateOtp = async(req, res)=>{
    try{
        const { email } = req.body;

       const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.ADMIN_MAIL,
            pass: process.env.ADMIN_APP_PASSWORD
        }
       });

       const otp = Math.floor(Math.random() * 1000000);


       const otpDataMap = otpData;
          otpDataMap.set(email, otp);
    

       const mailOptions = {
        from: 'noreply@mail.com',
        to: email,
        subject:'Otp for email update',
        text: `Your otp is ${otp}`
       }

       transporter.sendMail(mailOptions,(error, success)=>{
        if(error) return res.status(500).json({message: 'otp could not genrate',error})

            res.status(200).json({message:'otp has sent'});
       })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const updateEmail = async(req,res)=>{
    try{
        const otpDataMap = otpData;
        const sentOtp = otpDataMap.get(req.body.email);

        if(Number(req.body.userotp )!== (sentOtp)) return res.status(401).json({message:'please enter a valid otp'});

        const response = await User.updateOne(
            req.params,
            {
                $set:{password:req.body.newpassword}
            }
        );

        res.status(200).json({message:'email has updated', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}
