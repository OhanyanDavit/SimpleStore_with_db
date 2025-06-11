const express = require('express');
const checkBaseVal = require("../dboperations/dbchack");
const adduser = require("./addb");


const addus = express.Router();

addus.post("/register", async(req, res)=>{
    const {name, email, password} = req.body;
    await checkBaseVal("users");
    const ret = await adduser(name, email, password);

    if(ret === 200){
        res.status(200).json({message: "user was created"})
    }else{
        res.status(500).json({message: "Email already exists or other error"});

    }
})

module.exports = addus;