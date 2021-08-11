//import express from 'express';
//import fs from 'fs';
const express = require('express');
const fs = require('fs')

const app = express();
app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080');
})

let countItem=0;
let countItems=0;


//PUNTO 1
app.get('/items',(req,res)=>{
    const obj = {
        items : [],
        cantidad: 0
    }
    countItems++;
    fs.promises.readFile('./productos.txt').then(data => data.toString('utf-8')).then(datos =>{
        obj.items = JSON.parse(datos);
        obj.cantidad = obj.items.length;
        res.json(obj)
    })
})

//PUNTO 2
app.get('/item-random', (req,res)=>{
    let rand = (min,max)=>{
     return Math.floor(Math.random()*(max-min))+min;
    }
    countItem++;
    fs.promises.readFile('./productos.txt').then(data => data.toString('utf-8')).then(datos =>{
        const json = JSON.parse(datos)
            res.json({item:json[rand(0,json.length-1)]})
    })
    
})

//PUNTO 3
app.get('/visitas',(req,res)=>{
    let obj = {
        visitas:{
            item : countItem,
            items: countItems
        }
    }

    res.json(obj)

})

