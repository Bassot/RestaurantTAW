import * as receipt from '../Models/Receipt'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
const express = require('express');

export const receiptRouter = express.Router();

receiptRouter.post('/', (req, res)=>{
    let r = req.body;
    r.timestamp = new Date();
    receipt.newReceipt(r).save().then((receipt)=>{
        return res.status(200).json({error: false, errormessage: "", id: receipt._id});
    }).catch((err)=>{
        return res.status(500).json({error: true, errormessage: "DB error: " + err.errmsg});
    })
});

receiptRouter.post('/day', (req, res)=>{
    const day = req.body.day;
    receipt.getModel().find({
        timestamp: { $gte: startOfDay(day), $lte: endOfDay(day) }
    }).then((receipts)=>{
        res.status(200).json(receipts);
    }).catch((err)=>{
        res.status(500).json({error: true, errormessage: "DB error: " + err.errmsg});
    });
})
