import {queueRouter} from "../index";
import * as queue_item from "../Models/Queue_Item"
import colors = require('colors');
colors.enabled = true;
const express = require('express');
import * as mongoose from 'mongoose';

/**
 * path = localhost:8080/queue/
 */

// posting an array of items in the queue
// on req.body there is something like: [{nameItem1, ... }, {nameItem2, ... }]
queueRouter.post('/', (req, res) => {
    console.log('Adding new items on the queue, received : ' + req.body.name);
    let receivedItems = req.body;
    receivedItems.forEach(function (item){
        item.timestamp = new Date();
    });
    queue_item.getModel().insertMany(receivedItems).then((item)=>{
        //TODO: socket notification to cooks


        return res.status(200).json({ error: false, errormessage: "", id: 0});
    }).catch((err)=>{
        console.log(('Error posting the item in the queue: ' + err).red);
    })
})
// returning all the items related to a table id
// returning all the queue if no id given
queueRouter.get('/table/:tableid', (req, res) => {
    console.log('GET request for items related to table: ' + req.params.tableid);

    queue_item.getModel().find({table: req.params.tableid}).then((items) => {
            return res.status(200).json(items);
        }
    ).catch((err)=> {
        console.log(('Error getting items from the queue : ' + err).red);
    })
});