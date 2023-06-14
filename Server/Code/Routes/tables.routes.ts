import * as table from "../Models/Table";

const express = require('express');
import {ios} from '../index';

export const tablesRouter = express.Router();
//tablesRouter.use(express.json());
tablesRouter.get("/", (req, res) => {
    table.getModel().find({}).sort({number: 1}).then((tables) => {
        res.status(200).json(tables);
    }).catch((err) => {
        res.status(500).send('DB error: ' + err);
    });
});


tablesRouter.put("/:number&:status", (req, res) => {
    const filter = {
        number: req?.params?.number
    };
    let update = {};
    if(req.params.status == 'occupied')
        update = {
            isFree: false
        };
    else if(req.params.status == 'free')
        update = {
            isFree: true
        };
    table.getModel().findOneAndUpdate(filter, update, {new: true}).then((table) => {
        notify();
        res.status(200).send("Ok, table occupied: " + table);
    }).catch((err) => {
        res.status(500).send('DB error: ' + err);
    });
});

function notify() {
    let m = 'Hello';
    ios.emit('tables', m);
}







