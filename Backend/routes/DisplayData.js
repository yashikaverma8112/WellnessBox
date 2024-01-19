const express = require('express')
const router = express.Router();

router.post('/boxData',(req,res)=>{
    try{
        res.send([global.Box_items,global.Category]);
    }
    catch(err){
        console.log(err.message);
        res.send(err);

    }
})
module.exports=router;