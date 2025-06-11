const express = require('express');
const checkBaseVal = require("../dboperations/dbchack");
const {addprod, readprod} = require("./addprod")


const addpro = express.Router();

addpro.post("/add", async (req, res)=>{
    const {name, price, color} = req.body;
    await checkBaseVal("products")
    const ret = await addprod(name, price, color);

    if(ret === 200){
        res.status(200).json({message: "product was created"})
    }else{
        res.status(500).json({message: "There was an error while creating product"})

    }
})
addpro.get("/see", async (req, res)=>{
    await checkBaseVal("products")
    const {stat, a} = await readprod();

    if(stat === 200 && a){
        res.status(200).json({message: a.rows})
    }else{
        res.status(500).json({message: "there is no products in the database"})

    }
})


module.exports = addpro;