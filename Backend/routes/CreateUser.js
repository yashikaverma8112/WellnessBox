const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "mhassdbbvbbvbdbvdndnduhuvnd"
router.post('/createuser',[
body('email','Invalid E-Mail').isEmail(),
body('name','Invalid Name').isLength({ min: 5 }),
body('password','Invalid Password').isLength({ min: 5 })],async(req,res)=>{
    
    const errors = validationResult(req);
    const salt = await bcrypt.genSalt(); 
    const secPassword  = await bcrypt.hash(req.body.password,salt)
    const email = req.body.email
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
      
    }
    try{
        let useremail = await User.findOne({email});
        if(useremail){
         return res.status(400).json({ errors: "Email Exists" ,msg:"Email already exists" });
     }
       await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(err) {
        res.json({success:false})
        console.log(err);
    }
})
router.post('/loginuser',async(req,res)=>{
    const email = req.body.email

    try{
       let useremail = await User.findOne({email});
       if(!useremail){
        return res.status(400).json({ errors: "Invalid Email" ,msg:"Enter Valid Email" });
    }
   
        const pwdCompare = await bcrypt.compare(req.body.password,useremail.password)
        if(!pwdCompare){
            return res.status(400).json({ errors: "Invalid password",msg:"Enter Valid Password" });
            
        }
    
        const data ={
            user:{
                id:useremail.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.status(200).json({success:true, authToken:authToken});
    }
    catch(err) {
        res.json({success:false})
        console.log(err);
    }
})






module.exports=router;