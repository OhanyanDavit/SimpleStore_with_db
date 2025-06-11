const express = require('express');
const checkBaseVal = require("../dboperations/dbchack");
const {adduser, login, DeleteUser} = require("./addb");


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
addus.post("/login", async(req, res)=>{
    const {name, email, password} = req.body;
    await checkBaseVal("users");
    const {status, token, message} = await login(name, email, password);

    if(status === 200){
        res.status(200).json({message: token})
    }else{
        res.status(500).json({message: message});

    }
})

addus.post("/createadmin", async(req, res)=>{
    const {name, email, password} = req.body;
    await checkBaseVal("users");
    const ret = await adduser(name, email, password, "admin");

    if(ret === 200){
        res.status(200).json({message: "admin was created"})
    }else{
        res.status(500).json({message: "Email already exists or other error"});

    }
})
addus.delete("/delete", async(req, res)=>{
    const {name, email} = req.body;
    await checkBaseVal("users");
    DeleteUser(req.headers.authorization).then((result) => {
        if (result.status === 200) {
            res.status(200).json({message: result.message});
        } else {
            res.status(result.status).json({message: result.message});
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
})

module.exports = addus;