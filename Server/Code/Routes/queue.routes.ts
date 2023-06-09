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
    receivedItems.forEach(function (item) {
        item.timestamp = new Date();
    });
    queue_item.getModel().insertMany(receivedItems).then((item) => {
        //TODO: socket notification to cooks


        return res.status(200).json({error: false, errormessage: "", id: 0});
    }).catch((err) => {
        return res.status(404).json({error: true, errormessage: "Mongo error: " + err});
    })
});
// returning all the items related to a table id
// returning all the queue if no id given
queueRouter.get('/table/:tableid', (req, res) => {
    if(!req.params){
        console.log('GET request for all queue items');
        queue_item.getModel().find().then((items) => {
            return res.status(200).json(items);
        }).catch((err) => {
            return res.status(404).json({error: true, errormessage: "Mongo error: " + err});
        })
    }
    else{
        console.log('GET request for items related to table: ' + req.params.tableid);
        queue_item.getModel().find({table: req.params.tableid}).then((items) => {
            return res.status(200).json(items);
        }).catch((err) => {
            return res.status(404).json({error: true, errormessage: "Mongo error: " + err});
        })
    }
});

// deleting all the items related to a table
queueRouter.delete('/table/:tableid', (req, res) => {
    console.log('DELETE request for items related to table: ' + req.params.tableid);

    queue_item.getModel().deleteMany({table: req.params.tableid}).then((items) => {
        if(items.deletedCount > 0)
            return res.status(200).json({error: false, errormessage: ""});
        else
            return res.status(404).json({error: true, errormessage: "Invalid table id"});
    }).catch((err) => {
        return res.status(404).json({error: true, errormessage: "Mongo error: " + err});
    })
});
// updating the order
queueRouter.patch('/:id/:status', (req, res) => {
    console.log('PATCH request for item: ' + req.params.id);
    const filter = { _id: req.params.id };
    const update = { status: req.params.status };
    queue_item.getModel().findOneAndUpdate(filter, update, { new: true }).then((item) => {
        console.log('Item updated');
        return res.status(200).json(item);
    }).catch((err)=>{
        console.log(('Error updating item: ' + err).red);
        return res.status(404).json({error: true, errormessage: "Invalid id item"});
    })
});