const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../db/conn');

const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.send('Hello World from router')
});


// Signup API

router.post("/signup", async (req, res) => {

    const {name, contact, address, companyName, designation, email, password} = req.body;
    
    try{
        const userExist = await User.findOne( {email : email});
        
        if(!name || !contact || !address || !companyName || !designation || !email || !password){
            res.status(400).json({alert: "Please Fill All Details"});
        }
        if(userExist){
            return res.status(409).json("User Already Exist");
        }
        const user = new User({name, contact, address, companyName, designation, email, password});
        await user.save();
        res.status(201).json({message: "Account Created"});

    }catch(err){
        console.log(err);
        // res.status(500).json({error: "Error in Account Creation"});
    }
});

// Login API

router.post('/login',async (req, res) => {
    try{
        const {email, password} = req.body;

        const userLogin = await User.findOne({email:email, password:password});

        if(!userLogin){
            res.status(401).json({ error: "Login Failed"});
        }else{
            const token = await userLogin.generateAuthToken();
            res.cookie("user",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            res.json({ message: "Login Success", user: userLogin});
        }
    }catch(err){
        console.log(err);
    }
})

//Logout API

router.get('/logout',(req,res)=>{
    res.clearCookie('user',{path:'/login'})
    res.status(200).send('User logout'); 
 });



module.exports = router;

