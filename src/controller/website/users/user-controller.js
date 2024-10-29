const bcrypt = require('bcrypt');
// const User = require('../../../models/users/user');
const jwt = require('jsonwebtoken');
const User = require('../../../models/website/users/user');
const nodemailer = require('nodemailer')
const otpData = require('../../../data/support');


const registerUser = async (req, res) => {

    const { email } = req.body;

    try {
        const saltRounds = 10;
        const { password, ...data } = req.body;

        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            if (error) return res.status(203).json({ message: 'somethin went wrong' });

            data.password = hash;

            const dataToSave = new User(data);

            const response = await dataToSave.save();

            const { password, ...responseWithoutPassword } = response._doc;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ADMIN_MAIL,
                    pass: process.env.ADMIN_APP_PASSWORD
                }
            });

            const mailOptions = {
                from: 'noreply@mail.com',
                to: email,
                subject: 'Welcome to Frank and Oak',
                html: `<div style="text-align: center;">
                      <h1 >Welcome to Frank and Oak </h1>
                        <h2 >${req.body.f_name + ' ' + req.body.l_name}</h2>
                        <div >
                            <img class="" src='https://i.pinimg.com/originals/bc/9e/4a/bc9e4a15c3b226b8914e57e543defe9e.png' width='150px' height='150px'/>
                        </div>
                     <p>Thank you for registering with us. We're excited to have you on board!</p>
                    <p>You can now access our exclusive features and start exploring our website.</p>
                 <p>If you need any help or have questions, please don't hesitate to contact us.</p>
          </div>
                `
            }

            transporter.sendMail(mailOptions, (error, success) => {
                if (error) return res.status(500).json({ message: 'otp could not genrate', error })

                // console.log(success)

                res.status(200).json({ message: 'Registerd Successfully', data: responseWithoutPassword });
            })

            // console.log(responseWithoutPassword);


            // jwt.sign(responseWithoutPassword, process.env.JWT_KEY,{expiresIn: 60}, (error, token)=>{
            //     if (error) return res.status(203).json({ message: 'somethin went wrong' });
            //     res.status(200).json({ message: "success test user", data: responseWithoutPassword, auth: token });
            // })


        });


        // res.status(200).json({message:"success"})

    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};

const loginUser = async (req, res) => {
    // console.log(req.body)
    try {
        const ifValidEmail = await User.find({ email: req.body.email });
        // console.log(ifValidEmail)

        if (ifValidEmail.length === 0) return res.status(400).json({ message: 'invalid User email ' });
        const { password, ...responseWithoutPassword } = ifValidEmail[0];

        bcrypt.compare(req.body.password, ifValidEmail[0].password, async (err, result) => {
            if (err) return res.status(203).json({ message: 'somethin went wrong' });

            if (result !== true) return res.status(401).json({ message: 'invalid password ' });

            const { password, ...withoutPassword } = responseWithoutPassword._doc;

            jwt.sign(withoutPassword, process.env.JWT_KEY, { expiresIn: 60 }, (error, token) => {

                if (error) return res.status(203).json({ message: 'somethin went in jwt wrong' });

                res.status(200).json({ message: 'User logged in', data: withoutPassword, auth: token });
            })

        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const genrateOtpUser = async(req, res)=>{
    try{
        const { email } = req.body;
        // console.log(email);

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

const updatePassword = async(req,res)=>{
    try {

        const otpDataMap = otpData;
        const sentOtp = otpDataMap.get(req.body.email);

        if(Number(req.body.userotp )!== (sentOtp)) return res.status(401).json({message:'please enter a valid otp'});

       

        // res.status(200).json({message:'email has updated', data: response});

        const saltRounds = 10;
        const { password, ...data } = req.body;

        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            if (error) return res.status(203).json({ message: 'somethin went wrong' });

            data.password = hash;

            // const dataToSave = new User(data);

            // const response = await dataToSave.save();
            const response = await User.updateOne(
                {email:req.body.email},
                {
                    $set:{password:data.password}
                }

            );
            console.log(response);

            // const { password, ...responseWithoutPassword } = response._doc;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ADMIN_MAIL,
                    pass: process.env.ADMIN_APP_PASSWORD
                }
            });

            const mailOptions = {
                from: 'noreply@mail.com',
                to: req.body.email,
                subject: 'Welcome to Frank and Oak',
                html: `<div style="text-align: center;">
                      <h1 >Welcome to Frank and Oak </h1>
                        <h2 >${ req.body.email}</h2>
                        <div >
                            <img class="" src='https://i.pinimg.com/originals/bc/9e/4a/bc9e4a15c3b226b8914e57e543defe9e.png' width='150px' height='150px'/>
                        </div>
                     <p>Your Password Is Being Successfully Updated !!</p>
          </div>
                `
            }

            transporter.sendMail(mailOptions, (error, success) => {
                if (error) return res.status(500).json({ message: 'otp could not genrate', error })

                // console.log(success)

                res.status(200).json({ message: 'Registerd Successfully', data: response });
            })
           
            // console.log(responseWithoutPassword);


            // jwt.sign(responseWithoutPassword, process.env.JWT_KEY,{expiresIn: 60}, (error, token)=>{
            //     if (error) return res.status(203).json({ message: 'somethin went wrong' });
            //     res.status(200).json({ message: "success test user", data: responseWithoutPassword, auth: token });
            // })


        });


        // res.status(200).json({message:"success"})

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    registerUser,
    loginUser,
    genrateOtpUser,
    updatePassword
}