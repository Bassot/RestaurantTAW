import * as receipt from '../Models/Receipt'

const express = require('express');

export const receiptRouter = express.Router();

receiptRouter.post('/', (req, res)=>{
    receipt.newReceipt(req.body).save().then((receipt)=>{
        res.send(200).json({error: false, errormessage: "", id: receipt._id});
    }).catch((err)=>{
        res.send(500).json({error: true, errormessage: "DB error: " + err.errmsg});
    })
});

receiptRouter.get('/', (req, res)=>{

})
